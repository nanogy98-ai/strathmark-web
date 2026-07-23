import { Ban, CheckCircle2, LockKeyhole, UserCheck } from "lucide-react";

const BOUNDARIES = ["Safety-critical engineering decisions", "Certification or regulatory approval", "Direct control of live production systems", "Legal interpretation or unsupervised customer deliverables"];

export function Governance() {
  return (
    <section className="w-full bg-[#07111d] py-20 md:py-28" id="governance">
      <div className="section-shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5"><p className="section-kicker">Governance and boundaries</p><h2 className="mt-6 text-[clamp(2.7rem,5vw,4.7rem)] font-semibold leading-[1.01] tracking-[-0.03em] text-white">Useful AI needs visible authority.</h2><p className="mt-7 text-lg leading-9 text-slate-300">Every engagement starts by defining what data may be used, what the system may produce, who must review it and where AI must not act.</p></div>
        <div className="lg:col-span-7">
          <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
            {[{icon:UserCheck,title:"Human authority",copy:"A named, qualified person owns every consequential decision and final output."},{icon:LockKeyhole,title:"Controlled information",copy:"Approved data, least-privilege access, source traceability and client permission are explicit."},{icon:CheckCircle2,title:"Measured reliability",copy:"Outputs are tested against an agreed baseline for quality, time, defects and acceptance."},{icon:Ban,title:"Clear stop conditions",copy:"The pilot is revised or stopped when evidence, security or operational acceptance is insufficient."}].map(item=>{const Icon=item.icon; return <article key={item.title} className="bg-strath-navy p-7 md:p-8"><Icon aria-hidden="true" className="text-gold" size={23}/><h3 className="mt-6 text-xl font-semibold text-white">{item.title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{item.copy}</p></article>})}
          </div>
          <div className="mt-5 border border-red-300/20 bg-red-300/[0.06] p-7 md:p-8"><p className="text-xs font-bold uppercase tracking-[0.17em] text-red-200">Never delegated without review</p><ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-300 sm:grid-cols-2">{BOUNDARIES.map(item=><li key={item} className="flex items-start gap-3"><Ban aria-hidden="true" size={15} className="mt-1 shrink-0 text-red-200"/>{item}</li>)}</ul></div>
        </div>
      </div>
    </section>
  );
}
