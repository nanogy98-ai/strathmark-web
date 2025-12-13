"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export function FAQ() {
  const faqs = [
    {
      q: "Are you an agency?",
      a: "No. Strathmark is an independent consultancy. We do not have account managers, junior staff, or high-volume production teams. You work directly with the principal. Our goal is to fix your infrastructure and strategy, not to sell you more hours."
    },
    {
      q: "Do you only do SEO?",
      a: "No. While technical search is a core competency, our advisory covers broader digital commercial performance. This includes paid spend efficiency, platform architecture, vendor management, and tracking/attribution. If it impacts online revenue, it's in scope."
    },
    {
      q: "What does a review include?",
      a: "We conduct a forensic audit of your current digital estate. This includes technical code review, crawl analysis, spend efficiency checks, and commercial data verification. You receive a findings document and a prioritised roadmap, usually within 14 days."
    },
    {
      q: "Do you work with US clients?",
      a: "Yes. A significant portion of our work involves US-based organisations. We are accustomed to cross-Atlantic workflows and time zones."
    },
    {
      q: "What is your minimum engagement?",
      a: "We are selective. Fixed-fee independent reviews typically start at £3,500. Ongoing advisory retainers start at £2,000/month and are by invitation only."
    }
  ];

  return (
    <section className="w-full max-w-3xl px-6 py-24 mx-auto border-t border-white/5" id="faq">
      <h2 className="text-3xl font-serif font-bold text-white mb-12 text-center">Questions & Answers</h2>
      
      <div className="space-y-4">
        {faqs.map((item, i) => (
          <FAQItem key={i} question={item.q} answer={item.a} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 bg-white/[0.02]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-white font-medium">{question}</span>
        <span className="text-gold">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-slate-400 text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
