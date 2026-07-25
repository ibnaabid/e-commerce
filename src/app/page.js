'use client';

import { useState, useRef } from 'react';
import HeroPage from './Main/page';
import CategoryFilter from './Category/page';
import EcoShopPage from './Shop/page';
import AllReviewsList from './ReviewsCustomer/page';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // 🎯 প্রোডাক্ট সেকশনে স্মুথ স্ক্রোল করার জন্য Ref
  const productsSectionRef = useRef(null);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);

    if (productsSectionRef.current) {
      // 🎯 স্ট্যান্ডার্ড নেভিগেশন বার অফসেট (৮০ পিক্সেল উপরে ফাকা থাকবে)
      const navbarOffset = -100; 
      const elementPosition = productsSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="space-y-12">
      
      {/* 🟢 HERO & CATEGORY GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ক্যাটাগরি ফিল্টার: ডেস্কে বামে (4 Col), মোবাইলে হিরোর নিচে (Order 2) */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <CategoryFilter
              selectedCategory={selectedCategory} 
              onSelectCategory={handleCategorySelect} 
            />
          </div>

          {/* হিরো স্লাইডার: ডেস্কে ডানে (8 Col), মোবাইলে সবার উপরে (Order 1) */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <HeroPage onSelectCategory={handleCategorySelect} />
          </div>

        </div>
      </section>

      {/* 📦 প্রোডাক্ট শপ সেকশন (Scroll Target) */}
      <div ref={productsSectionRef} className="scroll-mt-24">
        <EcoShopPage selectedCategory={selectedCategory} />
      </div>

      {/* ⭐️ কাস্টমার রিভিউজ */}
      <AllReviewsList />

    </main>
  );
}