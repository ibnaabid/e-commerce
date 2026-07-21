// app/shop/page.jsx
"use client";

import { useEffect, useState } from "react";
import { Loader2, Search, Leaf, ShieldCheck } from "lucide-react";
import Image from "next/image";

// ডাটাবেজের ক্যাটাগরি অনুযায়ী লিস্ট
const categories = [
  "All",
  "Bamboo",
  "Jute",
  "Hogla",
  "Shatranji",
  "Kaisa",
  "Other",
];

export default function EcoShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("");

  // 🔄 ক্যাটাগরি পরিবর্তন হলে ব্যাকএন্ড থেকে ডাটা ফেচ হবে
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const url =
          selectedCategory === "All"
            ? "http://localhost:5000/products"
            : `http://localhost:5000/products?category=${encodeURIComponent(
                selectedCategory
              )}`;

        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load products");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Could not connect to the server");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [selectedCategory]);

  // Client-side search and sorting
  const filteredProducts = products
    .filter((product) => {
      return (
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
        <div className="text-center p-8 backdrop-blur-xl bg-white/5 border border-red-500/20 rounded-2xl max-w-sm">
          <p className="text-red-400 font-semibold mb-2">Error occurred</p>
          <p className="text-xs text-neutral-500 mb-5">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2.5 text-xs text-white rounded-lg font-medium bg-emerald-600 hover:bg-emerald-500 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden text-neutral-100">
      {/* Background Effect */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4 text-xs font-medium text-emerald-400">
            <Leaf size={14} /> 100% Sustainable & Handcrafted
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-3">
            EcoWorld Marketplace
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Explore eco-friendly products made from natural materials.
          </p>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col lg:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500"
            />
            <input
              type="text"
              placeholder="Search eco products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none rounded-lg pl-10 pr-4 py-2.5 text-sm transition-colors"
            />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 focus:border-emerald-500 focus:outline-none transition-colors"
          >
            <option value="" className="bg-neutral-900">
              Sort by
            </option>
            <option value="low" className="bg-neutral-900">
              Price: Low to High
            </option>
            <option value="high" className="bg-neutral-900">
              Price: High to Low
            </option>
          </select>
        </div>

        {/* 🏷️ Dynamic Category Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-1 px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/40"
                  : "bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 📦 Product Grid / Loader */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="animate-spin text-emerald-400" size={36} />
            <p className="text-sm font-medium text-neutral-400">
              Filtering products...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-neutral-500">
            No products found for "{selectedCategory}".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group relative bg-neutral-900/80 border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-neutral-800 overflow-hidden">
                    <Image
                    height={700}
                    width={700}
                      src={
                        Array.isArray(product.images) && product.images.length > 0
                          ? product.images[0]
                          : "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck size={12} /> Eco Verified
                    </span>
                  </div>

                  <div className="p-4">
                    <span className="text-[11px] font-medium text-emerald-400 tracking-wider uppercase">
                      {Array.isArray(product.categories)
                        ? product.categories.join(", ")
                        : product.category || "Eco Product"}
                    </span>
                    <h3 className="text-base font-semibold text-white mt-1 capitalize line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                      {product.description ||
                        "Sustainable, zero-waste, and handcrafted eco essential."}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between border-t border-white/5 mt-3">
                  <span className="text-lg font-bold text-white">
                    ৳{product.price}
                  </span>
                  <button className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}