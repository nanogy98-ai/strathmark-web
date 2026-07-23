import Link from "next/link";
import { ArrowRight, FileSearch, Gauge, ShieldCheck } from "lucide-react";

export function SampleBriefing() {
  return (
    <section className="w-full bg-strath-navy py-20 md:py-28" id="briefing">
      <div className="section-shell">
        <div className="overflow-hidden border border-white/15 bg-[#0d1c2c] lg:grid lg:grid-cols-12">
          <div className="relative min-h-[28rem] overflow-hidden border-b border-white/10 p-8 md:p-12 lg:col-span-5 lg:border-b-0 lg:border-r">
            <div className="editorial-grid absolute inset-0 opacity-60" aria-hidden="true"/><div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-gold/25" aria-hidden="true"/><div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-gold/25" aria-hidden="true"/>
            <div className="relative"><p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Anonymised strategic research sample</p><p className="mt-24 font-mono text-xs text-slate-400">INDUSTRIAL SYSTEMS INTEGRATION / 2026</p><h2 className="mt-5 text-4xl font-semibold leading-[1.05] text-white md:text-5xl">How agentic AI could reshape a 30-year-old industrial integrator.</h2></div>
          </div>
          <div className="p-8 md:p-12 lg:col-span-7">
            <p className="section-kicker">See the thinking</p><p className="mt-7 max-w-2xl text-xl leading-9 text-slate-300">A practical example of how Strathmark examines workflow exposure, durable human advantage, pilot design and operating governance. It is research, not an implementation case study or a forecast of results.</p>
            <div className="mt-9 grid gap-4 sm:grid-cols-3">{[{icon:FileSearch,label:"Workflow exposure"},{icon:Gauge,label:"90-day pilot"},{icon:ShieldCheck,label:"Safety boundaries"}].map(item=>{const Icon=item.icon;return <div key={item.label} className="border border-white/10 bg-white/[0.025] p-5"><Icon aria-hidden="true" className="text-gold" size={20}/><p className="mt-4 text-sm font-semibold text-white">{item.label}</p></div>})}</div>
            <Link href="/briefings/industrial-ai-systems-integrator" className="group mt-9 inline-flex min-h-14 items-center gap-3 bg-gold px-7 text-sm font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-white">Read the sample briefing <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-1"/></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
