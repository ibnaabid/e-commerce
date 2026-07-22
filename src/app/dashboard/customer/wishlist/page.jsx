"use client";

import { useEffect, useState, useCallback } from "react";
// import { useSession } from "next-auth/react";
import { Heart, Trash2, ShoppingCart, ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/app/lib/auth-client";

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [cartAddingId, setCartAddingId] = useState(null);

  // 📡 Fetch Wishlist Items
  const fetchWishlist = useCallback(async () => {
    if (!userEmail) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/wishlist?email=${userEmail}`);
      if (res.ok) {
        const data = await res.json();
        setWishlistItems(data);
      }
    } catch (err) {
      console.error("Wishlist fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    if (status !== "loading") {
      fetchWishlist();
    }
  }, [status, fetchWishlist]);

  // 🗑️ Delete Item from Wishlist
  const handleDelete = async (id) => {
    setActionLoading(id);
    try {
      const res = await fetch(`http://localhost:5000/wishlist/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setWishlistItems((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // 🛒 Add to Cart from Wishlist
  const handleAddToCart = async (item) => {
    if (!userEmail) return;
    setCartAddingId(item._id);

    const cartItem = {
      productId: item.productId,
      name: item.name,
      price: Number(item.price) || 0,
      quantity: 1,
      totalPrice: Number(item.price) || 0,
      image: item.image || "",
      userEmail: userEmail,
    };

    try {
      const res = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      });

      if (res.ok) {
        window.dispatchEvent(new Event("cartUpdated"));
        alert("Added to cart successfully!");
      }
    } catch (err) {
      console.error("Cart error:", err);
    } finally {
      setCartAddingId(null);
    }
  };

  // 🔄 Loading State
  if (status === "loading" || loading) {
    return (
      <div className="min-h-[70vh] bg-neutral-950 flex flex-col items-center justify-center gap-3 text-white">
        <Loader2 className="animate-spin text-emerald-400" size={36} />
        <p className="text-sm text-neutral-400 font-medium">Loading your wishlist...</p>
      </div>
    );
  }

  // 🔒 Not Logged In State
  if (!userEmail) {
    return (
      <div className="min-h-[70vh] bg-neutral-950 flex items-center justify-center px-4 text-white">
        <div className="text-center p-8 bg-neutral-900/80 border border-white/10 rounded-3xl max-w-md w-full">
          <Heart className="mx-auto text-red-400 mb-4" size={48} />
          <h2 className="text-2xl font-bold mb-2">Please Login First</h2>
          <p className="text-neutral-400 text-sm mb-6">
            You need to be logged in to view your saved favorite items.
          </p>
          <Link
            href="/login"
            className="inline-block w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 font-semibold rounded-2xl transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <Heart className="text-red-500 fill-red-500" /> My Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              You have {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400 hover:text-emerald-400 transition"
          >
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        {wishlistItems.length === 0 ? (
          /* 💔 Empty Wishlist State */
          <div className="text-center py-20 bg-neutral-900/50 border border-white/5 rounded-3xl">
            <Heart className="mx-auto text-neutral-600 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-white mb-2">Your wishlist is empty</h3>
            <p className="text-neutral-400 text-sm mb-6">
              Explore our shop and save items you like to view later.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 font-semibold rounded-xl text-white transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          /* 📋 Wishlist Table */
          <div className="overflow-x-auto bg-neutral-900/80 border border-white/10 rounded-2xl shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-wider text-neutral-400">
                  <th className="p-4 sm:p-5">Product</th>
                  <th className="p-4 sm:p-5">Price</th>
                  <th className="p-4 sm:p-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {wishlistItems.map((item) => (
                  <tr key={item._id} className="hover:bg-white/[0.02] transition">
                    
                    {/* Product Info */}
                    <td className="p-4 sm:p-5">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 bg-neutral-800 rounded-xl overflow-hidden shrink-0 border border-white/10">
                          <Image
                            src={item.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500"}
                            alt={item.name || "Product"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link 
                            href={`/shop/${item.productId}`}
                            className="font-semibold text-white hover:text-emerald-400 transition line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <span className="text-xs text-neutral-500 block mt-0.5">
                            Added on wishlist
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-4 sm:p-5 font-bold text-emerald-400 text-base">
                      ৳{item.price}
                    </td>

                    {/* Actions */}
                    <td className="p-4 sm:p-5">
                      <div className="flex items-center justify-center gap-3">
                        {/* Quick Add to Cart */}
                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={cartAddingId === item._id}
                          className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-xl text-xs font-semibold border border-emerald-500/30 transition disabled:opacity-50"
                        >
                          {cartAddingId === item._id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <ShoppingCart size={16} />
                          )}
                          <span className="hidden sm:inline">Add to Cart</span>
                        </button>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleDelete(item._id)}
                          disabled={actionLoading === item._id}
                          className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition disabled:opacity-50"
                          title="Remove from Wishlist"
                        >
                          {actionLoading === item._id ? (
                            <Loader2 size={18} className="animate-spin text-red-400" />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}