import { ChartNoAxesCombined, FileQuestion, Gauge, Waypoints } from "lucide-react";

const TRIGGERS = [
  {
    icon: ChartNoAxesCombined,
    title: "Spend is rising without clearer returns.",
    copy: "More activity is visible, but leadership still cannot see which decisions are improving commercial performance.",
  },
  {
    icon: FileQuestion,
    title: "Reports show activity, not decisions.",
    copy: "Dashboards are busy, recommendations conflict, and the answer changes depending on who is presenting it.",
  },
  {
    icon: Gauge,
    title: "The website is becoming a constraint.",
    copy: "Speed, structure, search visibility, or conversion problems are limiting otherwise valuable demand.",
  },
  {
    icon: Waypoints,
    title: "Nobody owns the complete system.",
    copy: "Agencies, developers, and internal teams each own a piece, but no independent view connects the commercial whole.",
  },
] as const;

export function Proof() {
  return (
    <section className="relative w-full overflow-hidden bg-ivory py-20 text-ink md:py-28" id="proof">
      <div className="editorial-grid-dark absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="section-shell relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="section-kicker !text-[#74521f]">When to call</p>
            <h2 className="mt-6 max-w-4xl text-[clamp(2.7rem,5.4vw,5rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
              When digital performance stops making commercial sense.
            </h2>
          </div>
          <aside className="border border-ink/15 bg-white/75 p-7 shadow-[0_20px_60px_rgba(11,22,36,0.08)] backdrop-blur-sm md:p-8 lg:col-span-4 lg:mb-1">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.17em] text-[#74521f]">Commercial signal</p>
            </div>
            <p className="mt-6 text-xl font-medium leading-9 text-slate-700">
              Strathmark is designed for situations where activity is visible but the commercial answer is not. The work starts by making the problem legible.
            </p>
          </aside>
        </div>

        <div className="mt-10 grid gap-px border border-gold/30 bg-gold/30 sm:grid-cols-2">
          {TRIGGERS.map((trigger, index) => {
            const Icon = trigger.icon;
            return (
              <article
                key={trigger.title}
                className="group relative min-h-80 bg-strath-navy p-7 text-white transition-colors hover:bg-[#12263b] md:min-h-[22rem] md:p-10 xl:p-12"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-13 w-13 place-items-center border border-gold bg-gold text-ink">
                    <Icon aria-hidden="true" size={24} />
                  </span>
                  <span className="font-mono text-sm font-semibold text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-10 max-w-xl text-[clamp(1.75rem,2.2vw,2.35rem)] font-semibold leading-[1.15] tracking-[-0.015em]">
                  {trigger.title}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
                  {trigger.copy}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
