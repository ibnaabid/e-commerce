'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Star, 
  Loader2, 
  PackageX, 
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  Plus,
  Minus
} from 'lucide-react';
// import { useSession } from '@/app/lib/auth-client';
import toast from 'react-hot-toast';
import { useSession } from '@/app/lib/auth-client';
import FavoriteBtn from '@/app/Shop/[id]/Favbtn';

export default function CategoryProductsPage({ params }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // প্রোডাক্ট অনুযায়ী Quantity ট্রাক রাখার জন্য State (e.g., { productId: quantity })
  const [quantities, setQuantities] = useState({});
  const [addingId, setAddingId] = useState(null);
  const [addedId, setAddedId] = useState(null);

  // ১. স্লাগ অনুযায়ী ব্যাকএন্ড এপিআই থেকে প্রোডাক্ট ফেচ
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(`https://e-commerce-backend-kappa-nine.vercel.app/products?category=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
          
          // ডিফল্ট Quantity 1 সেট করা
          const initialQuantities = {};
          data.forEach(p => {
            initialQuantities[p._id] = 1;
          });
          setQuantities(initialQuantities);
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

  // ➕/➖ Quantity চেঞ্জ হ্যান্ডলার
  const handleQuantityChange = (productId, delta) => {
    setQuantities(prev => {
      const currentQty = prev[productId] || 1;
      const newQty = Math.max(1, currentQty + delta); // সর্বনিম্ন ১ পিস
      return { ...prev, [productId]: newQty };
    });
  };

  // 🛒 Add to Cart হ্যান্ডলার (Quantity সহ)
  const handleAddToCart = async (product) => {
    if (!userEmail) {
      toast.error("কার্টে প্রোডাক্ট যোগ করতে অনুগ্রহ করে লগইন করুন।");
      return;
    }

    const selectedQuantity = quantities[product._id] || 1;
    setAddingId(product._id);

    try {
      const res = await fetch(`https://e-commerce-backend-kappa-nine.vercel.app/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: userEmail, // 👈 ব্যাকএন্ডের জন্য userEmail পাঠানো হলো
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: selectedQuantity
        })
      });

      if (res.ok) {
        // নেভবার আপডেট করার ইভেন্ট
        window.dispatchEvent(new Event("cartUpdated"));
        
        setAddedId(product._id);
        setTimeout(() => setAddedId(null), 2500);
      } else {
        const errData = await res.json();
        toast.error(errData.message || "কার্টে যোগ করা সম্ভব হয়নি।");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-neutral-950 py-8 px-4 sm:px-6 lg:px-12 text-slate-800 dark:text-neutral-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* 🔙 BREADCRUMB & BACK BUTTON */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            href="/categories" 
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-slate-200/80 dark:border-neutral-800 hover:border-[#800020] dark:hover:border-emerald-500 text-xs font-bold transition-all shadow-sm hover:shadow-md group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-[#800020] dark:text-emerald-400" /> 
            সকল ক্যাটাগরি
          </Link>
          <span className="text-xs font-semibold text-slate-400 capitalize tracking-wider">
            Shop / <span className="text-[#800020] dark:text-emerald-400 font-bold">{slug}</span>
          </span>
        </div>

        {/* 🌿 HERO BANNER */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#800020] via-[#5A0016] to-[#1e3e1b] p-8 sm:p-12 text-white mb-8 shadow-xl border border-white/10">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -left-10 -top-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-[11px] uppercase tracking-widest text-amber-300 font-extrabold mb-3 backdrop-blur-md">
              <Sparkles size={13} /> এক্সক্লুসিভ কালেকশন
            </span>
            <h1 className="text-3xl sm:text-5xl font-black capitalize tracking-tight text-white drop-shadow-sm">
              {slug} Collection
            </h1>
            <p className="text-amber-100/90 text-sm sm:text-base mt-2 max-w-xl font-normal leading-relaxed">
              আমাদের ১০০% পরিবেশবান্ধব ও টেকসই {slug} পণ্যসামগ্রী থেকে আপনার পছন্দের পণ্যটি বেছে নিন।
            </p>
          </div>
        </div>

        {/* ⚙️ STATS & FILTER BAR */}
        <div className="flex items-center justify-between bg-white dark:bg-neutral-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-neutral-800 shadow-sm mb-8">
          <div className="flex items-center gap-2.5 text-xs font-bold text-slate-600 dark:text-neutral-300">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-neutral-800 text-[#800020] dark:text-emerald-400">
              <SlidersHorizontal size={16} />
            </div>
            <span>মোট পণ্য: <strong className="text-slate-900 dark:text-white text-sm">{products.length} টি</strong></span>
          </div>
        </div>

        {/* 🛍️ PRODUCT GRID / LOADING / EMPTY */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-28">
            <Loader2 size={44} className="animate-spin text-[#800020] dark:text-emerald-400 mb-4" />
            <p className="text-xs font-bold text-slate-400 tracking-wider uppercase animate-pulse">প্রোডাক্ট লোড হচ্ছে...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, idx) => {
              const isAdding = addingId === product._id;
              const isAdded = addedId === product._id;
              const currentQty = quantities[product._id] || 1;

              return (
                <motion.div
                  key={product._id || idx}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="group relative bg-white dark:bg-neutral-900 rounded-3xl border border-slate-200/80 dark:border-neutral-800/80 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-56 bg-slate-100 dark:bg-neutral-800 overflow-hidden">
                    <Image
                      src={product.image || "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=80"}
                      alt={product.name || "Product"}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-[#800020] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md backdrop-blur-md">
                        {product.badge}
                      </span>
                    )}

                   <FavoriteBtn product={product}/>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-amber-400 mb-2">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-bold text-slate-700 dark:text-neutral-300">
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

                    {/* Price & Actions */}
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-neutral-800">
                      
                      {/* Price Display */}
                      <div className="flex items-baseline justify-between mb-4">
                        <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">মূল্য</span>
                        <div className="text-right">
                          <span className="text-xl font-black text-[#800020] dark:text-emerald-400">
                            ৳ {(product.price * currentQty).toLocaleString()}
                          </span>
                          {currentQty > 1 && (
                            <span className="block text-[10px] text-slate-400 font-medium">
                              (৳{product.price} × {currentQty})
                            </span>
                          )}
                        </div>
                      </div>

                      {/* 🔢 QUANTITY SELECTOR BAR */}
                      <div className="flex items-center justify-between bg-slate-100 dark:bg-neutral-800/80 p-1 rounded-xl mb-3 border border-slate-200/50 dark:border-neutral-700/50">
                        <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400 pl-2">পরিমাণ:</span>
                        <div className="flex items-center gap-1 bg-white dark:bg-neutral-900 rounded-lg p-0.5 shadow-sm border border-slate-200 dark:border-neutral-700">
                          <button
                            onClick={() => handleQuantityChange(product._id, -1)}
                            disabled={currentQty <= 1}
                            className="p-1 rounded-md text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all active:scale-90"
                          >
                            <Minus size={14} />
                          </button>
                          
                          <span className="w-7 text-center font-bold text-xs text-slate-800 dark:text-neutral-100">
                            {currentQty}
                          </span>

                          <button
                            onClick={() => handleQuantityChange(product._id, 1)}
                            className="p-1 rounded-md text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-all active:scale-90"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* 🛒 Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={isAdding}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs transition-all duration-300 shadow-md active:scale-98 ${
                          isAdded
                            ? "bg-emerald-600 text-white shadow-emerald-600/20"
                            : "bg-slate-900 dark:bg-neutral-800 hover:bg-[#800020] dark:hover:bg-emerald-600 text-white shadow-slate-900/10"
                        }`}
                      >
                        {isAdding ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : isAdded ? (
                          <motion.span 
                            initial={{ scale: 0.8 }} 
                            animate={{ scale: 1 }} 
                            className="inline-flex items-center gap-1.5"
                          >
                            <CheckCircle2 size={16} /> কার্টে যোগ হয়েছে!
                          </motion.span>
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
          <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-3xl border border-slate-200 dark:border-neutral-800 shadow-sm">
            <PackageX size={56} className="mx-auto text-slate-300 dark:text-neutral-600 mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-slate-700 dark:text-neutral-200">
              কোনো প্রোডাক্ট পাওয়া যায়নি
            </h3>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
              বর্তমানে "{slug}" ক্যাটাগরিতে কোনো প্রোডাক্ট এভেলেবল নেই।
            </p>
            <Link
              href="/categories"
              className="inline-block mt-6 px-6 py-2.5 rounded-2xl bg-[#800020] text-white text-xs font-bold shadow-md hover:bg-[#600018] transition-all active:scale-95"
            >
              অন্যান্য ক্যাটাগরি দেখুন
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}