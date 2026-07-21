'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Truck, 
  ArrowRight,
  Package,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { authClient } from '@/app/lib/auth-client';

export default function CustomerMainPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="space-y-8">
      
      {/* 🌟 Welcome Banner with Animated Gradient */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1B3B18] via-[#2D5A27] to-[#800020] p-6 sm:p-8 text-white shadow-xl"
      >
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#A3E635]">
              <Sparkles className="w-3.5 h-3.5" /> কাস্টমার পোর্টাল
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-3">
              স্বাগতম, {user?.name || 'প্রিয় গ্রাহক'}! 👋
            </h1>
            <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-xl">
              আপনার অর্ডারের সর্বশেষ অবস্থা, ডেলিভারি ট্র্যাকিং এবং সংরক্ষিত ইকো-ফ্রেন্ডলি কালেকশন এক নজর দেখে নিন।
            </p>
          </div>

          <Link href="/products">
            <button className="px-5 py-2.5 bg-white text-[#1B3B18] hover:bg-[#A3E635] hover:text-[#1B3B18] font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2 group shrink-0">
              শপিং চালিয়ে যান
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      </motion.div>

      {/* 📊 Quick Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: 'মোট কেনাকাটা', val: '১২ টি অর্ডার', icon: ShoppingBag, color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
          { label: 'উইশলিস্ট আইটেম', val: '৫ টি প্রোডাক্ট', icon: Heart, color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
          { label: 'সেভ করা ঠিকানা', val: '২ টি এড্রেস', icon: MapPin, color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{card.label}</p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{card.val}</h3>
                </div>
                <div className={`p-3.5 rounded-2xl ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 🚚 Active Order Live Tracker */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm space-y-6"
      >
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-gray-100 dark:border-neutral-800 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              চলতি অর্ডার ট্র্যাকিং
            </span>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mt-2">
              অর্ডার ID: #ECO-80924
            </h3>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            আনুমানিক ডেলিভারি: <strong className="text-gray-800 dark:text-gray-200">২২ জুলাই, ২০২৬</strong>
          </span>
        </div>

        {/* Dynamic Progress Timeline */}
        <div className="relative py-4">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 dark:bg-neutral-800 w-full rounded-full z-0" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#2D5A27] w-2/3 rounded-full z-0 transition-all duration-500" />

          <div className="grid grid-cols-3 gap-2 relative z-10 text-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-2xl bg-[#2D5A27] text-white flex items-center justify-center font-bold shadow-lg ring-4 ring-white dark:ring-neutral-900">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-gray-900 dark:text-white mt-3">অর্ডার প্লেসড</p>
              <p className="text-[10px] text-gray-400">১৮ জুলাই</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-2xl bg-[#2D5A27] text-white flex items-center justify-center font-bold shadow-lg ring-4 ring-white dark:ring-neutral-900">
                <Truck className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-gray-900 dark:text-white mt-3">শিপিংয়ে আছে</p>
              <p className="text-[10px] text-gray-400">২০ জুলাই</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center opacity-40">
              <div className="w-10 h-10 rounded-2xl bg-gray-200 dark:bg-neutral-800 text-gray-500 flex items-center justify-center font-bold ring-4 ring-white dark:ring-neutral-900">
                <Package className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-gray-900 dark:text-white mt-3">ডেলিভারড</p>
              <p className="text-[10px] text-gray-400">পেন্ডিং</p>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}