"use client";

import { motion } from "framer-motion";
import { ShieldAlert, FileWarning, Ghost, Code2, Database, Globe2 } from "lucide-react";

export function Services() {
  const problems = [
    { title: "Canonical Confusion", icon: <ShieldAlert className="text-red-500" />, desc: "Duplicate content signals diluting authority across regional subdomains." },
    { title: "Crawl Budget Waste", icon: <FileWarning className="text-orange-500" />, desc: "Millions of low-value parameter URLs exhausting bot resources." },
    { title: "Ghost Pages", icon: <Ghost className="text-purple-500" />, desc: "Orphaned landing pages generating 404s and losing link equity." }
  ];

  const solutions = [
    { title: "Technical Audit", icon: <Code2 className="text-safety-orange" />, desc: "Deep-dive analysis of JS rendering, schema, and server logs." },
    { title: "Migration Architecture", icon: <Database className="text-blue-400" />, desc: "Zero-loss platform migrations for enterprise datasets." },
    { title: "International Expansion", icon: <Globe2 className="text-green-400" />, desc: "Hreflang structuring for multi-region domination." }
  ];

  return (
    <section className="w-full max-w-6xl px-6 py-24">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">The Black Box</h2>
        <p className="text-steel text-xl">We identify the failures your previous agency missed.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {problems.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-black/50 border border-white/10 p-8 hover:border-red-500/50 transition-colors group"
          >
            <div className="mb-6 bg-white/5 w-14 h-14 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
            <p className="text-steel text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Engineered Solutions</h2>
        <p className="text-steel text-xl">Precision interventions for complex infrastructure.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {solutions.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-strath-navy border border-white/10 p-8 hover:border-safety-orange transition-colors group"
          >
            <div className="mb-6 bg-white/5 w-14 h-14 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
            <p className="text-steel text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

