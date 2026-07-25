'use client';

import { useState } from "react";
import { ShoppingCart, Plus, Minus, Loader2 } from "lucide-react";
import { useSession } from "../lib/auth-client";

export default function AddToCart({ product }) {
  const { data: session } = useSession();

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const userEmail = session?.user?.email || null;
  const totalPrice = Number(product?.price || 0) * quantity;

  const handleQuantityChange = (e, type) => {
    e.preventDefault();
    e.stopPropagation();

    setQuantity((prev) => {
      if (type === "plus") return prev + 1;
      if (type === "minus") return Math.max(1, prev - 1);
      return prev;
    });
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userEmail) {
      alert("Please login to add items to cart!");
      return;
    }

    setIsAdding(true);

    const cartItem = {
      productId: product?._id,
      name: product?.name,
      price: Number(product?.price || 0),
      quantity,
      totalPrice,
      image:
        Array.isArray(product?.images) && product.images.length > 0
          ? product.images[0]
          : product?.image || "",
      userEmail,
    };

    try {
      const res = await fetch(
        "https://e-commerce-backend-kappa-nine.vercel.app/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItem),
        }
      );

      if (res.ok) {
        window.dispatchEvent(new Event("cartUpdated"));
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
    <div
      className="flex items-center gap-1.5"
      onClick={(e) => e.stopPropagation()}
    >
      
      <span className="text-gray-800 px-3 font-bold "> ৳{Number(product.price) * quantity}</span>
      {/* Quantity Selector */}
      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50/50 p-0.5">
        <button
          type="button"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => handleQuantityChange(e, "minus")}
          disabled={quantity <= 1}
          className="w-7 h-7 flex items-center justify-center hover:bg-white text-gray-600 rounded-md transition active:scale-90 disabled:opacity-40"
        >
          <Minus size={13} />
        </button>
        

        <span className="text-xs font-semibold text-gray-800 w-6 text-center select-none">
          {quantity}
        </span>

        <button
          type="button"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => handleQuantityChange(e, "plus")}
          className="w-7 h-7 flex items-center justify-center hover:bg-white text-gray-600 rounded-md transition active:scale-90"
        >
          <Plus size={13} />
        </button>
      </div>
      

      {/* Add to Cart Button */}
<button
  type="button"
  onClick={handleAddToCart}
  disabled={isAdding}
  className="h-8 px-6 bg-gray-900 hover:bg-black disabled:bg-gray-200 text-white disabled:text-gray-400 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition active:scale-95 disabled:cursor-not-allowed"
>
  {isAdding ? (
    <Loader2 size={14} className="animate-spin" />
  ) : (
    <>
      <ShoppingCart size={17} />
      Add
      
    </>
    
    
  )}
  
</button>
    </div>
  );
}