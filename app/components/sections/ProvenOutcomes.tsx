"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies-data";

export function ProvenOutcomes() {
  const featuredStudies = caseStudies.filter((study) => study.featured).slice(0, 3);

  if (featuredStudies.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-7xl px-6 py-16 md:py-24 mx-auto border-t border-white/5" id="outcomes">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold">Case studies</span>
          <h3 className="mt-6 text-3xl md:text-4xl font-serif font-bold text-white">
            Proof that the work goes beyond tidy decks and vague uplift.
          </h3>
          <p className="mt-4 text-slate-400 text-lg font-light leading-relaxed">
            Enterprise insurers, legal firms, utilities, and owner-led brands all have different constraints. The common thread is the same: clearer structure, stronger demand capture, and better commercial accountability.
          </p>
        </div>
        <Link href="/case-studies" className="text-gold inline-flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest text-xs font-mono">
          View All Case Studies <ArrowRight size={14} />
        </Link>
      </div>

      <div className="mt-10 md:mt-12 grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-8">
        <Link href={`/case-studies/${featuredStudies[0].slug}`} className="group block">
          <article className="relative overflow-hidden border border-white/10 bg-white/[0.03] p-8 md:p-10 h-full transition-colors group-hover:border-gold/35">
            <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-gold/8 blur-[90px]" />
            <div className="relative">
              <div className="flex flex-wrap gap-3 text-[10px] font-mono uppercase tracking-[0.24em]">
                <span className="border border-gold/20 bg-gold/10 px-3 py-1 text-gold">{featuredStudies[0].industry}</span>
                <span className="text-slate-500">{featuredStudies[0].region}</span>
              </div>

              <h4 className="mt-6 text-3xl font-serif font-bold text-white leading-tight group-hover:text-gold transition-colors">
                {featuredStudies[0].client}
              </h4>
              <p className="mt-5 text-lg text-slate-300 font-light leading-relaxed">
                {featuredStudies[0].headline}
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-8">
                {featuredStudies[0].metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="text-3xl font-serif font-bold text-white">{metric.value}</div>
                    <div className="mt-2 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">{metric.label}</div>
                    <div className="mt-2 text-sm text-slate-400 font-light leading-relaxed">{metric.context}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-gold">
                Read case study <ArrowRight size={14} />
              </div>
            </div>
          </article>
        </Link>

        <div className="grid grid-cols-1 gap-6">
          {featuredStudies.slice(1).map((study) => (
            <Link href={`/case-studies/${study.slug}`} key={study.slug} className="group block">
              <article className="h-full border border-white/10 bg-white/[0.02] p-6 md:p-7 transition-colors group-hover:border-gold/30">
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em]">
                  <span className="text-gold">{study.industry}</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-slate-500">{study.region}</span>
                </div>

                <h4 className="mt-5 text-2xl font-serif font-bold text-white leading-tight group-hover:text-gold transition-colors">
                  {study.client}
                </h4>
                <p className="mt-4 text-sm text-slate-300 font-light leading-relaxed">
                  {study.excerpt}
                </p>

                <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  {study.metrics.slice(0, 2).map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">{metric.label}</div>
                        <div className="mt-1 text-xs text-slate-400 font-light">{metric.context}</div>
                      </div>
                      <div className="text-2xl font-serif font-bold text-white">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
