'use client';

import { useEffect, useState, useMemo } from "react";
import { Loader2, Search, Leaf, ShieldCheck, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";

// 🟢 ১. selectedCategory কে প্রপ্স হিসেবে রিসিভ করা হলো
export default function EcoShopPage({ selectedCategory = "All" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // ব্যাকএন্ড থেকে সব প্রোডাক্ট একসাথে ফেচ করা সবচেয়ে সেফ
        const res = await fetch("https://e-commerce-backend-kappa-nine.vercel.app/products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // ব্যাকএন্ড এপিআই নির্ভরযোগ্য রাখতে একবার ফেচ হবে

  // 🟢 ২. Category, Search & Sort নিখুঁত ফিল্টারিং logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // A. Category Filter (Case-insensitive check)
        const matchesCategory =
          selectedCategory === "All" ||
          product.category?.toLowerCase() === selectedCategory.toLowerCase() ||
          (Array.isArray(product.categories) &&
            product.categories.some(
              (c) => c.toLowerCase() === selectedCategory.toLowerCase()
            ));

        // B. Search Filter
        const query = search.toLowerCase().trim();
        const matchesSearch =
          !query ||
          product.name?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        // C. Sorting Logic
        if (sort === "low") return a.price - b.price;
        if (sort === "high") return b.price - a.price;
        return 0;
      });
  }, [products, selectedCategory, search, sort]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Subtle Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-950/20 via-transparent to-teal-950/20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-900/50 border border-emerald-500/30 rounded-full text-sm mb-6">
            <Leaf className="text-emerald-400" size={18} />
            100% Natural • Handcrafted in Bangladesh
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">
            Discover EcoWorld
          </h1>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">
            Sustainable products made with love for our planet
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 bg-neutral-900/70 backdrop-blur-xl p-5 rounded-3xl border border-white/10 sticky top-4 z-40">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
            <input
              type="text"
              placeholder="Search natural products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-neutral-800 border border-white/10 focus:border-emerald-500 rounded-2xl pl-12 py-3.5 placeholder:text-neutral-500 focus:outline-none text-white"
            />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-neutral-800 border border-white/10 rounded-2xl px-6 py-3.5 focus:border-emerald-500 focus:outline-none text-white"
          >
            <option value="">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="animate-spin text-emerald-500" size={55} />
            <p className="mt-6 text-neutral-400">Loading beautiful products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-28">
            <p className="text-2xl text-neutral-400">
              No products found for "{selectedCategory}"
            </p>
            <p className="text-neutral-500 mt-2">Try selecting another category or clearing search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden hover:border-emerald-500/60 hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={product.images?.[0] || "https://placehold.co/600x600?text=Eco+Product"}
                    alt={product.name || "Product Image"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    Verified
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-emerald-400 text-xs tracking-widest font-medium capitalize">
                      {product.category}
                    </span>

                    <h3 className="font-semibold text-xl mt-2 line-clamp-2 text-white">
                      {product.name}
                    </h3>

                    <p className="text-neutral-400 text-sm mt-3 line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-3xl font-bold text-white">৳{product.price}</span>

                    <div className="flex gap-3">
                      <AddToCart product={product} />
                      <Link
                        href={`/Shop/${product._id}`}
                        className="h-11 w-14 flex items-center justify-center border border-white/20 rounded-2xl hover:bg-white/10 transition text-white"
                        title="View Product"
                      >
                        <Eye size={20} /> 
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}