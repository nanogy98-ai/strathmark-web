import Link from "next/link";
import { ArrowRight, BarChart3, Search, Waypoints } from "lucide-react";

export function DigitalPractice() {
  return (
    <section className="w-full bg-ivory py-20 text-ink md:py-24" id="digital-performance">
      <div className="section-shell"><div className="grid gap-10 border-y border-ink/15 py-10 lg:grid-cols-12 lg:items-center lg:py-14"><div className="lg:col-span-7"><p className="section-kicker !text-[#74521f]">Established secondary practice</p><h2 className="mt-5 text-[clamp(2.3rem,4vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.025em]">Independent digital performance advisory continues.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Existing review, technical recovery, search and agency oversight work remains available for leadership teams that need a clearer commercial answer.</p><Link href="/digital-performance" className="group mt-7 inline-flex min-h-12 items-center gap-3 text-sm font-bold uppercase tracking-[0.14em] text-[#74521f]">Explore digital performance <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-1"/></Link></div><div className="grid grid-cols-3 gap-px border border-ink/15 bg-ink/15 lg:col-span-5">{[{icon:BarChart3,label:"Spend"},{icon:Search,label:"Search"},{icon:Waypoints,label:"Systems"}].map(item=>{const Icon=item.icon;return <div key={item.label} className="bg-white p-5 text-center md:p-7"><Icon aria-hidden="true" className="mx-auto text-[#74521f]" size={22}/><p className="mt-4 text-xs font-bold uppercase tracking-[0.14em]">{item.label}</p></div>})}</div></div></div>
    </section>
  );
}
