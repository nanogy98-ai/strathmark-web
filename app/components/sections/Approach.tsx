import { ListChecks, Route, SearchCheck, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    icon: SearchCheck,
    number: "01",
    label: "Diagnose",
    detail: "Analyse spend, infrastructure, reporting, and team capabilities.",
    timing: "Fixed-fee review",
  },
  {
    icon: ListChecks,
    number: "02",
    label: "Prioritise",
    detail: "Set out what to fix, what to stop, and where to double down.",
    timing: "Findings readout",
  },
  {
    icon: Route,
    number: "03",
    label: "Plan",
    detail: "Define the solution, owners, dependencies, and sequence of work.",
    timing: "Action roadmap",
  },
  {
    icon: ShieldCheck,
    number: "04",
    label: "Oversee",
    detail: "Add optional ongoing advisory to maintain pace and accountability.",
    timing: "By invitation",
  },
] as const;

export function Approach() {
  return (
    <section className="relative w-full overflow-hidden bg-ivory py-20 text-ink md:py-28" id="approach">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="section-kicker !text-[#74521f]">The review process</p>
            <h2 className="mt-6 max-w-3xl text-[clamp(2.6rem,5vw,4.7rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
              A clear route from diagnosis to action.
            </h2>
          </div>
          <p className="max-w-xl border-l-2 border-gold pl-6 text-xl font-medium leading-9 text-slate-700 lg:justify-self-end">
            The work is deliberately structured: establish the evidence, make the decisions, then decide who should execute.
          </p>
        </div>

        <ol className="mt-14 grid gap-4 md:grid-cols-2">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <li
                key={step.number}
                className="group relative overflow-hidden border border-ink/15 bg-white/70 p-7 shadow-[0_16px_45px_rgba(11,22,36,0.05)] transition-all hover:-translate-y-1 hover:border-gold/70 hover:bg-white md:p-9"
              >
                <span className="absolute -right-3 -top-5 font-mono text-[7rem] font-semibold leading-none text-ink/[0.035]" aria-hidden="true">
                  {step.number}
                </span>
                <div className="relative flex items-center justify-between gap-5">
                  <span className="grid h-14 w-14 place-items-center bg-strath-navy text-gold">
                    <Icon aria-hidden="true" size={24} />
                  </span>
                  <span className="font-mono text-2xl font-semibold text-[#74521f]">{step.number}</span>
                </div>
                <div className="relative mt-10 flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-3xl font-semibold">{step.label}</h3>
                  <span className="border border-ink/15 bg-ivory px-3 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-slate-600">
                    {step.timing}
                  </span>
                </div>
                <p className="relative mt-5 max-w-xl text-base leading-8 text-slate-700">{step.detail}</p>
                <div className="relative mt-8 h-1 w-14 bg-gold transition-all duration-300 group-hover:w-24" aria-hidden="true" />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
