import { ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";
import { SectionLink } from "@/app/components/ui/SectionLink";

const REVIEW_OUTPUTS = [
  "A ranked map of valuable, low-risk AI opportunities",
  "A clear view of data, security and governance exposure",
  "A practical 90-day route from evidence to a controlled pilot",
] as const;

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[min(940px,100svh)] w-full items-center overflow-hidden bg-strath-navy pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="editorial-grid absolute inset-0 opacity-55" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(201,164,99,0.19),transparent_28%),radial-gradient(circle_at_16%_30%,rgba(40,128,135,0.2),transparent_30%)]" aria-hidden="true" />

      <div className="section-shell relative grid items-center gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-24">
        <div className="lg:col-span-7">
          <p className="section-kicker">AI transformation for technical businesses</p>
          <h1 className="mt-7 max-w-5xl text-[clamp(3.15rem,7vw,6.9rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-white">
            Turn hard-won technical knowledge into an <span className="text-gold">AI advantage.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl md:leading-9">
            Independent AI transformation for founder-led engineering, manufacturing and specialist technical businesses. Find the workflows worth improving, protect what makes the business valuable, and prove the case before scaling.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <SectionLink href="/#contact" className="group inline-flex min-h-14 items-center justify-center gap-3 bg-gold px-7 text-sm font-bold uppercase tracking-[0.13em] text-ink transition-colors hover:bg-white">
              Request an AI opportunity review
              <ArrowRight aria-hidden="true" size={17} className="transition-transform group-hover:translate-x-1" />
            </SectionLink>
            <SectionLink href="/briefings/industrial-ai-systems-integrator" className="inline-flex min-h-14 items-center justify-center border border-white/20 px-7 text-sm font-semibold uppercase tracking-[0.13em] text-white transition-colors hover:border-gold hover:text-gold">
              View sample briefing
            </SectionLink>
          </div>

          <ul className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-300 sm:flex-row sm:flex-wrap sm:gap-x-8">
            {["Fixed fee from £3,500", "Principal-led", "No platform sales agenda"].map((item) => (
              <li key={item} className="flex items-center gap-2"><Check aria-hidden="true" size={15} className="text-gold" />{item}</li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="relative border border-white/15 bg-[#0d1b2a]/92 shadow-[0_40px_100px_rgba(2,8,16,0.38)]">
            <div className="flex items-start justify-between border-b border-white/10 px-6 py-6 md:px-7">
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold">AI Opportunity and Exposure Review</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Clarity before commitment.</h2>
              </div>
              <Sparkles aria-hidden="true" className="mt-1 text-gold" size={24} />
            </div>
            <ol className="divide-y divide-white/10">
              {REVIEW_OUTPUTS.map((output, index) => (
                <li key={output} className="grid grid-cols-[2.5rem_1fr] gap-4 px-6 py-6 md:px-7">
                  <span className="font-mono text-xs text-gold">0{index + 1}</span>
                  <p className="text-base font-medium leading-7 text-slate-200">{output}</p>
                </li>
              ))}
            </ol>
            <div className="flex items-start gap-4 border-t border-gold/25 bg-gold/10 px-6 py-5 md:px-7">
              <ShieldCheck aria-hidden="true" size={20} className="mt-0.5 shrink-0 text-gold" />
              <p className="text-sm leading-6 text-slate-300">Human review, data boundaries and decision authority are designed in from the start.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
