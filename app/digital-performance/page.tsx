import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Check, ServerCog, ShieldCheck } from "lucide-react";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/sections/Footer";
import { caseStudies } from "@/lib/case-studies-data";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Independent Digital Performance Advisory | Strathmark",
  description: "Independent digital performance reviews, technical recovery, search strategy and agency oversight for leadership teams that need clear commercial answers.",
  alternates: { canonical: `${SITE_URL}/digital-performance` },
  openGraph: { title: "Independent Digital Performance Advisory | Strathmark", description: "Clear commercial answers on digital spend, search, websites and agency performance.", url: `${SITE_URL}/digital-performance`, type: "website" },
};

const SERVICES = [
  { icon: BarChart3, title: "Independent Digital and Spend Review", copy: "A fixed-fee review of spend, reporting, search and website performance, delivered as a prioritised commercial roadmap.", points: ["Performance and spend audit", "Commercial impact modelling", "Vendor and agency challenge"] },
  { icon: ServerCog, title: "Technical Recovery", copy: "Diagnosis and recovery planning for a slow, structurally weak or search-invisible website.", points: ["Platform and infrastructure diagnosis", "Core Web Vitals engineering", "Migration and technical debt planning"] },
  { icon: ShieldCheck, title: "Ongoing Digital Oversight", copy: "Independent accountability for vendors, priorities and execution after the initial review.", points: ["Direct principal access", "Leadership reporting", "Execution only after diagnosis"] },
] as const;

export default function DigitalPerformancePage() {
  const featured = caseStudies.filter(study => study.featured).slice(0, 3);
  return <main className="min-h-screen bg-strath-navy text-slate-200"><Navigation />
    <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44"><div className="editorial-grid absolute inset-0 opacity-55" aria-hidden="true"/><div className="section-shell relative grid gap-12 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="section-kicker">Secondary practice</p><h1 className="mt-7 text-[clamp(3.1rem,7vw,6.4rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white">Know what your digital spend is actually producing.</h1><p className="mt-8 max-w-2xl text-xl leading-9 text-slate-300">Independent reviews, technical recovery and agency oversight for leadership teams that need the commercial truth, not another activity report.</p></div><div className="border border-white/15 bg-white/[0.04] p-7 lg:col-span-4"><p className="text-sm leading-7 text-slate-300">This established practice continues alongside Strathmark’s primary AI transformation work.</p><Link href="/#contact" className="group mt-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-gold">Discuss digital performance <ArrowRight size={15} className="transition-transform group-hover:translate-x-1"/></Link></div></div></section>
    <section className="bg-ivory py-20 text-ink md:py-28"><div className="section-shell"><div className="grid gap-5 lg:grid-cols-3">{SERVICES.map(item=>{const Icon=item.icon;return <article key={item.title} className="border border-ink/15 bg-white p-8"><Icon className="text-[#74521f]"/><h2 className="mt-7 text-3xl font-semibold">{item.title}</h2><p className="mt-5 text-base leading-8 text-slate-600">{item.copy}</p><ul className="mt-7 space-y-3 border-t border-ink/10 pt-6 text-sm text-slate-700">{item.points.map(point=><li key={point} className="flex gap-3"><Check size={15} className="mt-0.5 text-[#74521f]"/>{point}</li>)}</ul></article>})}</div></div></section>
    <section className="bg-strath-navy py-20 md:py-28"><div className="section-shell"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="section-kicker">Selected digital work</p><h2 className="mt-6 text-4xl font-semibold text-white md:text-6xl">Evidence from complex organisations.</h2></div><Link href="/case-studies" className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-gold">View all case studies <ArrowRight size={15}/></Link></div><div className="mt-12 grid gap-px border border-white/10 bg-white/10 lg:grid-cols-3">{featured.map(study=><Link key={study.slug} href={`/case-studies/${study.slug}`} className="group bg-[#0d1c2c] p-8"><p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">{study.industry}</p><h3 className="mt-5 text-2xl font-semibold text-white group-hover:text-gold">{study.client}</h3><p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-400">{study.excerpt}</p><span className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-gold">Read case study <ArrowRight size={14}/></span></Link>)}</div></div></section>
    <section className="bg-ivory py-16 text-ink"><div className="section-shell flex flex-col justify-between gap-7 md:flex-row md:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#74521f]">Need an independent answer?</p><h2 className="mt-3 text-3xl font-semibold md:text-4xl">Start with the commercial problem.</h2></div><Link href="/#contact" className="inline-flex min-h-14 items-center gap-3 bg-strath-navy px-7 text-sm font-bold uppercase tracking-[0.14em] text-white">Request a digital review <ArrowRight size={16}/></Link></div></section>
    <Footer />
  </main>;
}
