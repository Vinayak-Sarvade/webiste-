import { SweetItem, GiftBox, SpecialOffer, CustomerReview } from '../types';

import heroImg from '../assets/images/hero_indian_sweets_1789487107499.jpg';
import giftBoxImg from '../assets/images/festive_gift_box_1789487122645.jpg';
import specialityImg from '../assets/images/speciality_sweets_1789487137758.jpg';
import bakeryStoreImg from '../assets/images/sweet_bakery_store_1789487152048.jpg';
import kajuKatliImg from '../assets/images/kaju_katli_sweet_1789490077770.jpg';
import mysorePakImg from '../assets/images/mysore_pak_sweet_1789490098023.jpg';
import motichoorLadduImg from '../assets/images/motichoor_laddu_sweet_1789490113821.jpg';
import gulabJamunImg from '../assets/images/gulab_jamun_sweet_1789490133674.jpg';
import rasgullaImg from '../assets/images/rasgulla_sweet_1789490152356.jpg';
import besanLadduImg from '../assets/images/besan_laddu_sweet_1789490169288.jpg';
import milkPedaImg from '../assets/images/milk_peda_sweet_1789490188935.jpg';
import crispyJalebiImg from '../assets/images/crispy_jalebi_sweet_1789490206037.jpg';
import coconutBarfiImg from '../assets/images/coconut_barfi_sweet_1789490228787.jpg';
import dharwadPedaImg from '../assets/images/dharwad_peda_sweet_1789490244639.jpg';

export const BUSINESS_INFO = {
  brandName: "SweetWhisk Bakery",
  ownerName: "Vinayak Sarvade",
  businessType: "Traditional Indian Sweets & Bakery",
  location: "Hubli, Karnataka, India",
  established: "2026",
  tagline: "Sweet Traditions, Made Fresh.",
  about: "SweetWhisk Bakery is a traditional Indian sweets shop offering freshly prepared sweets, snacks, cakes, and festive gift boxes. The shop combines traditional recipes with modern packaging, making it suitable for festivals, weddings, birthdays, and everyday celebrations.",
  phone: "+91 1234567890",
  whatsappNumber: "911234567890",
  email: "orders@vinayak.in",
  address: "514, Iswar Nagar old hubli, Hubli, Karnataka – 560024",
  openingHours: {
    weekdays: "Monday – Saturday: 9:00 AM – 10:00 PM",
    sunday: "Sunday: 9:00 AM – 11:00 PM",
  },
  assets: {
    hero: heroImg,
    giftBox: giftBoxImg,
    speciality: specialityImg,
    bakeryStore: bakeryStoreImg,
  }
};

