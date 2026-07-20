"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Leaf, ShoppingCart, Truck, Award, ArrowRight } from "lucide-react";
import Image from "next/image";

const heroSlides = [
  {
    title: "বাঁশের ঝুড়ি থেকে ঘরের বাজার",
    subtitle: "প্রকৃতির সাথে সংযোগ, স্বাস্থ্যের সাথে সম্পর্ক",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a9c?w=1200",
    color: "from-emerald-700 to-maroon-700",
  },
  {
    title: "Organic & Chemical Free",
    subtitle: "সরাসরি কৃষকের খেত থেকে আপনার ঘরে",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200",
    color: "from-amber-700 to-rose-700",
  },
  {
    title: "EcoWorld Ghore Bajar",
    subtitle: "সবুজ জীবনের সাথে আপনার প্রতিদিন",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=1200",
    color: "from-teal-700 to-maroon-800",
  },
];

export default function MainPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Fixed Image with fill */}
            <Image
              src={slide.image}
              alt="Eco Bajar"
              fill
              className="object-cover"
              priority={index === 0} // First image load faster
            />
            
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} opacity-70`}></div>

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-4xl mx-auto px-6 text-center text-white">
                <div className="flex justify-center mb-6">
                  <div className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-2">
                    <Leaf className="text-emerald-300" />
                    <span className="text-sm tracking-widest uppercase">100% Natural • Eco Friendly</span>
                  </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4 tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-neutral-200 mb-10 max-w-2xl mx-auto">
                  {slide.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/shop"
                    className="bg-white text-neutral-900 px-10 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-amber-300 transition-all group"
                  >
                    Shop Now
                    <ArrowRight className="group-hover:translate-x-1 transition" />
                  </Link>
                  <Link
                    href="/categories"
                    className="border border-white/60 hover:border-white px-8 py-4 rounded-2xl font-medium text-lg transition-all"
                  >
                    Browse Categories
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentSlide ? "bg-white scale-125" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* TRUST BAR */}
      <div className="bg-neutral-900 py-4 border-b border-maroon-800">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-8 md:gap-16 text-neutral-400 text-sm">
          <div className="flex items-center gap-3">
            <Truck className="text-emerald-500" /> <span>সারা ঢাকায় ৬০ মিনিট ডেলিভারি</span>
          </div>
          <div className="flex items-center gap-3">
            <Award className="text-amber-500" /> <span>১০০% অর্গানিক গ্যারান্টি</span>
          </div>
          <div className="flex items-center gap-3">
            <Leaf className="text-teal-500" /> <span>Eco-Friendly Packaging</span>
          </div>
        </div>
      </div>

      {/* FEATURED CATEGORIES - Fixed */}
      <section className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-4">Our Bamboo & Eco Collection</h2>
          <p className="text-neutral-400 text-center mb-12 max-w-2xl mx-auto">
            প্রকৃতির উপহার — বাঁশ, কাঠ, পাতা ও অর্গানিক পণ্য
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Bamboo Products", "Organic Vegetables", "Fresh Fruits", "Natural Groceries"].map((cat, i) => (
              <div key={i} className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer">
                <Image
                  src={`https://picsum.photos/id/${30 + i}/600/600`}
                  alt={cat}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-2xl font-semibold">{cat}</h3>
                  <p className="text-sm text-emerald-400 mt-1">Shop Now →</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-gradient-to-b from-neutral-900 to-neutral-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-16">কেন EcoWorld Ghore Bajar?</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-neutral-900 p-8 rounded-3xl border border-maroon-800 hover:border-maroon-600 transition">
              <div className="w-16 h-16 mx-auto mb-6 bg-emerald-900/50 rounded-2xl flex items-center justify-center">
                <Leaf size={32} className="text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white">Sustainable</h3>
              <p className="text-neutral-400">বাঁশ ও পরিবেশবান্ধব প্যাকেজিং ব্যবহার করি</p>
            </div>

            <div className="bg-neutral-900 p-8 rounded-3xl border border-maroon-800 hover:border-maroon-600 transition">
              <div className="w-16 h-16 mx-auto mb-6 bg-amber-900/50 rounded-2xl flex items-center justify-center">
                <Award size={32} className="text-amber-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white">Fresh & Pure</h3>
              <p className="text-neutral-400">সরাসরি কৃষক থেকে, কোনো রাসায়নিক নয়</p>
            </div>

            <div className="bg-neutral-900 p-8 rounded-3xl border border-maroon-800 hover:border-maroon-600 transition">
              <div className="w-16 h-16 mx-auto mb-6 bg-rose-900/50 rounded-2xl flex items-center justify-center">
                <ShoppingCart size={32} className="text-rose-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white">Easy Shopping</h3>
              <p className="text-neutral-400">ঘরে বসে বাজার করুন, দ্রুত ডেলিভারি</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-neutral-950 py-12 border-t border-maroon-900 text-neutral-400 text-center">
        <p>© 2026 EcoWorld Ghore Bajar • প্রকৃতির সাথে বাজার করুন</p>
      </footer>
    </>
  );
}