import { Archive, BadgePoundSterling, BrainCircuit, Clock3 } from "lucide-react";

const SIGNALS = [
  { icon: Clock3, title: "Senior people repeat work the business has solved before.", copy: "Quotations, specifications, reports and customer responses are rebuilt from scattered files and memory." },
  { icon: Archive, title: "Decades of project knowledge are difficult to find and reuse.", copy: "The answer often sits in an old project folder, a retired system or one experienced person’s head." },
  { icon: BrainCircuit, title: "AI is already entering the business without a shared plan.", copy: "Individual experimentation is moving faster than the rules for client data, review, traceability and accountability." },
  { icon: BadgePoundSterling, title: "The opportunity sounds large, but the first investment is unclear.", copy: "Leadership needs a ranked business case, not another software demonstration or list of fashionable tools." },
] as const;

export function Proof() {
  return (
    <section className="relative w-full overflow-hidden bg-ivory py-20 text-ink md:py-28" id="why-now">
      <div className="editorial-grid-dark absolute inset-0 opacity-55" aria-hidden="true" />
      <div className="section-shell relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="section-kicker !text-[#74521f]">The operational signal</p>
            <h2 className="mt-6 max-w-4xl text-[clamp(2.7rem,5.4vw,5.1rem)] font-semibold leading-[0.98] tracking-[-0.035em]">Your knowledge is valuable. Your operating model may be hiding it.</h2>
          </div>
          <aside className="border-l-4 border-gold bg-white p-7 shadow-[0_20px_60px_rgba(11,22,36,0.08)] md:p-8 lg:col-span-5">
            <p className="text-xl font-medium leading-9 text-slate-700">The right question is not “Where can we add AI?” It is “Which constraint is worth removing, with what evidence and under whose authority?”</p>
          </aside>
        </div>
        <div className="mt-12 grid gap-px border border-ink/15 bg-ink/15 md:grid-cols-2">
          {SIGNALS.map((signal, index) => { const Icon = signal.icon; return (
            <article key={signal.title} className="group bg-white p-7 transition-colors hover:bg-[#fbf8f1] md:p-10">
              <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center bg-strath-navy text-gold"><Icon aria-hidden="true" size={22} /></span><span className="font-mono text-xs font-semibold text-[#74521f]">0{index + 1}</span></div>
              <h3 className="mt-8 max-w-xl text-[clamp(1.6rem,2.2vw,2.15rem)] font-semibold leading-[1.15]">{signal.title}</h3>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">{signal.copy}</p>
            </article>
          );})}
        </div>
      </div>
    </section>
  );
}
