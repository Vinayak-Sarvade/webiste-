import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY" || key.trim() === "" || key.startsWith("MY_")) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const BAKERY_SYSTEM_INSTRUCTION = `
You are the expert "Mithai Sommelier & AI Shopping Guide" for SweetWhisk Bakery in Old Hubli, Karnataka, owned by Vinayak Sarvade.
Your purpose is to warmly, cheerfully, and concisely guide users in selecting authentic Indian sweets, savouries, festive gift hampers, and calculating party quantities.

Key Bakery Knowledge:
- Location: 514, Iswar Nagar, Old Hubli, Hubli, Karnataka – 560024.
- Specialties:
  1. Dharwad Peda (₹650/kg) - Iconic North Karnataka Pride! Caramelized slow-roasted mawa rolled in caster sugar.
  2. Kaju Katli (₹850/kg) - Bestseller diamond cashew fudge with pure silver vark.
  3. Royal Mysore Pak (₹650/kg) - Porous, rich pure desi ghee melt-in-the-mouth classic.
  4. Motichoor Laddu (₹600/kg) - Saffron-infused fine pearl boondi with melon seeds and pistachios.
  5. Gulab Jamun (₹450/kg) - Soft khoya dumplings in rose-cardamom syrup.
  6. Bengali Rasgulla (₹480/kg) - Snow-white fresh chhena in light cardamom syrup.
  7. Desi Ghee Besan Laddu (₹550/kg) - Roasted gram flour with pure ghee and dry fruits.
  8. Malai Milk Peda (₹600/kg) - Traditional floral embossed khoya peda.
  9. Crispy Desi Ghee Jalebi (₹400/kg) - Fresh hot saffron swirls made morning and evening.
  10. Coconut Barfi (₹500/kg) - Tender grated coconut with condensed milk.
- Gift Boxes:
  1. Royal Hubli Heritage Assortment (₹799) - 1 kg of Dharwad Peda, Mysore Pak, Kaju Katli, Besan Laddu in luxury gold tin.
  2. Kaju Connoisseur Box (₹999) - 1 kg of Kaju Katli, Kaju Roll, and Kaju Pista Cassata.
  3. Traditional Festival Delight (₹599) - 1 kg of Motichoor Laddu, Gulab Jamun, Milk Peda, Jalebi.
  4. Executive Mithai Hamper (₹1,499) - 1.5 kg premium dry fruit sweets with brass diya & festival greeting.
- Discounts: 15% OFF for festival season with code "FESTIVE15" (Min order ₹499).
- Delivery: Free delivery within Hubli for orders above ₹499. Same-day 30-45 min delivery across Old Hubli, Vidyanagar, Keshwapur, Deshpande Nagar, and Gokul Road.
- Packaging: 100% pure cow ghee guarantee, food-grade airtight containers, insulated transit.

