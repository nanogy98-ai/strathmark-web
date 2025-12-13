import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies-data";
import { Footer } from "@/app/components/sections/Footer";
import { Navigation } from "@/app/components/Navigation";

export const metadata: Metadata = {
  title: "Case Studies | Strathmark Consulting",
  description: "Selected engagements and real commercial impact from strategic digital consulting.",
  openGraph: {
    title: "Case Studies | Strathmark Consulting",
    description: "Selected engagements and real commercial impact.",
    url: "https://strathmark.com/case-studies",
  },
};

export default function CaseStudiesIndex() {
  return (
    <main className="min-h-screen bg-strath-navy text-slate-200 selection:bg-gold selection:text-strath-navy flex flex-col">
      <Navigation />
      
      <section className="pt-32 pb-16 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Case Studies</h1>
          <p className="text-xl text-slate-400 max-w-2xl font-light">Selected engagements. Real commercial impact.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, i) => (
            <Link href={`/case-studies/${study.slug}`} key={i} className="group block">
              <div className="bg-white/[0.02] border border-white/10 p-8 h-full hover:border-gold/30 transition-colors flex flex-col">
                <div className="flex gap-3 text-xs font-mono uppercase tracking-widest mb-6">
                  <span className="text-gold">{study.industry}</span>
                  <span className="text-slate-600">//</span>
                  <span className="text-slate-400">{study.region}</span>
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-white mb-6 group-hover:text-gold transition-colors leading-tight">
                  {study.title}
                </h3>
                
                <div className="grid grid-cols-3 gap-4 mb-8 pt-6 border-t border-white/5">
                  {study.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="text-lg font-bold text-white">{m.value}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between text-xs font-mono uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                  <span>Read Full Report</span>
                  <ArrowRight size={16} className="text-gold" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

