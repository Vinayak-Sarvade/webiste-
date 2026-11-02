import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, Sparkles, Tag, Check, Truck, Gift } from 'lucide-react';
import { CartItem } from '../types';
import { BUSINESS_INFO } from '../data/sweetData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  appliedCoupon: string;
  onApplyCoupon: (code: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
}) => {
  const [couponInput, setCouponInput] = useState(appliedCoupon || '');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // 15% festival coupon calculation
  const discountRate = appliedCoupon.toUpperCase() === 'FESTIVE15' ? 0.15 : 0;
  const discountAmount = Math.round(subtotal * discountRate);

  // Free delivery threshold ₹1,000
  const isFreeDelivery = subtotal >= 1000;
  const deliveryFee = subtotal === 0 || isFreeDelivery ? 0 : 50;

  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);
  const qualifiesForFreeBirthdayBox = subtotal >= 2000;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    if (couponInput.trim().toUpperCase() === 'FESTIVE15') {
      onApplyCoupon('FESTIVE15');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon. Try "FESTIVE15" for 15% OFF!');
    }
  };

  const handleWhatsAppDirect = () => {
    if (cart.length === 0) return;

    const itemsSummary = cart
      .map(
        (it) =>
          `• ${it.name} (${it.categoryOrWeight}) x ${it.quantity} = ₹${
            it.unitPrice * it.quantity
          }`
      )
      .join('\n');

    let promoNote = '';
    if (discountAmount > 0) {
      promoNote += `\n*Festive Coupon (15% OFF)*: -₹${discountAmount}`;
    }
    if (qualifiesForFreeBirthdayBox) {
      promoNote += `\n*Complimentary*: 🎂 Free 250g Sweets Box (Orders > ₹2,000)`;
    }

    const text = encodeURIComponent(
      `🙏 *New Order from SweetWhisk Bakery Website*\n` +
      `-----------------------------------------\n` +
      `*Order Details:*\n${itemsSummary}\n` +
      `-----------------------------------------\n` +
      `*Subtotal*: ₹${subtotal}${promoNote}\n` +
      `*Delivery in Hubli*: ${isFreeDelivery ? 'FREE (Above ₹1,000)' : '₹50'}\n` +
      `*Estimated Total*: ₹${finalTotal}\n\n` +
      `Please confirm sweet availability and delivery time slot in Hubli. Thank you, Vinayak!`
    );

    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-blue-300">
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0B2545] text-white flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-lg font-bold text-[#0B2545]">
                  Your Sweet Box Cart
                </h3>
                <p className="text-[11px] text-slate-500">
                  {cart.length} unique item{cart.length === 1 ? '' : 's'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Free Delivery Bar inside Drawer */}
            <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100 text-xs">
              {isFreeDelivery ? (
                <div className="flex items-center space-x-2 text-emerald-800 font-semibold">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>🎉 Free Doorstep Delivery Unlocked!</span>
                </div>
              ) : (
                <div className="space-y-1 text-slate-600">
                  <div className="flex justify-between font-semibold">
                    <span>Add ₹{1000 - subtotal} more for Free Delivery</span>
                    <span>₹{subtotal}/₹1,000</span>
                  </div>
                  <div className="w-full bg-blue-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#133E87] h-full"
                      style={{ width: `${Math.min(100, (subtotal / 1000) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Birthday Sweet Bonus Alert if >= ₹2,000 */}
            {qualifiesForFreeBirthdayBox && (
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-xs text-[#0B2545] flex items-center space-x-2">
                <Gift className="w-4 h-4 text-[#133E87] shrink-0" />
                <span>
                  <strong>Celebration Perk:</strong> Free 250g box of sweets included with this order!
                </span>
              </div>
            )}

            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0B2545] mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <h4 className="font-cinzel text-lg font-bold text-[#0B2545]">
                  Your cart is empty
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Add fresh Kaju Katli, authentic Dharwad Peda, Mysore Pak, or celebration gift boxes to get started.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#133E87] text-white text-xs font-bold shadow-md transition-colors inline-block"
                >
                  Explore Sweets Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 p-3 rounded-2xl bg-slate-50 border border-slate-200"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-cinzel font-bold text-[#0B2545] truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-500">
                        {item.categoryOrWeight} • ₹{item.unitPrice} each
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-1 bg-white border border-slate-200 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-slate-100 rounded text-slate-700"
                            title="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-2 text-[#0B2545]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-slate-100 rounded text-slate-700"
                            title="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-[#133E87]">
                          ₹{item.unitPrice * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={onClearCart}
                  className="text-xs text-[#133E87] hover:underline font-semibold block ml-auto pt-1"
                >
                  Clear All Items
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer & Checkout Controls */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
              {/* Coupon Code Input */}
              <form onSubmit={handleApply} className="space-y-1">
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#133E87] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value.toUpperCase());
                        setCouponError('');
                      }}
                      placeholder="Enter FESTIVE15"
                      className="w-full pl-8 pr-3 py-1.5 text-xs uppercase font-mono rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#133E87]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-[#0B2545] hover:bg-[#133E87] text-white text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="flex items-center justify-between text-[11px] text-emerald-700 font-semibold px-1">
                    <span>Coupon '{appliedCoupon}' active (15% OFF)</span>
                    <button
                      type="button"
                      onClick={() => onApplyCoupon('')}
                      className="text-red-700 underline text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 px-1">{couponError}</p>
                )}
              </form>

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <div className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span className="font-semibold text-[#0B2545]">₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Festival Discount (15%):</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Hubli Delivery:</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-cinzel font-bold text-[#0B2545] pt-2 border-t border-slate-200">
                  <span>Total Amount:</span>
                  <span className="text-[#133E87] text-lg">₹{finalTotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  id="drawer-proceed-checkout-btn"
                  onClick={onProceedToCheckout}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0B2545] via-[#133E87] to-[#1E3A8A] hover:from-[#091E38] hover:to-[#17306D] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 border border-[#D4AF37]/50"
                >
                  <span>Proceed to Online Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="drawer-whatsapp-order-btn"
                  onClick={handleWhatsAppDirect}
                  className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BE5B] text-white font-bold text-xs shadow-xs flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Directly via WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
