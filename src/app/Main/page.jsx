'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

const heroSlides = [
  {
    image: "https://media.gettyimages.com/id/2202692367/photo/hanoi-hanoi-province-vietnam-braided-bamboo-baskets-and-bowls-are-offered-for-sale-in-a-shop.jpg?s=612x612&w=0&k=20&c=B6L3E8flndlCLlWRNx0ydWmwpRgGCxXACESQ9Dzq_4g=",
   
  },
  {
    image: "https://media.gettyimages.com/id/1230803766/photo/daily-workers-processing-jute-in-jamalpur-district-outskirts-of-dhaka-bangladesh-on-january.jpg?s=612x612&w=0&k=20&c=40otFwJ2y-YDspg8cuXv-fhsiMm_PJmQ2W4uP9COJCQ=",
   
  },
  {
    image: "https://images.unsplash.com/photo-1719041160596-bc62775793b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFtYm9vJTIwZnVybml0dXJlfGVufDB8fDB8fHww",
   
  },
  {
    image: "https://media.gettyimages.com/id/1076037502/photo/bamboo.jpg?s=612x612&w=0&k=20&c=7OC7jbsuwOFBMQgXjHUCySWAVFzdlw8jN6oNaTlc8W0=",
  
  },
  {
    image: "https://media.gettyimages.com/id/2263833519/photo/bamboo-basket-hanging-on-wooden-structure.jpg?s=612x612&w=0&k=20&c=gOj6EBPFzytTraFWMFMnvxNJ-zQQV6xVq2yIEWMCA-8=",
   
  },
];

export default function HeroSection({ onSelectCategory }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <div className="relative h-[85vh] min-h-[580px] flex items-center overflow-hidden bg-black">
      {/* Background Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt="EcoWorld Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              {/* Discount Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-emerald-300 font-medium text-sm mb-6">
                <Sparkles size={16} className="text-amber-400" />
                {slide.discount}
              </div>

              {/* Subtitle (বড় করে দিলাম) */}
              <p className="text-2xl md:text-3xl lg:text-4xl text-white font-medium leading-tight mb-8">
                {slide.subtitle}
              </p>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectCategory?.("All")}
                className="group flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-all shadow-lg shadow-emerald-900/50"
              >
                এখনই কিনুন
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentSlide 
                ? 'w-8 bg-emerald-400' 
                : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}