// app/faq/page.js
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
// import Navbar from "../../components/Navbar";

const faqs = [
  { q: "ডেলিভারি কত সময় নেয়?", a: "ঢাকার ভিতরে ৬০-৯০ মিনিটের মধ্যে ডেলিভারি করা হয়।" },
  // { q: "পেমেন্ট কীভাবে করব?", a: "Cash on Delivery, bKash, Nagad, Rocket সব পেমেন্ট অপশন আছে।" },
  { q: "পণ্য ফেরত দেওয়া যাবে?", a: "হ্যাঁ, ডেলিভারির ২৪ ঘণ্টার মধ্যে ফেরত দেওয়া যাবে যদি পণ্য খারাপ হয়।" },
  { q: "অর্গানিক প্রোডাক্টের গ্যারান্টি আছে?", a: "১০০% গ্যারান্টি। কোনো সমস্যা হলে টাকা ফেরত।" },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      {/* <Navbar /> */}
      <div className="bg-neutral-950 min-h-screen py-20 text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-center mb-16">Frequently Asked Questions</h1>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                className="bg-neutral-900 border border-maroon-800 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.01 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left"
                >
                  <span className="text-lg font-medium">{faq.q}</span>
                  <ChevronDown className={`transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-8 pb-8 text-neutral-400">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}