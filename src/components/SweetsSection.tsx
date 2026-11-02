import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, Info, Sparkles, Filter } from 'lucide-react';
import { POPULAR_SWEETS } from '../data/sweetData';
import { SweetItem } from '../types';

interface SweetsSectionProps {
  onAddToCart: (sweet: SweetItem, weightOption: '250g' | '500g' | '1kg', calculatedPrice: number) => void;
  onSelectSweetForDetails: (sweet: SweetItem) => void;
}

export const SweetsSection: React.FC<SweetsSectionProps> = ({
  onAddToCart,
  onSelectSweetForDetails,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedWeights, setSelectedWeights] = useState<Record<string, '250g' | '500g' | '1kg'>>({});
  const [addedAnimationIds, setAddedAnimationIds] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Speciality', 'Premium Sweet', 'Traditional', 'South Indian', 'Bengali Sweet', 'Milk Sweet', 'Fresh Sweet', 'Barfi'];

  const filteredSweets = useMemo(() => {
    return POPULAR_SWEETS.filter((sweet) => {
      const matchesCategory = selectedCategory === 'All' || sweet.category === selectedCategory;
      const matchesSearch =
        sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sweet.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sweet.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getWeightForSweet = (sweetId: string): '250g' | '500g' | '1kg' => {
    return selectedWeights[sweetId] || '500g'; // default to 500g
  };

  const handleWeightChange = (sweetId: string, weight: '250g' | '500g' | '1kg') => {
    setSelectedWeights((prev) => ({ ...prev, [sweetId]: weight }));
  };

  const calculatePrice = (pricePerKg: number, weight: '250g' | '500g' | '1kg'): number => {
    switch (weight) {
      case '250g':
        return Math.round(pricePerKg * 0.25);
      case '500g':
        return Math.round(pricePerKg * 0.5);
      case '1kg':
      default:
        return pricePerKg;
    }
  };

  const handleAddSweet = (sweet: SweetItem) => {
    const weight = getWeightForSweet(sweet.id);
    const price = calculatePrice(sweet.pricePerKg, weight);
    onAddToCart(sweet, weight, price);

    setAddedAnimationIds((prev) => ({ ...prev, [sweet.id]: true }));
    setTimeout(() => {
      setAddedAnimationIds((prev) => ({ ...prev, [sweet.id]: false }));
    }, 1200);
  };

  return (
    <section id="sweets" className="py-16 sm:py-20 bg-[#F4F7FB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-[#0B2545] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Handcrafted Daily in Hubli</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#0B2545] tracking-tight">
            Our Signature Sweets
          </h2>
          <p className="mt-3 text-base text-slate-600 font-outfit">
            Freshly prepared with pure cow desi ghee, authentic heritage methods, and premium dry fruits.
            Available by 250g, 500g, or 1kg with vacuum-sealed packaging.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 pb-6 border-b border-slate-200">
          {/* Category Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-[#133E87] shrink-0 mr-1 hidden sm:inline" />
            {categories.map((cat) => (
              <button
                key={cat}
                id={`cat-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0B2545] text-white shadow-md shadow-blue-900/20 scale-105'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-blue-50 hover:text-[#0B2545]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#133E87] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="sweet-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sweets (e.g. Kaju, Mysore Pak)..."
              className="w-full pl-9 pr-4 py-2 bg-white text-sm text-[#0B2545] placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#133E87]/40 focus:border-[#133E87] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#133E87] font-bold hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Sweets Grid */}
        {filteredSweets.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 max-w-md mx-auto p-6">
            <p className="text-lg font-semibold text-[#0B2545]">No sweets found</p>
            <p className="text-sm text-slate-500 mt-1">
              Try searching for another sweet or reset the category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold rounded-lg bg-[#0B2545] text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSweets.map((sweet) => {
              const currentWeight = getWeightForSweet(sweet.id);
              const currentPrice = calculatePrice(sweet.pricePerKg, currentWeight);
              const isAdded = addedAnimationIds[sweet.id];

              return (
                <div
                  key={sweet.id}
                  id={`sweet-card-${sweet.id}`}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-[#133E87] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group relative"
                >
                  {/* Card Image with Badges */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                    <img
                      src={sweet.image}
                      alt={`${sweet.name} sweet from SweetWhisk Bakery Hubli`}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

                    {/* Category Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-xs text-[#0B2545] border border-blue-200 shadow-xs">
                        {sweet.category}
                      </span>
                    </div>

                    {/* Speciality Badge if applicable */}
                    {sweet.badge && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#133E87] text-white shadow-xs border border-blue-300/40">
                          {sweet.badge}
                        </span>
                      </div>
                    )}

                    {/* Quick Info Button */}
                    <button
                      onClick={() => onSelectSweetForDetails(sweet)}
                      className="absolute bottom-3 right-3 p-1.5 rounded-full bg-white/95 hover:bg-white text-[#0B2545] shadow-md transition-colors"
                      title="View Details & Ingredients"
                      aria-label={`View details for ${sweet.name}`}
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-lg font-cinzel font-bold text-[#0B2545] group-hover:text-[#133E87] transition-colors">
                          {sweet.name}
                        </h3>
                        <span className="text-xs font-semibold text-[#133E87]">
                          ₹{sweet.pricePerKg}/kg
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {sweet.description}
                      </p>
                    </div>

                    {/* Weight Selector & Price */}
                    <div className="pt-2 border-t border-slate-100 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span className="font-medium">Select Quantity:</span>
                        <span className="font-semibold text-[#133E87]">
                          {currentWeight} • ₹{currentPrice}
                        </span>
                      </div>

                      {/* Weight Buttons */}
                      <div className="grid grid-cols-3 gap-1.5">
                        {(['250g', '500g', '1kg'] as const).map((w) => (
                          <button
                            key={w}
                            type="button"
                            onClick={() => handleWeightChange(sweet.id, w)}
                            className={`py-1 text-xs rounded-lg font-medium transition-colors border ${
                              currentWeight === w
                                ? 'bg-[#0B2545] text-white border-[#0B2545] font-bold shadow-xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50'
                            }`}
                          >
                            {w}
                          </button>
                        ))}
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        id={`add-to-cart-${sweet.id}`}
                        onClick={() => handleAddSweet(sweet)}
                        className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all duration-200 ${
                          isAdded
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-gradient-to-r from-[#0B2545] via-[#133E87] to-[#1E3A8A] hover:from-[#091E38] hover:to-[#17306D] text-white shadow-xs hover:shadow-md active:scale-98 border border-[#D4AF37]/50'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added ({currentWeight})</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 text-[#F3E5AB]" />
                            <span>Add to Order (₹{currentPrice})</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
