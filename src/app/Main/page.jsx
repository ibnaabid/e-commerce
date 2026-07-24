'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

const heroSlides = [
  {
    image: "https://media.gettyimages.com/id/2202692367/photo/hanoi-hanoi-province-vietnam-braided-bamboo-baskets-and-bowls-are-offered-for-sale-in-a-shop.jpg?s=612x612&w=0&k=20&c=B6L3E8flndlCLlWRNx0ydWmwpRgGCxXACESQ9Dzq_4g=",
    title: "প্রকৃতির সেরা উপহার",
    subtitle: "১০০% অর্গানিক বাঁশ ও পাটের হস্তশিল্প",
    discount: "৩০% OFF",
  },
  {
    image: "https://media.gettyimages.com/id/1230803766/photo/daily-workers-processing-jute-in-jamalpur-district-outskirts-of-dhaka-bangladesh-on-january.jpg?s=612x612&w=0&k=20&c=40otFwJ2y-YDspg8cuXv-fhsiMm_PJmQ2W4uP9COJCQ=",
    title: "হাতে তৈরি আভিজাত্য",
    subtitle: "হোম ডেকোর • ঝুড়ি • বাস্কেট কালেকশন",
    discount: "নতুন কালেকশন",
  },
  {
    image: "https://images.unsplash.com/photo-1719041160596-bc62775793b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFtYm9vJTIwZnVybml0dXJlfGVufDB8fDB8fHww",
    title: "Eco Living",
    subtitle: "টেকসই ও পরিবেশবান্ধব হস্তশিল্প সামগ্রী",
    discount: "ফ্রি ডেলিভারি",
  },
  {
    image: "https://media.gettyimages.com/id/1076037502/photo/bamboo.jpg?s=612x612&w=0&k=20&c=7OC7jbsuwOFBMQgXjHUCySWAVFzdlw8jN6oNaTlc8W0=",
    title: "প্রিমিয়াম ক্রাফট",
    subtitle: "আমাদের ঐতিহ্যবাহী কারিগরদের তৈরি",
    discount: "২৫% ছাড়",
  },
  {
    image: "https://media.gettyimages.com/id/2263833519/photo/bamboo-basket-hanging-on-wooden-structure.jpg?s=612x612&w=0&k=20&c=gOj6EBPFzytTraFWMFMnvxNJ-zQQV6xVq2yIEWMCA-8=",
    title: "সবুজ জীবনযাপন",
    subtitle: "ঘর সাজান প্রাকৃতিক বাঁশ ও শোলার ছোঁয়ায়",
    discount: "নতুন আগমন",
  },
];

export default function HeroSection({ onSelectCategory }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide] || heroSlides[0];

  return (
    <div className="relative h-[80vh] min-h-[520px] max-h-[700px] flex items-center overflow-hidden bg-neutral-950">
      {/* Background Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide?.image}
            alt="Handicraft Banner"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle Clean Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide + "-text"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Clean Tag */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 rounded-full text-emerald-300 font-medium text-xs mb-4">
                <Sparkles size={13} className="text-amber-400" />
                {slide?.discount}
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tight drop-shadow-md">
                {slide?.title}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-neutral-300 mb-6 font-normal leading-relaxed">
                {slide?.subtitle}
              </p>

              {/* CTA Button */}
              <button
                onClick={() => onSelectCategory?.("All")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 text-sm transition-all shadow-md active:scale-95"
              >
                এখনই কিনুন
                <ArrowRight size={16} />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-6 right-6 sm:right-10 flex gap-1.5 z-20 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-6 bg-emerald-400' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}