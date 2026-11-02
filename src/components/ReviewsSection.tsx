import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, User, Quote, X } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/sweetData';
import { CustomerReview } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem('sweetwhisk_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return CUSTOMER_REVIEWS;
      }
    }
    return CUSTOMER_REVIEWS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [sweetMentioned, setSweetMentioned] = useState('');
  const [location, setLocation] = useState('Hubli, Karnataka');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  useEffect(() => {
    localStorage.setItem('sweetwhisk_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newReview: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: author.trim().toLowerCase(),
      rating,
      comment: comment.trim(),
      sweetMentioned: sweetMentioned.trim() || undefined,
      location: location.trim() || 'Hubli, Karnataka',
      date: 'September 2026',
    };

    setReviews([newReview, ...reviews]);
    setSubmittedMessage(true);

    setTimeout(() => {
      setSubmittedMessage(false);
      setIsModalOpen(false);
      setAuthor('');
      setComment('');
      setSweetMentioned('');
    }, 1500);
  };

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-gradient-to-b from-[#F4F7FB] via-white to-blue-50/30 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-[#0B2545] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
              <span>Customer Love & Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#0B2545] tracking-tight">
              What Hubli Is Saying
            </h2>
            <p className="mt-2 text-base text-slate-600 font-outfit">
              Genuine reviews from our patrons celebrating traditional flavors and fresh celebrations.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-xs text-right">
              <div className="flex items-center justify-end text-amber-500 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#0B2545]">4.9 / 5.0 Average Rating</span>
            </div>

            <button
              id="write-review-btn"
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#133E87] text-white font-bold text-xs shadow-md flex items-center space-x-2 transition-transform active:scale-95"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                {/* Rating & Quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-blue-200 group-hover:text-[#133E87] transition-colors" />
                </div>

                {/* Comment */}
                <p className="text-sm sm:text-base text-slate-700 font-playfair italic leading-relaxed">
                  “{rev.comment}”
                </p>

                {/* Sweet Mentioned Tag */}
                {rev.sweetMentioned && (
                  <div className="pt-1">
                    <span className="inline-block text-[11px] font-semibold text-[#133E87] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      Fav: {rev.sweetMentioned}
                    </span>
                  </div>
                )}
              </div>

              {/* Author info */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B2545] to-[#133E87] text-white font-cinzel font-bold text-sm flex items-center justify-center shadow-xs">
                  {rev.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0B2545] capitalize">
                    {rev.author}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {rev.location || 'Hubli, Karnataka'} • Verified Patron
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-blue-200 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedMessage ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-cinzel text-xl font-bold text-[#0B2545]">
                  Thank You for Your Feedback!
                </h3>
                <p className="text-xs text-slate-500">
                  Your review has been recorded and added to our community wall.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-[#0B2545]">
                    Share Your SweetWhisk Experience
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tell Vinayak and the Hubli team about your favorite sweets!
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Rating:
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-[#133E87] ml-2">
                      {rating} Star{rating > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Vinay, Megha, Suresh"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#133E87]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Favorite Sweet Mentioned:
                  </label>
                  <input
                    type="text"
                    value={sweetMentioned}
                    onChange={(e) => setSweetMentioned(e.target.value)}
                    placeholder="e.g. Dharwad Peda, Mysore Pak, Kaju Katli"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#133E87]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Review:
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a few lines about the taste, packaging, and freshness..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#133E87]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#133E87] text-white font-bold text-sm shadow-md transition-colors"
                >
                  Post Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
