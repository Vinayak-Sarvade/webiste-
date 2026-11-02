import React, { useState } from 'react';
import { Gift, CheckCircle, Sparkles, Plus, Check, HeartHandshake } from 'lucide-react';
import { GIFT_BOXES } from '../data/sweetData';
import { GiftBox } from '../types';

interface GiftBoxesSectionProps {
  onAddGiftBoxToCart: (box: GiftBox) => void;
  onOpenBulkInquiry: () => void;
}

export const GiftBoxesSection: React.FC<GiftBoxesSectionProps> = ({
  onAddGiftBoxToCart,
  onOpenBulkInquiry,
}) => {
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAddBox = (box: GiftBox) => {
    onAddGiftBoxToCart(box);
    setAddedIds((prev) => ({ ...prev, [box.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [box.id]: false }));
    }, 1200);
  };

  return (
    <section id="gift-boxes" className="py-16 sm:py-20 bg-gradient-to-b from-[#E4EDF8] via-white to-[#F4F7FB] relative border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-[#0B2545] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
            <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Festive & Corporate Gifting</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#0B2545] tracking-tight">
            Curated Mithai Gift Boxes
          </h2>
          <p className="mt-3 text-base text-slate-600 font-outfit">
            Designed for festivals, weddings, birthdays, and corporate celebrations. Each box brings together
            handcrafted sweets in royal embossed packaging with custom greeting notes.
          </p>
        </div>

        {/* 3 Gift Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {GIFT_BOXES.map((box) => {
            const isAdded = addedIds[box.id];
            const isPopular = box.popular;

            return (
              <div
                key={box.id}
                id={`gift-box-${box.id}`}
                className={`relative rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                  isPopular
                    ? 'bg-white border-2 border-[#133E87] shadow-xl md:-translate-y-2'
                    : 'bg-white border border-slate-200 shadow-md hover:shadow-lg'
                }`}
              >
                {/* Popularity Badge */}
                {isPopular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-[#0B2545] to-[#133E87] text-white text-[11px] font-extrabold uppercase px-4 py-1.5 rounded-bl-xl shadow-md z-10 flex items-center space-x-1 border-b border-l border-blue-300/40">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Most Loved in Hubli</span>
                  </div>
                )}

                {/* Box Image with Overlay */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={box.image}
                    alt={`${box.name} festive Indian mithai gift hamper from SweetWhisk Bakery`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Weight Tag */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-[#0B2545] border border-blue-200 shadow-xs">
                    {box.weight} • {box.varietiesCount} Varieties
                  </div>
                </div>

                {/* Box Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-xl font-cinzel font-bold text-[#0B2545]">
                          {box.name}
                        </h3>
                        <span className="text-2xl font-bold font-cinzel text-[#133E87]">
                          ₹{box.price}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {box.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2.5 pt-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#133E87]">
                        Box Includes:
                      </p>
                      <ul className="space-y-2">
                        {box.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-xs text-slate-600 leading-relaxed">
                            <CheckCircle className="w-4 h-4 text-[#133E87] shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Add Box to Cart CTA */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <button
                      id={`add-gift-box-btn-${box.id}`}
                      onClick={() => handleAddBox(box)}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all duration-200 ${
                        isAdded
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-gradient-to-r from-[#0B2545] via-[#133E87] to-[#1E3A8A] hover:from-[#091E38] hover:to-[#17306D] text-white shadow-md hover:shadow-lg active:scale-98 border border-[#D4AF37]/50'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 text-[#F3E5AB]" />
                          <span>Add to Order — ₹{box.price}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Wedding / Corporate Bulk Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#0B2545] via-[#133E87] to-[#0B2545] rounded-3xl p-6 sm:p-8 text-blue-50 shadow-xl border border-[#D4AF37]/40 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-semibold">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Custom Wedding & Corporate Hamper Specialist</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white">
                Need 50+ Custom Gift Boxes for a Wedding or Corporate Event?
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl font-outfit">
                We provide custom foil-stamped bride & groom names, company branding, personalized ribbon tags,
                and dedicated wholesale pricing with doorstep logistics across Karnataka.
              </p>
            </div>
            <button
              id="bulk-gift-inquiry-btn"
              onClick={onOpenBulkInquiry}
              className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] hover:from-[#E5BF45] hover:to-[#B68512] text-[#0B2545] font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Get Bulk Pricing Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
