import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies-data";
import { Footer } from "@/app/components/sections/Footer";
import { Navigation } from "@/app/components/Navigation";
import { SHARE_IMAGE_PATH, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies | Strathmark Consulting",
  description: "Selected engagements showing how strategic digital advisory improves visibility, conversion quality, and commercial clarity.",
  openGraph: {
    title: "Case Studies | Strathmark Consulting",
    description: "Selected engagements showing how strategic digital advisory improves visibility, conversion quality, and commercial clarity.",
    url: `${SITE_URL}/case-studies`,
    images: [SHARE_IMAGE_PATH],
  },
  alternates: {
    canonical: `${SITE_URL}/case-studies`,
  },
};

const featuredStudies = caseStudies.filter((study) => study.featured);
const additionalStudies = caseStudies.filter((study) => !study.featured);

export default function CaseStudiesIndex() {
  return (
    <main className="min-h-screen bg-strath-navy text-slate-200 selection:bg-gold selection:text-strath-navy flex flex-col">
      <Navigation />

      <section className="relative overflow-hidden border-b border-white/5 px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-gold/8 blur-[140px]" />
          <div className="absolute right-[10%] top-1/3 h-72 w-72 rounded-full bg-strath-blue/10 blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <span className="inline-flex items-center border border-gold/20 bg-gold/8 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.35em] text-gold">
            Selected engagements
          </span>
          <h1 className="mt-8 max-w-5xl font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
            Case studies built around commercial movement, not decorative reporting.
          </h1>
          <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-slate-300 md:text-xl">
            These engagements cover enterprise insurance, legal services, utilities, hospitality, and destination-led leisure. Each one focuses on what actually changed:
            clearer demand capture, better conversion routes, and less wasted effort across the digital estate.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-4 text-left md:mt-16 md:grid-cols-3">
            {[
              { label: "Clients shown", value: `${caseStudies.length}`, copy: "Enterprise, regional, and owner-led brands." },
              { label: "Core themes", value: "Search + CRO", copy: "Architecture, reporting, and demand capture." },
              { label: "End result", value: "Commercial clarity", copy: "Less noise. Better outcomes. Faster decisions." },
            ].map((item) => (
              <div key={item.label} className="border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
                <p className="mt-3 font-serif text-2xl font-bold text-white">{item.value}</p>
                <p className="mt-2 text-sm font-light leading-relaxed text-slate-400">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full flex-1 px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">Featured studies</h2>
              <p className="mt-3 max-w-2xl text-slate-400">Broader engagements where structure, governance, and commercial performance had to move together.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            {featuredStudies.map((study) => (
              <Link href={`/case-studies/${study.slug}`} key={study.slug} className="group flex h-full">
                <article className="relative flex h-full w-full flex-col overflow-hidden border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-gold/35 md:p-10">
                  <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gold/8 blur-[90px] transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative flex h-full flex-col">
                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-[0.24em]">
                      <span className="border border-gold/20 bg-gold/10 px-3 py-1 text-gold">{study.industry}</span>
                      <span className="text-slate-500">{study.region}</span>
                      <span className="text-slate-600">/</span>
                      <span className="text-slate-500">{study.engagementType}</span>
                    </div>

                    <h3 className="mt-6 font-serif text-3xl font-bold leading-tight text-white transition-colors group-hover:text-gold">
                      {study.client}
                    </h3>
                    <p className="mt-4 text-lg font-light leading-relaxed text-slate-300">{study.headline}</p>
                    <p className="mt-5 text-sm font-light leading-relaxed text-slate-400">{study.businessContext}</p>

                    <div className="mt-8 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
                      {study.metrics.map((metric) => (
                        <div key={metric.label}>
                          <p className="font-serif text-3xl font-bold text-white">{metric.value}</p>
                          <p className="mt-2 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">{metric.label}</p>
                          <p className="mt-2 text-sm font-light leading-relaxed text-slate-400">{metric.context}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-6 text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
                      <span>{study.timeframe}</span>
                      <span className="inline-flex items-center gap-2 text-gold">
                        Read case study <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-16 border-t border-white/5 pt-16">
            <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">Additional engagements</h2>
                <p className="mt-3 max-w-2xl text-slate-400">Smaller and mid-sized studies where the work still centred on the same thing: fixing what materially affects demand and conversion.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {additionalStudies.map((study) => (
                <Link href={`/case-studies/${study.slug}`} key={study.slug} className="group flex h-full">
                  <article className="flex h-full flex-col border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-gold/30 md:p-7">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em]">
                      <span className="text-gold">{study.industry}</span>
                      <span className="text-slate-600">/</span>
                      <span className="text-slate-500">{study.region}</span>
                    </div>

                    <h3 className="mt-5 font-serif text-2xl font-bold leading-tight text-white transition-colors group-hover:text-gold">
                      {study.client}
                    </h3>
                    <p className="mt-4 text-sm font-light leading-relaxed text-slate-300">{study.excerpt}</p>

                    <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                      {study.metrics.map((metric) => (
                        <div key={metric.label} className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">{metric.label}</p>
                            <p className="mt-1 text-xs font-light leading-relaxed text-slate-400">{metric.context}</p>
                          </div>
                          <p className="font-serif text-2xl font-bold text-white">{metric.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-6">
                      <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-gold">
                        View detail <ArrowRight size={14} />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
