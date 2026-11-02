import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Phone, MapPin, Calendar, Clock, Printer, MessageCircle, FileText, Sparkles, ShieldCheck } from 'lucide-react';
import { CartItem, OrderDetails, UserProfile } from '../types';
import { BUSINESS_INFO } from '../data/sweetData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  appliedCoupon: string;
  onOrderCompleted: () => void;
  currentUser?: UserProfile | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  appliedCoupon,
  onOrderCompleted,
  currentUser,
}) => {
  const [formData, setFormData] = useState<OrderDetails>({
    customerName: currentUser?.name || '',
    customerPhone: currentUser?.phone || '',
    customerEmail: currentUser?.email || '',
    deliveryAddress: currentUser?.address || '',
    notes: '',
    deliveryDate: new Date().toISOString().split('T')[0],
    deliveryTimeSlot: 'Evening (4:00 PM – 8:00 PM)',
    appliedCoupon,
  });

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        customerName: prev.customerName || currentUser.name,
        customerPhone: prev.customerPhone || currentUser.phone,
        customerEmail: prev.customerEmail || currentUser.email,
        deliveryAddress: prev.deliveryAddress || currentUser.address || '',
      }));
    }
  }, [currentUser]);

  const [paymentMode, setPaymentMode] = useState<'cod' | 'upi' | 'pickup'>('upi');
  const [orderConfirmedId, setOrderConfirmedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discountRate = appliedCoupon.toUpperCase() === 'FESTIVE15' ? 0.15 : 0;
  const discountAmount = Math.round(subtotal * discountRate);
  const isFreeDelivery = subtotal >= 1000 || paymentMode === 'pickup';
  const deliveryFee = isFreeDelivery ? 0 : 50;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);
  const qualifiesForFreeBirthdayBox = subtotal >= 2000;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerPhone) return;

    const generatedId = `SW-${Date.now().toString().slice(-6)}`;
    setOrderConfirmedId(generatedId);
    onOrderCompleted();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendToWhatsApp = () => {
    const itemsList = cart
      .map(
        (it) =>
          `• ${it.name} (${it.categoryOrWeight}) x ${it.quantity} = ₹${
            it.unitPrice * it.quantity
          }`
      )
      .join('\n');

    const msg = encodeURIComponent(
      `🎉 *Order Confirmation #${orderConfirmedId}*\n` +
      `*Customer*: ${formData.customerName} (${formData.customerPhone})\n` +
      `*Delivery Address*: ${paymentMode === 'pickup' ? 'Store Pickup at Old Hubli' : formData.deliveryAddress}\n` +
      `*Slot*: ${formData.deliveryDate} [${formData.deliveryTimeSlot}]\n` +
      `*Payment*: ${paymentMode.toUpperCase()}\n` +
      `------------------------------------\n` +
      `*Ordered Sweets:*\n${itemsList}\n` +
      `------------------------------------\n` +
      `*Subtotal*: ₹${subtotal}\n` +
      (discountAmount > 0 ? `*Discount (FESTIVE15)*: -₹${discountAmount}\n` : '') +
      `*Delivery*: ${deliveryFee === 0 ? 'FREE' : '₹50'}\n` +
      (qualifiesForFreeBirthdayBox ? `*Bonus*: 🎂 Complimentary 250g Sweets Box\n` : '') +
      `*Total Amount*: ₹${finalTotal}\n\n` +
      `Thank you Vinayak! Looking forward to fresh sweets.`
    );

    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-blue-300 shadow-2xl relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#0B2545] text-white flex items-center justify-center font-cinzel font-bold text-xs">
              SW
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-[#0B2545]">
                {orderConfirmedId ? 'Order Confirmed!' : 'SweetWhisk Order Online'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {orderConfirmedId ? `Reference: #${orderConfirmedId}` : 'Hubli Express Doorstep Delivery & Store Pickup'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {orderConfirmedId ? (
            /* Order Success View & Invoice */
            <div className="space-y-6">
              <div className="text-center py-4 space-y-2 bg-blue-50/70 rounded-2xl border border-blue-200 p-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-cinzel text-2xl font-bold text-[#0B2545]">
                  Order Placed Successfully!
                </h4>
                <p className="text-xs text-slate-600">
                  Thank you, <strong>{formData.customerName}</strong>! Your order has been registered at our Hubli bakery.
                </p>
                <div className="inline-block px-3 py-1 rounded-lg bg-[#0B2545] text-white text-xs font-mono font-bold">
                  Order ID: {orderConfirmedId}
                </div>
              </div>

              {/* Printable Digital Bill Summary */}
              <div id="printable-invoice" className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs text-xs">
                <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                  <div>
                    <h5 className="font-cinzel font-bold text-sm text-[#0B2545]">
                      {BUSINESS_INFO.brandName}
                    </h5>
                    <p className="text-slate-500 text-[11px]">{BUSINESS_INFO.address}</p>
                    <p className="text-slate-500 text-[11px]">Phone: {BUSINESS_INFO.phone}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#133E87]">Date: {formData.deliveryDate}</span>
                    <p className="text-[11px] text-slate-500">Slot: {formData.deliveryTimeSlot}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  <span className="font-bold text-slate-700 uppercase text-[10px] tracking-wider block">
                    Sweets & Boxes:
                  </span>
                  {cart.map((it) => (
                    <div key={it.id} className="flex justify-between text-slate-600">
                      <span>
                        {it.name} ({it.categoryOrWeight}) x {it.quantity}
                      </span>
                      <span className="font-semibold text-[#0B2545]">
                        ₹{it.unitPrice * it.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="pt-3 border-t border-slate-200 space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-800 font-semibold">
                      <span>Festive Discount (15%):</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Charge:</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                  {qualifiesForFreeBirthdayBox && (
                    <div className="flex justify-between text-[#133E87] font-semibold">
                      <span>Birthday Perk:</span>
                      <span>Free 250g Box Added 🎁</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-cinzel font-bold text-[#0B2545] pt-2 border-t border-slate-200">
                    <span>Total Payable:</span>
                    <span className="text-[#133E87] text-base">₹{finalTotal}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-700 bg-blue-50/60 p-2.5 rounded-lg border border-blue-100">
                  <strong>Payment Mode:</strong> {paymentMode === 'upi' ? 'UPI on Delivery' : paymentMode === 'cod' ? 'Cash on Delivery' : 'Pay at Store (Pickup)'}
                  <br />
                  <strong>Deliver to:</strong> {paymentMode === 'pickup' ? 'Store Pickup at Old Hubli' : formData.deliveryAddress}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleSendToWhatsApp}
                  className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BE5B] text-white text-xs font-bold shadow-md flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order to Vinayak WhatsApp</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B2545] text-xs font-bold border border-slate-300 flex items-center justify-center space-x-2 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save Receipt</span>
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              {/* Order Summary Pill */}
              <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500">Total Sweets in Cart:</span>
                  <span className="font-bold text-[#0B2545] ml-1">{cart.length} Varieties</span>
                </div>
                <div>
                  <span className="text-slate-500">Payable:</span>
                  <span className="font-bold text-[#133E87] text-sm ml-1">₹{finalTotal}</span>
                </div>
              </div>

              {/* Delivery or Pickup Tabs */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                  Order Method:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('upi')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center space-x-1.5 transition-all ${
                      paymentMode !== 'pickup'
                        ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Doorstep Delivery (Hubli)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMode('pickup')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center space-x-1.5 transition-all ${
                      paymentMode === 'pickup'
                        ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Store Pickup (Old Hubli)</span>
                  </button>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="e.g. Kiran / Suresh"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#133E87]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#133E87]"
                  />
                </div>
              </div>

              {paymentMode !== 'pickup' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Hubli Delivery Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    placeholder="House/flat number, street name, area (e.g., Old Hubli, Vidyanagar, Keshwapur), Hubli"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#133E87]"
                  />
                </div>
              )}

              {/* Date and Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#133E87]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={formData.deliveryTimeSlot}
                    onChange={(e) => setFormData({ ...formData, deliveryTimeSlot: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#133E87]"
                  >
                    <option value="Morning (9:30 AM – 1:00 PM)">Morning (9:30 AM – 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM – 5:00 PM)">Afternoon (1:00 PM – 5:00 PM)</option>
                    <option value="Evening (5:00 PM – 9:00 PM)">Evening (5:00 PM – 9:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Gift Card Message or Special Requests (Optional)
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Write 'Happy Diwali from Sharma Family' on gift card"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#133E87]"
                />
              </div>

              {/* Payment Mode Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">
                  Select Payment Option:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'upi', label: 'UPI / GPay on Delivery' },
                    { id: 'cod', label: 'Cash on Delivery' },
                    { id: 'pickup', label: 'Pay at Hubli Store' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setPaymentMode(mode.id as any)}
                      className={`p-2.5 rounded-xl border text-center font-medium transition-all ${
                        paymentMode === mode.id
                          ? 'bg-[#0B2545] text-white border-[#0B2545] font-bold shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="place-order-button"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0B2545] via-[#133E87] to-[#1E3A8A] hover:from-[#091E38] hover:to-[#17306D] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 border border-[#D4AF37]/50"
              >
                <Sparkles className="w-4 h-4 text-[#F3E5AB]" />
                <span>Confirm & Place Order (₹{finalTotal})</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
