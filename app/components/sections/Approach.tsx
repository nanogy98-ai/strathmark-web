const STEPS = [
  { number: "01", verb: "Review", title: "Establish the operating truth", copy: "Interview leaders and workflow owners, inspect the evidence and separate real constraints from assumptions." },
  { number: "02", verb: "Prioritise", title: "Rank value against exposure", copy: "Score opportunities for business value, feasibility, data readiness, review burden and operational risk." },
  { number: "03", verb: "Pilot", title: "Run one bounded test", copy: "Use completed, non-safety-critical work to compare the proposed workflow with the current process." },
  { number: "04", verb: "Govern", title: "Standardise what earns trust", copy: "Agree owners, access, review gates, monitoring and a clear decision to deploy, revise or stop." },
] as const;

export function Approach() {
  return (
    <section className="relative w-full overflow-hidden bg-ivory py-20 text-ink md:py-28" id="approach">
      <div className="editorial-grid-dark absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="section-shell relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="section-kicker !text-[#74521f]">The controlled route</p><h2 className="mt-6 max-w-4xl text-[clamp(2.7rem,5vw,4.8rem)] font-semibold leading-[1.01] tracking-[-0.03em]">From promising idea to defensible operating decision.</h2></div><p className="text-lg leading-8 text-slate-600 lg:col-span-4">The work is deliberately staged. Each step earns the right to proceed to the next.</p></div>
        <ol className="mt-12 grid gap-4 lg:grid-cols-4">
          {STEPS.map((step,index)=><li key={step.number} className="relative border border-ink/15 bg-white p-7 md:p-8"><div className="flex items-center justify-between"><span className="font-mono text-xs font-bold text-[#74521f]">{step.number}</span><span className="text-xs font-bold uppercase tracking-[0.16em] text-[#74521f]">{step.verb}</span></div><div className="mt-8 h-1 w-14 bg-gold"/><h3 className="mt-7 text-2xl font-semibold leading-tight">{step.title}</h3><p className="mt-4 text-base leading-7 text-slate-600">{step.copy}</p>{index<STEPS.length-1?<span aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 rotate-45 border-r border-t border-ink/20 bg-ivory lg:block"/>:null}</li>)}
        </ol>
        <div className="mt-6 grid border border-ink/15 bg-strath-navy text-white md:grid-cols-3"><div className="p-6 md:p-7"><p className="text-xs uppercase tracking-[0.16em] text-gold">Decision 01</p><p className="mt-2 font-semibold">Is there enough value to pilot?</p></div><div className="border-white/10 p-6 md:border-l md:p-7"><p className="text-xs uppercase tracking-[0.16em] text-gold">Decision 02</p><p className="mt-2 font-semibold">Did the pilot improve the baseline?</p></div><div className="border-white/10 p-6 md:border-l md:p-7"><p className="text-xs uppercase tracking-[0.16em] text-gold">Decision 03</p><p className="mt-2 font-semibold">Can it operate safely and consistently?</p></div></div>
      </div>
    </section>
  );
}
