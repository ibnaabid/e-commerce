'use client'; // 👈 এই লাইনটি যুক্ত করা হয়েছে

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Leaf, 
  ArrowRight, 
  ShieldCheck, 
  RotateCcw, 
  Package, 
  Tag, 
  Truck 
} from 'lucide-react';

const HeroPage = ({ onSelectCategory }) => {
  // Eco World এর ৪টি প্রিমিয়াম ইমেজ
  const images = {
    main: "https://media.gettyimages.com/id/933192110/photo/different-type-of-mud-pot-market-in-dhaka-bangladesh-on-march-17-2018-mud-pot-business-is-a.jpg?s=612x612&w=0&k=20&c=gby1qw4qPqYmagcIqr--QjzrY6ElFnbgpbsTb3xUmCU=", 
    decor: "https://media.gettyimages.com/id/2245822897/photo/desi-chandelier.jpg?s=612x612&w=0&k=20&c=7qwxdBZ9TaB5tw-5IdeCv1T-nHUlh6Pxe9O3Gb1QEzY=", 
    kitchen: "https://media.gettyimages.com/id/1243339158/photo/rangamati-bangladesha-handicraft-manufacturer-in-kaptai-area-of-rangamati-is-making-household.jpg?s=612x612&w=0&k=20&c=_Ix3swka6uct0chyVi2KtgMZCg0zLGDMptSMngIoUHg=", 
    furniture: "https://media.gettyimages.com/id/1354895331/photo/wicker-works-traditional-thai.jpg?s=612x612&w=0&k=20&c=Vei3Zcc0IqcowUxIhIOIr7JaVpKd5xhgz8-x66j9A8I=" 
  };

  return (
    <div className="relative min-h-screen bg-[#F4F1EA] text-[#1A1A1A] overflow-hidden flex items-center">
      
      {/* ব্যাকগ্রাউন্ড সফ্ট আর্ট */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#2D5A27]/10 rounded-full filter blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#800020]/10 rounded-full filter blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* ১. বাম পাশ: টেক্সট এবং ক্যাটাগরি কার্ডসমূহ (5 Columns) */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 text-center lg:text-left z-10"
        >
          <div className="inline-flex items-center gap-2 bg-[#2D5A27]/10 text-[#2D5A27] px-4 py-1.5 rounded-full font-medium text-sm mb-6 border border-[#2D5A27]/20">
            <Leaf className="w-4 h-4" /> Eco World Bamboo Collection
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] leading-tight mb-4">
            প্রকৃতির ছোঁয়ায় <br /> 
            <span className="text-[#800020]">বাঁশের আভিজাত্য</span>
          </h1>
          
          <p className="text-base text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0">
            Eco World-এ আপনাকে স্বাগতম। আমাদের টেকসই, দৃষ্টিনন্দন এবং ১০০% অর্গানিক বাঁশের পণ্য আপনার লাইফস্টাইলকে করবে আরও পরিবেশবান্ধব।
          </p>

          {/* 🎋 ৩টি ক্যাটাগরি ফাস্ট অ্যাকশন কার্ড */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            
            {/* ১. Decor Card */}
            <motion.div 
              whileHover={{ scale: 1.03, translateY: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectCategory && onSelectCategory('decor')}
              className="bg-white/80 hover:bg-[#2D5A27]/10 border border-gray-200 hover:border-[#2D5A27] p-4 rounded-2xl cursor-pointer transition text-center shadow-sm group"
            >
              <div className="w-10 h-10 bg-[#2D5A27]/10 text-[#2D5A27] rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-[#2D5A27] group-hover:text-white transition">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-gray-800">হোম ডেকোর</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">আকর্ষণীয় ডিজাইন</p>
            </motion.div>

            {/* ২. Kitchenware Card */}
            <motion.div 
              whileHover={{ scale: 1.03, translateY: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectCategory && onSelectCategory('kitchen')}
              className="bg-white/80 hover:bg-[#800020]/10 border border-gray-200 hover:border-[#800020] p-4 rounded-2xl cursor-pointer transition text-center shadow-sm group"
            >
              <div className="w-10 h-10 bg-[#800020]/10 text-[#800020] rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-[#800020] group-hover:text-white transition">
                <Tag className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-gray-800">রান্নাঘর</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">১০০% অর্গানিক</p>
            </motion.div>

            {/* ৩. Furniture Card */}
            <motion.div 
              whileHover={{ scale: 1.03, translateY: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectCategory && onSelectCategory('furniture')}
              className="bg-white/80 hover:bg-amber-600/10 border border-gray-200 hover:border-amber-600 p-4 rounded-2xl cursor-pointer transition text-center shadow-sm group"
            >
              <div className="w-10 h-10 bg-amber-600/10 text-amber-700 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-amber-600 group-hover:text-white transition">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-gray-800">ফার্নিচার</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">দীর্ঘস্থায়ী মান</p>
            </motion.div>

          </div>

          {/* ট্রাস্ট ব্যাজ */}
          <div className="flex justify-center lg:justify-start gap-6 border-t border-gray-300/60 pt-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2D5A27]" /> প্রিমিয়াম কোয়ালিটি
            </span>
            <span className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#2D5A27]" /> ১০০% ইকো-ফ্রেন্ডলি
            </span>
          </div>
        </motion.div>

        {/* ২. ডান পাশ: ৪-ইমেজ প্রিমিয়াম গ্রিড (7 Columns) */}
        <div className="lg:col-span-7 grid grid-cols-12 gap-4 relative">
          
          {/* ইমেজ ১: মেইন ছবি */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-7 h-[320px] md:h-[420px] rounded-3xl overflow-hidden shadow-xl border-4 border-white relative group"
          >
            <Image fill src={images.main} alt="Main Bamboo Product" className="object-cover group-hover:scale-105 transition duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <span className="bg-[#2D5A27] text-white text-xs px-3 py-1 rounded-full font-bold">Eco Friendly</span>
            </div>
          </motion.div>

          {/* ডান পাশের ছোট ইমেজের কলাম */}
          <div className="col-span-5 flex flex-col gap-4">
            
            {/* ইমেজ ২: টপ রাইট */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-[150px] md:h-[195px] rounded-3xl overflow-hidden shadow-md border-4 border-white relative group"
            >
              <Image fill src={images.decor} alt="Bamboo Decor" className="object-cover group-hover:scale-105 transition duration-500" />
            </motion.div>

            {/* ইমেজ ৩: বটম রাইট */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="h-[155px] md:h-[210px] rounded-3xl overflow-hidden shadow-md border-4 border-white relative group"
            >
              <Image fill src={images.kitchen} alt="Bamboo Kitchenware" className="object-cover group-hover:scale-105 transition duration-500" />
            </motion.div>
          </div>

          {/* ইমেজ ৪: বটম ওয়াইড ছবি */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="col-span-12 h-[130px] md:h-[170px] rounded-3xl overflow-hidden shadow-xl border-4 border-white relative group"
          >
            <Image fill src={images.furniture} alt="Bamboo Furniture" className="object-cover group-hover:scale-105 transition duration-500" />
          </motion.div>

          {/* ফ্লোটিং ব্যাজ */}
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="absolute -top-5 -left-5 bg-[#800020] text-white px-5 py-3 rounded-2xl shadow-xl border border-white/20 text-center hidden md:block"
          >
            <p className="text-[10px] tracking-wider uppercase opacity-80">বিশেষ ধামাকা</p>
            <p className="text-xl font-black">২০% ছাড়</p>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default HeroPage;