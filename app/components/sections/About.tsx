import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";

const PRINCIPLES = [
  {
    title: "Independent judgement",
    copy: "Advice is separated from software sales and implementation incentives, so each recommendation must stand on its business case.",
  },
  {
    title: "Operational focus",
    copy: "The work starts with real workflows, constraints and ownership, not a catalogue of AI features.",
  },
  {
    title: "Technical respect",
    copy: "AI supports qualified people. It does not bypass engineering authority, review or accountability.",
  },
  {
    title: "Evidence before scale",
    copy: "A bounded pilot must improve the baseline before a wider programme earns approval.",
  },
] as const;

export function About() {
  return (
    <section className="w-full bg-strath-navy py-20 md:py-28" id="about">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5">
            <p className="section-kicker">About Strathmark</p>
            <div className="relative mt-8">
              <div className="absolute -left-3 -top-3 h-24 w-24 border-l border-t border-gold/60" aria-hidden="true" />
              <div className="relative aspect-[4/3] overflow-hidden bg-[#101f31]">
                <Image
                  src="/optimized/founder.webp"
                  alt="Principal consultant at Strathmark Consulting"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-[center_20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-strath-navy/90 via-strath-navy/10 to-transparent" aria-hidden="true" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Principal-led</p>
                  <p className="mt-2 text-sm font-medium text-white">Direct senior involvement throughout</p>
                </div>
                <span className="hidden font-mono text-xs text-slate-300 sm:block">EDINBURGH · SCOTLAND</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="max-w-3xl text-[clamp(2.8rem,5vw,4.9rem)] font-semibold leading-[1.01] tracking-[-0.03em] text-white">
              Built for decisions that need commercial judgement and technical respect.
            </h2>
            <div className="mt-9 grid gap-6 border-t border-white/10 pt-8 text-lg leading-8 text-slate-300 xl:grid-cols-2">
              <p>
                Strathmark Consulting is an independent, principal-led advisory firm for founder-led engineering, manufacturing and specialist technical businesses.
              </p>
              <p>
                The work combines more than a decade across digital strategy, technical delivery and commercial operations with a rigorous approach to AI opportunity, exposure and governance.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
          {PRINCIPLES.map((principle, index) => (
            <article key={principle.title} className="group min-h-64 bg-[#0d1c2c] p-7 transition-colors hover:bg-[#12263b] md:p-8">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center border border-gold/35 bg-gold/10 text-gold">
                  <Check aria-hidden="true" size={18} />
                </span>
                <span className="font-mono text-sm font-semibold text-gold/70">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-8 text-xl font-semibold text-white">{principle.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-400">{principle.copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="flex flex-col justify-between border border-gold/30 bg-gold/10 p-7 md:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Experience</p>
            <p className="mt-8 text-lg leading-8 text-slate-300">
              Direct senior involvement throughout. No junior handoff, platform quota or incentive to recommend a larger programme than the evidence supports.
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.025] p-7 md:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Operator perspective</p>
            <div className="mt-5 grid gap-6 md:grid-cols-[0.65fr_1.35fr] md:items-start">
              <h3 className="text-2xl font-semibold text-white">Apex Aesthetics</h3>
              <div>
                <p className="text-base leading-7 text-slate-400">
                  I also run Apex Aesthetics, a specialist growth brand for UK aesthetic clinics. Operating a live business keeps advisory work grounded in real decisions, systems, customers and commercial consequences, not theory.
                </p>
                <a
                  href="https://www.apexaesthetics.co.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-gold transition-colors hover:text-white"
                >
                  Visit Apex Aesthetics
                  <ArrowUpRight aria-hidden="true" size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
