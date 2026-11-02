import React, { useState } from 'react';
import { Sparkles, Percent, HeartHandshake, Cake, Flame, Truck, Copy, Check, Calculator, ArrowRight } from 'lucide-react';
import { SPECIAL_OFFERS, BUSINESS_INFO } from '../data/sweetData';

interface FestivalOffersSectionProps {
  cartTotal: number;
  onApplyCoupon: (code: string) => void;
  onOrderDiwaliCombo: () => void;
  onOpenBulkInquiry: () => void;
}

export const FestivalOffersSection: React.FC<FestivalOffersSectionProps> = ({
  cartTotal,
  onApplyCoupon,
  onOrderDiwaliCombo,
  onOpenBulkInquiry,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Wedding bulk estimate calculator state
  const [bulkBoxes, setBulkBoxes] = useState<number>(50);
  const [boxTier, setBoxTier] = useState<'mini' | 'festival' | 'celebration'>('festival');

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onApplyCoupon(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const calculateBulkQuote = () => {
    let basePrice = 599;
    if (boxTier === 'mini') basePrice = 299;
    if (boxTier === 'celebration') basePrice = 999;

    let discountMultiplier = 0.85; // 15% off standard bulk
    if (bulkBoxes >= 100) discountMultiplier = 0.80; // 20% off for 100+
    if (bulkBoxes >= 250) discountMultiplier = 0.75; // 25% off for 250+

    const totalEstimate = Math.round(bulkBoxes * basePrice * discountMultiplier);
    const unitPrice = Math.round(basePrice * discountMultiplier);
    return { totalEstimate, unitPrice, discountPct: Math.round((1 - discountMultiplier) * 100) };
  };

  const bulkQuote = calculateBulkQuote();
  const freeDeliveryThreshold = 1000;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartTotal);
  const freeDeliveryProgress = Math.min(100, Math.round((cartTotal / freeDeliveryThreshold) * 100));

  return (
    <section id="specials" className="py-16 sm:py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-[#0B2545] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Limited Celebration Benefits</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#0B2545] tracking-tight">
            Special Offers & Festive Combos
          </h2>
          <p className="mt-3 text-base text-slate-600 font-outfit">
            Exclusive discounts and perks for Hubli festivals, weddings, birthdays, and everyday sweet lovers.
          </p>
        </div>

        {/* Free Delivery Live Progress Bar */}
        <div className="mb-10 bg-blue-50/40 border border-blue-100 rounded-2xl p-4 sm:p-5 max-w-3xl mx-auto shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-[#0B2545] text-white">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B2545]">
                  Doorstep Free Delivery in Hubli
                </h4>
                <p className="text-xs text-slate-500">
                  Qualify on all orders above ₹1,000
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              {remainingForFreeDelivery === 0 ? (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <Check className="w-3.5 h-3.5 mr-1" /> Free Delivery Unlocked!
                </span>
              ) : (
                <span className="text-xs font-semibold text-[#133E87]">
                  Add ₹{remainingForFreeDelivery} more for Free Delivery
                </span>
              )}
            </div>
          </div>

          {/* Progress track */}
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#133E87] to-[#0B2545] h-full rounded-full transition-all duration-500"
              style={{ width: `${freeDeliveryProgress}%` }}
            />
          </div>
        </div>

        {/* 5 Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Offer 1: Festival Special 15% OFF */}
          <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-6 border-2 border-blue-200 shadow-sm hover:shadow-xl transition-all relative flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#0B2545] text-white flex items-center justify-center shadow-xs">
                  <Percent className="w-5 h-5" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#0B2545] text-white">
                  15% OFF
                </span>
              </div>
              <h3 className="text-xl font-cinzel font-bold text-[#0B2545]">
                Festival Special
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Enjoy 15% instant savings on all your festive mithai pre-orders for Diwali, Ganesh Utsav, and Ugadi.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#0B2545] bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                FESTIVE15
              </span>
              <button
                id="copy-festive-code-btn"
                onClick={() => handleCopyCode('FESTIVE15')}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#0B2545] hover:bg-[#133E87] text-white text-xs font-bold transition-colors"
              >
                {copiedCode === 'FESTIVE15' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Applied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Apply Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Offer 2: Wedding Orders */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#133E87] flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#133E87]">
                  Bulk Tier Pricing
                </span>
              </div>
              <h3 className="text-xl font-cinzel font-bold text-[#0B2545]">
                Wedding Orders
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Special bulk pricing on 25+ boxes with complimentary personalized wedding invitation tags & bride/groom names.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                id="wedding-order-inquiry-btn"
                onClick={onOpenBulkInquiry}
                className="w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0B2545] text-xs font-bold transition-colors flex items-center justify-center space-x-1 border border-blue-200"
              >
                <span>Inquire Wedding Tier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Offer 3: Birthday Orders */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <Cake className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
                  Free 250g Sweets
                </span>
              </div>
              <h3 className="text-xl font-cinzel font-bold text-[#0B2545]">
                Birthday Orders
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hosting a birthday celebration? Get a complimentary 250g box of our signature Dharwad Peda or Mysore Pak on orders above ₹2,000!
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-600">
              <span>Auto-applied at checkout</span>
              <span className="text-emerald-700 font-bold">Orders &gt; ₹2,000</span>
            </div>
          </div>

          {/* Offer 4: Diwali Combo */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700">
                  From ₹499
                </span>
              </div>
              <h3 className="text-xl font-cinzel font-bold text-[#0B2545]">
                Diwali Combo
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Auspicious festive package featuring traditional terracotta diyas, roasted dry fruits, and an assortment of authentic fresh mithai.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                id="diwali-combo-order-btn"
                onClick={onOrderDiwaliCombo}
                className="w-full py-2 px-3 rounded-xl bg-[#0B2545] hover:bg-[#133E87] text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1"
              >
                <span>View Festive Boxes (From ₹299/₹599)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Offer 5: Free Delivery Across Hubli */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between lg:col-span-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800">
                  Old Hubli & Nearby
                </span>
              </div>
              <h3 className="text-xl font-cinzel font-bold text-[#0B2545]">
                Free Express Doorstep Delivery
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Zero delivery fee on all orders above ₹1,000 throughout Hubli, including Old Hubli, Vidyanagar, Gokul Road, Keshwapur, and Railway Colony. Packed safely in heat-resistant, aroma-preserving food-grade packaging.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-slate-500">
                Delivered same-day or choose your festival time slot!
              </span>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="font-bold text-[#133E87] hover:underline"
              >
                Call {BUSINESS_INFO.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Wedding & Bulk Price Calculator */}
        <div className="mt-12 bg-gradient-to-br from-blue-50/60 via-white to-slate-50 border border-blue-200 rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="flex items-center space-x-2 text-[#0B2545] mb-3">
            <Calculator className="w-5 h-5 text-[#133E87]" />
            <h3 className="font-cinzel text-xl font-bold text-[#0B2545]">
              Bulk & Wedding Order Estimator
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            Instantly estimate your budget for celebrations, weddings, or corporate distribution in Hubli:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Box Type Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                Select Gift Box Type:
              </label>
              <div className="space-y-2">
                {[
                  { id: 'mini', name: 'Mini Sweet Box (250g)', base: 299 },
                  { id: 'festival', name: 'Festival Box (500g)', base: 599 },
                  { id: 'celebration', name: 'Celebration Box (1kg)', base: 999 },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBoxTier(item.id as any)}
                    className={`w-full p-2.5 rounded-xl text-xs text-left font-medium border flex items-center justify-between transition-all ${
                      boxTier === item.id
                        ? 'bg-[#0B2545] text-white border-[#0B2545] font-bold shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50'
                    }`}
                  >
                    <span>{item.name}</span>
                    <span>₹{item.base}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Number of Boxes:
                </label>
                <span className="text-sm font-bold text-[#0B2545]">
                  {bulkBoxes} Boxes
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="5"
                value={bulkBoxes}
                onChange={(e) => setBulkBoxes(Number(e.target.value))}
                className="w-full accent-[#0B2545] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>20 (Min)</span>
                <span>100 (20% off)</span>
                <span>250+ (25% off)</span>
                <span>500</span>
              </div>
            </div>

            {/* Estimated Output */}
            <div className="bg-white p-5 rounded-2xl border-2 border-[#133E87] text-center shadow-xs">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide block">
                {bulkQuote.discountPct}% Bulk Discount Applied
              </span>
              <div className="text-2xl sm:text-3xl font-cinzel font-bold text-[#0B2545] mt-1">
                ₹{bulkQuote.totalEstimate.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                (Approx. ₹{bulkQuote.unitPrice} per box)
              </p>
              <button
                onClick={onOpenBulkInquiry}
                className="mt-3 w-full py-2 px-3 rounded-lg bg-[#0B2545] hover:bg-[#133E87] text-white text-xs font-bold transition-all shadow-xs"
              >
                Request Official Invoice / Sample Box
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
