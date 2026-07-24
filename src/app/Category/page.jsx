'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutGrid, 
  Trees, 
  Sparkles, 
  Shield, 
  Compass, 
  Gift, 
  Layers, 
  ShoppingBag, 
  ArrowRight,
  Flame,
  Sparkle,
  Leaf,
  TreePalm,
  AlignJustify
} from 'lucide-react';

const categories = [
  { name: "All", icon: LayoutGrid },
  { name: "Bamboo", icon: TreePalm },
  { name: "Jute", icon: AlignJustify },
  { name: "Hogla", icon: Shield },
  { name: "Shatranji", icon: Layers },
  { name: "Kaisa", icon: Compass },
  { name: "Other", icon: Gift },
];

export default function CategoryFilter({ 
  selectedCategory = "All", 
  onSelectCategory = () => {} 
}) {
  return (
    <div className="max-w-7xl mx-auto hover: bg-neutral-950 px-4 sm:px-6 lg:px-8 my-10">
      
      {/* 🍃 প্রিমিয়াম ব্যানার - Bigger & More Vibrant */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => onSelectCategory("All")}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2D5A27] via-[#1E3A1F] to-[#4A0010] border border-[#FFD700]/30 p-8 sm:p-10 mb-8 cursor-pointer group shadow-2xl"
      >
        {/* Animated Bamboo Leaves Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#FFD700]/20"
              initial={{ opacity: 0.3, rotate: -20 }}
              animate={{
                y: [0, -30, 0],
                rotate: [ -15, 15, -15 ],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 6 + i * 0.8,
                repeat: Infinity,
                delay: i * 0.6
              }}
              style={{
                top: `${20 + i * 12}%`,
                left: `${10 + (i % 3) * 25}%`,
                fontSize: `${2.2 + i * 0.3}rem`
              }}
            >
              <Leaf />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <motion.div 
              whileHover={{ rotate: 20, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#FFAA00] flex items-center justify-center text-[#1E3A1F] shadow-xl shrink-0"
            >
              <ShoppingBag size={32} />
            </motion.div>
            
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full text-sm font-bold mb-2">
                <Flame size={16} className="text-amber-400 animate-pulse" /> 
                EXCLUSIVE ECO COLLECTION
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight group-hover:text-[#FFD700] transition-colors">
                আমাদের সমস্ত প্রিমিয়াম<br />ইকো প্রোডাক্ট
              </h2>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-white text-[#1E3A1F] rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all border-2 border-white/30"
          >
            <Sparkle size={20} className="text-amber-500" />
            সব প্রোডাক্ট দেখুন
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>

      {/* 📦 ক্যাটাগরি বাটনস - Bigger & More Colorful */}
      <div className="flex gap-4 overflow-x-auto pb-6 pt-2 hide-scroll items-center">
        {categories.map((cat, index) => {
          const IconComponent = cat.icon;
          const isSelected = selectedCategory === cat.name;

          return (
            <motion.button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              whileHover={{ scale: 1.08, y: -6 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`relative flex items-center gap-3 px-7 py-5 rounded-2xl text-base font-bold whitespace-nowrap transition-all duration-300 min-w-[140px] justify-center shadow-md ${
                isSelected
                  ? "text-white shadow-2xl"
                  : "text-white/80 hover:text-white hover:shadow-xl"
              }`}
            >
              {/* Background Layer */}
              {isSelected ? (
                <motion.div
                  layoutId="activeBambooBg"
                  className="absolute inset-0 bg-gradient-to-br from-[#2D5A27] via-[#4A7043] to-[#1E3A1F] rounded-2xl border-2 border-[#FFD700]/50"
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#2D5A27]/70 to-[#1E3A1F]/70 hover:from-[#4A7043] hover:to-[#2D5A27] rounded-2xl border border-white/20 hover:border-[#FFD700]/30 transition-all" />
              )}

              <span className="relative z-10 flex items-center gap-3">
                <motion.div
                  animate={isSelected ? { rotate: [0, 15, -15, 0] } : {}}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <IconComponent 
                    size={26} 
                    className={isSelected ? "text-[#FFD700] drop-shadow-md" : "text-[#A3D977]"} 
                  />
                </motion.div>
                {cat.name}
              </span>

              {/* Extra Bamboo Leaf Animation on Hover */}
              {isSelected && (
                <motion.div
                  className="absolute -top-2 -right-2 text-[#FFD700]"
                  animate={{ rotate: 25, scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Leaf size={22} />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}