export const POPULAR_SWEETS: SweetItem[] = [
  {
    id: "kaju-katli",
    name: "Kaju Katli",
    category: "Premium Sweet",
    pricePerKg: 850,
    description: "Royal cashew fudge crafted from premium Goan cashews, melted sugar syrup, and adorned with delicate pure silver vark. Smooth and melts right in your mouth.",
    image: kajuKatliImg,
    badge: "Bestseller",
    shelfLife: "20 Days",
    ingredients: ["Goan Cashew Nuts", "Sugar", "Pure Silver Foil", "Cardamom"],
  },
  {
    id: "dharwad-peda",
    name: "Dharwad Peda",
    category: "Speciality",
    pricePerKg: 650,
    description: "Our pride of North Karnataka! Velvety caramelized milk solids roasted slowly to a deep rich hazel shade, rolled in powdered caster sugar. Authentic regional recipe.",
    image: dharwadPedaImg,
    isSpeciality: true,
    badge: "Hubli Speciality",
    shelfLife: "15 Days",
    ingredients: ["Fresh Full-Cream Cow Milk", "Caramelized Mawa", "Sugar", "Green Cardamom"],
  },
  {
    id: "mysore-pak",
    name: "Mysore Pak",
    category: "South Indian",
    pricePerKg: 650,
    description: "Authentic Karnataka royal sweet prepared with generous quantities of pure organic desi ghee, roasted besan, and sugar. Porous, crisp outside with a melt-in-the-mouth center.",
    image: mysorePakImg,
    badge: "Pure Desi Ghee",
    shelfLife: "18 Days",
    ingredients: ["Pure Desi Ghee", "Besan (Gram Flour)", "Sugar", "Saffron Essence"],
  },
  {
    id: "motichoor-laddu",
    name: "Motichoor Laddu",
    category: "Traditional",
    pricePerKg: 600,
    description: "Fine pearl-like fried gram flour droplets soaked in fragrant saffron-infused sugar syrup, enriched with toasted melon seeds and green pistachios.",
    image: motichoorLadduImg,
    badge: "Festive Essential",
    shelfLife: "10 Days",
    ingredients: ["Gram Flour (Besan)", "Pure Ghee", "Saffron", "Magaz (Melon Seeds)", "Pistachios"],
  },
  {
    id: "gulab-jamun",
    name: "Gulab Jamun",
    category: "Traditional",
    pricePerKg: 450,
    description: "Soft, golden dumplings made of fresh milk khoya, slow-fried in pure ghee, and dipped warm in sweet rose and cardamom flavored sugar syrup.",
    image: gulabJamunImg,
    shelfLife: "7 Days",
    ingredients: ["Fresh Khoya (Mawa)", "Paneer", "Desi Ghee", "Cardamom", "Rose Water Syrup"],
  },
  {
    id: "rasgulla",
    name: "Rasgulla",
    category: "Bengali Sweet",
    pricePerKg: 480,
    description: "Spongy, snow-white fresh cottage cheese orbs gently simmered in light cardamom sugar syrup. Delightfully juicy, light, and refreshing.",
    image: rasgullaImg,
    shelfLife: "5 Days (Refrigerated)",
    ingredients: ["Fresh Chhena (Cottage Cheese)", "Semolina", "Sugar Syrup", "Cardamom"],
  },
  {
    id: "besan-laddu",
    name: "Besan Laddu",
    category: "Traditional",
    pricePerKg: 550,
    description: "Coarsely ground gram flour roasted patiently in aromatic pure desi ghee until nutty and golden, blended with boora sugar and crunchy almonds.",
    image: besanLadduImg,
    shelfLife: "25 Days",
    ingredients: ["Roasted Besan", "Pure Desi Ghee", "Khand / Boora Sugar", "Crushed Almonds & Cashews"],
  },
  {
    id: "milk-peda",
    name: "Milk Peda",
    category: "Milk Sweet",
    pricePerKg: 600,
    description: "Classic tender milk peda made by simmering fresh whole milk with cardamom and raw cane sugar, embossed with a traditional floral crest.",
    image: milkPedaImg,
    shelfLife: "12 Days",
    ingredients: ["Whole Cow Milk Khoya", "Sugar", "Green Cardamom", "Pistachio Garnish"],
  },
  {
    id: "jalebi",
    name: "Jalebi",
    category: "Fresh Sweet",
    pricePerKg: 400,
    description: "Crispy, spiral golden pretzels made fresh daily in desi ghee, piping hot and drenched in saffron sugar syrup with a gentle tang.",
    image: crispyJalebiImg,
    badge: "Made Fresh Daily",
    shelfLife: "2 Days (Best consumed fresh)",
    ingredients: ["Fermented Flour Batter", "Pure Desi Ghee", "Saffron Sugar Syrup", "Kewra"],
  },
  {
    id: "coconut-barfi",
    name: "Coconut Barfi",
    category: "Barfi",
    pricePerKg: 500,
    description: "Tender freshly grated coastal coconuts cooked with creamy condensed milk, green cardamom, and crowned with slivered almonds and pistachios.",
    image: coconutBarfiImg,
    shelfLife: "10 Days",
    ingredients: ["Fresh Grated Coconut", "Condensed Milk", "Pure Ghee", "Cardamom", "Pistachios"],
  },
];

