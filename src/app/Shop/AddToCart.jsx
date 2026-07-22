'use client';

import { useState } from "react";
import { ShoppingCart, Plus, Minus, Loader2 } from "lucide-react";
import { useSession } from "../lib/auth-client";
// import { useSession } from "next-auth/react"; // 👈 NextAuth Session Hook

export default function AddToCart({ product }) {
  const { data: session } = useSession(); // 👈 Session থেকে ইউজার ডাটা

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const userEmail = session?.user?.email || null;
  const totalPrice = (product?.price || 0) * quantity;

  const handleQuantityChange = (type) => {
    if (type === "plus") {
      setQuantity((prev) => prev + 1);
    } else if (type === "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // 🚀 Direct API Call Handler
  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (!userEmail) {
      alert("Please login to add items to cart!");
      return;
    }

    setIsAdding(true);

    const cartItem = {
      productId: product?._id,
      name: product?.name,
      price: product?.price,
      quantity: quantity,
      totalPrice: totalPrice,
      image: Array.isArray(product?.images) && product.images.length > 0 
        ? product.images[0] 
        : product?.image || "",
      userEmail: userEmail,
    };

    try {
      // 📡 Backend API Call
      const res = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });

      if (res.ok) {
        // 🔔 নেভবার কার্ট আইকন রিয়েল-টাইম আপডেট করার কাস্টম ইভেন্ট
        window.dispatchEvent(new Event("cartUpdated"));
        alert("Added to cart successfully!");
      } else {
        const errorData = await res.json();
        alert(errorData?.message || "Failed to add to cart!");
      }
    } catch (err) {
      console.error("Cart API Error:", err);
      alert("Could not connect to the server!");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="w-full">
      {/* Quantity Selector */}
      <div className="flex items-center justify-between bg-neutral-800 rounded-2xl p-1 mb-3">
        <button
          type="button"
          onClick={() => handleQuantityChange("minus")}
          className="w-9 h-9 flex items-center justify-center hover:bg-neutral-700 rounded-xl transition text-white active:scale-90"
        >
          <Minus size={18} />
        </button>

        <span className="font-semibold text-lg text-white min-w-[30px] text-center">
          {quantity}
        </span>

        <button
          type="button"
          onClick={() => handleQuantityChange("plus")}
          className="w-9 h-9 flex items-center justify-center hover:bg-neutral-700 rounded-xl transition text-white active:scale-90"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Total Price + Add Button */}
      <div className="flex flex-col gap-2">
        <div className="text-right text-sm">
          <span className="text-neutral-400">Total: </span>
          <span className="font-bold text-emerald-400 text-xl">৳{totalPrice}</span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAdding || !userEmail}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-neutral-700 disabled:text-neutral-400 text-white font-medium py-3.5 rounded-2xl flex items-center justify-center gap-2 transition active:scale-[0.97] disabled:cursor-not-allowed"
        >
          {isAdding ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        {!userEmail && (
          <p className="text-center text-xs text-red-400 mt-1 font-medium">
            Login to add to cart
          </p>
        )}
      </div>
    </div>
  );
}