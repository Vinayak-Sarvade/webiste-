import React, { useState, useEffect } from 'react';
import { ShoppingBag, Phone, Clock, MapPin, Menu, X, Sparkles, Percent, User, LogOut, ChevronDown } from 'lucide-react';
import { BUSINESS_INFO } from '../data/sweetData';
import { CartItem, UserProfile } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onApplyFestivalCoupon?: () => void;
  currentUser: UserProfile | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  onOpenAIGuide?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  activeSection,
  setActiveSection,
  currentUser,
  onOpenLogin,
  onLogout,
  onOpenAIGuide,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartValue = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'sweets', label: 'Our Sweets' },
    { id: 'gift-boxes', label: 'Gift Boxes' },
    { id: 'specials', label: 'Festival Specials' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Notification Announcement Bar */}
      <div className="bg-[#0B1A30] text-[#F3E5AB] text-xs py-2 px-4 border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-[13px]">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/40">
              <Percent className="w-3 h-3 mr-1" /> Festive Offer
            </span>
            <span className="font-medium text-blue-100">
              15% OFF on Festive Sweets & Free Hubli Delivery above ₹1,000!
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-[12px] text-blue-200/90">
            <div className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Mon-Sat: 9 AM - 10 PM | Sun: 9 AM - 11 PM</span>
            </div>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center space-x-1 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-semibold">{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-blue-100'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand Identity */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-3 text-left group focus:outline-none"
              id="brand-logo-button"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B2545] via-[#133E87] to-[#1E3A8A] flex items-center justify-center shadow-md border border-[#D4AF37]/60 group-hover:scale-105 transition-transform">
                <span className="font-cinzel text-xl font-bold text-[#F3E5AB]">SW</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-tight text-[#0B2545]">
                    {BUSINESS_INFO.brandName}
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#EFF6FF] text-[#133E87] border border-blue-200 uppercase tracking-wider">
                    Hubli
                  </span>
                </div>
                <p className="text-xs text-[#64748B] font-medium tracking-wide">
                  {BUSINESS_INFO.tagline} • <span className="italic text-[#133E87] font-semibold">by {BUSINESS_INFO.ownerName}</span>
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeSection === link.id
                      ? 'text-[#133E87] bg-blue-50 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-[#0B2545] hover:bg-blue-50/60'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Actions: Direct Order Now Button & Cart */}
            <div className="flex items-center space-x-3">
              <button
                id="open-cart-button"
                onClick={onOpenCart}
                className="relative flex items-center space-x-2 px-3.5 py-2.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100/80 text-[#0B2545] font-medium text-sm transition-all shadow-xs group"
                aria-label="View Shopping Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-[#133E87] group-hover:scale-110 transition-transform" />
                  {totalCartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#1E3A8A] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-xs">
                      {totalCartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-semibold">
                  {totalCartValue > 0 ? `₹${totalCartValue}` : 'Cart'}
                </span>
              </button>

              {/* User Account / Login Button */}
              {currentUser ? (
                <div className="relative">
                  <button
                    id="user-profile-menu-button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#0B2545] text-xs font-semibold transition-all cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#133E87] text-[#F3E5AB] flex items-center justify-center text-xs font-bold font-cinzel">
                      {currentUser.name[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="hidden md:inline max-w-[100px] truncate">{currentUser.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-blue-200 p-3 z-50 animate-fadeIn"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <div className="p-2 border-b border-slate-100 mb-2">
                        <p className="text-xs font-bold text-[#0B2545] truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.email || currentUser.phone}</p>
                        {currentUser.address && (
                          <p className="text-[10px] text-[#133E87] mt-0.5 truncate flex items-center">
                            <MapPin className="w-3 h-3 mr-1 shrink-0" />
                            <span>{currentUser.address}</span>
                          </p>
                        )}
                      </div>

                      <button
                        onClick={onOpenLogin}
                        className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5 text-[#133E87]" />
                        <span>Switch User / Account</span>
                      </button>

                      <button
                        onClick={onLogout}
                        className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center space-x-2 transition-colors mt-1 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  id="navbar-login-button"
                  onClick={onOpenLogin}
                  className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/60 bg-gradient-to-r from-amber-50 to-amber-100/70 hover:from-amber-100 hover:to-amber-200 text-[#0B2545] font-semibold text-xs transition-all shadow-xs cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-[#133E87]" />
                  <span>Sign In</span>
                </button>
              )}

              {/* AI Guide Quick Trigger */}
              <button
                id="navbar-ai-guide-button"
                onClick={onOpenAIGuide}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-blue-600/10 hover:from-amber-500/25 hover:to-blue-600/20 text-[#0B2545] font-bold text-xs border border-[#D4AF37] transition-all shadow-xs cursor-pointer group"
                title="Ask SweetWhisk AI Guide for sweet recommendations, portion planning & festival gifts"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
                <span className="hidden sm:inline">AI Guide</span>
                <span className="sm:hidden">AI</span>
              </button>

              <button
                id="header-order-now-button"
                onClick={() => handleNavClick('sweets')}
                className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0B2545] via-[#133E87] to-[#1E3A8A] hover:from-[#091E38] hover:to-[#17306D] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 border border-[#D4AF37]/50"
              >
                <Sparkles className="w-4 h-4 text-[#F3E5AB]" />
                <span>Order Now</span>
              </button>


              {/* Mobile menu toggle */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-[#0B2545] hover:bg-blue-50 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-2 shadow-xl">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`mobile-nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2.5 text-left text-sm rounded-lg transition-colors ${
                    activeSection === link.id
                      ? 'text-[#133E87] bg-blue-50 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-slate-600">
              {currentUser ? (
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#0B2545]">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500">{currentUser.phone || currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="text-xs text-rose-600 hover:underline font-semibold"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl border border-[#D4AF37]/70 bg-gradient-to-r from-amber-50 to-amber-100 text-[#0B2545] font-bold text-xs flex items-center justify-center space-x-1.5"
                >
                  <User className="w-3.5 h-3.5 text-[#133E87]" />
                  <span>Sign In / Create Customer Account</span>
                </button>
              )}

              {/* Mobile AI Guide Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAIGuide?.();
                }}
                className="w-full py-2.5 px-3 rounded-xl border border-[#D4AF37] bg-gradient-to-r from-amber-100/80 via-amber-50 to-blue-50 text-[#0B2545] font-bold text-xs flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Ask SweetWhisk AI Guide (Sweet Help & Sizing)</span>
              </button>

              <div className="flex items-center space-x-2 py-1">
                <MapPin className="w-4 h-4 text-[#133E87] shrink-0" />
                <span>514, Iswar Nagar old hubli, Hubli – 560024</span>
              </div>
              <div className="flex items-center space-x-2 py-1">
                <Phone className="w-4 h-4 text-[#133E87] shrink-0" />
                <span>Call/WhatsApp: {BUSINESS_INFO.phone}</span>
              </div>

              <button
                id="mobile-order-now-banner"
                onClick={() => handleNavClick('sweets')}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#0B2545] to-[#133E87] text-white font-semibold text-center shadow-md flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#F3E5AB]" />
                <span>Browse Sweets & Order</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
