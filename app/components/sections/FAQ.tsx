"use client";

import { Minus, Plus } from "lucide-react";
import { useId, useState } from "react";

const FAQS = [
  {
    q: "Is this an AI agency or software implementation service?",
    a: "No. Strathmark is an independent advisory firm. The first job is to establish where AI could create measurable operating value, what could go wrong and what the business should do next. Specialist implementation may follow, but it is never assumed or bundled into the diagnosis."
  },
  {
    q: "What does the AI Opportunity and Exposure Review include?",
    a: "Leadership and workflow interviews, an opportunity and exposure map, a review of data and governance readiness, and a prioritised 90-day roadmap. The review is fixed fee from £3,500 and is designed to produce a clear investment decision."
  },
  {
    q: "Do we need clean data or an AI strategy before starting?",
    a: "No. Readiness is part of the diagnosis. Many useful first steps begin with understanding existing workflows, project records and decision ownership. The recommendation may be to improve information structure before introducing any AI system."
  },
  {
    q: "Will AI be allowed to make engineering or production decisions?",
    a: "Not through this work. Safety-critical engineering, certification, regulatory approval, legal interpretation, live production control and final customer deliverables stay under qualified human authority. Any pilot is bounded, reviewed and reversible."
  },
  {
    q: "What size and type of business is this for?",
    a: "The primary fit is a founder-led engineering, manufacturing or specialist technical business with roughly 10 to 150 people, valuable accumulated know-how and a leadership team that wants practical advantage without losing control."
  },
  {
    q: "Does Strathmark still provide digital performance consulting?",
    a: "Yes. Independent digital reviews, technical recovery, search and agency oversight continue as a separate secondary practice. You can explore that work through the Digital Performance page."
  }
] as const;

export function FAQ() {
  return (
    <section className="w-full bg-strath-navy py-20 md:py-28" id="faq">
      <div className="section-shell grid gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <p className="section-kicker">Questions</p>
          <h2 className="mt-6 max-w-xl text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.025em] text-white">
            Direct answers before you commit.
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-slate-400">
            The work is deliberately transparent about scope, authority, limits and the evidence needed to proceed.
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
