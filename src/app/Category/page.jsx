'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Sparkles, 
  Flame, 
  Leaf, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';

// আইকনের জায়গায় প্রতিটি ক্যাটাগরির জন্য হাই-কোয়ালিটি ইমেজের ইউআরএল দেওয়া হয়েছে
const categories = [
  { 
    name: "All", 
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&auto=format&fit=crop&q=80", 
    count: "সকল প্রডাক্ট",
    badge: "Hot"
  },
  { 
    name: "Bamboo", 
    image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=200&auto=format&fit=crop&q=80", 
    
    badge: "Trending"
  },
  { 
    name: "Jute", 
    image: "https://media.gettyimages.com/id/1230803766/photo/daily-workers-processing-jute-in-jamalpur-district-outskirts-of-dhaka-bangladesh-on-january.jpg?s=612x612&w=0&k=20&c=40otFwJ2y-YDspg8cuXv-fhsiMm_PJmQ2W4uP9COJCQ=", 
    
  },
  { 
    name: "Hogla", 
    image: "https://media.gettyimages.com/id/2202692367/photo/hanoi-hanoi-province-vietnam-braided-bamboo-baskets-and-bowls-are-offered-for-sale-in-a-shop.jpg?s=612x612&w=0&k=20&c=B6L3E8flndlCLlWRNx0ydWmwpRgGCxXACESQ9Dzq_4g=", 
   
  },
  { 
    name: "Shatranji", 
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=200&auto=format&fit=crop&q=80", 

    badge: "Popular"
  },
  { 
    name: "Kaisa", 
    image: "https://media.gettyimages.com/id/2263833519/photo/bamboo-basket-hanging-on-wooden-structure.jpg?s=612x612&w=0&k=20&c=gOj6EBPFzytTraFWMFMnvxNJ-zQQV6xVq2yIEWMCA-8=", 
    
  },
  { 
    name: "Other", 
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=200&auto=format&fit=crop&q=80", 
   
  },
];

export default function CategoryFilter({ 
  selectedCategory = "All", 
  onSelectCategory = () => {} 
}) {
  return (
    <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-[#2D5A27]/20 h-full flex flex-col justify-between">
      <div>
        
        {/* ================= ATTRACTIVE HEADER ================= */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#800020] via-[#5A0016] to-[#2D5A27] p-4 text-white mb-5 shadow-lg border border-[#FFD700]/30">
          
          {/* ব্যাকগ্রাউন্ড ব্লিঙ্ক অ্যানিমেশন */}
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <motion.div 
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-2 bg-[#FFD700] text-[#800020] rounded-xl shadow-md font-bold"
              >
                <Flame size={18} />
              </motion.div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-amber-300 font-extrabold flex items-center gap-1">
                  <Sparkles size={10} /> এক্সক্লুসিভ স্পেশাল
                </span>
                <h2 className="text-base md:text-lg font-black tracking-tight text-white">
                  ক্যাটাগরি পছন্দ করুন
                </h2>
              </div>
            </div>

            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="text-[11px] bg-white/20 backdrop-blur-md text-amber-200 border border-white/20 px-2.5 py-1 rounded-full font-bold flex items-center gap-1"
            >
              এক্সপ্লোর <ArrowRight size={12} />
            </motion.span>
          </div>
        </div>

        {/* ================= CATEGORY ITEMS WITH IMAGES ================= */}
        <div className="space-y-2.5">
          {categories.map((cat, index) => {
            const isSelected = selectedCategory === cat.name;

            return (
              <motion.button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                whileHover={{ x: 6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className={`w-full relative flex items-center justify-between p-2.5 rounded-2xl transition-all duration-300 text-left cursor-pointer group ${
                  isSelected
                    ? "bg-gradient-to-r from-[#800020] via-[#600018] to-[#2D5A27] text-white shadow-xl shadow-[#800020]/25 font-bold border border-[#FFD700]/40"
                    : "bg-gray-50 hover:bg-[#F4F1EA] text-gray-800 hover:text-[#800020] border border-gray-100 hover:border-[#800020]/20"
                }`}
              >
                {/* বাঁদিকের পার্ট: ইমেজ + নাম + কাউন্ট */}
                <div className="flex items-center gap-3 z-10">
                  {/* Category Image Component */}
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-md shrink-0 border-2 border-white">
                    <Image 
                      src={cat.image} 
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold leading-tight tracking-wide">{cat.name}</h3>
                      {cat.badge && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold uppercase ${
                          isSelected ? "bg-[#FFD700] text-[#800020]" : "bg-[#800020] text-white"
                        }`}>
                          {cat.badge}
                        </span>
                      )}
                    </div>
                    <p className={`text-[11px] font-medium ${isSelected ? "text-amber-200/90" : "text-gray-400"}`}>
                      {cat.count}
                    </p>
                  </div>
                </div>

                {/* ডানদিকের পার্ট: অ্যানিমেটেড আইকন */}
                <div className="flex items-center gap-1 z-10 pr-1">
                  {isSelected ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-[#FFD700]"
                    >
                      <Leaf size={18} />
                    </motion.div>
                  ) : (
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-[#800020] group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ================= FOOTER FEATURE ================= */}
      <div className="mt-4 p-3 bg-gradient-to-r from-[#2D5A27]/15 to-[#800020]/10 rounded-2xl border border-[#2D5A27]/20 flex items-center justify-between text-xs font-bold text-[#2D5A27]">
        <span className="flex items-center gap-1.5">
          <Leaf size={14} className="text-[#2D5A27] animate-bounce" /> ১০০% ইকো-ফ্রেন্ডলি কালেকশন
        </span>
        <span className="text-[10px] bg-[#2D5A27] text-white px-2 py-0.5 rounded-md">
          Eco World
        </span>
      </div>
    </div>
  );
}