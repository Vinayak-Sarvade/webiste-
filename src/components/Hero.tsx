import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Award, Gift, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/sweetData';

interface HeroProps {
  onExploreSweets: () => void;
  onExploreGifts: () => void;
  onViewOffers: () => void;
  onOpenAIGuide?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreSweets,
  onExploreGifts,
  onViewOffers,
  onOpenAIGuide,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F0F5FA] to-[#E4EDF8] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-blue-100">
      {/* Decorative Royal Blue & Gold Pattern Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#133E87]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Typography, Tagline & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Heritage Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0B2545] shadow-xs">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-semibold tracking-wide uppercase">
                Traditional Indian Sweets & Bakery • Hubli, Karnataka
              </span>
            </div>

            {/* Main Headline with Tagline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-cinzel font-bold text-[#0B2545] tracking-tight leading-[1.15]">
                {BUSINESS_INFO.tagline.replace(/[“”"]/g, '')}
              </h1>
              <p className="text-xl sm:text-2xl font-playfair italic text-[#133E87] font-medium">
                Artisanal Mithai & Celebrations in Old Hubli by {BUSINESS_INFO.ownerName}
              </p>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-outfit">
              Combining time-honored traditional recipes with elegant modern packaging. From authentic
              local pride <strong>Dharwad Peda</strong> and fragrant <strong>Mysore Pak</strong> to melt-in-mouth
              <strong> Kaju Katli</strong> and festive gift hampers—every batch is prepared fresh with pure desi ghee.
            </p>

            {/* Value Highlights Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center space-x-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#133E87] shrink-0" />
                <span>100% Pure Desi Ghee</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#133E87] shrink-0" />
                <span>Fresh Daily Batches</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#133E87] shrink-0" />
                <span>Zero Artificial Additives</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#133E87] shrink-0" />
                <span>Festival & Bulk Orders</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#133E87] shrink-0" />
                <span>Free Delivery &gt; ₹1,000</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#133E87] shrink-0" />
                <span>Hubli Doorstep Drop</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="hero-order-now-btn"
                onClick={onExploreSweets}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#0B2545] via-[#133E87] to-[#1E3A8A] hover:from-[#091E38] hover:to-[#17306D] text-white font-bold text-base shadow-lg shadow-blue-950/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-2 border border-[#D4AF37]/50"
              >
                <span>Order Now Online</span>
                <ArrowRight className="w-5 h-5 text-[#F3E5AB]" />
              </button>

              <button
                id="hero-gift-boxes-btn"
                onClick={onExploreGifts}
                className="px-6 py-3.5 rounded-xl bg-white text-[#0B2545] font-semibold text-base border-2 border-blue-200 hover:bg-blue-50/70 hover:border-blue-400 shadow-xs hover:shadow transition-all flex items-center space-x-2"
              >
                <Gift className="w-5 h-5 text-[#133E87]" />
                <span>View Gift Boxes</span>
              </button>

              {onOpenAIGuide && (
                <button
                  id="hero-ai-guide-btn"
                  onClick={onOpenAIGuide}
                  className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100 text-[#0B2545] font-bold text-sm border-2 border-[#D4AF37] hover:bg-amber-100/90 shadow-xs hover:shadow transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>✨ Ask AI Guide</span>
                </button>
              )}

              <button
                id="hero-offers-btn"
                onClick={onViewOffers}
                className="px-4 py-3.5 text-sm font-semibold text-[#133E87] hover:text-[#0B2545] hover:underline flex items-center space-x-1"
              >
                <span>15% Off Festival Offers</span>
                <span>→</span>
              </button>
            </div>

            {/* Social Proof Trust Bar */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-6 text-xs text-slate-600">
              <div className="flex items-center space-x-2">
                <div className="flex text-amber-500 text-sm">
                  {'★'.repeat(5)}
                </div>
                <span className="font-semibold text-slate-800">4.9 / 5.0 Rating</span>
                <span className="text-slate-500">(Prem, Kiran, Sandeep & hundreds of Hubli families)</span>
              </div>
              <div className="flex items-center space-x-1.5 font-medium text-slate-700">
                <ShieldCheck className="w-4 h-4 text-[#133E87]" />
                <span>Hygienic FSSAI Standard Kitchen</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Gold Ornamental Outer Ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#0B2545] via-[#1E3A8A] to-[#D4AF37] p-[2px] shadow-2xl rotate-1">
                <div className="w-full h-full bg-white rounded-[22px]" />
              </div>

              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={BUSINESS_INFO.assets.hero}
                  alt="SweetWhisk Bakery royal traditional Indian sweets platter with Kaju Katli and Mysore Pak"
                  className="w-full h-[400px] sm:h-[460px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Floating Sweet Speciality Tag */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-blue-200 shadow-md flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-[#0B2545] uppercase tracking-wide">
                    Fresh Batches Ready Today
                  </span>
                </div>

                {/* Bottom Overlay Info Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-blue-200 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#133E87] font-bold uppercase tracking-wider">
                        Regional Speciality
                      </p>
                      <h4 className="text-base font-cinzel font-bold text-[#0B2545]">
                        Famous Dharwad Peda & Mysore Pak
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Pure caramelized milk khoya & aromatic cow ghee
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">Starting at</span>
                      <span className="text-lg font-bold text-[#133E87]">₹400/kg</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Mini Decorative Badge */}
              <div className="absolute -bottom-6 -left-6 bg-[#0B2545] text-white p-3.5 rounded-2xl shadow-xl border border-[#D4AF37] hidden sm:flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#133E87] flex items-center justify-center text-[#F3E5AB]">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB]">
                    Hubli Established 2026
                  </div>
                  <div className="text-sm font-semibold">
                    Sweet Traditions, Made Fresh.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
