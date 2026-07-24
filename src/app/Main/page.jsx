'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Leaf, ShieldCheck, RotateCcw, Package, Tag, Truck, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const HeroPage = ({ onSelectCategory }) => {
  // 📸 ৭টি হাই-কোয়ালিটি ইমেজ ও ইমেজের ভেতরের ডিটেইলস
  const slides = [
    {
      id: 1,
      src: "https://media.gettyimages.com/id/933192110/photo/different-type-of-mud-pot-market-in-dhaka-bangladesh-on-march-17-2018-mud-pot-business-is-a.jpg?s=612x612&w=0&k=20&c=gby1qw4qPqYmagcIqr--QjzrY6ElFnbgpbsTb3xUmCU=",
      category: "Eco Friendly",
      title: "ঐতিহ্যবাহী মৃৎশিল্প ও মাটির পাত্র",
      desc: "১০০% পরিবেশবান্ধব ও স্বাস্থ্যসম্মত মাটির তৈরি হরেক রকমের গৃহস্থালি জিনিসপত্র।",
      badge: "২০% ছাড়"
    },
    {
      id: 2,
      src: "https://media.gettyimages.com/id/2245822897/photo/desi-chandelier.jpg?s=612x612&w=0&k=20&c=7qwxdBZ9TaB5tw-5IdeCv1T-nHUlh6Pxe9O3Gb1QEzY=",
      category: "Home Decor",
      title: "বাঁশের তৈরি প্রিমিয়াম লাইটিং",
      desc: "আপনার ঘরের নান্দনিকতা বাড়াতে আকর্ষণীয় দেশীয় বাঁশের তৈরি ঝাড়বাতি ও লাইট শেড।",
      badge: "হট কালেকশন"
    },
    {
      id: 3,
      src: "https://media.gettyimages.com/id/1243339158/photo/rangamati-bangladesha-handicraft-manufacturer-in-kaptai-area-of-rangamati-is-making-household.jpg?s=612x612&w=0&k=20&c=_Ix3swka6uct0chyVi2KtgMZCg0zLGDMptSMngIoUHg=",
      category: "Kitchenware",
      title: "হাতে বোনা বাঁশের গৃহস্থালি সামগ্রী",
      desc: "পার্বত্য রাঙ্গামাটির দক্ষ কারিগরদের নিখুঁত হাতে তৈরি দীর্ঘস্থায়ী অর্গানিক পণ্য।",
      badge: "সেরা মান"
    },
    {
      id: 4,
      src: "https://media.gettyimages.com/id/1354895331/photo/wicker-works-traditional-thai.jpg?s=612x612&w=0&k=20&c=Vei3Zcc0IqcowUxIhIOIr7JaVpKd5xhgz8-x66j9A8I=",
      category: "Furniture",
      title: "বেতের তৈরি আভিজাত্যময় ফার্নিচার",
      desc: "ঘরের বসার স্থান কিংবা বারান্দা সাজাতে অনন্য ডিজাইনের টেকসই বেত ও বাঁশের আসবাব।",
      badge: "নিউ এরাইভাল"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1527385352018-3c26dd6c3916?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8anV0ZSUyMGJhZ3N8ZW58MHx8MHx8fDA%3D",
      category: "Eco Dining",
      title: "ন্যাচারাল বাঁশের তৈজসপত্র",
      desc: "প্লাস্টিক পরিহার করুন! ব্যবহার করুন ক্যাফে ও ডাইনিংয়ের জন্য উপযোগী বাঁশের পাত্র।",
      badge: "ইকো চয়েস"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1635719918971-bf907c2b1281?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFtYm9vJTIwYmFza2V0fGVufDB8fDB8fHww",
      category: "Handicraft",
      title: "হাতে তৈরি পরিবেশবান্ধব বাস্কেট",
      desc: "ফলের ঝুড়ি বা স্টোরেজের জন্য রুচিশীল ও মজবুত বাঁশের তৈরি নানা সাইজের বাস্কেট।",
      badge: "জনপ্রিয়"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1582835333661-6fc0a2295585?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFtYm9vJTIwZnVybml0dXJlfGVufDB8fDB8fHww",
      category: "Living",
      title: "প্রাকৃতিক উপাদানে ঘর সাজানো",
      desc: "আপনার ড্রয়িং রুম বা অফিসে প্রকৃতির ছোঁয়া আনতে ইকো-ফ্রেন্ডলি শোপিস।",
      badge: "স্পেশাল ডিল"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // ⏱️ Auto rotate every 4 seconds (Fixed Dependency Array)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative min-h-screen bg-[#F4F1EA] text-[#1A1A1A] overflow-hidden flex items-center py-8">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2D5A27]/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#800020]/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* 🌿 Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 text-center lg:text-left z-10"
        >
          <div className="inline-flex items-center gap-2 bg-[#2D5A27]/10 text-[#2D5A27] px-4 py-1.5 rounded-full font-medium text-sm mb-6 border border-[#2D5A27]/20">
            <Leaf className="w-4 h-4" /> Eco World Bamboo Collection
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            প্রকৃতির ছোঁয়ায় <br />
            <span className="text-[#800020]">বাঁশের আভিজাত্য</span>
          </h1>

          <p className="text-base text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0">
            Eco World-এ আপনাকে স্বাগতম। আমাদের টেকসই, দৃষ্টিনন্দন এবং ১০০% অর্গানিক বাঁশের পণ্য আপনার লাইফস্টাইলকে করবে আরও পরিবেশবান্ধব।
          </p>

          {/* Quick Category Action Cards */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <motion.div
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectCategory?.('decor')}
              className="bg-white/80 hover:bg-[#2D5A27]/10 border border-gray-200 hover:border-[#2D5A27] p-3 sm:p-4 rounded-2xl cursor-pointer transition text-center shadow-sm"
            >
              <div className="w-10 h-10 bg-[#2D5A27]/10 text-[#2D5A27] rounded-xl flex items-center justify-center mx-auto mb-2">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm">হোম ডেকোর</h3>
              <p className="text-[10px] sm:text-[11px] text-gray-500">আকর্ষণীয় ডিজাইন</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectCategory?.('kitchen')}
              className="bg-white/80 hover:bg-[#800020]/10 border border-gray-200 hover:border-[#800020] p-3 sm:p-4 rounded-2xl cursor-pointer transition text-center shadow-sm"
            >
              <div className="w-10 h-10 bg-[#800020]/10 text-[#800020] rounded-xl flex items-center justify-center mx-auto mb-2">
                <Tag className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm">রান্নাঘর</h3>
              <p className="text-[10px] sm:text-[11px] text-gray-500">১০০% অর্গানিক</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectCategory?.('furniture')}
              className="bg-white/80 hover:bg-amber-600/10 border border-gray-200 hover:border-amber-600 p-3 sm:p-4 rounded-2xl cursor-pointer transition text-center shadow-sm"
            >
              <div className="w-10 h-10 bg-amber-600/10 text-amber-700 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm">ফার্নিচার</h3>
              <p className="text-[10px] sm:text-[11px] text-gray-500">দীর্ঘস্থায়ী মান</p>
            </motion.div>
          </div>

          {/* Badges */}
          <div className="flex justify-center lg:justify-start gap-6 border-t border-gray-300/60 pt-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2D5A27]" /> প্রিমিয়াম কোয়ালিটি
            </span>
            <span className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#2D5A27]" /> ১০০% ইকো-ফ্রেন্ডলি
            </span>
          </div>
        </motion.div>

        {/* 🖼️ Right Slider Showcase Section */}
        <div className="lg:col-span-7 relative">
          <div className="relative h-[420px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
            
            {/* Auto-rotating Images */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  fill
                  src={slides[activeIndex].src}
                  alt={slides[activeIndex].title}
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

            {/* 🏷️ Top Badge */}
            <div className="absolute top-6 left-6 z-10">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeIndex}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-[#800020] text-white text-xs px-3.5 py-1.5 rounded-full font-bold shadow-md tracking-wide uppercase border border-white/20"
                >
                  {slides[activeIndex].badge}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* 📝 Image Inside Content / Details Layer */}
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-black/40 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/20 text-white"
                >
                  <span className="text-[#A3E635] text-xs font-semibold tracking-wider uppercase mb-1 block">
                    • {slides[activeIndex].category}
                  </span>
                  
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
                    {slides[activeIndex].title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-200 mb-4 line-clamp-2">
                    {slides[activeIndex].desc}
                  </p>

                  <button
                    onClick={() => onSelectCategory?.(slides[activeIndex].category.toLowerCase())}
                    className="inline-flex items-center gap-2 bg-[#2D5A27] hover:bg-[#23471f] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition shadow-lg group-hover:px-5"
                  >
                    কালেকশন দেখুন <ArrowRight size={16} />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ⬅️ ➡️ Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2.5 rounded-full backdrop-blur-sm border border-white/20 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2.5 rounded-full backdrop-blur-sm border border-white/20 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={20} />
            </button>

            {/* 🔘 Slide Indicators (Dots) */}
            <div className="absolute bottom-3 right-8 z-20 flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-6 bg-[#A3E635]' : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroPage;