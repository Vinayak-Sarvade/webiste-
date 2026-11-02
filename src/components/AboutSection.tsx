import React from 'react';
import { Award, Heart, CheckCircle2, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/sweetData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-[#F4F7FB] relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story Images & Hubli Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image: Storefront & Sweet Craft */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={BUSINESS_INFO.assets.bakeryStore}
                  alt="SweetWhisk Bakery boutique and sweet counter in Hubli"
                  className="w-full h-80 sm:h-96 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlapping Secondary Image */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 w-48 sm:w-60 rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden sm:block">
                <img
                  src={BUSINESS_INFO.assets.speciality}
                  alt="Traditional Dharwad Peda and pure ghee Mysore Pak"
                  className="w-full h-36 sm:h-44 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Experience Emblem */}
              <div className="absolute -top-4 -left-4 bg-[#0B2545] text-white p-4 rounded-2xl shadow-xl border border-[#D4AF37] flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#133E87] flex items-center justify-center text-[#F3E5AB]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#F3E5AB] uppercase tracking-wider">
                    Authentic Hubli Craft
                  </p>
                  <p className="text-sm font-cinzel font-bold">
                    Est. {BUSINESS_INFO.established}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: About Narrative & Values */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0B2545] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>About SweetWhisk Bakery</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#0B2545] tracking-tight leading-snug">
              Sweet Traditions, Made Fresh In Old Hubli
            </h2>

            <p className="text-base text-slate-700 font-outfit leading-relaxed">
              Founded by <strong>{BUSINESS_INFO.ownerName}</strong> in 2026, <strong>SweetWhisk Bakery</strong> was
              born out of a passion for preserving India’s culinary heritage while elevating the sweet gifting experience.
              Located at Iswar Nagar in Old Hubli, we offer freshly prepared traditional sweets, savoury snacks, celebration cakes,
              and luxurious festive gift boxes.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              We bridge classic family recipes with refined, airtight food packaging. Whether you are welcoming guests for
              Diwali, celebrating a wedding in Karnataka, or craving authentic local <strong>Dharwad Peda</strong> and golden
              <strong> Mysore Pak</strong> on an ordinary Sunday afternoon, every batch leaving our kitchen reflects uncompromising
              freshness and pure cow ghee indulgence.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                <div className="flex items-center space-x-2 text-[#133E87]">
                  <ShieldCheck className="w-5 h-5" />
                  <h4 className="font-cinzel text-sm font-bold text-[#0B2545]">
                    Purity First Promise
                  </h4>
                </div>
                <p className="text-xs text-slate-500">
                  100% genuine desi ghee, fresh local milk solids, and zero chemical essences.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                <div className="flex items-center space-x-2 text-[#133E87]">
                  <Heart className="w-5 h-5" />
                  <h4 className="font-cinzel text-sm font-bold text-[#0B2545]">
                    Custom Packaging
                  </h4>
                </div>
                <p className="text-xs text-slate-500">
                  Airtight food-grade trays, gold foil boxes, and handwritten cards for meaningful gifts.
                </p>
              </div>
            </div>

            {/* Location highlight */}
            <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-blue-50/60 text-xs text-slate-700 border border-blue-100">
              <MapPin className="w-5 h-5 text-[#133E87] shrink-0" />
              <span>
                Proudly rooted at <strong>514, Iswar Nagar old hubli, Hubli, Karnataka – 560024</strong>.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
