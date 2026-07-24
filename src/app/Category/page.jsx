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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 md:my-12">
      
      {/* Premium Banner */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => onSelectCategory("All")}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2D5A27] via-[#1E3A1F] to-[#4A0010] border border-[#FFD700]/30 p-6 sm:p-8 md:p-10 mb-8 cursor-pointer group shadow-2xl"
      >
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#FFD700]"
              initial={{ opacity: 0.3, rotate: -20 }}
              animate={{
                y: [0, -25, 0],
                rotate: [-15, 15, -15],
                opacity: [0.2, 0.45, 0.2]
              }}
              transition={{
                duration: 7 + i * 0.7,
                repeat: Infinity,
                delay: i * 0.5
              }}
              style={{
                top: `${15 + i * 15}%`,
                left: `${8 + (i % 3) * 28}%`,
                fontSize: `${1.8 + i * 0.4}rem`
              }}
            >
              <Leaf />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 md:gap-5">
            <motion.div 
              whileHover={{ rotate: 20, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#FFAA00] flex items-center justify-center text-[#1E3A1F] shadow-xl shrink-0"
            >
              <ShoppingBag size={28} className="md:size-8" />
            </motion.div>
            
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full text-xs md:text-sm font-bold mb-2">
                <Flame size={14} className="text-amber-400 animate-pulse" /> 
                EXCLUSIVE ECO COLLECTION
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight group-hover:text-[#FFD700] transition-colors">
                আমাদের সমস্ত প্রিমিয়াম<br className="hidden sm:block" />ইকো প্রোডাক্ট
              </h2>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-white text-[#1E3A1F] rounded-2xl font-bold text-sm md:text-base shadow-lg hover:shadow-xl transition-all border-2 border-white/30 whitespace-nowrap"
          >
            <Sparkle size={18} className="text-amber-500" />
            সব প্রোডাক্ট দেখুন
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>

      {/* Category Buttons - Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 md:gap-4">
        {categories.map((cat, index) => {
          const IconComponent = cat.icon;
          const isSelected = selectedCategory === cat.name;

          return (
            <motion.button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={`relative flex flex-col items-center justify-center gap-3 py-5 md:py-6 rounded-2xl text-sm md:text-base font-bold transition-all duration-300 shadow-md ${
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

              <span className="relative z-10 flex flex-col items-center gap-2">
                <motion.div
                  animate={isSelected ? { rotate: [0, 12, -12, 0] } : {}}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  <IconComponent 
                    size={26} 
                    className={isSelected ? "text-[#FFD700] drop-shadow-md" : "text-[#A3D977]"} 
                  />
                </motion.div>
                <span className="text-center">{cat.name}</span>
              </span>

              {/* Selected Leaf */}
              {isSelected && (
                <motion.div
                  className="absolute -top-1 -right-1 text-[#FFD700]"
                  animate={{ rotate: 25, scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Leaf size={18} />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}