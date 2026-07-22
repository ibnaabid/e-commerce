'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Package, DollarSign, Layers, Loader2, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function UpdateProductModal({ isOpen, onClose, product, onUpdateSuccess }) {
  const [formData, setFormData] = useState({ 
    name: '', 
    price: '', 
    stock: '', 
    category: '' 
  });
  const [imageUrls, setImageUrls] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 🔄 Populating state when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        stock: product.stock || '',
        category: Array.isArray(product.categories) 
          ? product.categories.join(', ') 
          : product.category || '',
      });

      // Handle Image URLs (whether string or array)
      if (Array.isArray(product.images) && product.images.length > 0) {
        setImageUrls(product.images);
      } else if (typeof product.images === 'string' && product.images.trim() !== '') {
        setImageUrls([product.images]);
      } else {
        setImageUrls(['']);
      }

      setError('');
    }
  }, [product]);

  if (!isOpen) return null;

  // 🖼️ Dynamic Image Handlers
  const handleUrlChange = (index, value) => {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
  };

  const addUrlField = () => setImageUrls([...imageUrls, '']);

  const removeUrlField = (index) => {
    if (imageUrls.length > 1) {
      setImageUrls(imageUrls.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const filteredImages = imageUrls.filter((url) => url.trim() !== '');

    const payload = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      images: filteredImages,
    };

    try {
      const productId = product._id || product.id;
      const res = await fetch(`https://e-commerce-backend-kappa-nine.vercel.app/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('প্রোডাক্ট আপডেট করতে সমস্যা হয়েছে!');

      const resData = await res.json();
      
      // Construct updated object to ensure instant UI sync
      const updatedProduct = {
        ...product,
        ...payload,
        ...(resData.updatedProduct || resData.product || resData),
      };

      onUpdateSuccess(updatedProduct);
      onClose();
    } catch (err) {
      setError(err.message || 'কিছু একটা ভুল হয়েছে!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-neutral-900 w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-neutral-800 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-100 dark:border-neutral-800 pb-4 sticky top-0 bg-white dark:bg-neutral-900 z-10">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-[#800020]" /> প্রোডাক্ট আপডেট করুন
            </h3>
            <button 
              onClick={onClose} 
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <p className="text-xs font-bold text-rose-500 mt-3 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-xl border border-rose-200 dark:border-rose-900">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Title Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">প্রোডাক্টের নাম</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-sm focus:outline-none focus:border-[#2D5A27]"
                required
              />
            </div>

            {/* Price and Stock Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">মূল্য (৳)</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-sm focus:outline-none focus:border-[#2D5A27]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">স্টক পরিমাণ</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-sm focus:outline-none focus:border-[#2D5A27]"
                  required
                />
              </div>
            </div>

            {/* Category Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">ক্যাটাগরি</label>
              <div className="relative">
                <Layers className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-sm focus:outline-none focus:border-[#2D5A27]"
                  required
                />
              </div>
            </div>

            {/* Image URLs Section */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#2D5A27]" /> ছবির লিঙ্ক (Image URLs)
                </label>
                <button
                  type="button"
                  onClick={addUrlField}
                  className="text-[11px] text-[#2D5A27] dark:text-emerald-400 font-bold flex items-center gap-1 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" /> আরও লিঙ্ক
                </button>
              </div>

              <div className="space-y-2">
                {imageUrls.map((url, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleUrlChange(idx, e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="flex-1 px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-xs focus:outline-none focus:border-[#2D5A27]"
                    />
                    {imageUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeUrlField(idx)}
                        className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Live Preview */}
              {imageUrls.some((u) => u.trim() !== '') && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {imageUrls.map(
                    (url, idx) =>
                      url.trim() !== '' && (
                        <div key={idx} className="relative w-14 h-14 rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-700 shrink-0">
                          <Image src={url} alt="Update Preview" fill unoptimized className="object-cover" />
                        </div>
                      )
                  )}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 font-bold text-xs hover:bg-gray-200 transition"
              >
                বাতিল
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-[#2D5A27] hover:bg-[#1B3B18] text-white font-bold text-xs transition shadow-md flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                সেভ করুন
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}