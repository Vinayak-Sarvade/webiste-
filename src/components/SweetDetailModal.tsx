import React from 'react';
import { X, Check, ShieldCheck, Clock, Sparkles, Plus } from 'lucide-react';
import { SweetItem } from '../types';

interface SweetDetailModalProps {
  sweet: SweetItem | null;
  onClose: () => void;
  onAddToCart: (sweet: SweetItem, weight: '250g' | '500g' | '1kg', price: number) => void;
}

export const SweetDetailModal: React.FC<SweetDetailModalProps> = ({
  sweet,
  onClose,
  onAddToCart,
}) => {
  if (!sweet) return null;

  const weights: Array<'250g' | '500g' | '1kg'> = ['250g', '500g', '1kg'];
  const [selectedWeight, setSelectedWeight] = React.useState<'250g' | '500g' | '1kg'>('500g');
  const [added, setAdded] = React.useState(false);

  const calculatePrice = (weight: '250g' | '500g' | '1kg') => {
    switch (weight) {
      case '250g': return Math.round(sweet.pricePerKg * 0.25);
      case '500g': return Math.round(sweet.pricePerKg * 0.5);
      case '1kg': default: return sweet.pricePerKg;
    }
  };

  const handleAdd = () => {
    onAddToCart(sweet, selectedWeight, calculatePrice(selectedWeight));
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-blue-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 transition-colors shadow-xs"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-100">
          <img
            src={sweet.image}
            alt={sweet.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-4 left-4 text-white">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#0B2545] text-blue-100 border border-[#D4AF37]/50">
              {sweet.category}
            </span>
            <h3 className="text-2xl font-cinzel font-bold mt-1 text-white">
              {sweet.name}
            </h3>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-6 space-y-5">
          <p className="text-sm text-slate-600 leading-relaxed">
            {sweet.description}
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#133E87]" />
              <div>
                <span className="block font-bold text-[#0B2545]">Shelf Life</span>
                <span className="text-slate-600">{sweet.shelfLife}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#133E87]" />
              <div>
                <span className="block font-bold text-[#0B2545]">Quality Assured</span>
                <span className="text-slate-600">100% Pure Desi Ghee</span>
              </div>
            </div>
          </div>

          {/* Ingredients list */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2545] mb-2 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Pure Authentic Ingredients</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {sweet.ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-blue-50/80 text-xs font-medium text-slate-700 border border-blue-200/60"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Weight Selection & Add */}
          <div className="pt-3 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase">Select Quantity:</span>
              <span className="text-sm font-bold text-[#133E87]">
                ₹{calculatePrice(selectedWeight)} ({selectedWeight})
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {weights.map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setSelectedWeight(w)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    selectedWeight === w
                      ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {w} • ₹{calculatePrice(w)}
                </button>
              ))}
            </div>

            <button
              onClick={handleAdd}
              className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-md ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-[#0B2545] via-[#133E87] to-[#1E3A8A] hover:from-[#091E38] hover:to-[#17306D] text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-[#D4AF37]" />
                  <span>Add {selectedWeight} to Cart (₹{calculatePrice(selectedWeight)})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
