'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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
    }, 3800); // স্লাইড গতি
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[75vh] md:h-[80vh] lg:h-[85vh] overflow-hidden bg-black">
      {/* Background Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={heroSlides[currentSlide].image}
            alt="EcoWorld"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay for better look */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Optional Clickable Area */}
      <div 
        onClick={() => onSelectCategory?.("All")}
        className="absolute inset-0 z-10 cursor-pointer"
      />

      {/* Slide Dots - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide(idx);
            }}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentSlide 
                ? 'w-8 bg-white' 
                : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}