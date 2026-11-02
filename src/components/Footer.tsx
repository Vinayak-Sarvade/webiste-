import React from 'react';
import { Phone, Mail, MapPin, Clock, Heart, Sparkles, MessageCircle, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO } from '../data/sweetData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'sweets', label: 'Our Sweets Menu' },
    { id: 'gift-boxes', label: 'Gift Boxes & Hampers' },
    { id: 'specials', label: 'Festival Specials' },
    { id: 'gallery', label: 'Photo Gallery' },
    { id: 'reviews', label: 'Customer Testimonials' },
    { id: 'about', label: 'About Vinayak Sarvade' },
    { id: 'newsletter', label: 'Sweet Letter Signup' },
    { id: 'contact', label: 'Contact & Location' },
  ];

  return (
    <footer className="bg-[#061426] text-blue-100 relative border-t-2 border-[#D4AF37]/40">
      {/* Decorative Top Gold Edge */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0B2545] to-[#1E3A8A] flex items-center justify-center border border-[#D4AF37] shadow-md">
                <span className="font-cinzel text-xl font-bold text-[#F3E5AB]">SW</span>
              </div>
              <div>
                <h3 className="font-cinzel text-2xl font-bold text-white tracking-tight">
                  {BUSINESS_INFO.brandName}
                </h3>
                <p className="text-xs text-[#D4AF37] font-medium">
                  {BUSINESS_INFO.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-outfit leading-relaxed">
              Traditional Indian sweets, snacks, cakes, and festive gift boxes prepared fresh daily
              by {BUSINESS_INFO.ownerName} in Old Hubli. Authentic regional recipes crafted with pure cow ghee.
            </p>

            <div className="flex items-center space-x-2 text-xs text-[#E5BF80] pt-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Hubli Heritage • Established {BUSINESS_INFO.established}</span>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%20Vinayak,%20I%20would%20like%20to%20order%20sweets!`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-md hover:bg-[#20BE5B] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Inquiry</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-base font-bold text-white uppercase tracking-wider border-b border-blue-900/60 pb-2">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-slate-300 hover:text-white hover:underline transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Sweets & Gifts */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-cinzel text-base font-bold text-white uppercase tracking-wider border-b border-blue-900/60 pb-2">
              Specialities
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>Dharwad Peda (Speciality)</li>
              <li>Pure Ghee Mysore Pak</li>
              <li>Royal Kaju Katli</li>
              <li>Motichoor Laddu</li>
              <li>Festival Gift Box (500g)</li>
              <li>Mini Sweet Box (250g)</li>
              <li>Diwali Hampers</li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-base font-bold text-white uppercase tracking-wider border-b border-blue-900/60 pb-2">
              Hubli Location
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-white">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white">
                  {BUSINESS_INFO.email}
                </a>
              </div>
              <div className="pt-2 border-t border-blue-900/60 space-y-1">
                <div className="flex items-center space-x-1.5 text-[#E5BF80] font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Timings</span>
                </div>
                <p className="text-[11px]">Mon – Sat: 9:00 AM – 10:00 PM</p>
                <p className="text-[11px]">Sunday: 9:00 AM – 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright and Back to Top */}
        <div className="mt-12 pt-6 border-t border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {BUSINESS_INFO.brandName} by {BUSINESS_INFO.ownerName}. All Rights Reserved. Hubli, Karnataka.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 text-[#E5BF80] hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Elegant "Thank you" closing signature in stylish script font */}
        <div className="mt-8 pt-8 border-t border-blue-900/40 text-center space-y-2">
          <div className="flex items-center justify-center space-x-4">
            <span className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
            <span className="font-script text-4xl sm:text-5xl md:text-6xl text-[#D4AF37] tracking-wider drop-shadow-sm select-none">
              Thank you
            </span>
            <span className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>
          <p className="text-[12px] sm:text-xs text-blue-200/80 font-outfit tracking-wide">
            for celebrating life's sweetest moments with SweetWhisk & Vinayak Sarvade
          </p>
        </div>
      </div>
    </footer>
  );
};
