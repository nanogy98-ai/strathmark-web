"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="w-full max-w-6xl px-6 py-24 md:py-32 flex flex-col items-center text-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        <div className="mb-8 relative w-full flex justify-center">
            <Image 
              src="/logo.png" 
              alt="Strathmark Consulting Logo" 
              width={300} 
              height={100} 
              className="h-20 w-auto object-contain"
              priority
            />
        </div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-safety-orange/30 rounded-full bg-safety-orange/10 text-safety-orange text-xs font-mono tracking-wider mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safety-orange opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-safety-orange"></span>
          </span>
          SYSTEM ACTIVE: SCOTLAND // GLOBAL
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none text-white">
          We don't write blogs. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-steel to-white">
            We engineer visibility.
          </span>
        </h1>
        
        <p className="text-steel text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
          Technical SEO Architecture for High-Liability Industries. <br className="hidden md:block"/>
          Operating from Edinburgh, serving New York to Dubai.
        </p>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pt-8 flex flex-col md:flex-row gap-4 justify-center"
        >
          <a href="#contact" className="bg-safety-orange text-strath-navy px-8 py-4 rounded-none font-bold text-lg flex items-center justify-center gap-2 hover:bg-white hover:text-strath-navy transition-all border border-transparent hover:border-white">
            Audit Your Infrastructure <ArrowRight size={20} />
          </a>
          <a href="#about" className="bg-transparent text-white border border-steel/30 px-8 py-4 rounded-none font-mono text-lg flex items-center justify-center gap-2 hover:border-safety-orange hover:text-safety-orange transition-colors">
            Our Methodology
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

