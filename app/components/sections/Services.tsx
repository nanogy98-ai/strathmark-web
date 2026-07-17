import { ArrowRight, Check, Landmark, ServerCog, ShieldCheck } from "lucide-react";
import { SectionLink } from "@/app/components/ui/SectionLink";

const SECONDARY_ENGAGEMENTS = [
  {
    icon: ServerCog,
    number: "02",
    title: "Technical Recovery",
    audience: "For teams dealing with a slow, broken, or search-invisible website.",
    outcome: "I diagnose the structural issue, define the recovery plan, and coordinate the specialist work required.",
    includes: [
      "Platform and infrastructure diagnosis",
      "Core Web Vitals engineering",
      "Migration risk mitigation",
      "Technical debt consolidation",
    ],
    cta: "Discuss technical recovery",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Ongoing Digital Oversight",
    audience: "For organisations that need continued independent accountability.",
    outcome: "I sit on your side of the table to oversee vendors, priorities, and execution after the initial review.",
    includes: [
      "Limited client roster",
      "Direct principal access",
      "Rolling 30-day terms",
      "Execution only after review",
    ],
    cta: "Discuss ongoing oversight",
  },
] as const;

export function Services() {
  return (
    <section className="w-full bg-strath-navy py-20 md:py-28" id="services">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="section-kicker">Engagements</p>
            <h2 className="mt-6 max-w-2xl text-[clamp(2.6rem,5vw,4.7rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-white">
              Start with an independent review.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-slate-300 lg:justify-self-end">
            Diagnosis comes before execution. Each engagement is designed to show what is working, what is not, and what should happen next.
          </p>
        </div>

        <div className="mt-12 grid gap-5">
          <article className="relative overflow-hidden border border-gold/35 bg-[linear-gradient(135deg,rgba(201,164,99,0.14),rgba(255,255,255,0.025)_55%)] p-7 md:p-10 lg:p-12">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-gold/15" aria-hidden="true" />
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-gold/20" aria-hidden="true" />

            <div className="relative">
              <div className="flex items-start justify-between gap-6">
                <span className="grid h-12 w-12 place-items-center border border-gold/35 bg-gold/10 text-gold">
                  <Landmark aria-hidden="true" size={22} />
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-gold">Flagship engagement</span>
              </div>

              <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:items-end lg:gap-16">
                <div>
                  <p className="font-mono text-xs text-slate-400">01</p>
                  <h3 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-[3.4rem]">
                    Independent Digital &amp; Spend Review
                  </h3>
                  <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                    For leadership teams that need an objective view of performance.
                  </p>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
                    A fixed-fee review of spend, reporting, search, and website performance, delivered as a prioritised roadmap.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    {[
                      "Performance spend audit",
                      "Vendor and agency management",
                      "Commercial impact modelling",
                      "Search strategy validation",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                        <Check aria-hidden="true" size={15} className="shrink-0 text-gold" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <SectionLink
                    href="/#contact"
                    className="group mt-8 inline-flex min-h-14 w-full items-center justify-center gap-3 bg-gold px-7 text-sm font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-white sm:w-auto"
                  >
                    Request this review
                    <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-1" />
                  </SectionLink>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-5 lg:grid-cols-2">
            {SECONDARY_ENGAGEMENTS.map((engagement) => {
              const Icon = engagement.icon;
              return (
                <article key={engagement.title} className="flex h-full flex-col border border-white/10 bg-white/[0.025] p-7 transition-colors hover:border-gold/35 md:p-8 lg:p-10">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center border border-white/10 bg-white/5 text-gold">
                      <Icon aria-hidden="true" size={20} />
                    </span>
                    <span className="font-mono text-xs text-slate-600">{engagement.number}</span>
                  </div>
                  <h3 className="mt-8 text-3xl font-semibold text-white">{engagement.title}</h3>
                  <p className="mt-4 text-sm font-semibold leading-6 text-slate-300">{engagement.audience}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{engagement.outcome}</p>
                  <ul className="mt-6 grid gap-2 border-t border-white/10 pt-5 sm:grid-cols-2">
                    {engagement.includes.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <SectionLink
                    href="/#contact"
                    className="group mt-auto inline-flex min-h-11 items-center gap-2 pt-7 text-xs font-bold uppercase tracking-[0.14em] text-gold transition-colors hover:text-white"
                  >
                    {engagement.cta}
                    <ArrowRight aria-hidden="true" size={14} className="transition-transform group-hover:translate-x-1" />
                  </SectionLink>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
