"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function Pricing() {
  return (
    <section className="w-full max-w-6xl px-6 py-24 border-t border-white/10" id="pricing">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Partnership Models</h2>
          <p className="text-steel text-xl max-w-xl">
            No 12-month lock-ins. No confusing point systems. Just execution.
          </p>
        </div>
        <div className="text-safety-orange font-mono text-sm border border-safety-orange/30 px-4 py-2 bg-safety-orange/5">
          NO LONG-TERM CONTRACTS REQUIRED
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Project Audit */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 p-8 md:p-10 flex flex-col h-full"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Deep-Dive Audit</h3>
            <p className="text-steel">One-time infrastructure analysis.</p>
          </div>
          <div className="text-4xl font-bold text-white mb-8">£3,500 <span className="text-lg text-steel font-normal">/ project</span></div>
          
          <ul className="space-y-4 mb-8 flex-1">
            {["Complete Crawl Logic Analysis", "Log File Analysis (5M+ Lines)", "JS Rendering Assessment", "Schema & Entity Graph Mapping", "Prioritized Repair Roadmap"].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                <Check className="text-safety-orange shrink-0" size={18} />
                {item}
              </li>
            ))}
          </ul>
          
          <a href="#contact" className="w-full py-4 border border-white/20 text-white font-bold text-center hover:bg-white hover:text-strath-navy transition-colors">
            Book Audit
          </a>
        </motion.div>

        {/* Retainer */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-strath-navy border border-safety-orange/30 p-8 md:p-10 flex flex-col h-full relative"
        >
          <div className="absolute top-0 right-0 bg-safety-orange text-strath-navy text-xs font-bold px-4 py-1">
            MOST POPULAR
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Technical Retainer</h3>
            <p className="text-steel">Continuous architectural support.</p>
          </div>
          <div className="text-4xl font-bold text-white mb-8">£2,000 <span className="text-lg text-steel font-normal">/ month</span></div>
          
          <ul className="space-y-4 mb-8 flex-1">
            {["Monthly Sprint Planning", "Direct Dev Team Collaboration", "Content Brief Engineering", "Algorithmic Update Monitoring", "Rolling 30-Day Terms"].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                <Check className="text-safety-orange shrink-0" size={18} />
                {item}
              </li>
            ))}
          </ul>
          
          <a href="#contact" className="w-full py-4 bg-safety-orange text-strath-navy font-bold text-center hover:bg-white hover:text-strath-navy transition-all">
            Start Sprint
          </a>
        </motion.div>
      </div>
    </section>
  );
}

