"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export function FAQ() {
  const faqs = [
    {
      q: "Are you an agency?",
      a: "No. We are a consultancy. We do not have account managers or interns. You work directly with senior engineers and strategists."
    },
    {
      q: "Do you only do SEO?",
      a: "We specialize in technical search architecture, but our advisory covers broader digital infrastructure, paid spend efficiency, and platform migrations."
    },
    {
      q: "What does a review include?",
      a: "A comprehensive audit of your technical stack, crawl logs, search performance, and commercial data. You receive a prioritized roadmap, not a generic PDF."
    },
    {
      q: "Do you work with US clients?",
      a: "Yes. 60% of our client base is in North America. We are accustomed to EST/PST workflows."
    },
    {
      q: "What is your minimum engagement?",
      a: "Our fixed-fee audits start at £3,500. Retainers are selective and typically start at £2,000/month."
    }
  ];

  return (
    <section className="w-full max-w-3xl px-6 py-24 mx-auto border-t border-white/5" id="faq">
      <h2 className="text-3xl font-serif font-bold text-white mb-12 text-center">Frequent Questions</h2>
      
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

