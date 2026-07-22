"use client";

import { useEffect, useState } from "react";
import { Star, Quote, CheckCircle2, User, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";

export default function AllReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("https://e-commerce-backend-kappa-nine.vercel.app/reviews");
        if (res.ok) {
          const data = await res.json();
          // ব্যাকএন্ড থেকে আসা অবজেক্ট বা এরে হ্যান্ডেল করা
          setReviews(Array.isArray(data) ? data : data.reviews || []);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="py-16 flex flex-col items-center justify-center text-neutral-400 gap-3">
        <Loader2 className="animate-spin text-emerald-400" size={32} />
        <span className="text-sm font-medium">Loading customer reviews...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles size={14} /> Community Feedback
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          What Our Eco-Warriors Say
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-2">
          Read real reviews from our valued customers using EcoWorld products.
        </p>
      </div>

      {/* Reviews Grid */}
      {reviews.length === 0 ? (
        <div className="text-center py-16 bg-white/5 border border-white/5 rounded-3xl">
          <p className="text-neutral-400 text-sm">No reviews found yet!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => {
            const formattedDate = rev.createdAt
              ? new Date(rev.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Recently";

            return (
              <div
                key={rev._id}
                className="group relative bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-emerald-500/50 rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/40 hover:-translate-y-1.5 flex flex-col justify-between backdrop-blur-xl overflow-hidden"
              >
                {/* Glow & Accent Overlay */}
                <div className="absolute top-0 right-0 -z-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500" />

                <div>
                  {/* Top Bar: Stars & Quote */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={15}
                          className={
                            star <= (rev.rating || 5)
                              ? "text-amber-400 fill-amber-400"
                              : "text-neutral-700"
                          }
                        />
                      ))}
                      <span className="text-xs font-bold text-amber-300 ml-1">
                        {Number(rev.rating).toFixed(1)}
                      </span>
                    </div>

                    <Quote size={24} className="text-neutral-600 group-hover:text-emerald-400 transition-colors" />
                  </div>

                  {/* Review Text */}
                  <p className="text-neutral-200 text-sm sm:text-base leading-relaxed italic mb-6">
                    "{rev.comment}"
                  </p>
                </div>

                {/* User Info & Verified Badge */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 rounded-full overflow-hidden border-2 border-emerald-500/40 bg-neutral-800 shrink-0 flex items-center justify-center">
                      {rev.userImage ? (
                        <Image
                          src={rev.userImage}
                          alt={rev.userName || "User"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <User size={20} className="text-emerald-400" />
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        {rev.userName || rev.name || "Verified Customer"}
                        <CheckCircle2 size={14} className="text-emerald-400 fill-emerald-400/20" />
                      </h4>
                      <span className="text-xs text-neutral-500">{formattedDate}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    Eco Buyer
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}