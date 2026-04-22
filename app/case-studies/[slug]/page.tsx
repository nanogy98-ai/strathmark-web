import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies-data";
import { Footer } from "@/app/components/sections/Footer";
import { Navigation } from "@/app/components/Navigation";
import { SectionLink } from "@/app/components/ui/SectionLink";
import { SHARE_IMAGE_PATH, SITE_URL } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((entry) => entry.slug === slug);

  return {
    title: study ? `${study.client} | Strathmark Case Study` : "Case Study Not Found",
    description: study?.excerpt,
    openGraph: {
      title: study ? `${study.client} | Strathmark Case Study` : "Case Study",
      description: study?.excerpt,
      type: "article",
      url: study ? `${SITE_URL}/case-studies/${study.slug}` : `${SITE_URL}/case-studies`,
      images: [SHARE_IMAGE_PATH],
    },
    alternates: {
      canonical: study ? `${SITE_URL}/case-studies/${study.slug}` : `${SITE_URL}/case-studies`,
    },
  };
}

function getRelatedStudies(currentSlug: string, currentIndustry: string) {
  return caseStudies
    .filter((study) => study.slug !== currentSlug)
    .sort((a, b) => Number(b.industry === currentIndustry) - Number(a.industry === currentIndustry))
    .slice(0, 3);
}

export default async function CaseStudyDetail({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies.find((entry) => entry.slug === slug);

  if (!study) {
    return <div className="py-20 text-center text-white">Case study not found</div>;
  }

  const relatedStudies = getRelatedStudies(study.slug, study.industry);

  return (
    <main className="min-h-screen bg-strath-navy text-slate-200 selection:bg-gold selection:text-strath-navy flex flex-col">
      <Navigation />

      <header className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-strath-navy to-[#0a101d] px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[12%] top-0 h-72 w-72 rounded-full bg-gold/8 blur-[120px]" />
          <div className="absolute right-[8%] top-1/3 h-64 w-64 rounded-full bg-strath-blue/10 blur-[120px]" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-slate-500 transition-colors hover:text-gold"
          >
            <ArrowLeft size={14} /> Return to case studies
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-3 text-[10px] font-mono uppercase tracking-[0.24em]">
                <span className="border border-gold/20 bg-gold/10 px-3 py-1 text-gold">{study.industry}</span>
                <span className="border border-white/10 bg-white/5 px-3 py-1 text-slate-300">{study.region}</span>
                <span className="border border-white/10 bg-white/5 px-3 py-1 text-slate-300">{study.engagementType}</span>
              </div>

              <h1 className="mt-8 font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
                {study.client}
              </h1>
              <p className="mt-6 max-w-3xl text-xl font-light leading-relaxed text-slate-300">
                {study.headline}
              </p>
              <p className="mt-6 max-w-3xl text-sm font-light leading-relaxed text-slate-500">
                {study.businessContext}
              </p>
            </div>

            <div className="border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-gold">Engagement snapshot</p>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">Timeframe</dt>
                  <dd className="mt-2 text-white">{study.timeframe}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">Mandate</dt>
                  <dd className="mt-2 text-sm font-light leading-relaxed text-slate-300">{study.mandate}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">Services</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {study.services.map((service) => (
                      <span key={service} className="border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-300">
                        {service}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </header>

      <article className="w-full flex-1 px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {study.metrics.map((metric) => (
              <div key={metric.label} className="border border-white/10 bg-white/[0.03] p-6 md:p-7">
                <p className="font-serif text-4xl font-bold text-white">{metric.value}</p>
                <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.22em] text-gold">{metric.label}</p>
                <p className="mt-3 text-sm font-light leading-relaxed text-slate-400">{metric.context}</p>
              </div>
            ))}
          </section>

          <section className="mt-16 grid grid-cols-1 gap-8 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-8">
              <div className="border border-white/10 bg-white/[0.02] p-8">
                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-gold">The challenge</p>
                <div className="mt-6 space-y-4">
                  {study.challenge.map((item) => (
                    <p key={item} className="text-sm font-light leading-relaxed text-slate-300">
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 bg-[#0c1322] p-8">
                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-gold">What changed</p>
                <div className="mt-6 space-y-4">
                  {study.outcomes.map((item) => (
                    <p key={item} className="text-sm font-light leading-relaxed text-slate-300">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-white/10 bg-white/[0.03] p-8 md:p-10">
              <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-gold">Strategic workstreams</p>
              <div className="mt-8 space-y-6">
                {study.interventions.map((item, index) => (
                  <div key={item} className="flex gap-5 border-b border-white/5 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/10 text-sm font-mono text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="pt-1 text-sm font-light leading-relaxed text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-16 border border-gold/20 bg-gold/5 p-8 md:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-gold">Why this engagement matters</p>
                <h2 className="mt-4 font-serif text-3xl font-bold text-white">Commercial clarity beats channel noise.</h2>
              </div>
              <p className="text-sm font-light leading-relaxed text-slate-300">
                This study is representative of how Strathmark approaches digital advisory: diagnose first, tie decisions to commercial consequences, and fix the structural blockers before adding more activity on top. It is not about making dashboards look busier. It is about making demand easier to win and easier to convert.
              </p>
            </div>
          </section>

          {relatedStudies.length > 0 && (
            <section className="mt-20 border-t border-white/5 pt-16">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-gold">Related work</p>
                  <h2 className="mt-4 font-serif text-3xl font-bold text-white">More case studies</h2>
                </div>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-gold transition-all hover:gap-3"
                >
                  View all case studies <ArrowRight size={14} />
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                {relatedStudies.map((related) => (
                  <Link href={`/case-studies/${related.slug}`} key={related.slug} className="group block">
                    <article className="flex h-full flex-col border border-white/10 bg-white/[0.02] p-6 transition-colors group-hover:border-gold/30">
                      <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-slate-500">{related.industry}</p>
                      <h3 className="mt-4 font-serif text-2xl font-bold leading-tight text-white transition-colors group-hover:text-gold">
                        {related.client}
                      </h3>
                      <p className="mt-4 text-sm font-light leading-relaxed text-slate-400">{related.excerpt}</p>
                      <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                        {related.metrics.slice(0, 2).map((metric) => (
                          <div key={metric.label} className="flex items-center justify-between gap-4">
                            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">{metric.label}</span>
                            <span className="font-serif text-2xl font-bold text-white">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mt-20 border border-white/10 bg-white/[0.02] p-8 text-center md:p-12">
            <h2 className="font-serif text-3xl font-bold text-white">Need a second opinion on digital performance?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-relaxed text-slate-400">
              If spend is rising, visibility is flattening, or the site feels harder to govern than it should, the issue is usually structural before it is tactical.
            </p>
            <SectionLink
              href="/#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-strath-navy transition-colors hover:bg-white"
            >
              Request a review <ArrowRight size={16} />
            </SectionLink>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}
