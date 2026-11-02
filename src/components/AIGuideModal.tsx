import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User, RefreshCw, Plus, Check, ChevronRight, Tag, HeartHandshake, ShieldCheck } from 'lucide-react';
import { SweetItem, GiftBox, AIMessage } from '../types';
import { SWEET_ITEMS, GIFT_BOXES, BUSINESS_INFO } from '../data/sweetData';

interface AIGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: SweetItem, weight: '250g' | '500g' | '1kg', calculatedPrice: number) => void;
  onAddGiftBoxToCart?: (box: GiftBox) => void;
  onNavigateSection?: (sectionId: string) => void;
  onApplyCoupon?: (couponCode: string) => void;
}

const INITIAL_MESSAGES: AIMessage[] = [
  {
    id: 'welcome-1',
    sender: 'ai',
    text: "Namaskara! 🙏 Welcome to SweetWhisk Bakery. I'm your **Mithai Sommelier & AI Shopping Guide**.\n\nWhether you need help selecting our authentic **Dharwad Peda**, calculating sweet portions for a wedding or puja, or choosing a festive gift box, I'm here to guide you!",
    timestamp: 'Just now',
    suggestedActions: [
      { label: 'Why is Dharwad Peda famous?', actionType: 'view_section', targetId: 'dharwad-peda' },
      { label: 'Calculate portions for 40 guests', actionType: 'view_section' },
      { label: 'Best gift box under ₹1,000', actionType: 'view_section', targetId: 'gift-boxes' }
    ]
  }
];

const SUGGESTED_QUESTIONS = [
  "What is unique about Dharwad Peda?",
  "How many kg for 50 party guests?",
  "Recommend a luxury gift box under ₹1,000",
  "Which sweets are made in pure cow desi ghee?",
  "What are your delivery areas in Hubli?",
  "Do you have low-sugar or dry fruit sweets?"
];

