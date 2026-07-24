'use client';

import { useState, useRef } from 'react';
import HeroPage from './Main/page';
import CategoryFilter from './Category/page';
import EcoShopPage from './Shop/page';
import AllReviewsList from './ReviewsCustomer/page';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // 🎯 প্রোডাক্ট সেকশনে অটো স্ক্রোল করার জন্য Ref
  const productsSectionRef = useRef(null);

const handleCategorySelect = (categoryName) => {
  setSelectedCategory(categoryName);

  if (productsSectionRef.current) {
    // 🎯 offset-এর মান বাড়িয়ে দিলে পেজ আরও নিচে নামবে, যাতে পুরো কার্ড দেখা যায়
    const offset = -400; // আপনার সুবিধামত এই মানটি (যেমন: 100, 120, 150) বাড়িয়ে-কমিয়ে নিতে পারেন
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = productsSectionRef.current.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

  return (
    <>
      <HeroPage onSelectCategory={handleCategorySelect} />
      
      {/* 🟢 ক্যাটাগরি ফিল্টার */}
      <CategoryFilter
        selectedCategory={selectedCategory} 
        onSelectCategory={handleCategorySelect} 
      />

      {/* 📦 প্রোডাক্ট সেকশন (Scroll Target) */}
      <div ref={productsSectionRef} className="scroll-pt-28">
        <EcoShopPage selectedCategory={selectedCategory} />
      </div>
      
      <AllReviewsList />
    </>
  );
}