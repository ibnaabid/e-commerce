"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppCartBtn({ cartItems = [], totalAmount = 0 }) {
  const rawPhoneNumber = "880 1823-633271";
  const phoneNumber = rawPhoneNumber.replace(/[^0-9]/g, "");

  const hasItems = Array.isArray(cartItems) && cartItems.length > 0;

  let customMessage = "";

  if (hasItems) {
    const productLines = cartItems
      .map((item, index) => {
        const name = item.name || item.title || "Product";
        const qty = item.quantity || 1;
        const price = item.price || 0;
        const image = item.image || item.img || item.thumbnail || null;
        const id = item._id || item.id || "N/A";

        return (
          `*${index + 1}. ${name}*\n` +
          `🆔 ID: ${id}\n` +
          `📦 Quantity: ${qty}\n` +
          `💰 Price: ৳${price}\n` +
          (image ? `🖼️ Image: ${image}\n` : "")
        );
      })
      .join("\n");

    customMessage =
      `হ্যালো EcoWorld! 👋\n\n` +
      `আমি অর্ডার দিতে চাই। নিচে আমার Cart-এর সম্পূর্ণ বিস্তারিত:\n\n` +
      `🛒 *Cart Details:*\n\n` +
      `${productLines}\n` +
      `────────────────────\n` +
      `💵 *Total Amount: ৳${totalAmount}*\n\n` +
      `দয়া করে অর্ডার কনফার্ম করে দিন অথবা আরও বিস্তারিত জানান। ধন্যবাদ! 🙏`;
  } else {
    customMessage =
      "হ্যালো EcoWorld! 👋\nআমি কিছু প্রোডাক্ট সম্পর্কে জানতে চাই। সাহায্য করবেন?";
  }

  const encodedMessage = encodeURIComponent(customMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-3 rounded-full shadow-2xl shadow-emerald-950/80 transition-all duration-300 hover:scale-105 border border-emerald-400/30 backdrop-blur-md"
      title="Order via WhatsApp"
    >
      <div className="relative flex items-center justify-center">
        <MessageCircle size={24} className="fill-white/20 stroke-white" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-300"></span>
        </span>
      </div>
      <span className="text-sm font-medium tracking-wide pr-1">
        {hasItems ? "Order on WhatsApp" : "Chat with us"}
      </span>
    </a>
  );
}