export const AIGuideModal: React.FC<AIGuideModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onAddGiftBoxToCart,
  onNavigateSection,
  onApplyCoupon
}) => {
  const [messages, setMessages] = useState<AIMessage[]>(() => {
    const saved = sessionStorage.getItem('sweetwhisk_ai_chat');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_MESSAGES;
      }
    }
    return INITIAL_MESSAGES;
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [addedItemAlert, setAddedItemAlert] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('sweetwhisk_ai_chat', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'model', text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error('Network error from AI guide endpoint');
      }

      const data = await response.json();

      const aiMsg: AIMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || "Namaskara! How else can I assist you with our fresh Hubli sweets?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedSweets: data.recommendedSweets || []
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.warn("AI guide fetch fallback:", err);
      // Friendly local fallback
      let fallbackText = "Namaskara! I'm here to guide you through SweetWhisk Hubli. ";
      const qLower = query.toLowerCase();
      const recs: string[] = [];

      if (qLower.includes("dharwad") || qLower.includes("special")) {
        fallbackText = "Our signature pride is the authentic **Dharwad Peda** (₹650/kg). Made by slow-roasting organic cow milk mawa with pure ghee into a deep caramelized hazel fudge, then delicately dusted with sugar.";
        recs.push("dharwad-peda");
      } else if (qLower.includes("guest") || qLower.includes("kg") || qLower.includes("people")) {
        fallbackText = "For celebrations, we recommend **200g to 250g per guest** (roughly 4-5 medium sweet pieces). For 50 guests, ordering **10 to 12.5 kg** in assorted trays or 1kg gift boxes is ideal!";
        recs.push("royal-heritage-box", "dharwad-peda", "mysore-pak");
      } else if (qLower.includes("box") || qLower.includes("gift") || qLower.includes("festival")) {
        fallbackText = "We recommend our **Royal Hubli Heritage Assortment Box** (1 kg for ₹799), featuring Dharwad Peda, Mysore Pak, Kaju Katli, and Besan Laddu. You can also apply coupon **FESTIVE15** for 15% discount!";
        recs.push("kaju-katli", "mysore-pak");
      } else {
        fallbackText = "Try our top recommendations: traditional **Dharwad Peda** (₹650/kg), melt-in-mouth **Mysore Pak** (₹650/kg), or diamond-cut **Kaju Katli** (₹850/kg)! Orders above ₹499 qualify for Free Hubli delivery.";
        recs.push("dharwad-peda", "kaju-katli");
      }

      const aiMsg: AIMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedSweets: recs
      };

      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAdd = (sweetId: string) => {
    const item = SWEET_ITEMS.find(s => s.id === sweetId);
    if (item) {
      const price = Math.round(item.pricePerKg * 0.5);
      onAddToCart(item, '500g', price);
      setAddedItemAlert(`Added 500g of ${item.name} (₹${price}) to your cart!`);
      setTimeout(() => setAddedItemAlert(null), 3000);
    }
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    sessionStorage.removeItem('sweetwhisk_ai_chat');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl h-[88vh] max-h-[750px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#D4AF37]/50"
        role="dialog"
        aria-label="SweetWhisk AI Sweet Guide"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#071324] via-[#0B2545] to-[#133E87] text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-[#D4AF37]/30 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8C6D23] flex items-center justify-center text-[#071324] shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#0B2545] rounded-full" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-cinzel font-bold text-sm sm:text-base text-[#F3E5AB]">
                  SweetWhisk AI Guide
                </h3>
                <span className="text-[10px] bg-[#D4AF37]/20 text-[#F3E5AB] font-semibold px-2 py-0.5 rounded-full border border-[#D4AF37]/40">
                  Gemini Powered
                </span>
              </div>
              <p className="text-[11px] text-blue-200">
                Personalized sweet sommelier, portion planning & local Hubli expert
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={handleResetChat}
              title="Reset Chat"
              className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Temporary Added Alert */}
        {addedItemAlert && (
          <div className="bg-emerald-600 text-white text-xs px-3 py-2 flex items-center justify-between font-semibold animate-in slide-in-from-top duration-150">
            <span className="flex items-center space-x-1.5">
              <Check className="w-4 h-4" />
              <span>{addedItemAlert}</span>
            </span>
            <button
              onClick={() => {
                onClose();
                onNavigateSection?.('cart');
              }}
              className="underline text-[11px] hover:text-emerald-100 cursor-pointer"
            >
              View Cart &rarr;
            </button>
          </div>
        )}

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 bg-slate-50/70">
          {messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 ${isAI ? '' : 'flex-row-reverse space-x-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    isAI
                      ? 'bg-[#0B2545] text-[#D4AF37]'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Bubble Content */}
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                    isAI
                      ? 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                      : 'bg-gradient-to-r from-[#0B2545] to-[#133E87] text-white rounded-tr-xs'
                  }`}
                >
                  {/* Formatted Text */}
                  <div className="space-y-1.5 whitespace-pre-line">
                    {msg.text.split('\n\n').map((paragraph, i) => (
                      <p key={i}>
                        {paragraph.split('**').map((chunk, j) =>
                          j % 2 === 1 ? (
                            <strong key={j} className={isAI ? "text-[#0B2545] font-bold" : "text-amber-200 font-bold"}>
                              {chunk}
                            </strong>
                          ) : (
                            chunk
                          )
                        )}
                      </p>
                    ))}
                  </div>

                  {/* Interactive Recommended Sweet Cards */}
                  {isAI && msg.recommendedSweets && msg.recommendedSweets.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Recommended for You:
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {msg.recommendedSweets.map((sweetId) => {
                          const sweet = SWEET_ITEMS.find(s => s.id === sweetId);
                          if (!sweet) return null;
                          return (
                            <div
                              key={sweet.id}
                              className="flex items-center justify-between p-2 rounded-xl bg-amber-50/40 border border-amber-200/70 hover:border-[#D4AF37] transition-all"
                            >
                              <div className="flex items-center space-x-2.5 overflow-hidden">
                                <img
                                  src={sweet.image}
                                  alt={sweet.name}
                                  className="w-11 h-11 rounded-lg object-cover border border-amber-200 shrink-0"
                                />
                                <div className="truncate">
                                  <h5 className="font-bold text-slate-900 text-[11px] truncate">
                                    {sweet.name}
                                  </h5>
                                  <p className="text-[10px] text-amber-900 font-semibold">
                                    ₹{sweet.pricePerKg}/kg • <span className="text-slate-500 font-normal">₹{Math.round(sweet.pricePerKg / 2)} (500g)</span>
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleQuickAdd(sweet.id)}
                                className="shrink-0 ml-2 px-2.5 py-1.5 rounded-lg bg-[#0B2545] hover:bg-[#133E87] text-white text-[10px] font-bold flex items-center space-x-1 cursor-pointer transition-colors shadow-xs"
                              >
                                <Plus className="w-3 h-3 text-[#D4AF37]" />
                                <span>Add 500g</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Suggested action chips attached to message */}
                  {msg.suggestedActions && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (act.actionType === 'view_section' && act.targetId === 'gift-boxes') {
                              onClose();
                              onNavigateSection?.('gift-boxes');
                            } else {
                              handleSendMessage(act.label);
                            }
                          }}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-[#0B2545] font-semibold border border-blue-200 transition-colors cursor-pointer flex items-center space-x-1"
                        >
                          <span>{act.label}</span>
                          <ChevronRight className="w-2.5 h-2.5 text-[#D4AF37]" />
                        </button>
                      ))}
                    </div>
                  )}

                  <span className={`block mt-1 text-[9px] text-right ${isAI ? 'text-slate-400' : 'text-blue-200'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Loading bubble */}
          {isLoading && (
            <div className="flex items-start space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#0B2545] text-[#D4AF37] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-3 text-xs flex items-center space-x-2 text-slate-500 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
                <span>SweetWhisk AI is typing recommendations...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Prompts Bar */}
        <div className="px-3 py-2 bg-white border-t border-slate-200 overflow-x-auto no-scrollbar shrink-0">
          <div className="flex items-center space-x-1.5 text-[11px] whitespace-nowrap">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">
              Ask:
            </span>
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-amber-50 hover:text-[#0B2545] hover:border-[#D4AF37] border border-slate-200 text-slate-600 font-medium transition-colors text-[10.5px] cursor-pointer disabled:opacity-50 shrink-0"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything (e.g., 'What sweets for 25 guests?', 'Pure ghee options?')..."
              className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-white border border-slate-300 focus:border-[#0B2545] focus:ring-1 focus:ring-[#0B2545] outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0B2545] to-[#133E87] hover:from-[#071324] hover:to-[#0B2545] text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          </form>
          
          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>100% Desi Ghee & Fresh Hubli Sweets</span>
            </span>
            <span>Tip: Ask for portion estimations or festive discounts!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
