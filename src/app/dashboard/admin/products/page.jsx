'use client';

import { useState } from 'react';
import { 
  Leaf, Plus, Save, RefreshCw, Image as ImageIcon, 
  Tag, DollarSign, Package 
} from 'lucide-react';
import Image from 'next/image';

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
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'hogla', label: 'হোগলা' },
    { value: 'jute', label: 'পাট' },
    { value: 'shatranji', label: 'শতরঞ্জি' },
    { value: 'kaisa', label: 'কাইসা' },
    { value: 'bamboo', label: 'বাঁশ' },
    { value: 'other', label: 'অন্যান্য' },
  ];

  const handleCategoryToggle = (value) => {
    setSelectedCategories(prev => 
      prev.includes(value) 
        ? prev.filter(c => c !== value) 
        : [...prev, value]
    );
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 6);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Product Data:", { ...formData, categories: selectedCategories });
      alert('🎉 প্রোডাক্ট সফলভাবে যোগ করা হয়েছে!');
      setIsSubmitting(false);
      resetForm();
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      name: '', price: '', description: '', size: '', weight: '', stock: 'in-stock', material: ''
    });
    setSelectedCategories([]);
    setPreviews([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      {/* Admin Topbar */}
      <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-700 text-white p-3 rounded-2xl">
              <Leaf className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ইকো ওয়ার্ল্ড অ্যাডমিন</h1>
              <p className="text-sm text-gray-500">প্রোডাক্ট ম্যানেজমেন্ট</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              অনলাইন
            </div>
            <button className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-medium transition">
              ড্যাশবোর্ড
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-800">নতুন প্রোডাক্ট যোগ করুন</h2>
            <p className="text-gray-600 mt-2">সুন্দর, টেকসই ও ইকো-ফ্রেন্ডলি পণ্য যোগ করুন</p>
          </div>
        
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-10">
              {/* Product Basic Info */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-2xl font-semibold text-gray-800">প্রোডাক্টের তথ্য</h3>
                </div>

                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">পণ্যের নাম</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-emerald-200 transition-all"
                        placeholder="হোগলা ফ্লোর ম্যাট"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">দাম (টাকা)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-6 top-5 text-gray-400" />
                        <input
                          type="number"
                          required
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          className="w-full pl-14 pr-6 py-4 rounded-2xl border border-gray-200 focus:border-emerald-500"
                          placeholder="১২৫০"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">বিস্তারিত বর্ণনা</label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={5}
                      className="w-full px-6 py-4 rounded-3xl border border-gray-200 focus:border-emerald-500 resize-y"
                      placeholder="প্রাকৃতিক হোগলা পাতা দিয়ে হাতে তৈরি..."
                    />
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Tag className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-2xl font-semibold text-gray-800">ক্যাটেগরি</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => handleCategoryToggle(cat.value)}
                      className={`px-7 py-3.5 rounded-3xl text-sm font-medium transition-all border-2
                        ${selectedCategories.includes(cat.value) 
                          ? 'bg-emerald-700 text-white border-emerald-700' 
                          : 'border-emerald-600 text-emerald-700 hover:bg-emerald-50'}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Images Upload */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <ImageIcon className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-2xl font-semibold text-gray-800">প্রোডাক্ট ছবি</h3>
                </div>
                
                <label className="border-2 border-dashed border-emerald-200 hover:border-emerald-400 rounded-3xl p-16 text-center block cursor-pointer transition">
                  <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                  <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                    📷
                  </div>
                  <p className="font-medium">ছবি আপলোড করুন (সর্বোচ্চ ৬টি)</p>
                </label>

                {previews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-8">
                    {previews.map((src, i) => (
                      <div key={i} className="relative group rounded-2xl overflow-hidden shadow">
                        <Image fill src={src} alt="" className="w-full h-32 object-cover" />
                        <button
                          type="button"
                          onClick={() => setPreviews(p => p.filter((_, idx) => idx !== i))}
                          className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-8 border-t">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-5 border border-gray-300 rounded-3xl font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" /> রিসেট
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-5 bg-gradient-to-r from-emerald-700 to-red-700 text-white rounded-3xl font-semibold text-lg flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {isSubmitting ? 'সেভ হচ্ছে...' : <><Save className="w-6 h-6" /> প্রোডাক্ট সেভ করুন</>}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar Analysis / Preview */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="font-semibold text-lg mb-6 text-gray-800">প্রোডাক্ট অ্যানালিসিস</h3>
              <div className="space-y-6 text-sm">
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">মোট ক্যাটেগরি সিলেক্টেড</span>
                  <span className="font-semibold text-emerald-700">{selectedCategories.length}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">ছবি আপলোড হয়েছে</span>
                  <span className="font-semibold">{previews.length}/6</span>
                </div>
                <div className="pt-4">
                  <p className="text-xs text-emerald-600 font-medium">টিপস:</p>
                  <ul className="text-xs text-gray-500 space-y-2 mt-3">
                    <li>• উচ্চ রেজোলিউশন ছবি ব্যবহার করুন</li>
                    <li>• সঠিক মেটেরিয়াল উল্লেখ করুন</li>
                    <li>• দাম যুক্তিসঙ্গত রাখুন</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="font-semibold mb-6">কুইক স্ট্যাটস</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-emerald-50 rounded-2xl p-5">
                  <p className="text-3xl font-bold text-emerald-700">১২৪</p>
                  <p className="text-xs text-gray-500 mt-1">মোট প্রোডাক্ট</p>
                </div>
                <div className="bg-amber-50 rounded-2xl p-5">
                  <p className="text-3xl font-bold text-amber-700">৮</p>
                  <p className="text-xs text-gray-500 mt-1">আজ যোগ হয়েছে</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}