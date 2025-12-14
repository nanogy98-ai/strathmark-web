"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

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
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight max-w-4xl">
            Stop Paying for Traffic That Doesn't Buy.
          </h1>
          
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
            Technical architecture for commercial growth. We fix the structural failures that bleed revenue in high-liability industries.
          </p>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
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
            <div className="text-xs text-slate-500 font-mono flex items-center gap-4 pl-1">
              <span>// Fixed fees.</span>
              <span>// 14-day turnaround.</span>
              <span>// No lock-in.</span>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5">
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-4">Trusted Architecture & Partners</p>
            <div className="flex flex-wrap gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Using existing assets and simple text/svg for tech stack logos as trust signals */}
               <Image src="/next.svg" alt="Next.js" width={90} height={20} className="invert" />
               <Image src="/vercel.svg" alt="Vercel" width={90} height={20} className="invert" />
               {/* Simple SVG for Google Partner */}
               <svg viewBox="0 0 24 24" className="h-6 w-auto fill-current text-white" aria-label="Google">
                 <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
               </svg>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Visual Engagement Diagram */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-8 rounded-none relative overflow-hidden">
            {/* Diagram Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] pointer-events-none"></div>
            
            <h3 className="text-white font-serif text-xl mb-8 border-b border-white/10 pb-4 relative z-10">Protocol</h3>
            
            <div className="relative z-10 space-y-0">
              {/* Step 1: Input */}
              <div className="flex items-center gap-4 relative">
                <div className="w-12 h-12 rounded-full border border-white/20 bg-strath-navy flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(197,160,89,0.1)]">
                  <span className="font-mono text-white/50 text-xs">01</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 w-full">
                  <div className="text-gold text-xs font-mono uppercase tracking-wider mb-1">Diagnosis</div>
                  <div className="text-white font-bold">Audit & Review</div>
                </div>
                {/* Connector Line */}
                <div className="absolute left-6 top-12 h-full w-px bg-gradient-to-b from-white/20 to-gold/50 -z-0"></div>
              </div>

              {/* Step 2: Process */}
              <div className="flex items-center gap-4 relative pt-8">
                <div className="w-12 h-12 rounded-full border border-gold bg-gold/10 flex items-center justify-center shrink-0 z-10 shadow-[0_0_20px_rgba(197,160,89,0.3)]">
                  <span className="font-mono text-gold text-xs">02</span>
                </div>
                <div className="bg-gold/10 border border-gold/30 p-4 w-full">
                  <div className="text-gold text-xs font-mono uppercase tracking-wider mb-1">Strategy</div>
                  <div className="text-white font-bold">The Roadmap</div>
                </div>
                {/* Connector Line */}
                <div className="absolute left-6 top-20 h-full w-px bg-gradient-to-b from-gold/50 to-white/20 -z-0"></div>
              </div>

              {/* Step 3: Output */}
              <div className="flex items-center gap-4 relative pt-8">
                <div className="w-12 h-12 rounded-full border border-white/20 bg-strath-navy flex items-center justify-center shrink-0 z-10">
                  <span className="font-mono text-white/50 text-xs">03</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 w-full">
                  <div className="text-gold text-xs font-mono uppercase tracking-wider mb-1">Outcome</div>
                  <div className="text-white font-bold">Execution & Scale</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-xs font-mono text-slate-500">
              <span>STATUS: ACTIVE</span>
              <span className="text-gold animate-pulse">● LIVE MONITORING</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
