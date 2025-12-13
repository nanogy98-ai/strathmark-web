"use client";

import { motion } from "framer-motion";

export function Approach() {
  const steps = [
    {
      num: "01",
      title: "Review & Diagnosis",
      desc: "We analyze your spend, infrastructure, and team capabilities. 7-14 day turnaround.",
      time: "Fixed Fee"
    },
    {
      num: "02",
      title: "Findings & Priorities",
      desc: "You get a prioritized roadmap of what to fix, what to stop, and where to double down.",
      time: "Delivery Meeting"
    },
    {
      num: "03",
      title: "Execution Plan",
      desc: "We architect the solution. Your team executes, or we bring in specialists.",
      time: "Strategic Roadmap"
    },
    {
      num: "04",
      title: "Oversight & Accountability",
      desc: "Ongoing advisory to ensure the plan is followed and ROI is realized.",
      time: "Optional Retainer"
    }
  ];

  return (
    <section className="w-full max-w-7xl px-6 py-24 mx-auto bg-white/[0.02]" id="approach">
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">The Methodology</h2>
        <p className="text-slate-400">Predictable. Transparent. Commercial.</p>
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
