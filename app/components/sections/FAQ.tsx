"use client";

import { Minus, Plus } from "lucide-react";
import { useId, useState } from "react";

const FAQS = [
  {
    q: "Are you an agency?",
    a: "No. Strathmark is an independent consultancy. I do not have account managers, junior staff, or high-volume production teams. You work directly with the principal. My goal is to fix your infrastructure and strategy, not to sell you more hours."
  },
  {
    q: "Do you only do SEO?",
    a: "No. While technical search is a core competency, my advisory covers broader digital commercial performance. This includes paid spend efficiency, platform architecture, vendor management, and tracking/attribution. If it impacts online revenue, it's in scope."
  },
  {
    q: "What does a review include?",
    a: "I conduct a forensic audit of your current digital estate. This includes technical code review, crawl analysis, spend efficiency checks, and commercial data verification. You receive a findings document and a prioritised roadmap, usually within 14 days."
  },
  {
    q: "Do you work with US clients?",
    a: "Yes. A significant portion of my work involves US-based organisations. I am accustomed to cross-Atlantic workflows and time zones."
  },
  {
    q: "What is your minimum engagement?",
    a: "I am selective. Fixed-fee independent reviews typically start at £3,500. Ongoing advisory retainers start at £2,000/month and are by invitation only."
  }
] as const;

export function FAQ() {
  return (
    <section className="w-full bg-strath-navy py-20 md:py-28" id="faq">
      <div className="section-shell grid gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <p className="section-kicker">Questions</p>
          <h2 className="mt-6 max-w-xl text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.025em] text-white">
            What to know before requesting a review.
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-slate-400">
            Straight answers on scope, working style, and the commercial model.
          </p>
        </div>

        <div className="border-t border-white/[0.12] lg:col-span-7">
          {FAQS.map((item) => (
            <FAQItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const triggerId = `faq-trigger-${id}`;
  const panelId = `faq-panel-${id}`;

  return (
    <article className="border-b border-white/[0.12]">
      <h3 className="font-sans">
        <button
          id={triggerId}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="flex min-h-20 w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-white transition-colors hover:text-gold"
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span>{question}</span>
          <span className="grid h-10 w-10 shrink-0 place-items-center border border-white/15 text-gold" aria-hidden="true">
            {isOpen ? <Minus size={18} /> : <Plus size={18} />}
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isOpen}
        className="pb-7 pr-14 text-sm leading-7 text-slate-400"
      >
        {answer}
      </div>
    </article>
  );
}
