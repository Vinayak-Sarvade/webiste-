import React, { useState } from 'react';
import { Camera, Eye, X, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/sweetData';

export const GallerySection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-[#F4F7FB] relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-[#0B2545] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
            <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Visual Glimpse</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#0B2545] tracking-tight">
            The SweetWhisk Gallery
          </h2>
          <p className="mt-3 text-base text-slate-600 font-outfit">
            A celebration of colors, textures, and artisanal sweet-making artistry in Old Hubli.
          </p>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 bg-slate-100"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Category pill */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-[#0B2545] shadow-xs">
                  {item.category}
                </span>
              </div>

              {/* Hover icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>

              {/* Title and Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-cinzel text-base sm:text-lg font-bold group-hover:text-blue-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-blue-100/90 mt-1 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-blue-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 bg-white">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#133E87] uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activePhoto.category}</span>
              </div>
              <h3 className="text-xl font-cinzel font-bold text-[#0B2545] mt-1">
                {activePhoto.title}
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
