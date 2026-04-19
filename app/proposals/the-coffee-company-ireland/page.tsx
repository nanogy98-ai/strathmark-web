"use client";

import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { ApprovalForm } from "./ApprovalForm";
import { StickySignCTA } from "./StickySignCTA";
import { MotionSection } from "./MotionSection";
import { ReadingProgress } from "@/app/components/ReadingProgress";
import { PenLine, Sparkles, TrendingUp, Target, Zap, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";
import {
  ROUTE_CONTENT,
  routeAIncludes,
  routeAPhases,
  routeAUpside,
  routeBIncludes,
  routeBPhases,
} from "./proposal-content";

const termGroups: { title: string; items: string[] }[] = [
  {
    title: "Currency and payment",
    items: [
      "All fees are priced and invoiced in euros (€) to avoid cross-border conversion fees.",
      "Payment is made in advance on the agreed start date, by an agreed method (bank transfer preferred; payment link available on request).",
      "The €3,400 rebuild fee is split 50/50: €1,700 on the agreed start date, €1,700 on launch — the site goes live on receipt of the balance payment.",
      "The monthly retainer is paid in advance on the same calendar day each month (for example, if the retainer starts on 5 May, each month's payment is due on the 5th).",
    ],
  },
  {
    title: "Contract and commitment",
    items: [
      "There is no contract, no minimum term, and no notice period.",
      "You are free to cancel the retainer at any time, for any reason, without penalty.",
      "The rebuild, once started, is delivered through to launch — this is a fixed-fee project, not a retainer.",
    ],
  },
  {
    title: "Cancellation and pro-rata refunds",
    items: [
      "If you cancel the retainer part-way through a paid month, the unused days are refunded pro-rata.",
      "Refunds are processed within 5 working days of cancellation to the original payment method.",
      "Work on cancelled months stops immediately on the day cancellation is confirmed in writing (email is fine).",
    ],
  },
  {
    title: "Scope and hours",
    items: [
      "Retainer hours can flex up or down in writing by mutual agreement at the same €60 hourly rate.",
      "Ad spend on Meta, Google or any other platform is paid by you directly to the platform — it is separate from the retainer fee.",
      "Third-party software or subscription costs (e.g. Zoho Mail mailbox fees) are paid by you directly to the provider.",
      "Website hosting is on Vercel and is included free for the lifetime of the site — there is no hosting fee to pay, ever.",
      "GDPR and cookie compliance, plus Irish and EU-aligned legal frameworks for the privacy policy and terms of use, are built into the build at no extra cost.",
      "Site copy is written in-house by Strathmark, modelled on your existing brand voice. New blog posts and ongoing content are produced the same way. You are welcome to pre-approve any piece before it goes live.",
      "Video editing for short-form content and photo enhancement for new assets are performed within the agreed retainer hours — no separate production fee.",
      "Final website files, assets, and source code are yours and transfer to you on completion of the rebuild payment.",
    ],
  },
  {
    title: "Ownership and access",
    items: [
      "Every account and login created during this project is registered in your company name. You own them outright from day one — not Strathmark.",
      "This includes Google Analytics 4, Google Search Console, GitHub (source code), Vercel (hosting), Microsoft Clarity (session analytics), and any other platform accounts set up as part of the engagement.",
      "If the email migration add-on is taken, the Zoho Mail account is also registered to your company and handed to you at project completion.",
      "While the retainer is active, Strathmark maintains the working access needed to manage and update your platforms on your behalf. If you ever choose to end the arrangement, a full credentials handover takes place immediately — you walk away with complete control of every account, every file, and every login. Nothing is withheld, and nothing is structured to keep you reliant on us.",
    ],
  },
];

export default function CoffeeCompanyProposal() {
  return (
    <main className="min-h-screen bg-strath-navy text-slate-200 selection:bg-gold selection:text-strath-navy">
      {/* Minimal header — not the site nav (private page) */}
      <header className="border-b border-white/5 py-6 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-serif tracking-[0.15em] text-white text-lg hover:text-gold transition-colors">
            STRATHMARK
          </Link>
          <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
            <ShieldCheck size={14} className="text-gold" />
            Private Proposal
          </span>
        </div>
      </header>

      <ReadingProgress />
      
      {/* 1. HERO */}
      <section className="relative px-6 pt-10 md:pt-24 pb-16 md:pb-40 border-b border-white/5 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none">
          <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full" />
          <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-strath-blue/10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-gold/80 bg-gold/5 px-3 py-1 border border-gold/10">Private Commercial Proposal</span>
            <h1 className="mt-8 text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1] tracking-tight">
              Ethical Coffee Ltd
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold font-bold">t/a The Coffee Company</span>
              <a href="https://www.thecoffeecompany.ie" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">www.thecoffeecompany.ie</a>
            </div>
            <p className="mt-10 text-2xl text-slate-300 font-light max-w-2xl leading-relaxed">
              A strategic route to a stronger digital asset, better-qualified B2B enquiries, and a durable growth engine.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mt-12 space-y-6 text-lg text-slate-400 font-light leading-relaxed max-w-2xl"
          >
            <p>Following our consultation, this proposal sets out the two most commercially sensible routes forward.</p>
            <div className="flex flex-col gap-4 mt-8">
              <div className="flex items-start gap-3 bg-white/[0.03] border border-white/5 p-4">
                <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-1">
                  <TrendingUp size={14} className="text-gold" />
                </div>
                <p className="text-sm"><strong className="text-white">The recommended route:</strong> Rebuilding the current website into a faster, more credible, search-ready platform before scaling.</p>
              </div>
              <div className="flex items-start gap-3 bg-white/[0.02] border border-white/10 p-4">
                <div className="w-6 h-6 rounded-full bg-slate-800/80 flex items-center justify-center shrink-0 mt-1 border border-white/10">
                  <Zap size={14} className="text-slate-200" />
                </div>
                <p className="text-sm text-slate-300"><strong className="text-white">The entry route:</strong> Launching Facebook campaigns first and delaying the rebuild until a later stage.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="mt-14 flex flex-wrap gap-5"
          >
            <a href="#recommended" className="group bg-gold text-strath-navy px-10 py-5 text-sm font-bold uppercase tracking-wider hover:bg-white transition-all inline-flex items-center gap-3 shadow-lg shadow-gold/10">
              View Recommended Route <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#approval" className="group border border-white/10 text-white px-10 py-5 text-sm font-bold uppercase tracking-wider hover:border-gold/50 hover:text-gold transition-all inline-flex items-center gap-3">
              Sign Proposal <PenLine size={18} className="group-hover:rotate-12 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. SITUATION */}
      <MotionSection className="px-6 py-16 md:py-32 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
            A business with strong real-world value, <span className="text-slate-500">held back digitally</span>
          </h2>
          <div className="mt-10 space-y-6 text-lg text-slate-300 font-light leading-relaxed max-w-3xl">
            <p>Ethical Coffee Ltd already has the ingredients most competitors want: strong client relationships, a trusted service model, local response speed, and a product offering that creates long-term customer value.</p>
            <p className="text-white font-medium border-l-2 border-gold pl-6 py-2 bg-gold/5">The core issue is digital. The current setup is not doing the business (trading as The Coffee Company) justice.</p>
          </div>

          <div className="mt-10 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Sparkles, title: "Operational advantage", copy: "Your local position and rapid in-house response give you a genuine commercial edge against larger competitors." },
              { icon: Target, title: "Platform limitations", copy: "The present Squarespace setup is a brochure, not a foundation for authority-building or premium conversion." },
              { icon: Zap, title: "Controlled growth", copy: "Priority is not generating noise. It is generating the right enquiries at the right pace for B2B wholesale." },
            ].map((c, i) => (
              <article key={i} className="group bg-white/[0.02] border border-white/10 p-8 hover:bg-white/[0.04] hover:border-gold/30 transition-all duration-500">
                <c.icon size={24} className="text-gold/50 group-hover:text-gold transition-colors mb-6" />
                <h3 className="font-serif text-xl font-bold text-white leading-snug">{c.title}</h3>
                <p className="mt-4 text-slate-400 text-sm font-light leading-relaxed">{c.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* 3. WHY NOW */}
      <MotionSection className="px-6 py-16 md:py-32 border-b border-white/5 bg-[#080d17]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">Why this matters now</h2>
          <p className="mt-8 text-xl text-slate-300 font-light leading-relaxed max-w-3xl">
            Digital growth is currently constrained by platform limitations and the absence of a proper content-led acquisition asset.
          </p>

          <div className="mt-10 md:mt-20 space-y-10 md:space-y-12">
            {[
              { title: "Dependence on existing awareness", copy: "When most visibility comes from people who already know you, growth stays capped. New B2B prospects discover competitors first." },
              { title: "Site cannot carry the authority burden", copy: "You have valuable knowledge, but the current setup does not build authority or compound over time as a digital asset." },
              { title: "Paid acquisition needs a foundation", copy: "Facebook campaigns perform better when they land on a destination that reinforces trust and makes the next step obvious." },
            ].map((p, i) => (
              <div key={i} className="flex gap-8 group">
                <span className="font-serif text-5xl text-gold/20 group-hover:text-gold/40 transition-colors leading-none shrink-0 w-16">0{i + 1}</span>
                <div className="pt-1">
                  <h3 className="font-serif text-2xl font-bold text-white leading-snug">{p.title}</h3>
                  <p className="mt-4 text-slate-400 text-lg font-light leading-relaxed">{p.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* 4. TWO ROUTES */}
      <MotionSection id="routes" className="px-6 py-16 md:py-32 border-b border-white/5 bg-gradient-to-b from-[#080d17] to-strath-navy">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">Two sensible routes forward</h2>
          <p className="mt-8 text-xl text-slate-400 font-light max-w-3xl">Based on the current position of the business, there are two commercially sensible ways to proceed.</p>

          <div className="mt-10 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {/* Option A */}
            <article className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-gold/0 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gradient-to-b from-white/[0.04] to-transparent border border-gold/40 p-8 md:p-12 h-full">
                <div className="absolute -top-3 right-8 bg-gold text-strath-navy text-[10px] font-mono uppercase tracking-[0.2em] px-4 py-1.5 font-bold shadow-xl">
                  Recommended
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-gold">Option A</span>
                <h3 className="mt-6 text-3xl font-serif font-bold text-white leading-tight">Rebuild first, then scale demand</h3>
                <p className="mt-6 text-slate-300 text-lg font-light leading-relaxed">
                  Create a professional foundation first, then use it to support ongoing B2B SEO and authority-building content.
                </p>

                <div className="mt-12 space-y-8">
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 mb-4">Core Deliverables</h4>
                    <ul className="space-y-3">
                      {routeAIncludes.slice(0, 6).map((item, i) => (
                        <li key={i} className="flex gap-4 text-slate-300 text-sm font-light">
                          <Check size={16} className="text-gold shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                      <li className="text-gold/60 text-xs italic pl-8">+ {routeAIncludes.length - 6} more critical items</li>
                    </ul>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    <h4 className="text-[10px] font-mono uppercase tracking-[0.1em] bg-gold/10 text-gold px-2 py-1 inline-block mb-4">Commercial Advantage</h4>
                    <ul className="space-y-4">
                      {routeAUpside.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-200 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>

            {/* Option B */}
            <article className="border border-white/15 bg-white/[0.03] p-8 md:p-12 flex flex-col h-full shadow-[0_24px_60px_rgba(2,6,23,0.2)]">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-300">{ROUTE_CONTENT.B.optionLabel}</span>
              <h3 className="mt-6 text-3xl font-serif font-bold text-white leading-tight">{ROUTE_CONTENT.B.title}</h3>
              <p className="mt-6 text-slate-200 text-lg font-light leading-relaxed">
                {ROUTE_CONTENT.B.summary}
              </p>

              <div className="mt-12 space-y-8 flex-grow">
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-300 mb-4">Includes</h4>
                  <ul className="space-y-3">
                    {routeBIncludes.map((item, i) => (
                      <li key={i} className="flex gap-4 text-slate-200 text-sm font-light">
                        <Check size={16} className="text-slate-300 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5">
                <p className="text-slate-300 text-sm italic leading-relaxed">
                  <strong className="text-slate-200 block mb-2 font-mono uppercase text-[10px] not-italic tracking-widest">Trade-off</strong>
                  Does not resolve the underlying platform issues. Campaigns will point toward a weaker digital environment.
                </p>
              </div>
            </article>
          </div>
        </div>
      </MotionSection>

      {/* 5. RECOMMENDED */}
      <MotionSection id="recommended" className="px-6 py-16 md:py-40 border-b border-white/5 bg-[#0a101d] overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/10 blur-[160px] rounded-full" />
        </div>
        
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-gold mb-8 block">Strategic Recommendation</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">Route A is the right move</h2>
          <div className="mt-10 space-y-6 text-xl text-slate-300 font-light leading-relaxed">
            <p>Ethical Coffee Ltd (t/a The Coffee Company) already has the credibility and operational substance. What is missing is the <span className="text-white font-medium">digital asset</span> that presents that value properly and compounds over time.</p>
            <p>Rebuilding first creates that asset. It ensures every future visitor, lead, and client sees the business as it truly is: a premium, service-led leader.</p>
          </div>
          
          <div className="mt-16 flex flex-col items-center gap-8">
            <blockquote className="max-w-2xl font-serif text-2xl md:text-3xl text-white italic leading-relaxed relative">
              <span className="absolute -left-8 -top-4 text-6xl text-gold/20 font-serif leading-none">“</span>
              Build the foundation properly, then use it to grow with more control.
              <span className="absolute -right-8 -bottom-12 text-6xl text-gold/20 font-serif leading-none">”</span>
            </blockquote>
            
            <a href="#approval" className="group mt-12 bg-gold text-strath-navy px-12 py-6 text-base font-bold uppercase tracking-wider hover:bg-white transition-all inline-flex items-center gap-3 shadow-2xl shadow-gold/20">
              Accept Recommendation & Sign <PenLine size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </MotionSection>

      {/* 6. SCOPE */}
      <MotionSection className="px-6 py-16 md:py-32 border-b border-white/5 bg-gradient-to-b from-[#0b1120] to-strath-navy relative overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[780px] h-[780px] bg-gold/5 blur-[140px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold">Scope clarity</span>
          <h2 className="mt-8 text-3xl md:text-5xl font-serif font-bold text-white leading-tight">Exactly what the work covers</h2>
          
          <div className="mt-10 md:mt-20 grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12">
            <article className="relative border border-gold/30 bg-white/[0.02] p-8 md:p-12 shadow-2xl">
              <div className="absolute top-0 right-0 bg-gold text-strath-navy text-[10px] font-mono uppercase tracking-widest px-4 py-1.5 font-bold">Recommended</div>
              <h3 className="font-serif text-3xl font-bold text-white">Route A scope</h3>
              <p className="mt-4 text-slate-300 font-light text-lg">Rebuild-first approach for those seeking a stronger long-term asset.</p>

              <div className="mt-12 space-y-6">
                {[
                  { n: "01", title: "Discovery & Structure", items: ["Review current content & priorities", "Establish new information architecture", "Define the authority hub foundation"] },
                  { n: "02", title: "Premium Build", items: ["Modern high-performance Next.js site", "Scalable, secure, and SEO-ready", "Mobile-first conversion design", "In-house copy drafting (pre-approval welcome)"] },
                  { n: "03", title: "Migration & GDPR", items: ["Preserve URLs and 301 redirects", "GDPR & EU cookie compliance built-in", "Vercel hosting (free for life)"] },
                ].map((g, i) => (
                  <div key={i} className="group border border-white/5 bg-white/[0.01] p-6 hover:bg-white/[0.03] transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="w-10 h-10 rounded-full bg-gold/10 text-gold text-sm font-mono tracking-widest flex items-center justify-center border border-gold/20">{g.n}</span>
                      <h4 className="text-white font-serif text-xl font-bold">{g.title}</h4>
                    </div>
                    <ul className="mt-6 space-y-3">
                      {g.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-slate-300 text-sm font-light leading-relaxed">
                          <Check size={14} className="mt-1 text-gold/60" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>

            <article className="border border-white/15 bg-white/[0.03] p-8 md:p-12 h-full flex flex-col">
              <h3 className="font-serif text-3xl font-bold text-white">Route B scope</h3>
              <p className="mt-4 text-slate-200 font-light text-lg">Campaign-first approach with the platform overhaul deferred.</p>

              <div className="mt-12 space-y-6 flex-grow">
                {[
                  { n: "01", title: "Campaign Strategy", items: ["Messaging angles & offer themes", "Audience targeting & bid strategy", "Funnel structure (Top/Mid/Bottom)"] },
                  { n: "02", title: "Launch & Management", items: ["Active campaign deployment", "Ongoing performance iteration", "Creative and copy evolution"] },
                  { n: "03", title: "Lead Handling", items: ["Advice on lead response speed", "Capture friction identification", "Rebuild decision monitoring"] },
                ].map((g, i) => (
                  <div key={i} className="border border-white/10 bg-black/15 p-6">
                    <div className="flex items-center gap-4">
                      <span className="w-10 h-10 border border-white/30 text-slate-200 text-sm font-mono flex items-center justify-center font-bold">{g.n}</span>
                      <h4 className="text-white font-serif text-xl font-bold">{g.title}</h4>
                    </div>
                    <ul className="mt-6 space-y-3 font-light text-sm text-slate-200">
                      {g.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </MotionSection>

      {/* 7. PHASES */}
      <MotionSection className="px-6 py-16 md:py-32 border-b border-white/5 bg-[#080d17]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">Delivery timeline</h2>

          <div className="mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-gold/10 border border-gold/20 rounded-lg">
                  <Clock size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white leading-none">Route A</h3>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mt-2 block">12–18 Days to Live Launch</span>
                </div>
              </div>
              
              <div className="space-y-12 relative">
                <div className="absolute left-[11px] top-4 bottom-4 w-px bg-gold/20" />
                {routeAPhases.map((p, i) => (
                  <div key={i} className="relative pl-10 group">
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-strath-navy border-2 border-gold flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    </div>
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold">Phase {i + 1}</span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold bg-white/5 px-2 py-0.5">{p.duration}</span>
                    </div>
                    <h4 className="font-serif text-xl font-bold text-white">{p.title}</h4>
                    <p className="mt-3 text-slate-400 font-light text-sm leading-relaxed">{p.copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                  <Zap size={20} className="text-slate-200" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">Route B</h3>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-300 mt-2 block">Immediate Retainer Kickoff</span>
                </div>
              </div>
              
              <div className="space-y-12 relative">
                <div className="absolute left-[11px] top-4 bottom-4 w-px bg-white/20" />
                {routeBPhases.map((p, i) => (
                  <div key={i} className="relative pl-10">
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-strath-navy border-2 border-slate-300 flex items-center justify-center z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    </div>
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                       <span className="text-[10px] font-mono uppercase tracking-widest text-slate-200">Phase {i + 1}</span>
                       <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300">{p.duration}</span>
                    </div>
                    <h4 className="font-serif text-xl font-bold text-white">{p.title}</h4>
                    <p className="mt-3 text-slate-200 font-light text-sm leading-relaxed">{p.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SEO migration note */}
          <div className="mt-12 md:mt-24 group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-transparent blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-white/[0.02] border border-white/10 p-6 md:p-12">
              <div className="flex flex-col sm:flex-row items-start gap-6 md:gap-8">
                <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center text-gold">
                  <ShieldCheck size={22} strokeWidth={1.5} className="md:hidden" />
                  <ShieldCheck size={32} strokeWidth={1} className="hidden md:block" />
                </div>
                <div>
                  <h4 className="font-serif text-xl md:text-2xl font-bold text-white">Guaranteed SEO Continuity</h4>
                  <p className="mt-3 text-slate-300 font-light leading-relaxed text-sm md:text-base max-w-3xl">
                    Moving from Squarespace to the new platform will be handled with full SEO best practice. 301 redirects will be implemented from all existing URLs, and the URL structure retained wherever appropriate to preserve every ounce of branded traffic you&apos;ve built.
                  </p>
                  <p className="mt-4 text-slate-500 font-light text-sm italic">
                    Google Search Console is monitored closely post-launch to catch and correct any regressions before they compound.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* 8. INVESTMENT */}
      <MotionSection className="px-6 py-16 md:py-32 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold">Commercial Investment</span>
          <h2 className="mt-8 text-3xl md:text-5xl font-serif font-bold text-white leading-tight">Clear pricing. <span className="text-slate-500">No surprises.</span></h2>
          <p className="mt-8 text-xl text-slate-400 font-light leading-relaxed max-w-3xl">
            Priced in euros so you pay exactly what is quoted. The rebuild and the retainer are costed separately—the retainer only begins once the site is live.
          </p>

          <div className="mt-10 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Route A Card */}
            <article className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-gold/30 to-transparent blur-sm opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-strath-navy border border-gold/40 p-8 md:p-12">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold">Route A</span>
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest bg-gold/10 text-gold px-3 py-1 border border-gold/20">
                    <TrendingUp size={12} /> Recommended
                  </div>
                </div>
                
                <h3 className="font-serif text-3xl font-bold text-white">Rebuild & Scale</h3>
                
                <div className="mt-12 space-y-10">
                  <div className="p-6 bg-white/[0.03] border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">Step 1 — One-off Rebuild</span>
                       <span className="text-xs text-gold font-mono">Fixed Fee</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-serif font-bold text-white">€3,400</span>
                      <span className="text-xs text-slate-500 font-light italic">VAT inclusive</span>
                    </div>
                    <p className="mt-4 text-xs text-slate-400 font-light leading-relaxed">— 50% deposit / 50% on launch</p>
                  </div>

                  <div className="space-y-6">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 block">Step 2 — Monthly Support (Post-Launch)</span>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 bg-white/[0.03] border border-white/5">
                        <span className="text-[10px] font-mono text-slate-500 block mb-1">Month 1</span>
                        <div className="text-2xl font-serif font-bold text-white">€1,080</div>
                        <span className="text-[10px] text-gold font-mono">18 Hours Setup</span>
                      </div>
                      <div className="p-5 bg-white/[0.03] border border-white/5">
                        <span className="text-[10px] font-mono text-slate-500 block mb-1">Ongoing</span>
                        <div className="text-2xl font-serif font-bold text-white">€600</div>
                        <span className="text-[10px] text-gold font-mono">10 Hours / Mo</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    <ul className="space-y-3">
                      {[
                        "Free Vercel Hosting for life",
                        "GDPR & Irish Legal Compliance",
                        "In-house Copywriting included",
                        "No minimum term or lock-in"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                          <Shield size={14} className="text-gold/50" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>

            {/* Route B Card */}
            <article className="border border-white/15 bg-white/[0.03] p-8 md:p-12">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 block mb-8">Route B</span>
              <h3 className="font-serif text-3xl font-bold text-white">Campaign First</h3>
              
              <div className="mt-12 space-y-10">
                <div className="p-6 bg-black/20 border border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-300 block mb-2">Build Fee Deferred</span>
                  <div className="text-2xl font-serif font-bold text-white">€0 Upfront</div>
                </div>

                <div className="space-y-6">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-300 block">Monthly Support (Starts Day 1)</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-white/[0.03] border border-white/10">
                      <span className="text-[10px] font-mono text-slate-300 block mb-1">Month 1</span>
                      <div className="text-2xl font-serif font-bold text-white">€1,080</div>
                      <span className="text-[10px] text-slate-200 font-mono">18 Hours Setup</span>
                    </div>
                    <div className="p-5 bg-white/[0.03] border border-white/10">
                      <span className="text-[10px] font-mono text-slate-300 block mb-1">Ongoing</span>
                      <div className="text-2xl font-serif font-bold text-white">€600</div>
                      <span className="text-[10px] text-slate-200 font-mono">10 Hours / Mo</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <p className="text-sm text-slate-300 leading-relaxed italic">
                    Note: This route prioritizes paid traffic over long-term asset value. The €3,400 rebuild can be triggered at any time.
                  </p>
                </div>
              </div>
            </article>
          </div>

          <div className="mt-20 flex flex-col items-center justify-center px-8 py-12 border border-gold/30 bg-gold/5 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gold/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
              <p className="font-serif text-xl font-bold text-white">Secure your project start date</p>
              <a href="#approval" className="bg-gold text-strath-navy px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-white transition-all inline-flex items-center gap-2 group/btn">
                <PenLine size={16} className="group-hover/btn:rotate-12 transition-transform" />
                Sign Now
              </a>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* 8b. RETAINER DETAILS */}
      <MotionSection className="px-6 py-16 md:py-32 border-b border-white/5 bg-[#080d17]">
        <div className="max-w-5xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold">Retainer transparency</span>
          <h2 className="mt-8 text-3xl md:text-5xl font-serif font-bold text-white leading-tight">What the monthly hours cover</h2>
          
          <div className="mt-10 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="relative p-8 md:p-12 bg-white/[0.02] border border-gold/20">
              <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-white/5">
                <h3 className="font-serif text-2xl font-bold text-white">Month 1</h3>
                <span className="text-gold font-mono font-bold">18 Hours</span>
              </div>
              <ul className="space-y-6">
                {[
                  ["Facebook Architecture", "Audience research, conversion tracking & initial creative deployment."],
                  ["SEO Foundations", "Metadata mapping, internal link structure & Search Console sync."],
                  ["Authority Content", "First high-intent B2B piece drafted & optimized in-house."],
                  ["Strategy Baseline", "Commercial reporting setup & 45-minute kickoff call."]
                ].map(([title, copy], i) => (
                  <li key={i} className="group">
                    <div className="text-white font-bold group-hover:text-gold transition-colors">{title}</div>
                    <div className="text-slate-400 font-light mt-2 text-sm leading-relaxed">{copy}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 md:p-12 bg-white/[0.01] border border-white/10 opacity-70 group hover:opacity-100 transition-opacity">
              <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-white/5">
                <h3 className="font-serif text-2xl font-bold text-white">Ongoing</h3>
                <span className="text-slate-400 font-mono">10 Hours / Mo</span>
              </div>
              <ul className="space-y-6">
                {[
                  ["Campaign Management", "Ongoing iteration (bid/creative/audience) & lead review."],
                  ["Content & Assets", "One new authority article + monthly asset enhancement."],
                  ["SEO & Technical", "Technical health checks, rankings audit & small site tweaks."],
                  ["Reporting & Review", "Commercial outcomes report + 30-minute monthly call."]
                ].map(([title, copy], i) => (
                  <li key={i}>
                    <div className="text-white font-bold">{title}</div>
                    <div className="text-slate-400 font-light mt-2 text-sm leading-relaxed">{copy}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-16 text-slate-500 text-sm italic text-center">
            If a month demands extra hours (e.g. a seasonal push), we agree them in writing first at the same €60 rate. No surprise invoices.
          </p>
        </div>
      </MotionSection>

      {/* 9. TEAFORTE ADVISORY */}
      <MotionSection className="px-6 py-16 md:py-32 border-b border-white/5 bg-[#09101c]">
        <div className="max-w-5xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold">Strategic advisory</span>
          <h2 className="mt-8 text-3xl md:text-5xl font-serif font-bold text-white leading-tight">Advisory: teaforte.ie</h2>

          <div className="mt-16 border border-white/10 bg-white/[0.02] p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold">Status: Dormant</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Reviewed in full before making this recommendation</span>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-10">
              <div className="space-y-6 text-slate-300 font-light leading-relaxed">
                <p>
                  This asset was looked at properly before reaching a view. The conclusion is clear: <span className="text-white font-medium">teaforte.ie should remain dormant for now</span>.
                </p>
                <p>
                  The core reason is strategic. The Coffee Company is a <span className="text-white font-medium">B2B wholesale business</span>. Tea Forte is a <span className="text-white font-medium">direct-to-consumer tea proposition</span>. They are not the same commercial vehicle, not the same buyer journey, and not the same growth model.
                </p>
                <p>
                  During the consultation, the idea of merging the two was raised. I would not recommend that. Combining them would blur positioning, dilute the wholesale message, and make the main commercial objective harder rather than easier.
                </p>
                <p>
                  Equally, I do not think it would be smart for you to spend more money asking me to repair or rebuild the current Tea Forte site at this stage. <span className="text-white font-medium">I could do that work</span>, but there is no meaningful strategic benefit in doing so today because the site receives no real traffic and there is far too much structurally wrong with it for that investment to produce sensible ROI.
                </p>
                <p>
                  In plain terms: I would rather advise against taking your money on the wrong project than recommend extra work that does not materially help the business. If, down the line, you decide there is a genuine commercial case for Tea Forte as its own focused offer, I am very happy to discuss a proper rebuild then.
                </p>
              </div>

              <div className="border border-white/10 bg-black/20 p-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300">Current position</span>
                <div className="mt-6 space-y-3">
                  {[
                    "SSL expired Aug 2025",
                    "WordPress security risk",
                    "Registration safe to 2027",
                  ].map((note, i) => (
                    <div key={i} className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/70" />
                      {note}
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold block">Recommendation</span>
                  <p className="mt-3 text-sm text-slate-300 font-light leading-relaxed">
                    Leave it dormant. Keep the domain safe. Revisit only if there is a standalone commercial strategy worth backing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* 10. APPROVAL */}
      <MotionSection id="approval" className="px-6 py-16 md:py-40 border-b border-white/5 scroll-mt-20 bg-gradient-to-b from-strath-navy to-black">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-gold/10 border border-gold/20 px-4 py-1.5 mb-10">
            <PenLine size={14} className="text-gold" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold font-bold">Secure Authorisation</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">Authorise and proceed</h2>
          <p className="mt-8 text-xl text-slate-400 font-light leading-relaxed">
            Select your preferred route below and sign to confirm approval. A signed PDF will be generated immediately for your records.
          </p>

          <div className="mt-20 text-left bg-white/[0.02] border border-white/10 p-8 md:p-12 shadow-2xl">
            <div className="mb-8 border border-gold/20 bg-gold/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold">Optional add-on</span>
                <span className="text-sm font-serif font-bold text-white">Zoho Mail Migration · €350 one-off</span>
              </div>
              <p className="mt-3 text-sm text-slate-300 font-light leading-relaxed">
                If useful, this can be added here without needing a separate project line item. It covers migration away from Register365, DNS/MX setup, secure mailbox transfer for up to 5 users, and a clean handover once complete.
              </p>
            </div>
            <ApprovalForm />
          </div>
        </div>
      </MotionSection>

      {/* 11. TERMS */}
      <MotionSection className="px-6 py-16 md:py-32 border-b border-white/5 bg-[#080d17]">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold font-bold">Commercial terms</span>
          <h2 className="mt-8 text-3xl md:text-5xl font-serif font-bold text-white leading-tight">Professional standards. <span className="text-slate-500">Zero lock-in.</span></h2>
          
          <div className="mt-10 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-8 md:gap-y-12">
            {termGroups.map((group, gi) => (
              <div key={gi}>
                <h3 className="font-serif text-xl font-bold text-gold flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  {group.title}
                </h3>
                <ul className="mt-8 space-y-4">
                  {group.items.map((t, i) => (
                    <li key={i} className="flex gap-4 text-slate-400 font-light text-sm leading-relaxed">
                      <div className="w-1 h-px bg-white/20 mt-2.5 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-24 p-8 md:p-12 bg-white/[0.02] border border-white/5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gold block mb-4">Integrity Guarantee</span>
            <p className="text-slate-300 font-light leading-relaxed text-lg italic">
              Strathmark works on a goodwill basis. There is no long-term contract to sign, and you are free to cancel the arrangement at any time without penalty. All accounts, assets, and source code are registered in your name and stay in your ownership.
            </p>
          </div>
        </div>
      </MotionSection>

      {/* Footer */}
      <footer className="py-10 px-6 text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-slate-500">
          Prepared by Strathmark Consulting
        </p>
      </footer>
      <StickySignCTA />
    </main>
  );
}
