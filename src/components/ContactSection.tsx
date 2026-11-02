import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/sweetData';

interface ContactSectionProps {
  prefilledInquiry?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledInquiry }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState(prefilledInquiry || 'General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Vinayak! I am interested in sweets and gift boxes from SweetWhisk Bakery, Hubli.`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-[#0B2545] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>We’d Love to Hear from You</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#0B2545] tracking-tight">
            Visit Us or Get in Touch
          </h2>
          <p className="mt-3 text-base text-slate-600 font-outfit">
            Have questions regarding festival hampers, wedding bulk pricing, or custom sweets?
            Reach out directly or drop by our Old Hubli kitchen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards & Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Cards */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
              <h3 className="font-cinzel text-lg font-bold text-[#0B2545] border-b border-slate-200 pb-3">
                Bakery Information
              </h3>

              {/* Phone & WhatsApp */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B2545] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold text-slate-400 uppercase block">
                    Phone & WhatsApp
                  </span>
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="text-base font-bold text-[#0B2545] hover:text-[#133E87] transition-colors"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                  <div className="mt-1">
                    <button
                      type="button"
                      onClick={openWhatsApp}
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Chat on WhatsApp directly</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B2545] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase block">
                    Email Orders
                  </span>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-sm font-semibold text-[#0B2545] hover:text-[#133E87] transition-colors"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              {/* Physical Location */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B2545] text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase block">
                    Shop Address
                  </span>
                  <p className="text-sm font-medium text-[#0B2545] leading-relaxed">
                    {BUSINESS_INFO.address}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Landmark: Old Hubli near Iswar Nagar
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="pt-2 border-t border-slate-200">
                <div className="flex items-center space-x-2 text-[#133E87] mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Opening Hours
                  </span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday – Saturday:</span>
                    <span className="font-bold text-[#133E87]">9:00 AM – 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday:</span>
                    <span className="font-bold text-[#133E87]">9:00 AM – 11:00 PM</span>
                  </div>
                  <div className="pt-1 text-[11px] text-slate-400 text-center italic">
                    Fresh morning batches ready by 9:30 AM daily
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry / Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <h3 className="font-cinzel text-xl font-bold text-[#0B2545] mb-1">
                Send an Inquiry or Bulk Booking
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill this form for wedding boxes, corporate gifts, festival pre-bookings, or customized orders.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-3 bg-white rounded-2xl border border-emerald-300 p-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-cinzel text-lg font-bold text-[#0B2545]">
                    Inquiry Received, {name}!
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Vinayak Sarvade or the SweetWhisk Hubli team will contact you shortly at <strong>{phone}</strong> with details and pricing.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Vinayak, Rajesh, Pooja"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#133E87]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#133E87]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#133E87]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Purpose / Inquiry Type
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#133E87]"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Wedding Bulk Orders">Wedding Bulk Orders (Special Pricing)</option>
                        <option value="Festival Gift Boxes">Festival Gift Boxes (Diwali/Ugadi)</option>
                        <option value="Corporate Hampers">Corporate Hampers</option>
                        <option value="Birthday Celebration">Birthday Celebration (Free 250g Sweet)</option>
                        <option value="Custom Speciality Sweets">Custom Dharwad Peda / Mysore Pak</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Event Date & Details / Estimated Quantity
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please mention dates, approximate boxes or kg required, delivery location in Hubli..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#133E87]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0B2545] via-[#133E87] to-[#1E3A8A] hover:from-[#091E38] hover:to-[#17306D] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 active:scale-98 border border-[#D4AF37]/50"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry for Vinayak & Team</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