Tone and Guidelines:
- Warm, polite, knowledgeable, and inviting Indian hospitality ("Namaskara!").
- Keep answers concise, helpful, and scannable with bullet points when listing items.
- Mention specific prices per kg, weights (250g, 500g, 1kg), or gift boxes where relevant.
- Offer actionable advice (e.g. recommend 200-250 grams of assorted sweets per guest for weddings or housewarmings).
`;

function generateBakeryFallback(message: string): { reply: string; recommendedSweets: string[] } {
  const query = message.toLowerCase();
  let reply = "Namaskara! I am your SweetWhisk AI Guide. ";
  const recommendedSweets: string[] = [];

  if (query.includes("dharwad") || query.includes("special") || query.includes("hubli")) {
    reply += "Our signature crown jewel is the authentic **Dharwad Peda** (₹650/kg). Slowly roasted cow milk mawa with a rich caramelized hazel crust and dusted with sugar. We also recommend our **Royal Mysore Pak** (₹650/kg) made with pure organic desi ghee!";
    recommendedSweets.push("dharwad-peda", "mysore-pak");
  } else if (query.includes("wedding") || query.includes("party") || query.includes("guest") || query.includes("kg") || query.includes("how much") || query.includes("portion")) {
    reply += "For family celebrations and weddings, we recommend **200g to 250g per guest** (around 4-5 pieces). For 50 guests, ordering **10 to 12 kg** of assorted sweets or 1kg gift boxes is ideal! Our **Royal Hubli Heritage Assortment Box** (₹799 for 1 kg) is our top customer pick.";
    recommendedSweets.push("dharwad-peda", "kaju-katli", "mysore-pak");
  } else if (query.includes("gift") || query.includes("box") || query.includes("festival") || query.includes("diwali")) {
    reply += "Our bestselling festive box is the **Royal Hubli Heritage Assortment (1 kg - ₹799)** featuring Dharwad Peda, Mysore Pak, Kaju Katli & Besan Laddu in an embossed gold tin. Use coupon **FESTIVE15** for 15% off!";
    recommendedSweets.push("kaju-katli", "mysore-pak");
  } else if (query.includes("ghee") || query.includes("pure") || query.includes("desi")) {
    reply += "All our sweets are crafted using **100% Pure Desi Ghee**. Highlights include our **Royal Mysore Pak** (₹650/kg), **Desi Ghee Besan Laddu** (₹550/kg), and hot **Crispy Jalebi** (₹400/kg).";
    recommendedSweets.push("mysore-pak", "besan-laddu", "jalebi");
  } else if (query.includes("diabetic") || query.includes("sugar") || query.includes("diet") || query.includes("healthy") || query.includes("low")) {
    reply += "For health-conscious guests, we suggest our **Kaju Katli** (made with pure cashews and minimal sugar) and dry-fruit-forward mithais. You can also request custom reduced-sugar batches for bulk event orders.";
    recommendedSweets.push("kaju-katli");
  } else if (query.includes("delivery") || query.includes("time") || query.includes("where") || query.includes("area")) {
    reply += "We deliver doorstep across all of Hubli (Old Hubli, Keshwapur, Vidyanagar, Deshpande Nagar, Gokul Road) in **30-45 minutes**! Delivery is **FREE on all orders above ₹499**.";
    recommendedSweets.push("dharwad-peda");
  } else {
    reply += "I'm delighted to help! Try our bestselling **Kaju Katli** (₹850/kg), traditional **Dharwad Peda** (₹650/kg), or warm **Gulab Jamuns** (₹450/kg). You can use coupon **FESTIVE15** for 15% off your order today!";
    recommendedSweets.push("kaju-katli", "dharwad-peda", "gulab-jamun");
  }

  return { reply, recommendedSweets };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "sweetwhisk-server" });
  });

  // AI Guide Endpoint
  app.post("/api/ai/guide", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "A message string is required." });
      }

      const ai = getGenAI();

      if (!ai) {
        const fallback = generateBakeryFallback(message);
        return res.json({
          reply: fallback.reply,
          recommendedSweets: fallback.recommendedSweets,
        });
      }

      // Format conversation history if provided
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          if (item.sender === "user" || item.role === "user") {
            contents.push({ role: "user", parts: [{ text: String(item.text) }] });
          } else if (item.sender === "ai" || item.role === "model") {
            contents.push({ role: "model", parts: [{ text: String(item.text) }] });
          }
        }
      }

      // Add current message
      contents.push({ role: "user", parts: [{ text: message }] });

      const generatePromise = ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents,
        config: {
          systemInstruction: BAKERY_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Gemini request timeout")), 4500)
      );

      const response = await Promise.race([generatePromise, timeoutPromise]);

      const replyText = response.text || "Namaskara! How may I assist you with our fresh Hubli sweets today?";

      // Determine recommendations by simple keyword matching on reply text
      const recommendedSweets: string[] = [];
      const lowerReply = replyText.toLowerCase();
      if (lowerReply.includes("dharwad peda")) recommendedSweets.push("dharwad-peda");
      if (lowerReply.includes("kaju katli")) recommendedSweets.push("kaju-katli");
      if (lowerReply.includes("mysore pak")) recommendedSweets.push("mysore-pak");
      if (lowerReply.includes("motichoor")) recommendedSweets.push("motichoor-laddu");
      if (lowerReply.includes("gulab jamun")) recommendedSweets.push("gulab-jamun");
      if (lowerReply.includes("rasgulla")) recommendedSweets.push("rasgulla");
      if (lowerReply.includes("besan laddu")) recommendedSweets.push("besan-laddu");
      if (lowerReply.includes("jalebi")) recommendedSweets.push("jalebi");

      return res.json({
        reply: replyText,
        recommendedSweets: recommendedSweets.slice(0, 3),
      });
    } catch (err: any) {
      console.error("Gemini AI Guide Error:", err);
      const fallback = generateBakeryFallback(req.body?.message || "");
      return res.json({
        reply: fallback.reply,
        recommendedSweets: fallback.recommendedSweets,
      });
    }
  });

  // Vite middleware in dev; static dist in prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SweetWhisk fullstack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
