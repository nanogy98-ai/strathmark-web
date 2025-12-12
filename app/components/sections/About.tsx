"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section className="w-full max-w-6xl px-6 py-24 border-t border-white/10 bg-black/20" id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Scottish Engineering.<br/>Global Scale.</h2>
          <div className="space-y-6 text-steel leading-relaxed">
            <p>
              Strathmark Consulting is not a "marketing agency." We are a technical consultancy built on the principles of precision engineering.
            </p>
            <p>
              Headquartered in Edinburgh, Scotland, we operate autonomously across time zones, managing infrastructure for clients in the United States, UAE, and Europe.
            </p>
            <p>
              We believe SEO is a function of product architecture, not just content marketing. We fix the machine first, then we fuel it.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {[
            { city: "Edinburgh", role: "HQ // Engineering" },
            { city: "New York", role: "Client Ops" },
            { city: "Dubai", role: "MENA Strategy" },
            { city: "Remote", role: "Global Reach" }
          ].map((loc, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-white/10 p-6 bg-white/5"
            >
              <div className="text-xl font-bold text-white mb-1">{loc.city}</div>
              <div className="text-xs font-mono text-safety-orange">{loc.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

