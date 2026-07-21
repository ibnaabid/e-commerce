'use client';

import React, { useState } from 'react';
import { Edit2, Trash2, Plus, Search, PackageCheck, Loader2 } from 'lucide-react';
import Image from 'next/image';

import UpdateProductModal from './UpdateBtn';
import DeleteModal from './DeleteBtn';   // তোমার Delete Modal

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [activeUpdateProduct, setActiveUpdateProduct] = useState(null);
  const [activeDeleteProduct, setActiveDeleteProduct] = useState(null);

  // Fetch Products (useEffect ছাড়া — Button দিয়ে কল করা যাবে)
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  React.useEffect(() => {
    fetchProducts();
  }, []);

  // Update Handler
  const handleUpdateSuccess = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) =>
        (p._id || p.id) === (updatedProduct._id || updatedProduct.id) ? updatedProduct : p
      )
    );
    setActiveUpdateProduct(null);
  };

  // Delete Handler
  const handleDeleteSuccess = (deletedId) => {
    setProducts((prev) => prev.filter((p) => (p._id || p.id) !== deletedId));
    setActiveDeleteProduct(null);
  };

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getImageUrl = (images) => {
    if (Array.isArray(images) && images.length > 0 && typeof images[0] === 'string') {
      return images[0];
    }
    if (typeof images === 'string' && images.trim() !== '') {
      return images;
    }
    return 'https://placehold.co/150x150?text=No+Image';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">প্রোডাক্ট ম্যানেজমেন্ট</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">ক্লিক করে মডালের মাধ্যমে আপডেট ও ডিলিট করুন</p>
        </div>

        <button 
          onClick={fetchProducts}
          className="bg-[#800020] hover:bg-[#600018] text-white px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg transition"
        >
          <Plus className="w-4 h-4" /> রিফ্রেশ
        </button>
      </div>


      {/* Table */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-gray-100 dark:border-neutral-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center text-gray-400 gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-[#2D5A27]" />
            <span className="text-xs font-bold">ডাটা লোড হচ্ছে...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-xs font-bold">
            কোনো প্রোডাক্ট পাওয়া যায়নি!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-neutral-800/50 border-b border-gray-100 dark:border-neutral-800 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase">
                  <th className="py-4 px-6">প্রোডাক্ট</th>
                  <th className="py-4 px-6">ক্যাটাগরি</th>
                  <th className="py-4 px-6">মূল্য</th>
                  <th className="py-4 px-6">স্টক</th>
                  <th className="py-4 px-6 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-neutral-800 text-xs font-medium">
                {filteredProducts.map((product) => (
                  <tr key={product._id || product.id} className="hover:bg-gray-50/50 dark:hover:bg-neutral-800/30 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-700 shrink-0 bg-gray-100 dark:bg-neutral-800">
                          <Image
                            src={getImageUrl(product?.images)}
                            alt={product?.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm">{product.name}</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5">ID: #{product._id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 rounded-full font-bold text-[10px]">
                        {product?.categories || 'N/A'}
                      </span>
                    </td>

                    <td className="py-4 px-6 font-bold text-gray-900 dark:text-white">৳ {product.price}</td>

                    <td className="py-4 px-6">
                      
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 font-bold text-[10px]">
                    {product?.stock}      <PackageCheck className="w-3 h-3" /> 
                        </span>
                      
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => setActiveUpdateProduct(product)}
                          className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:bg-emerald-950/40 dark:text-emerald-400 transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => setActiveDeleteProduct(product)}
                          className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white dark:bg-red-950/40 dark:text-red-400 transition"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Update Modal */}
      <UpdateProductModal
        isOpen={Boolean(activeUpdateProduct)}
        onClose={() => setActiveUpdateProduct(null)}
        product={activeUpdateProduct}
        onUpdateSuccess={handleUpdateSuccess}
      />

      {/* Delete Modal - শুধু একবার রাখা হয়েছে */}
      <DeleteModal
        isOpen={Boolean(activeDeleteProduct)}
        onClose={() => setActiveDeleteProduct(null)}
        product={activeDeleteProduct}
        onConfirm={async () => {
          if (!activeDeleteProduct?._id) return;
          
          await fetch(`http://localhost:5000/products/${activeDeleteProduct._id}`, {
            method: "DELETE",
          });
          handleDeleteSuccess(activeDeleteProduct._id);
        }}
        itemName={activeDeleteProduct?.name}
      />
    </div>
  );
}