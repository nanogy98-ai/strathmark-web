"use client";

import { motion } from "framer-motion";
import { Check, XCircle } from "lucide-react";

export function Proof() {
  const issues = [
    "Wasted crawl budget on parameter URLs",
    "JavaScript rendering failures (Client-side only)",
    "Hreflang conflicts across regions",
    "Inefficient paid spend due to tracking gaps",
    "Canonical tags de-indexing revenue pages"
  ];

  const standards = [
    "Server-side rendering (SSR) or Static Generation",
    "Logic-based canonicalization strategies",
    "Schema graph mapped to Knowledge Graph",
    "Log file analysis for bot behavior",
    "Performance scores >90 on Core Web Vitals"
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
            {issues.map((issue, i) => (
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
            {standards.map((std, i) => (
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
