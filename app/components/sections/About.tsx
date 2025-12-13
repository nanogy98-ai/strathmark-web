"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section className="w-full max-w-7xl px-6 py-24 mx-auto border-t border-white/5" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Independent Advisory.<br/>Global Reach.
          </h2>
          <div className="h-1 w-20 bg-gold mb-8"></div>
        </div>
        
        <div className="lg:col-span-8 space-y-8 text-slate-300 text-lg leading-relaxed font-light">
          <p>
            Strathmark Consulting is not a traditional marketing agency. We are an independent advisory firm built on the principles of precision engineering and commercial accountability.
          </p>
          <p>
            Headquartered in Edinburgh, Scotland, we operate autonomously across time zones, managing infrastructure and strategy for clients in the United States, UAE, and Europe. We believe digital performance is a function of robust architecture, not just "content marketing." We fix the machine first.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/5">
            <div>
              <h4 className="text-white font-bold mb-2">Independent Advisory</h4>
              <p className="text-sm text-slate-400">Unbiased oversight of your existing agencies and internal teams.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Technical Depth</h4>
              <p className="text-sm text-slate-400">Engineering-grade understanding of Next.js, Cloudflare, and Search.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Commercial Focus</h4>
              <p className="text-sm text-slate-400">We prioritize revenue impact over vanity metrics like "traffic."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
