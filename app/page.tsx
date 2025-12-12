"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart3, ShieldAlert, FileWarning, Ghost, CheckCircle2 } from "lucide-react";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-strath-navy text-white overflow-hidden selection:bg-safety-orange selection:text-strath-navy">
      
      {/* Hero Section */}
      <section className="w-full max-w-5xl px-6 py-24 md:py-32 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="mb-8">
            {/* Using Next.js Image component for optimization if possible, but <img> is safer for static exports if not configured */}
            <img src="/logo.png" alt="Strathmark Consulting Logo" className="h-16 w-auto mx-auto object-contain" />
          </div>
          <div className="inline-block px-3 py-1 border border-safety-orange/30 rounded-full bg-safety-orange/10 text-safety-orange text-xs font-mono tracking-wider mb-4">
            SYSTEM ACTIVE
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            We don't write blogs. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-steel">
              We engineer visibility.
            </span>
          </h1>
          <p className="text-steel text-lg md:text-xl max-w-2xl mx-auto font-light">
            Technical SEO Architecture for High-Liability Industries. Immigration Law & Automotive Specialists.
          </p>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pt-8"
          >
            <button className="bg-safety-orange text-strath-navy px-8 py-4 rounded-md font-bold text-lg flex items-center gap-2 mx-auto hover:bg-orange-400 transition-colors shadow-lg shadow-safety-orange/20">
              Audit Your Infrastructure <ArrowRight size={20} />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Proof Section */}
      <section className="w-full max-w-5xl px-6 py-16 border-t border-white/10">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Growth Graph Placeholder */}
          <motion.div variants={fadeInUp} className="bg-black/40 border border-white/10 rounded-lg p-8 h-64 flex items-center justify-center relative overflow-hidden group">
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
          <div className="space-y-8">
            <motion.div variants={fadeInUp} className="flex flex-col gap-1">
              <span className="text-5xl md:text-6xl font-bold text-white">165+</span>
              <span className="text-safety-orange font-mono text-sm uppercase tracking-widest">Keywords Recovered</span>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col gap-1">
              <span className="text-5xl md:text-6xl font-bold text-white">300%</span>
              <span className="text-safety-orange font-mono text-sm uppercase tracking-widest">Visibility Increase</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* The Black Box Grid */}
      <section className="w-full max-w-5xl px-6 py-24">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-2">System Failures Detected</h2>
          <p className="text-steel">Common critical errors in high-scale infrastructure.</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { title: "Canonical Confusion", icon: <ShieldAlert className="text-red-500" />, desc: "Duplicate content signals diluting authority across regional subdomains." },
            { title: "Crawl Budget Waste", icon: <FileWarning className="text-orange-500" />, desc: "Millions of low-value parameter URLs exhausting bot resources." },
            { title: "Ghost Pages", icon: <Ghost className="text-purple-500" />, desc: "Orphaned landing pages generating 404s and losing link equity." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              className="bg-black border border-white/10 p-6 rounded-lg hover:border-safety-orange/50 transition-colors group"
            >
              <div className="mb-4 bg-white/5 w-12 h-12 rounded-md flex items-center justify-center group-hover:bg-white/10 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
              <p className="text-steel text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Services */}
      <section className="w-full max-w-5xl px-6 py-16 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Audit", "Repair", "Retainer"].map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-strath-navy border border-white/5 p-8 rounded-xl text-center hover:bg-white/5 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-8 h-8 mx-auto mb-4 text-safety-orange" />
              <h3 className="text-2xl font-bold text-white">{service}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-white/10 text-center text-steel text-sm font-mono">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Strathmark Consulting.</p>
          <p>Registered in Scotland.</p>
        </div>
      </footer>
    </main>
  );
}
