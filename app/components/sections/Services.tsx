"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart, Server, Lock } from "lucide-react";

export function Services() {
  const pillars = [
    {
      shortTitle: "The Marketing Audit",
      title: "Strategic Digital & Commercial Advisory",
      icon: <BarChart className="text-gold" size={32} />,
      for: "For leadership teams needing oversight.",
      outcome: "We check if your agencies are doing their job. We tell you where your budget is actually going.",
      includes: [
        "Performance spend audit",
        "Vendor & agency management",
        "Commercial impact modeling",
        "Search strategy validation"
      ],
      cta: "Strategic Review",
      link: "#contact"
    },
    {
      shortTitle: "The Technical Fix",
      title: "Platform & Infrastructure Consulting",
      icon: <Server className="text-gold" size={32} />,
      for: "For technical teams facing scale issues.",
      outcome: "If your website is slow, broken, or not appearing in Google, we coordinate the repairs.",
      includes: [
        "Next.js / Headless architecture",
        "Core Web Vitals engineering",
        "Migration risk mitigation",
        "Technical debt consolidation"
      ],
      cta: "Technical Audit",
      link: "#contact"
    },
    {
      shortTitle: "The Ongoing Advisor",
      title: "Retained Execution (By Invitation)",
      icon: <Lock className="text-gold" size={32} />,
      for: "For organizations requiring ongoing precision.",
      outcome: "We sit on your side of the table to manage your digital vendors so you don't have to.",
      includes: [
        "Limited client roster",
        "Direct senior engineer access",
        "Rolling 30-day terms",
        "Execution only after review"
      ],
      cta: "Retainer Consideration",
      link: "#contact"
    }
  ];

  return (
    <section className="w-full max-w-7xl px-6 py-24 mx-auto" id="services">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16 md:mb-24 max-w-3xl"
      >
        <div className="text-gold font-mono text-xs uppercase tracking-widest mb-4">Core Pillars</div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
          Advisory First. Execution Second.
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          We separate strategy from implementation. Most "agencies" profit from confusion; we profit from clarity. Our three engagement models are designed to solve specific organizational failures.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {pillars.map((pillar, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/[0.02] border border-white/5 p-8 md:p-10 flex flex-col hover:border-gold/30 transition-colors group"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="p-4 bg-white/5 w-fit rounded-sm group-hover:bg-gold/10 transition-colors">
                {pillar.icon}
              </div>
              <div className="text-slate-600 font-mono text-4xl font-bold opacity-20 group-hover:opacity-40 group-hover:text-gold transition-all">
                0{i+1}
              </div>
            </div>
            
            <h3 className="text-3xl font-serif font-bold text-white mb-2">
              {pillar.shortTitle}
            </h3>
            <div className="text-slate-500 text-xs uppercase tracking-wider font-bold mb-6 h-8">
              {pillar.title}
            </div>
            
            <div className="text-gold/80 font-mono text-xs uppercase mb-2 tracking-wide">Who it is for</div>
            <p className="text-slate-400 text-sm mb-6 pb-6 border-b border-white/5">
              {pillar.for}
            </p>

            <div className="text-gold/80 font-mono text-xs uppercase mb-2 tracking-wide">Outcomes</div>
            <p className="text-slate-300 text-base font-medium mb-8">
              {pillar.outcome}
            </p>

            <ul className="space-y-3 mb-10 flex-1">
              {pillar.includes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-400">
                  <div className="mt-1.5 w-1 h-1 bg-gold rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <a 
              href={pillar.link}
              className="w-full py-4 border border-white/10 text-white text-center text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-strath-navy transition-all flex items-center justify-center gap-2 group-hover:border-white"
            >
              {pillar.cta} <ArrowRight size={16} />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
