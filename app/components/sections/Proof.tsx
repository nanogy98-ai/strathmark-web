"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

export function Proof() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="w-full max-w-6xl px-6 py-16 border-t border-white/10">
      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Growth Graph Placeholder */}
        <motion.div variants={fadeInUp} className="bg-black/40 border border-white/10 rounded-none p-8 h-64 flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-safety-orange/5 to-transparent opacity-50" />
          <div className="text-steel font-mono text-sm flex flex-col items-center gap-2 z-10">
            <BarChart3 size={48} className="text-safety-orange/50 group-hover:text-safety-orange transition-colors duration-500" />
            <span>[Growth Graph Visualization]</span>
          </div>
          {/* Simulated graph line */}
          <svg className="absolute bottom-0 left-0 right-0 h-32 w-full text-safety-orange/20" preserveAspectRatio="none">
            <path d="M0,100 C150,100 200,50 400,20 L500,0 L500,128 L0,128 Z" fill="currentColor" />
            <path d="M0,100 C150,100 200,50 400,20 L500,0" fill="none" stroke="#F59E0B" strokeWidth="2" />
          </svg>
        </motion.div>

        {/* Stat Tickers */}
        <div className="space-y-12">
          <motion.div variants={fadeInUp} className="flex flex-col gap-2 border-l-4 border-safety-orange pl-6">
            <span className="text-5xl md:text-7xl font-bold text-white tracking-tighter">165+</span>
            <span className="text-steel font-mono text-sm uppercase tracking-widest">High-Value Keywords Recovered</span>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex flex-col gap-2 border-l-4 border-white/20 pl-6">
            <span className="text-5xl md:text-7xl font-bold text-white tracking-tighter">300%</span>
            <span className="text-steel font-mono text-sm uppercase tracking-widest">Visibility Increase (YOY)</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

