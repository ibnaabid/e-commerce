'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Star, 
  Loader2, 
  PackageX, 
  Sparkles,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { useSession } from '@/app/lib/auth-client';

export default function CategoryProductsPage({ params }) {
  // ১. URL থেকে Dynamic Slug রিড করা
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);
  const [addedId, setAddedId] = useState(null);

  // ২. স্লাগ অনুযায়ী ব্যাকএন্ড API থেকে প্রোডাক্ট ফেচ করা
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(`https://e-commerce-backend-kappa-nine.vercel.app/products?category=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchProducts();
  }, [slug]);

  // 🛒 Add to Cart হ্যান্ডলার
  const handleAddToCart = async (product) => {
    if (!userEmail) {
      alert("কার্টে প্রোডাক্ট যোগ করতে অনুগ্রহ করে লগইন করুন।");
      return;
    }

    setAddingId(product._id);

    try {
      const res = await fetch(`https://e-commerce-backend-kappa-nine.vercel.app/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        })
      });

      if (res.ok) {
        // নেভবারে কার্ট কাউন্ট সাথে সাথে আপডেট করার জন্য Custom Event
        window.dispatchEvent(new Event("cartUpdated"));
        
        setAddedId(product._id);
        setTimeout(() => setAddedId(null), 2000);
      }
    } catch (err) {
      console.error("Add to cart error:", err);
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 py-8 px-4 sm:px-6 lg:px-12 text-slate-800 dark:text-neutral-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* 🔙 BREADCRUMB & BACK BUTTON */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            href="/categories" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 hover:border-[#800020] dark:hover:border-emerald-500 text-sm font-bold transition-all shadow-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            সকল ক্যাটাগরি
          </Link>
          <span className="text-xs font-bold text-slate-400 capitalize">
            Shop / <span className="text-[#800020] dark:text-emerald-400">{slug}</span>
          </span>
        </div>

        {/* 🌿 BANNER HEADER */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#800020] via-[#5A0016] to-[#2D5A27] p-6 sm:p-10 text-white mb-8 shadow-2xl border border-[#FFD700]/30">
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl animate-pulse"></div>

          <div className="relative z-10">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-extrabold flex items-center gap-1.5 mb-2">
              <Sparkles size={14} /> এক্সক্লুসিভ কালেকশন
            </span>
            <h1 className="text-3xl sm:text-5xl font-black capitalize tracking-tight">
              {slug} Collection
            </h1>
            <p className="text-amber-100/80 text-sm sm:text-base mt-2 max-w-xl">
              আমাদের ১০০% পরিবেশবান্ধব ও টেকসই {slug} পণ্যসামগ্রী থেকে আপনার পছন্দের পণ্যটি বেছে নিন।
            </p>
          </div>
        </div>

        {/* ⚙️ STATS BAR */}
        <div className="flex items-center justify-between bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-slate-200 dark:border-neutral-800 shadow-sm mb-8">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-neutral-300">
            <SlidersHorizontal size={18} className="text-[#800020] dark:text-emerald-400" />
            <span>মোট এভেলেবল পণ্য: <strong className="text-slate-900 dark:text-white">{products.length} টি</strong></span>
          </div>
        </div>

        {/* 🛍️ PRODUCT GRID / LOADING / EMPTY STATE */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 size={40} className="animate-spin text-[#800020] dark:text-emerald-400 mb-3" />
            <p className="text-sm font-semibold text-slate-500">প্রোডাক্ট লোড হচ্ছে, অপেক্ষা করুন...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, idx) => {
              const isAdding = addingId === product._id;
              const isAdded = addedId === product._id;

              return (
                <motion.div
                  key={product._id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative bg-white dark:bg-neutral-900 rounded-3xl border border-slate-200/80 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Product Image & Wishlist */}
                  <div className="relative w-full h-52 bg-slate-100 dark:bg-neutral-800 overflow-hidden">
                    <Image
                      src={product.image || "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=80"}
                      alt={product.name || "Product"}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-[#800020] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                        {product.badge}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md text-slate-700 dark:text-neutral-200 hover:text-red-500 transition-colors shadow-sm">
                      <Heart size={16} />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-amber-400 mb-1.5">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-bold text-slate-600 dark:text-neutral-400">
                          {product.rating || "4.9"}
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-slate-800 dark:text-neutral-100 line-clamp-1 group-hover:text-[#800020] dark:group-hover:text-emerald-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                        {product.description || "১০০% টেকসই ও পরিবেশবান্ধব হস্তশিল্প সামগ্রী।"}
                      </p>
                    </div>

                    {/* Price & Add To Cart Button */}
                    <div className="mt-5 pt-3 border-t border-slate-100 dark:border-neutral-800">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-slate-400 font-semibold">মূল্য</span>
                        <span className="text-xl font-black text-[#800020] dark:text-emerald-400">
                          ৳ {product.price}
                        </span>
                      </div>

                      {/* 🛒 Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={isAdding}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs transition-all shadow-sm ${
                          isAdded
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-900 dark:bg-neutral-800 hover:bg-[#800020] dark:hover:bg-emerald-600 text-white"
                        }`}
                      >
                        {isAdding ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : isAdded ? (
                          <>
                            <CheckCircle2 size={16} /> কার্টে যোগ হয়েছে
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={16} /> কার্টে যোগ করুন
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-3xl border border-slate-200 dark:border-neutral-800">
            <PackageX size={56} className="mx-auto text-slate-300 dark:text-neutral-600 mb-4" />
            <h3 className="text-xl font-bold text-slate-700 dark:text-neutral-200">
              কোনো প্রোডাক্ট পাওয়া যায়নি
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              বর্তমানে "{slug}" ক্যাটাগরিতে কোনো প্রোডাক্ট এভেলেবল নেই।
            </p>
            <Link
              href="/categories"
              className="inline-block mt-5 px-6 py-2.5 rounded-2xl bg-[#800020] text-white text-sm font-semibold shadow-md hover:bg-[#600018] transition-all"
            >
              অন্য ক্যাটাগরি দেখুন
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}