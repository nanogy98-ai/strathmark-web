"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3 } from "lucide-react";
import { caseStudies } from "@/lib/case-studies-data";

export function ProvenOutcomes() {
  const featured = caseStudies[0];

  return (
    <section className="w-full max-w-7xl px-6 py-24 mx-auto border-t border-white/5" id="outcomes">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Proven Outcomes</h2>
          <p className="text-slate-400 text-lg">Case studies in structural remediation and growth.</p>
        </div>
        <div className="hidden md:block">
          <Link href="/case-studies" className="text-gold flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest text-xs font-mono">
            View All Case Studies <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white/[0.02] border border-white/5 p-8 md:p-12 hover:border-gold/30 transition-colors group">
        <div className="space-y-6">
          <div className="flex gap-3 text-xs font-mono uppercase tracking-widest">
            <span className="text-gold">{featured.industry}</span>
            <span className="text-slate-600">//</span>
            <span className="text-slate-400">{featured.region}</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight group-hover:text-gold transition-colors">
            {featured.title}
          </h3>
          
          <div className="grid grid-cols-3 gap-6 py-6 border-y border-white/5">
            {featured.metrics.map((m, i) => (
              <div key={i}>
                <div className="text-xl md:text-2xl font-bold text-white">{m.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-slate-500 italic">Client: First Vehicle Leasing (NDA)</div>
            <Link 
              href={`/case-studies/${featured.slug}`}
              className="bg-white text-strath-navy px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gold transition-colors inline-flex items-center gap-2"
            >
              Read Case Study <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="relative h-64 md:h-full min-h-[300px] bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden">
          <Image 
            src="/case-studies/organic-turnaround-gsc.png"
            alt="Performance Graph"
            fill
            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-strath-navy/80 via-transparent to-transparent opacity-60"></div>
        </div>
      </div>

      <div className="mt-8 md:hidden text-center">
        <Link href="/case-studies" className="text-gold inline-flex items-center gap-2 uppercase tracking-widest text-xs font-mono">
          View All Case Studies <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