export const GIFT_BOXES: GiftBox[] = [
  {
    id: "mini-sweet-box",
    name: "Mini Sweet Box",
    price: 299,
    weight: "250g sweets",
    varietiesCount: 4,
    features: [
      "4 hand-picked sweet varieties (Kaju Katli, Dharwad Peda, Motichoor Laddu, Mysore Pak)",
      "250g net weight fresh sweets",
      "Premium foil-stamped gift packaging with ribbon",
      "Ideal for quick return gifts & personal treats"
    ],
    description: "A delightful sampler box packed with 4 signature sweets in an elegant embossed keepsake box.",
    image: giftBoxImg,
  },
  {
    id: "festival-box",
    name: "Festival Box",
    price: 599,
    weight: "500g sweets",
    varietiesCount: 5,
    features: [
      "5 celebration varieties (Kaju Katli, Mysore Pak, Besan Laddu, Motichoor Laddu, Milk Peda)",
      "500g net weight fresh sweets",
      "Complimentary festive greeting card with your custom message",
      "Satin ribbon tie & airtight seal for prolonged freshness",
      "Perfect for Diwali, Dussehra, Ugadi & Rakhi gifting"
    ],
    description: "Our most popular festive celebration box featuring 5 delicious varieties and a personalized greeting card.",
    image: giftBoxImg,
    popular: true,
  },
  {
    id: "premium-celebration-box",
    name: "Premium Celebration Box",
    price: 999,
    weight: "1kg sweets",
    varietiesCount: 7,
    features: [
      "7 royal delicacies (Kaju Katli, Dharwad Peda, Pure Ghee Mysore Pak, Motichoor, Coconut Barfi, Besan Laddu & Dry Fruit Khoya)",
      "1kg generous feast of sweets",
      "Luxury rigid hard-box packaging with royal gold foil mandala design",
      "Personalized message card + gift bag included",
      "Best suited for VIP corporate clients, weddings & family milestones"
    ],
    description: "The ultimate royal gift hamper! A magnificent 1kg box curated with 7 distinct artisanal sweets in rigid gold-foiled luxury presentation.",
    image: heroImg,
  },
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: "festival-special",
    title: "Festival Special",
    tag: "Festive Season",
    description: "Enjoy an extra 15% instant discount on all pre-orders for upcoming festivals including Diwali, Ganesh Chaturthi, and Dussehra.",
    highlight: "15% OFF",
    icon: "Sparkles",
    code: "FESTIVE15"
  },
  {
    id: "wedding-orders",
    title: "Wedding Orders",
    tag: "Bulk Celebration",
    description: "Planning a wedding in Hubli-Dharwad? Get custom-branded luxury boxes, dedicated tasting sessions, and special tiered bulk pricing.",
    highlight: "Special Bulk Pricing",
    icon: "HeartHandshake",
    code: "WEDDINGBULK"
  },
  {
    id: "birthday-orders",
    title: "Birthday Orders",
    tag: "Birthday Perk",
    description: "Celebrate your special day with sweetness. Get a free complimentary 250g box of handcrafted sweets on every order above ₹2,000.",
    highlight: "Free 250g Sweets (Orders ₹2k+)",
    icon: "Cake",
  },
  {
    id: "diwali-combo",
    title: "Diwali Combo",
    tag: "Festival Exclusive",
    description: "Curated Diwali gift combos with brass diyas, dry fruits, and signature sweets starting from just ₹499.",
    highlight: "Starting from ₹499",
    icon: "Flame",
  },
  {
    id: "free-delivery",
    title: "Free Delivery",
    tag: "Doorstep Delivery",
    description: "Enjoy free temperature-protected doorstep delivery across Hubli and nearby areas on all orders above ₹1,000.",
    highlight: "Free on Orders > ₹1,000",
    icon: "Truck",
  },
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: "review-1",
    author: "prem",
    rating: 5,
    comment: "The Mysore Pak tastes just like homemade sweets! The aroma of pure desi ghee took me right back to our family celebrations. Definitely the best in Old Hubli.",
    date: "August 2026",
    location: "Hubli, Karnataka",
    sweetMentioned: "Mysore Pak"
  },
  {
    id: "review-2",
    author: "kiran",
    rating: 5,
    comment: "Beautiful gift boxes and very fresh sweets. Ordered 45 Festival Boxes for our company event in Hubli, and every client raved about the packaging and freshness.",
    date: "July 2026",
    location: "Vidyanagar, Hubli",
    sweetMentioned: "Festival Gift Box"
  },
  {
    id: "review-3",
    author: "sandeep",
    rating: 4,
    comment: "Kaju Katli and Motichoor Laddu are my favourites. The sweetness is perfectly balanced, not overly sugary like commercial shops. Vinayak and his team take real pride in quality.",
    date: "September 2026",
    location: "Dharwad Road, Hubli",
    sweetMentioned: "Kaju Katli & Motichoor Laddu"
  },
];

export const GALLERY_ITEMS = [
  {
    id: "gal-1",
    title: "Signature Festive Platter",
    category: "Sweets Platter",
    image: heroImg,
    caption: "Our artisanal golden thali loaded with freshly made Kaju Katli, Dharwad Peda, and Mysore Pak.",
  },
  {
    id: "gal-2",
    title: "Handmade Gift Hampers",
    category: "Packaging",
    image: giftBoxImg,
    caption: "Embossed royal crimson and gold celebration gift boxes with festive ribbons.",
  },
  {
    id: "gal-3",
    title: "Authentic Dharwad Peda & Mysore Pak",
    category: "Heritage Recipes",
    image: specialityImg,
    caption: "Slow-roasted North Karnataka caramelized peda and pure ghee Mysore Pak.",
  },
  {
    id: "gal-4",
    title: "SweetWhisk Hubli Boutique",
    category: "Bakery & Shop",
    image: bakeryStoreImg,
    caption: "Our welcoming sweet counter at 514 Iswar Nagar in Old Hubli.",
  },
  {
    id: "gal-5",
    title: "Piping Hot Desi Ghee Jalebi",
    category: "Fresh Counter",
    image: crispyJalebiImg,
    caption: "Crispy swirls prepared fresh every morning and evening.",
  },
  {
    id: "gal-6",
    title: "Diamond Cut Kaju Katli",
    category: "Cashew Delights",
    image: kajuKatliImg,
    caption: "Finely ground premium cashew diamonds with genuine silver leaf vark.",
  },
];

export const SWEET_ITEMS = POPULAR_SWEETS;

