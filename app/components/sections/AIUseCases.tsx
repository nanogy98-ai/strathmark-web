import { BookOpenCheck, FileCheck2, Headphones, History, ScrollText, Send } from "lucide-react";

const USE_CASES = [
  { icon: Send, title: "Quotation and tender preparation", outcome: "Find relevant precedent, expose specification gaps and produce a reviewable first pass without surrendering commercial judgement." },
  { icon: ScrollText, title: "Technical documentation", outcome: "Create consistent drafts from approved source material, with links back to the requirements, decisions and owners behind each output." },
  { icon: History, title: "Historic project reuse", outcome: "Make past designs, lessons and exceptions discoverable so experienced people spend less time hunting and more time deciding." },
  { icon: Headphones, title: "Support triage", outcome: "Search manuals, resolved incidents and project records to prepare a faster response while an accountable specialist remains in control." },
  { icon: FileCheck2, title: "Compliance evidence", outcome: "Assemble traceable evidence packs and identify missing records. Final interpretation and approval stay with qualified people." },
  { icon: BookOpenCheck, title: "Knowledge and succession", outcome: "Capture why decisions were made, what failed and where expert judgement still matters, with named owners and review dates." },
] as const;

export function AIUseCases() {
  return (
    <section className="relative w-full overflow-hidden bg-ivory py-20 text-ink md:py-28" id="use-cases">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="section-kicker !text-[#74521f]">Recognisable use cases</p><h2 className="mt-6 max-w-4xl text-[clamp(2.7rem,5vw,4.8rem)] font-semibold leading-[1.01] tracking-[-0.03em]">Less theatre. More useful work.</h2></div><p className="text-lg leading-8 text-slate-600 lg:col-span-4">The strongest opportunities often sit inside ordinary, expensive work that already depends on information, precedent and senior review.</p></div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {USE_CASES.map((item, index) => { const Icon=item.icon; return <article key={item.title} className="group border border-ink/15 bg-white p-7 shadow-[0_18px_50px_rgba(11,22,36,0.06)] transition-transform hover:-translate-y-1 md:p-8"><div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center bg-strath-navy text-gold"><Icon aria-hidden="true" size={21}/></span><span className="font-mono text-xs text-[#74521f]">0{index+1}</span></div><h3 className="mt-8 text-2xl font-semibold leading-tight">{item.title}</h3><p className="mt-4 text-base leading-7 text-slate-600">{item.outcome}</p></article>; })}
        </div>
      </div>
    </section>
  );
}
