/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SweetsSection } from './components/SweetsSection';
import { GiftBoxesSection } from './components/GiftBoxesSection';
import { FestivalOffersSection } from './components/FestivalOffersSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SweetDetailModal } from './components/SweetDetailModal';
import { LoginPage } from './components/LoginPage';
import { AIGuideModal } from './components/AIGuideModal';
import { CartItem, SweetItem, GiftBox, UserProfile } from './types';
import { BUSINESS_INFO } from './data/sweetData';
import { ShoppingBag, MessageCircle, ArrowUp, Sparkles } from 'lucide-react';

export default function App() {
  // User Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('sweetwhisk_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }
    return null;
  });

  // Login page displayed at first unless already logged in
  const [showLoginPage, setShowLoginPage] = useState<boolean>(() => {
    const savedUser = localStorage.getItem('sweetwhisk_user');
    const guestBrowsing = sessionStorage.getItem('sweetwhisk_guest_browsing');
    if (savedUser || guestBrowsing === 'true') {
      return false;
    }
    return true;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sweetwhisk_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAIGuideOpen, setIsAIGuideOpen] = useState(false);
  const [selectedSweetForDetails, setSelectedSweetForDetails] = useState<SweetItem | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [prefilledInquiry, setPrefilledInquiry] = useState<string>('General Inquiry');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('sweetwhisk_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
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

  // Add Sweet Item to Cart
  const handleAddToCart = (sweet: SweetItem, weightOption: '250g' | '500g' | '1kg', price: number) => {
    const itemKey = `${sweet.id}-${weightOption}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemKey);
      if (existing) {
        return prev.map((i) =>
          i.id === itemKey ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          itemId: sweet.id,
          name: sweet.name,
          type: 'sweet',
          weightOption,
          unitPrice: price,
          quantity: 1,
          image: sweet.image,
          categoryOrWeight: `${weightOption} • ${sweet.category}`,
        },
      ];
    });
    showToast(`Added ${sweet.name} (${weightOption}) to cart!`);
  };

  // Add Gift Box to Cart
  const handleAddGiftBox = (box: GiftBox) => {
    const itemKey = `box-${box.id}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemKey);
      if (existing) {
        return prev.map((i) =>
          i.id === itemKey ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          itemId: box.id,
          name: box.name,
          type: 'gift_box',
          unitPrice: box.price,
          quantity: 1,
          image: box.image,
          categoryOrWeight: box.weight,
        },
      ];
    });
    showToast(`Added ${box.name} to cart!`);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleApplyCoupon = (code: string) => {
    setAppliedCoupon(code);
    if (code) {
      showToast(`Coupon ${code} applied! 15% discount active.`);
    }
  };

  const handleOpenBulkInquiry = () => {
    setPrefilledInquiry('Wedding Bulk Orders');
    scrollToSection('contact');
  };

  const handleOrderDiwaliCombo = () => {
    scrollToSection('gift-boxes');
  };

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('sweetwhisk_user', JSON.stringify(user));
    sessionStorage.setItem('sweetwhisk_guest_browsing', 'true');
    setShowLoginPage(false);
    showToast(`Welcome, ${user.name}! Enjoy fresh Hubli sweets.`);
  };

  const handleContinueAsGuest = () => {
    sessionStorage.setItem('sweetwhisk_guest_browsing', 'true');
    setShowLoginPage(false);
    showToast('Browsing as Guest. You can sign in anytime from the top bar!');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('sweetwhisk_user');
    showToast('Signed out of your account.');
  };

  const handleOpenLogin = () => {
    setShowLoginPage(true);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartValue = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // If user is seeing the login screen at first
  if (showLoginPage) {
    return (
      <div className="min-h-screen bg-[#071324]">
        {toastMessage && (
          <div className="fixed top-6 right-4 z-50 bg-[#0B2545] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold border border-[#D4AF37] animate-bounce">
            {toastMessage}
          </div>
        )}
        <LoginPage
          onLogin={handleLogin}
          onContinueAsGuest={handleContinueAsGuest}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FB] text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#0B2545] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold border border-[#D4AF37] animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currentUser={currentUser}
        onOpenLogin={handleOpenLogin}
        onLogout={handleLogout}
        onOpenAIGuide={() => setIsAIGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <Hero
          onExploreSweets={() => scrollToSection('sweets')}
          onExploreGifts={() => scrollToSection('gift-boxes')}
          onViewOffers={() => scrollToSection('specials')}
          onOpenAIGuide={() => setIsAIGuideOpen(true)}
        />

        <SweetsSection
          onAddToCart={handleAddToCart}
          onSelectSweetForDetails={(sweet) => setSelectedSweetForDetails(sweet)}
        />

        <GiftBoxesSection
          onAddGiftBoxToCart={handleAddGiftBox}
          onOpenBulkInquiry={handleOpenBulkInquiry}
        />

        <FestivalOffersSection
          cartTotal={totalCartValue}
          onApplyCoupon={handleApplyCoupon}
          onOrderDiwaliCombo={handleOrderDiwaliCombo}
          onOpenBulkInquiry={handleOpenBulkInquiry}
        />

        <GallerySection />

        <ReviewsSection />

        <AboutSection />

        <ContactSection prefilledInquiry={prefilledInquiry} />

        {/* Newsletter Signup (Just before Footer) */}
        <NewsletterSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Floating Action Button: Quick Cart Drawer Trigger (Bottom Right) */}
      {totalCartCount > 0 && (
        <button
          id="floating-cart-btn"
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#0B2545] via-[#133E87] to-[#1E3A8A] text-white px-4 py-3 rounded-full shadow-2xl flex items-center space-x-2 border-2 border-[#D4AF37] hover:scale-105 active:scale-95 transition-all"
          aria-label="Open Shopping Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#F3E5AB]" />
            <span className="absolute -top-2 -right-2.5 bg-white text-[#0B2545] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {totalCartCount}
            </span>
          </div>
          <span className="text-xs font-bold font-cinzel tracking-wider">
            ₹{totalCartValue} • Order Now
          </span>
        </button>
      )}

      {/* Floating AI Guide Action Button */}
      <button
        id="floating-ai-guide-btn"
        onClick={() => setIsAIGuideOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-6 z-40 bg-gradient-to-r from-[#071324] via-[#0B2545] to-[#133E87] text-[#F3E5AB] pl-3.5 pr-4 py-2.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-2.5 border-2 border-[#D4AF37] cursor-pointer group hover:border-amber-300"
        title="Ask SweetWhisk AI Guide"
        aria-label="Ask SweetWhisk AI Guide"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-[#0B2545] animate-pulse" />
        </div>
        <div className="text-left">
          <p className="text-[9px] uppercase font-bold tracking-wider text-[#D4AF37] leading-none">
            Sweet Sommelier
          </p>
          <p className="text-xs font-bold text-white leading-tight">
            AI Guide
          </p>
        </div>
      </button>

      {/* Floating WhatsApp Quick Action (Bottom Left) */}
      <a
        id="floating-whatsapp-btn"
        href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%20Vinayak!%20I%20am%20inquiring%20about%20sweets%20from%20SweetWhisk%20Bakery,%20Hubli.`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-[#25D366] text-white p-3 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-2 border-white"
        title="Chat with Vinayak on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
      />

      {/* Checkout & Bill Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        appliedCoupon={appliedCoupon}
        onOrderCompleted={() => {
          handleClearCart();
        }}
        currentUser={currentUser}
      />

      {/* Sweet Detail Modal */}
      <SweetDetailModal
        sweet={selectedSweetForDetails}
        onClose={() => setSelectedSweetForDetails(null)}
        onAddToCart={handleAddToCart}
      />

      {/* SweetWhisk AI Guide Modal */}
      <AIGuideModal
        isOpen={isAIGuideOpen}
        onClose={() => setIsAIGuideOpen(false)}
        onAddToCart={handleAddToCart}
        onAddGiftBoxToCart={handleAddGiftBox}
        onNavigateSection={(sec) => {
          if (sec === 'cart') {
            setIsCartOpen(true);
          } else {
            scrollToSection(sec);
          }
        }}
        onApplyCoupon={handleApplyCoupon}
      />
    </div>
  );
}
