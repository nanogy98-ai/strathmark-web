import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Calendar } from "lucide-react";
import { notes } from "@/lib/notes-data";
import { formatDateOnly } from "@/lib/date-format";
import { Footer } from "@/app/components/sections/Footer";
import { Navigation } from "@/app/components/Navigation";
import { SectionLink } from "@/app/components/ui/SectionLink";
import { SHARE_IMAGE_PATH, SITE_NAME, SITE_URL } from "@/lib/site";
import { ReadingProgress } from "@/app/components/ReadingProgress";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  return {
    title: note ? `${note.title} | ${SITE_NAME}` : "Entry Not Found",
    description: note?.excerpt,
    openGraph: {
      title: note ? `${note.title} | ${SITE_NAME}` : "Entry Not Found",
      description: note?.excerpt,
      type: "article",
      url: note ? `${SITE_URL}/insights/${note.slug}` : `${SITE_URL}/insights`,
      images: [note?.shareImage || SHARE_IMAGE_PATH],
      ...(note && {
        publishedTime: note.date,
        authors: [note.author],
        section: note.category,
        tags: note.tags,
      }),
    },
    alternates: {
      canonical: note ? `${SITE_URL}/insights/${note.slug}` : `${SITE_URL}/insights`,
    },
  };
}

function formatDate(dateStr: string) {
  return formatDateOnly(dateStr);
}

