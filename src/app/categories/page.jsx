'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Flame, 
  Leaf, 
  ChevronRight, 
  Search,
  ArrowRight 
} from 'lucide-react';

// আপনার দেওয়া ক্যাটাগরি ডাটা
const categories = [
  { 
    name: "All", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnDuWPB7ZX_qUt8zxjrkaz048cYTZqKdydSTjYrPOSFg&s=10", 
    count: "সকল প্রডাক্ট",
    badge: "Hot",
    slug: "all"
  },
  { 
    name: "Bamboo", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCHou2BkEWMRZYrDS-Sw4ht4rOHzcOU3z6wYN3sPZdQg&s=10", 
    badge: "Trending",
   
    slug: "bamboo"
  },
  { 
    name: "Jute", 
    image: "https://media.gettyimages.com/id/1230803766/photo/daily-workers-processing-jute-in-jamalpur-district-outskirts-of-dhaka-bangladesh-on-january.jpg?s=612x612&w=0&k=20&c=40otFwJ2y-YDspg8cuXv-fhsiMm_PJmQ2W4uP9COJCQ=", 
   
    slug: "jute"
  },
  { 
    name: "Hogla", 
    image: "https://media.gettyimages.com/id/2202692367/photo/hanoi-hanoi-province-vietnam-braided-bamboo-baskets-and-bowls-are-offered-for-sale-in-a-shop.jpg?s=612x612&w=0&k=20&c=B6L3E8flndlCLlWRNx0ydWmwpRgGCxXACESQ9Dzq_4g=", 
   
    slug: "hogla"
  },
  { 
    name: "Shatranji", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj9llIU05LsL5HToqYeDiYU8AHNdrDxsEwBdxNuICoWQ&s=10", 
    badge: "Popular",
   
    slug: "shatranji"
  },
  { 
    name: "Kaisa", 
    image: "https://media.gettyimages.com/id/2263833519/photo/bamboo-basket-hanging-on-wooden-structure.jpg?s=612x612&w=0&k=20&c=gOj6EBPFzytTraFWMFMnvxNJ-zQQV6xVq2yIEWMCA-8=", 
    
    slug: "kaisa"
  },
  { 
    name: "Other", 
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=200&auto=format&fit=crop&q=80", 
   
    slug: "other"
  },
];

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* ================= ATTRACTIVE HEADER ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#800020] via-[#5A0016] to-[#2D5A27] p-6 sm:p-8 text-white mb-8 shadow-xl border border-[#FFD700]/30">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-400/20 rounded-full blur-2xl animate-pulse"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div 
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-3 bg-[#FFD700] text-[#800020] rounded-2xl shadow-md font-bold"
              >
                <Flame size={24} />
              </motion.div>
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-300 font-extrabold flex items-center gap-1">
                  <Sparkles size={12} /> এক্সক্লুসিভ স্পেশাল
                </span>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-0.5">
                  সকল ক্যাটাগরি
                </h1>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px] sm:min-w-[320px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60" size={18} />
              <input
                type="text"
                placeholder="ক্যাটাগরি খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-sm transition-all"
              />
            </div>
          </div>
        </div>

        {/* ================= CATEGORIES GRID (Image On Left Style) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCategories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <Link
                href={`/products/${cat.slug}`}
                className="group relative flex items-center justify-between p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200/80 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:border-[#800020]/30 dark:hover:border-emerald-600/30 transition-all duration-300"
              >
                {/* বামদিকের ইমেজ + তথ্য */}
                <div className="flex items-center gap-4 z-10">
                  {/* Category Image */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shadow-md shrink-0 border border-gray-100 dark:border-neutral-800">
                    <Image 
                      src={cat.image} 
                      alt={cat.name}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Title & Stats */}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-neutral-100 group-hover:text-[#800020] dark:group-hover:text-emerald-400 transition-colors">
                        {cat.name}
                      </h3>
                      {cat.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase bg-[#800020] text-white shadow-sm">
                          {cat.badge}
                        </span>
                      )}
                    </div>
                    {cat.count && (
                      <p className="text-xs font-medium text-gray-500 dark:text-neutral-400 mt-1">
                        {cat.count}
                      </p>
                    )}
                  </div>
                </div>

                {/* ডানদিকের অ্যারো আইকন */}
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-neutral-800 group-hover:bg-[#800020] dark:group-hover:bg-emerald-600 text-gray-500 dark:text-neutral-300 group-hover:text-white transition-all shrink-0">
                  <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ================= FOOTER FEATURE ================= */}
        <div className="mt-10 p-4 bg-gradient-to-r from-[#2D5A27]/10 via-emerald-500/10 to-[#800020]/10 rounded-2xl border border-[#2D5A27]/20 flex flex-wrap items-center justify-between gap-3 text-sm font-bold text-[#2D5A27] dark:text-emerald-400">
          <span className="flex items-center gap-2">
            <Leaf size={18} className="text-[#2D5A27] dark:text-emerald-400 animate-bounce" /> 
            ১০০% ইকো-ফ্রেন্ডলি হস্তশিল্প কালেকশন
          </span>
          <span className="text-xs bg-[#2D5A27] text-white px-3 py-1 rounded-lg shadow-sm">
            Eco World Handcraft
          </span>
        </div>

      </div>
    </div>
  );
}