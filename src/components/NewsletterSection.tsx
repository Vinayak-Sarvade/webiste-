import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2, Gift, BellRing, Copy, Check } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [preference, setPreference] = useState('All Delights');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    setErrorMessage('');
    setIsSubmitted(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('WELCOME10');
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  return (
    <section id="newsletter" className="py-16 sm:py-20 bg-gradient-to-b from-[#F4F7FB] via-white to-[#F4F7FB] relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#08182B] via-[#0B2545] to-[#133E87] border-2 border-[#D4AF37]/50 shadow-2xl p-8 sm:p-12 lg:p-14 text-white">
          {/* Subtle decorative gold background glow circles */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Tag badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-bold uppercase tracking-wider mb-5">
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>SweetWhisk Sweet Letter</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white tracking-tight leading-tight">
              Subscribe to Our Sweet Letter
            </h2>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-blue-100/90 font-outfit max-w-2xl mx-auto leading-relaxed">
              Stay ahead on festival pre-orders, exclusive discounts, and alerts whenever fresh morning batches of authentic Dharwad Peda and Mysore Pak leave our Hubli kitchen.
            </p>

            {/* Submission State */}
            {isSubmitted ? (
              <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-[#D4AF37] max-w-lg mx-auto text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-300" />
                </div>

                <div>
                  <p className="font-script text-4xl sm:text-5xl text-[#F3E5AB]">
                    Thank You!
                  </p>
                  <h4 className="font-cinzel text-lg font-bold text-white mt-1">
                    You're On the Sweet List
                  </h4>
                  <p className="text-xs text-blue-100 mt-1">
                    We've saved your email <strong className="text-white">{email}</strong>. As our welcome gesture, enjoy 10% off your next sweet box:
                  </p>
                </div>

                {/* Coupon Code Pill */}
                <div className="inline-flex items-center justify-between gap-3 bg-black/40 border border-[#D4AF37] rounded-xl px-4 py-2.5 max-w-xs mx-auto">
                  <div className="text-left">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-sans">
                      Welcome Coupon Code
                    </span>
                    <span className="font-mono text-base font-bold text-[#F3E5AB]">
                      WELCOME10
                    </span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="p-2 rounded-lg bg-[#133E87] hover:bg-blue-600 text-white transition-colors"
                    title="Copy coupon code"
                  >
                    {copiedCoupon ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setEmail('');
                      setName('');
                    }}
                    className="text-xs text-blue-200 hover:text-white underline"
                  >
                    Register another email
                  </button>
                </div>
              </div>
            ) : (
              /* Signup Form */
              <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto space-y-4">
                {/* Preference Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                  <span className="text-slate-300 text-[11px] uppercase tracking-wider font-semibold mr-1">
                    Interest:
                  </span>
                  {['All Delights', 'Pure Ghee Sweets', 'Festival Boxes', 'Celebration Cakes'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setPreference(item)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        preference === item
                          ? 'bg-[#D4AF37] text-[#08182B] font-bold shadow-xs'
                          : 'bg-white/10 text-blue-100 hover:bg-white/20 border border-white/15'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                  {/* Optional First Name */}
                  <div className="sm:col-span-4">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full h-12 px-4 rounded-xl bg-white/15 border border-white/25 placeholder:text-blue-200/60 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white/20 transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="sm:col-span-8 relative">
                    <Mail className="w-4 h-4 text-blue-200 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="Enter your email address"
                      className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/15 border border-white/25 placeholder:text-blue-200/60 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white/20 transition-all"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-300 text-left font-medium">
                    {errorMessage}
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto sm:min-w-[220px] h-12 px-8 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] hover:brightness-110 text-[#08182B] font-cinzel font-bold text-sm shadow-xl flex items-center justify-center space-x-2 mx-auto transition-transform active:scale-98 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#08182B]" />
                  <span>Subscribe to Sweet Letter</span>
                </button>
              </form>
            )}

            {/* Perks Badges */}
            <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-blue-100">
              <div className="flex items-center justify-center space-x-2">
                <Gift className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Instant 10% Welcome Coupon</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <BellRing className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Festival Pre-Booking Priority</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Zero Spam Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
