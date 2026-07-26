'use client';

import { useEffect, useState, useMemo } from "react";
import { Loader2, Search, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";

export default function EcoShopPage({ selectedCategory = "All" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://e-commerce-backend-kappa-nine.vercel.app/products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "All" ||
          product.category?.toLowerCase() === selectedCategory.toLowerCase() ||
          (Array.isArray(product.categories) &&
            product.categories.some(
              (c) => c.toLowerCase() === selectedCategory.toLowerCase()
            ));

        const query = search.toLowerCase().trim();
        const matchesSearch =
          !query ||
          product.name?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sort === "low") return a.price - b.price;
        if (sort === "high") return b.price - a.price;
        return 0;
      });
  }, [products, selectedCategory, search, sort]);

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Showing {filteredProducts.length} results
            </p>
          </div>

          {/* Search & Sort Container */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition"
              />
            </div>

            {/* Sort Select */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full sm:w-auto bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition cursor-pointer"
            >
              <option value="">Sort by</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Dynamic States */}
        {loading ? (
          <div className="flex justify-center items-center py-24 text-gray-400">
            <Loader2 className="animate-spin" size={28} />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-sm text-red-500 font-medium">{error}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm">No products found</div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-xl border border-gray-200/80 overflow-hidden hover:shadow-lg hover:border-gray-300 transition duration-300 flex flex-col justify-between"
              >
                {/* Product Image */}
                <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={product.images?.[0] || "https://placehold.co/600x600?text=Product"}
                    alt={product.name || "Product"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-500 ease-out"
                  />
                </div>

                {/* Product Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-1 group-hover:text-black transition">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Responsive Actions Footer */}
                  <div className="pt-3  border-gray-100 flex items-center justify-center gap-2">
                    <AddToCart product={product} />

                    {/* Responsive View Details Eye Button */}
                    <Link
                      href={`/Shop/${product._id}`}
                      className="h-8 w-10 mr-4 sm:h-8 sm:w-8 flex items-center justify-center border border-gray-200 bg-slate-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900 rounded-lg transition active:scale-95 shrink-0"
                      title="View Details"
                    >
                      <Eye size={17} /> 
                    </Link>
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