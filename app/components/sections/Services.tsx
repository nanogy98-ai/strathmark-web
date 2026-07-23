import { ArrowRight, Check, Compass, FlaskConical, Network, ShieldCheck, UsersRound } from "lucide-react";
import { SectionLink } from "@/app/components/ui/SectionLink";

const SERVICES = [
  { icon: Compass, number: "01", title: "AI Opportunity and Exposure Review", label: "The entry point", copy: "A fixed-fee leadership review that identifies the most valuable workflows, the real constraints and the risks that must be controlled before investment.", details: ["Leadership and workflow interviews", "Opportunity and exposure map", "Prioritised 90-day roadmap"], price: "From £3,500" },
  { icon: Network, number: "02", title: "Workflow and Knowledge Diagnostic", label: "Find the leverage", copy: "Trace how work, decisions and technical knowledge move through the business, then identify where structured reuse can improve speed and consistency.", details: ["Workflow decomposition", "Knowledge dependency map", "Data readiness and access review"] },
  { icon: FlaskConical, number: "03", title: "Controlled AI Pilot", label: "Prove it safely", copy: "Test one bounded, non-safety-critical workflow against the current process, with human review and success measures agreed before the work starts.", details: ["Shadow workflow", "Quality and time baseline", "Deploy, revise or stop decision"] },
  { icon: ShieldCheck, number: "04", title: "Independent AI Oversight", label: "Stay in control", copy: "Independent support for vendor selection, governance, evaluation and rollout so leadership retains control of risk, value and technical authority.", details: ["Vendor and architecture challenge", "Governance and evaluation", "Leadership reporting"] },
  { icon: UsersRound, number: "05", title: "Knowledge and Succession", label: "Protect enterprise value", copy: "Turn expert judgement, project history and failure lessons into governed, searchable organisational assets without pretending that a document replaces experience.", details: ["Expert knowledge capture", "Decision and failure records", "Ownership and review model"] },
] as const;

export function Services() {
  return (
    <section className="w-full bg-strath-navy py-20 md:py-28" id="services">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8"><p className="section-kicker">Advisory services</p><h2 className="mt-6 max-w-4xl text-[clamp(2.7rem,5vw,4.9rem)] font-semibold leading-[1.01] tracking-[-0.03em] text-white">A controlled route from opportunity to operating advantage.</h2></div>
          <p className="text-lg leading-8 text-slate-300 lg:col-span-4">Start with evidence. Prioritise one bounded opportunity. Prove its value. Scale only when the controls and operating ownership are ready.</p>
        </div>

        <div className="mt-12 grid gap-px border border-white/10 bg-white/10 lg:grid-cols-2">
          {SERVICES.map((service, index) => { const Icon = service.icon; const featured = index === 0; return (
            <article key={service.title} className={featured ? "relative bg-[#12263b] p-8 lg:col-span-2 lg:grid lg:grid-cols-12 lg:gap-12 md:p-10" : "bg-[#0d1c2c] p-8 md:p-10"}>
              <div className={featured ? "lg:col-span-7" : ""}>
                <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center border border-gold/40 bg-gold/10 text-gold"><Icon aria-hidden="true" size={22} /></span><span className="font-mono text-xs font-semibold text-gold">{service.number}</span></div>
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-gold">{service.label}</p>
                <h3 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{service.title}</h3>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">{service.copy}</p>
              </div>
              <div className={featured ? "mt-8 border-t border-white/10 pt-7 lg:col-span-5 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0" : "mt-8 border-t border-white/10 pt-6"}>
                <ul className="space-y-3 text-sm text-slate-300">{service.details.map(item => <li key={item} className="flex items-start gap-3"><Check aria-hidden="true" size={16} className="mt-1 shrink-0 text-gold" />{item}</li>)}</ul>
                {"price" in service ? <p className="mt-7 text-xl font-semibold text-white">{service.price}</p> : null}
                <SectionLink href="/#contact" className="group mt-7 inline-flex min-h-11 items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-gold transition-colors hover:text-white">Discuss this service <ArrowRight aria-hidden="true" size={15} className="transition-transform group-hover:translate-x-1" /></SectionLink>
              </div>
            </article>
          );})}
        </div>
      </div>
    </section>
  );
}
