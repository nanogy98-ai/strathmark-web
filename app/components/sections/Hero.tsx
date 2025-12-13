"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-32 pb-20 px-6 bg-gradient-to-br from-strath-navy via-[#152336] to-[#0a101d] overflow-hidden">
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Left Column: Copy */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 space-y-8"
        >
          <div className="inline-block px-3 py-1 border border-gold/30 bg-gold/5 text-gold text-xs font-mono tracking-widest uppercase mb-4">
            Strategic Digital Consulting
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
            Strategic Digital Consulting for Organisations Where <span className="text-gold italic">Spend</span>, <span className="text-gold italic">Scale</span>, and <span className="text-gold italic">Search</span> Matter.
          </h1>
          
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
            Advisory and selective execution across digital architecture, performance spend, and technical search strategy. Built for organisations where mistakes are expensive.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href="#contact" 
              className="bg-gold text-strath-navy px-8 py-4 font-bold text-base tracking-wide uppercase hover:bg-white transition-all flex items-center justify-center gap-2 group"
            >
              Request a Review 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#approach" 
              className="px-8 py-4 border border-slate-700 text-white font-medium text-base tracking-wide uppercase hover:border-gold hover:text-gold transition-colors flex items-center justify-center"
            >
              See How We Work
            </a>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-wrap gap-x-8 gap-y-4 text-sm text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-gold" /> Senior-led engagements
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-gold" /> Platform & spend oversight
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-gold" /> Selective retainers
            </div>
          </div>
        </motion.div>

        {/* Right Column: Engagement Overview Card */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-none relative">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3 className="text-white font-serif text-2xl mb-6 border-b border-white/10 pb-4">Engagement Protocol</h3>
            
            <div className="space-y-6">
              {[
                { step: "01", title: "Audit & Review", desc: "Deep-dive analysis of infrastructure." },
                { step: "02", title: "Findings & Priorities", desc: "Commercial impact assessment." },
                { step: "03", title: "Strategic Roadmap", desc: "12-month execution plan." },
                { step: "04", title: "Execution (Optional)", desc: "Implementation support where needed." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <span className="font-mono text-gold/50 text-sm pt-1 group-hover:text-gold transition-colors">{item.step}</span>
                  <div>
                    <h4 className="text-white font-medium text-sm group-hover:text-gold transition-colors">{item.title}</h4>
                    <p className="text-slate-500 text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-black/20 p-4 border border-white/5 text-xs text-slate-400 space-y-2 font-mono">
              <div className="flex items-center gap-2">
                <ChevronRight size={12} className="text-gold" />
                Fixed-fee entry points
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight size={12} className="text-gold" />
                Clear priorities in 7-14 days
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight size={12} className="text-gold" />
                No long-term lock-ins required
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