function getRelatedArticles(currentSlug: string, currentTags: string[]) {
  return notes
    .filter((n) => n.slug !== currentSlug)
    .map((n) => ({
      ...n,
      relevance: n.tags.filter((t) => currentTags.includes(t)).length,
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 3);
}

export default async function NotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);

  if (!note) {
    notFound();
  }

  const related = getRelatedArticles(note.slug, note.tags);
  const noteNumber = String(notes.findIndex((entry) => entry.slug === note.slug) + 1).padStart(2, "0");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.excerpt,
    author: {
      "@type": "Organization",
      name: note.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    datePublished: note.date,
    dateModified: note.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/insights/${note.slug}`,
    },
    articleSection: note.category,
    keywords: note.tags.join(", "),
  };

  return (
    <main className="min-h-screen bg-strath-navy text-slate-200 selection:bg-gold selection:text-strath-navy flex flex-col">
      <ReadingProgress />
      <Navigation />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="w-full flex-1">
        <header className="relative overflow-hidden border-b border-white/10 pt-32 md:pt-40">
          <div className="editorial-grid absolute inset-0 opacity-55" aria-hidden="true" />
          <div className="absolute -right-48 top-0 h-[38rem] w-[38rem] rounded-full bg-gold/[0.08] blur-3xl" aria-hidden="true" />

          <div className="section-shell relative pb-16 md:pb-24">
            <Link
              href="/insights"
              className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400 transition-colors hover:text-gold"
            >
              <ArrowLeft aria-hidden="true" size={15} /> Return to Intelligence Log
            </Link>

            <div className="mt-10 grid gap-12 md:grid-cols-12 md:items-end md:gap-8 lg:gap-12">
              <div className="md:col-span-7">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-400">
                  <span className="font-semibold uppercase tracking-[0.16em] text-gold">{note.category}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-600" aria-hidden="true" />
                  <span className="flex items-center gap-2">
                    <Calendar aria-hidden="true" size={14} /> {formatDate(note.date)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock aria-hidden="true" size={14} /> {note.readingTime}
                  </span>
                </div>
                <h1 className="mt-7 max-w-4xl text-[clamp(3.1rem,5.7vw,5.8rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
                  {note.title}
                </h1>
                <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-300 md:text-2xl md:leading-10">
                  {note.excerpt}
                </p>
              </div>

              <div className="md:col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden border border-white/15 bg-[#101f31] shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
                  <Image
                    src={note.shareImage || SHARE_IMAGE_PATH}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-strath-navy/75 via-transparent to-transparent" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 md:p-8">
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-white">Strathmark Intelligence</span>
                    <span className="font-mono text-3xl font-semibold text-gold">{noteNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="bg-ivory py-20 text-ink md:py-28">
          <div className="section-shell grid gap-12 lg:grid-cols-12 lg:items-start">
            <aside className="lg:col-span-3">
              <div className="space-y-5 lg:sticky lg:top-32">
                <div className="border border-ink/15 bg-white p-6 shadow-[0_18px_55px_rgba(11,22,36,0.07)]">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#74521f]">Written by</p>
                  <div className="mt-5 flex items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-gold/55">
                      <Image
                        src="/founder.png"
                        alt={note.author}
                        fill
                        className="object-cover object-center"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <SectionLink href="/#about" className="text-lg font-semibold text-ink transition-colors hover:text-[#74521f]">
                        {note.author}
                      </SectionLink>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.13em] text-[#74521f]">Principal Consultant</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    Strathmark Consulting advises leadership teams on digital strategy, agency oversight, and marketing infrastructure across the UK, US, UAE, and Europe.
                  </p>
                </div>

                <div className="border border-ink/15 bg-[#efe8dc] p-6">
                  <div className="flex items-center gap-3 text-[#74521f]">
                    <BookOpen aria-hidden="true" size={18} />
                    <p className="text-xs font-bold uppercase tracking-[0.16em]">Reading details</p>
                  </div>
                  <dl className="mt-5 grid gap-4 text-sm">
                    <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
                      <dt className="text-slate-600">Published</dt>
                      <dd className="font-semibold text-ink">{formatDate(note.date)}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
                      <dt className="text-slate-600">Reading time</dt>
                      <dd className="font-semibold text-ink">{note.readingTime}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-slate-600">Category</dt>
                      <dd className="font-semibold text-ink">{note.category}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-ink/10 pt-5">
                    {note.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="border border-ink/15 bg-white/60 px-3 py-1.5 text-xs font-semibold text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-8 lg:col-start-5">
              <div className="mb-12 flex items-center gap-4">
                <span className="h-1 w-16 bg-gold" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#74521f]">Independent analysis</p>
              </div>

              <div
                className="strath-article"
                dangerouslySetInnerHTML={{ __html: note.content }}
              />

              <div className="mt-20 border border-ink/15 bg-strath-navy p-7 text-white shadow-[0_22px_70px_rgba(11,22,36,0.16)] md:p-10">
                <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Independent perspective</p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em]">Need a second opinion?</h2>
                    <p className="mt-3 text-base leading-7 text-slate-300">
                      I review infrastructure and spend for select clients.
                    </p>
                  </div>
                  <SectionLink
                    href="/#contact"
                    className="group inline-flex min-h-14 items-center justify-center gap-3 bg-gold px-7 text-sm font-bold uppercase tracking-[0.13em] text-ink transition-colors hover:bg-white"
                  >
                    Request analysis
                    <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-1" />
                  </SectionLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="border-t border-ink/10 bg-[#e9e2d6] py-20 text-ink md:py-24">
            <div className="section-shell">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="section-kicker !text-[#74521f]">Continue reading</p>
                  <h2 className="mt-5 text-[clamp(2.4rem,4vw,4rem)] font-semibold leading-none tracking-[-0.03em]">Related intelligence</h2>
                </div>
                <Link href="/insights" className="group inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#74521f] transition-colors hover:text-ink">
                  View all insights
                  <ArrowRight aria-hidden="true" size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {related.map((relatedNote) => (
                  <Link href={`/insights/${relatedNote.slug}`} key={relatedNote.slug} className="group block">
                    <article className="flex h-full flex-col overflow-hidden border border-ink/15 bg-white transition-all duration-300 group-hover:-translate-y-1 group-hover:border-gold">
                      <div className="relative aspect-[16/10] overflow-hidden bg-strath-navy">
                        <Image
                          src={relatedNote.shareImage || SHARE_IMAGE_PATH}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#74521f]">
                          <span>{relatedNote.category}</span>
                          <span className="text-slate-500">{formatDate(relatedNote.date)}</span>
                        </div>
                        <h3 className="mt-5 text-2xl font-semibold leading-tight transition-colors group-hover:text-[#74521f]">
                          {relatedNote.title}
                        </h3>
                        <div className="mt-auto flex items-center justify-between border-t border-ink/10 pt-6 text-sm text-slate-600">
                          <span>{relatedNote.readingTime}</span>
                          <ArrowRight aria-hidden="true" size={16} className="text-[#74521f] transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <Footer />
    </main>
  );
}
