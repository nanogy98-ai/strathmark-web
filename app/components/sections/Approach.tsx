"use client";

import { motion } from "framer-motion";

export function Approach() {
  const steps = [
    {
      num: "01",
      title: "Initial Review",
      desc: "We analyze logs, code, and spend. No assumptions.",
      time: "7-14 Days"
    },
    {
      num: "02",
      title: "Findings & Priorities",
      desc: "We identify the 20% of issues causing 80% of the drag.",
      time: "Delivery Meeting"
    },
    {
      num: "03",
      title: "Roadmap Architecture",
      desc: "A detailed technical plan for your dev team or ours.",
      time: "Strategic Plan"
    },
    {
      num: "04",
      title: "Optional Execution",
      desc: "We step in only if your team lacks capacity.",
      time: "Ongoing"
    }
  ];

  return (
    <section className="w-full max-w-7xl px-6 py-24 mx-auto bg-white/[0.02]" id="approach">
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">The Methodology</h2>
        <p className="text-slate-400">Systematic. Predictable. Transparent.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {steps.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative p-6 border-l border-white/10 hover:border-gold transition-colors group"
          >
            <span className="text-4xl font-serif text-white/5 font-bold absolute top-4 right-4 group-hover:text-gold/10 transition-colors">
              {step.num}
            </span>
            <div className="text-gold font-mono text-xs mb-3">{step.time}</div>
            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
            <p className="text-slate-400 text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

