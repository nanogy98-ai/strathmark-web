"use client";

import { motion } from "framer-motion";
import { Check, XCircle } from "lucide-react";

export function Proof() {
  const failures = [
    "Wasted marketing spend on low-intent traffic",
    "Tracking blind spots hiding true ROI",
    "Slow site speed killing conversion rates",
    "Agency activity reports without commercial results",
    "Messy measurement and unclear attribution"
  ];

  const goodLooksLike = [
    "Clear attribution linked to revenue",
    "Fast, high-converting digital infrastructure",
    "Predictable, qualified lead flow",
    "Clean reporting that the Board understands",
    "Accountable vendors and internal clarity"
  ];

  return (
    <section className="w-full max-w-7xl px-6 py-24 mx-auto" id="proof">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        
        {/* The Problem */}
        <div>
          <h3 className="text-2xl font-serif font-bold text-white mb-8 flex items-center gap-3">
            <XCircle className="text-red-500" /> Common Failures
          </h3>
          <ul className="space-y-6">
            {failures.map((issue, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 text-slate-400"
              >
                <div className="w-6 h-px bg-white/10 mt-3 shrink-0" />
                {issue}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* The Solution */}
        <div>
          <h3 className="text-2xl font-serif font-bold text-white mb-8 flex items-center gap-3">
            <Check className="text-gold" /> What Good Looks Like
          </h3>
          <ul className="space-y-6">
            {goodLooksLike.map((std, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 text-white"
              >
                <div className="w-6 h-px bg-gold mt-3 shrink-0" />
                {std}
              </motion.li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}

