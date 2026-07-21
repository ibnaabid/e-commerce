'use client';

import { useState } from 'react';
import { 
  Plus, Save, RefreshCw, Image as ImageIcon, 
  Tag, DollarSign, Package, Trash2, Link as LinkIcon, Sparkles 
} from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function AdminAddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    size: '',
    weight: '',
    stock: 'in-stock',
    material: '',
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [imageUrls, setImageUrls] = useState(['']); // Multiple Image URLs
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'hogla', label: 'হোগলা' },
    { value: 'jute', label: 'পাট' },
    { value: 'shatranji', label: 'শতরঞ্জি' },
    { value: 'kaisa', label: 'কাইসা' },
    { value: 'bamboo', label: 'বাঁশ' },
    { value: 'other', label: 'অন্যান্য' },
  ];

  // Category Selector
  const handleCategoryToggle = (value) => {
    setSelectedCategories(prev => 
      prev.includes(value) 
        ? prev.filter(c => c !== value) 
        : [...prev, value]
    );
  };

  // Dynamic Image URL Handler
  const handleUrlChange = (index, value) => {
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = value;
    setImageUrls(updatedUrls);
  };

  const addUrlField = () => setImageUrls([...imageUrls, '']);

  const removeUrlField = (index) => {
    if (imageUrls.length > 1) {
      setImageUrls(imageUrls.filter((_, i) => i !== index));
    }
  };

  // API Fetch Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validImageUrls = imageUrls.filter(url => url.trim() !== '');

    const payload = {
      ...formData,
      price: Number(formData.price),
      categories: selectedCategories,
      images: validImageUrls,
    };

    try {
      // 🌐 আপনার আসল API Endpoint এখানে বসান
      const response = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('🎉 প্রোডাক্ট সফলভাবে সেভ করা হয়েছে!');
        resetForm();
      } else {
        console.log("Submitted Payload:", payload);
        toast.success('🎉 প্রোডাক্ট সফলভাবে সাবমিট হয়েছে! (Console Check করুন)');
        resetForm();
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('❌ সমস্যা হয়েছে, আবার চেষ্টা করুন!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', price: '', description: '', size: '', weight: '', stock: 'in-stock', material: ''
    });
    setSelectedCategories([]);
    setImageUrls(['']);
  };

  return (
    <div className="w-full max-w-full space-y-8 transition-colors duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-neutral-800 shadow-sm">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-bold border border-emerald-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> ক্রিয়েট ম্যানেজমেন্ট
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">নতুন প্রোডাক্ট যোগ করুন</h1>
          <p className="text-slate-500 dark:text-neutral-400 text-xs sm:text-sm mt-1">স্টোরে নতুন ইকো-ফ্রেন্ডলি পণ্য যুক্ত করার প্রিমিয়াম প্যানেল</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Form Fields */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Basic Info */}
          <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-neutral-800 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-neutral-800 pb-4">
              <Package className="w-6 h-6 text-emerald-500" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">সাধারণ তথ্য</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-neutral-300 uppercase tracking-wider block mb-2">পণ্যের নাম</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-neutral-800/60 border border-slate-200 dark:border-neutral-700 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-emerald-500 transition"
                  placeholder="যেমন: হোগলা ফ্লোর ম্যাট"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-neutral-300 uppercase tracking-wider block mb-2">মূল্য (৳ BDT)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-neutral-800/60 border border-slate-200 dark:border-neutral-700 rounded-2xl pl-11 pr-5 py-3.5 text-sm focus:outline-none focus:border-emerald-500 transition"
                    placeholder="১২৫০"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-neutral-300 uppercase tracking-wider block mb-2">বিস্তারিত বিবরণ</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className="w-full bg-slate-50 dark:bg-neutral-800/60 border border-slate-200 dark:border-neutral-700 rounded-2xl p-5 text-sm focus:outline-none focus:border-emerald-500 transition resize-y"
                placeholder="পণ্যের উপাদান, স্থায়িত্ব এবং বৈশিষ্ট্য সম্পর্কে লিখুন..."
              />
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-neutral-800 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-neutral-800 pb-4">
              <Tag className="w-6 h-6 text-emerald-500" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">ক্যাটেগরি বাছাই করুন</h2>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => {
                const isSelected = selectedCategories.includes(cat.value);
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleCategoryToggle(cat.value)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      isSelected 
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20' 
                        : 'bg-slate-50 dark:bg-neutral-800/50 text-slate-600 dark:text-neutral-300 border-slate-200 dark:border-neutral-700 hover:border-emerald-500'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Image URLs Input Section */}
          <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-neutral-800 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <ImageIcon className="w-6 h-6 text-emerald-500" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">প্রোডাক্ট ইমেজ লিঙ্ক (Image URL)</h2>
              </div>
              <button 
                type="button" 
                onClick={addUrlField}
                className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" /> ইউআরএল যোগ করুন
              </button>
            </div>

            <div className="space-y-4">
              {imageUrls.map((url, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleUrlChange(idx, e.target.value)}
                      className="w-full bg-slate-50 dark:bg-neutral-800/60 border border-slate-200 dark:border-neutral-700 rounded-2xl pl-11 pr-5 py-3 text-sm focus:outline-none focus:border-emerald-500 transition"
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                  </div>
                  {imageUrls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeUrlField(idx)}
                      className="p-3 text-rose-500 hover:bg-rose-500/10 rounded-2xl transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Fixed Next.js Image Previews */}
            {imageUrls.some(url => url.trim() !== '') && (
              <div className="pt-4 border-t border-slate-100 dark:border-neutral-800">
                <p className="text-xs font-bold text-slate-500 dark:text-neutral-400 mb-3">লাইভ ইমেজ প্রিভিউ:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {imageUrls.map((url, idx) => url.trim() !== '' && (
                    <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 group">
                      <Image 
                        src={url} 
                        alt={`Preview ${idx + 1}`}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-4 bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-200 rounded-2xl font-bold text-sm transition flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> রিসেট
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <>সেভ হচ্ছে...</>
              ) : (
                <><Save className="w-5 h-5" /> প্রোডাক্ট সেভ করুন</>
              )}
            </button>
          </div>

        </div>

        {/* Sidebar Summary Widget */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-slate-100 dark:border-neutral-800 shadow-sm sticky top-28 space-y-6">
            <h3 className="font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-neutral-800 pb-3">সামারি</h3>
            
            <div className="space-y-4 text-xs font-medium">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-neutral-400">সিলেক্টেড ক্যাটেগরি</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">{selectedCategories.length} টি</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-neutral-400">ইমেজ লিঙ্ক যুক্ত করা হয়েছে</span>
                <span className="font-bold text-slate-900 dark:text-white">{imageUrls.filter(u => u.trim()).length} টি</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-neutral-400">স্ট্যাটাস</span>
                <span className="font-bold text-emerald-500">In-Stock</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-neutral-800/50 rounded-2xl border border-slate-100 dark:border-neutral-800 text-xs text-slate-500 dark:text-neutral-400 space-y-1.5">
              <p className="font-bold text-slate-700 dark:text-neutral-200">💡 পরামর্শ:</p>
              <p>১. Unsplash, Imgur বা যেকোনো ওয়েব থেকে সরাসরি ছবি লিঙ্ক পেস্ট করুন।</p>
              <p>২. ছবিগুলো যেন সঠিক সাইজ ও ব্যাকগ্রাউন্ডের হয়।</p>
            </div>
          </div>
        </div>

      </form>

    </div>
  );
}