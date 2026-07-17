import { ArrowRight, Check, MoveDownRight } from "lucide-react";
import { SectionLink } from "@/app/components/ui/SectionLink";

const REVIEW_OUTPUTS = [
  {
    number: "01",
    title: "Evidence-led diagnosis",
    copy: "A clear view of spend, reporting, search, website performance, and delivery capability.",
  },
  {
    number: "02",
    title: "Prioritised findings",
    copy: "What to stop, what to fix, and which opportunities deserve investment first.",
  },
  {
    number: "03",
    title: "Execution plan",
    copy: "A practical route forward with owners, sequence, and optional independent oversight.",
  },
] as const;

export function Hero() {
  return (
    <section className="relative isolate flex w-full min-h-[min(920px,100svh)] items-center overflow-hidden bg-strath-navy px-0 pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="editorial-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_72%_20%,rgba(201,164,99,0.18),transparent_34%),radial-gradient(circle_at_18%_18%,rgba(50,93,124,0.28),transparent_32%)]"
        aria-hidden="true"
      />

      <div className="section-shell relative grid items-center gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-24">
        <div className="lg:col-span-7">
          <p className="section-kicker">Independent digital performance advisory</p>

          <h1 className="mt-7 max-w-4xl text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.96] tracking-[-0.035em] text-white">
            Know what your digital spend is{" "}
            <span className="text-gold">actually producing.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl md:leading-9">
            I independently review agencies, internal teams, websites, and reporting to identify wasted spend, structural problems, and the priorities that deserve attention.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <SectionLink
              href="/#contact"
              className="group inline-flex min-h-14 items-center justify-center gap-3 bg-gold px-7 text-sm font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-white"
            >
              Request a review
              <ArrowRight aria-hidden="true" size={17} className="transition-transform group-hover:translate-x-1" />
            </SectionLink>
            <SectionLink
              href="/case-studies"
              className="inline-flex min-h-14 items-center justify-center border border-white/20 px-7 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-gold hover:text-gold"
            >
              View case studies
            </SectionLink>
          </div>

          <ul className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-300 sm:flex-row sm:flex-wrap sm:gap-x-8">
            {["Fixed fees", "Typical 7–14 day turnaround", "No lock-in"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check aria-hidden="true" size={15} className="text-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="relative border border-white/15 bg-[#0d1b2a]/90 shadow-[0_40px_100px_rgba(2,8,16,0.35)]">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-7">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">
                  Independent review
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">What you receive</h2>
              </div>
              <MoveDownRight aria-hidden="true" className="text-gold/70" size={26} />
            </div>

            <ol className="divide-y divide-white/10">
              {REVIEW_OUTPUTS.map((output) => (
                <li key={output.number} className="grid grid-cols-[2.5rem_1fr] gap-4 px-6 py-6 md:px-7">
                  <span className="font-mono text-xs text-gold">{output.number}</span>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-white">{output.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{output.copy}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="grid grid-cols-2 border-t border-white/10 bg-white/[0.025]">
              <div className="border-r border-white/10 px-6 py-5">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-slate-400">Commercial model</p>
                <p className="mt-2 text-sm font-semibold text-white">Fixed fee</p>
              </div>
              <div className="px-6 py-5">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-slate-400">Delivery</p>
                <p className="mt-2 text-sm font-semibold text-white">Principal-led</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
