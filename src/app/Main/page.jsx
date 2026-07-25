'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const heroSlides = [
  { image: "https://media.gettyimages.com/id/2202692367/photo/hanoi-hanoi-province-vietnam-braided-bamboo-baskets-and-bowls-are-offered-for-sale-in-a-shop.jpg?s=612x612&w=0&k=20&c=B6L3E8flndlCLlWRNx0ydWmwpRgGCxXACESQ9Dzq_4g=" },
  { image: "https://media.gettyimages.com/id/1230803766/photo/daily-workers-processing-jute-in-jamalpur-district-outskirts-of-dhaka-bangladesh-on-january.jpg?s=612x612&w=0&k=20&c=40otFwJ2y-YDspg8cuXv-fhsiMm_PJmQ2W4uP9COJCQ=" },
  { image: "https://c7.alamy.com/comp/ERYYMP/bamboo-handicraft-artist-working-calcutta-kolkata-west-bengal-india-ERYYMP.jpg" },
  { image: "https://media.gettyimages.com/id/1076037502/photo/bamboo.jpg?s=612x612&w=0&k=20&c=7OC7jbsuwOFBMQgXjHUCySWAVFzdlw8jN6oNaTlc8W0=" },
  { image: "https://media.gettyimages.com/id/2263833519/photo/bamboo-basket-hanging-on-wooden-structure.jpg?s=612x612&w=0&k=20&c=gOj6EBPFzytTraFWMFMnvxNJ-zQQV6xVq2yIEWMCA-8=" },
  // ➕ নতুন দুটি ছবি যোগ করা হয়েছে
  { image: "https://c7.alamy.com/comp/K4AYD4/a-traditional-bamboo-made-handicrafts-shop-in-bangla-academy-premises-K4AYD4.jpg" },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPAWMYJmpHmUq-Q-frO0vMbqOs-MatGEb7UbBcYINvlg&s=10" },
];

export default function HeroSection({ onSelectCategory }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[380px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-3xl bg-black shadow-2xl group">
      {/* Background Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={heroSlides[currentSlide].image}
            alt="EcoWorld Products"
            fill
            className="object-cover object-center"
            priority
          />
          {/* সফট ডার্ক ওভারলে দেওয়া হলো যেন ছবিগুলো বেশ প্রিমিয়াম লুক দেয় */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* স্লাইডারে ক্লিক করলে প্রোডাক্ট সেকশনে যাওয়ার জন্য একটি ওভারলে */}
      <div 
        onClick={() => onSelectCategory?.("All")}
        className="absolute inset-0 z-10 cursor-pointer"
        title="প্রোডাক্টগুলো দেখতে ক্লিক করুন"
      />

      {/* Bottom Slide Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-20 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide(idx);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide 
                ? 'w-7 bg-amber-400 shadow-md' 
                : 'w-2 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}