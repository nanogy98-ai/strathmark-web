import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Check, Clock, Calendar } from "lucide-react";
import { notes } from "@/lib/notes-data";
import { getNoteSeoData } from "@/lib/notes-seo-data";
import { formatDateOnly } from "@/lib/date-format";
import { Footer } from "@/app/components/sections/Footer";
import { Navigation } from "@/app/components/Navigation";
import { Breadcrumbs } from "@/app/components/ui/Breadcrumbs";
import { SectionLink } from "@/app/components/ui/SectionLink";
import { LOGO_PATH, SHARE_IMAGE_PATH, SITE_NAME, SITE_URL } from "@/lib/site";
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
  const seo = note ? getNoteSeoData(note.slug) : null;
  return {
    title: seo?.seoTitle || "Entry Not Found",
    description: seo?.metaDescription,
    openGraph: {
      title: seo ? `${seo.seoTitle} | ${SITE_NAME}` : "Entry Not Found",
      description: seo?.metaDescription,
      type: "article",
      url: note ? `${SITE_URL}/insights/${note.slug}` : `${SITE_URL}/insights`,
      siteName: SITE_NAME,
      locale: "en_GB",
      images: [
        {
          url: note?.shareImage || SHARE_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: note ? `${note.title} — Strathmark editorial illustration` : SITE_NAME,
        },
      ],
      ...(note && {
        publishedTime: note.date,
        modifiedTime: seo?.lastModified,
        authors: [note.author],
        section: note.category,
        tags: note.tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: seo ? `${seo.seoTitle} | ${SITE_NAME}` : "Entry Not Found",
      description: seo?.metaDescription,
      images: [note?.shareImage || SHARE_IMAGE_PATH],
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

  const seo = getNoteSeoData(note.slug);
  const related = getRelatedArticles(note.slug, note.tags);
  const noteNumber = String(notes.findIndex((entry) => entry.slug === note.slug) + 1).padStart(2, "0");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    alternativeHeadline: seo.seoTitle,
    description: seo.metaDescription,
    image: [`${SITE_URL}${note.shareImage || SHARE_IMAGE_PATH}`],
    author: {
      "@type": "Organization",
      name: note.author,
      url: `${SITE_URL}/#about`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${LOGO_PATH}`,
      },
    },
    datePublished: note.date,
    dateModified: seo.lastModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/insights/${note.slug}`,
    },
    articleSection: note.category,
    keywords: [seo.primaryKeyword, ...seo.secondaryKeywords, ...note.tags].join(", "),
    isPartOf: {
      "@type": "Blog",
      name: "Strathmark Intelligence Log",
      url: `${SITE_URL}/insights`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Insights",
        item: `${SITE_URL}/insights`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: note.title,
        item: `${SITE_URL}/insights/${note.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-strath-navy text-slate-200 selection:bg-gold selection:text-strath-navy flex flex-col">
      <ReadingProgress />
      <Navigation />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="w-full flex-1">
        <header className="relative overflow-hidden border-b border-white/10 pt-32 md:pt-40">
          <div className="editorial-grid absolute inset-0 opacity-55" aria-hidden="true" />
          <div className="absolute -right-48 top-0 h-[38rem] w-[38rem] rounded-full bg-gold/[0.08] blur-3xl" aria-hidden="true" />

          <div className="section-shell relative pb-16 md:pb-24">
            <Breadcrumbs
              items={[
                { label: "Insights", href: "/insights" },
                { label: note.title },
              ]}
            />
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
                    alt={`${note.title} — Strathmark editorial illustration`}
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
                      <dt className="text-slate-600">Reviewed</dt>
                      <dd className="font-semibold text-ink">{formatDate(seo.lastModified)}</dd>
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

              <p className="max-w-3xl text-xl leading-9 text-slate-700 md:text-[1.35rem] md:leading-10">
                {seo.introduction}
              </p>

              <section aria-labelledby="key-takeaways" className="my-12 border border-ink/15 bg-[#efe8dc] p-7 shadow-[0_18px_55px_rgba(11,22,36,0.06)] md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#74521f]">The short version</p>
                <h2 id="key-takeaways" className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-ink">Key takeaways</h2>
                <ul className="mt-6 grid gap-4">
                  {seo.keyTakeaways.map((takeaway) => (
                    <li key={takeaway} className="flex gap-4 text-base leading-7 text-slate-700 md:text-lg md:leading-8">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center bg-gold text-ink" aria-hidden="true">
                        <Check size={15} strokeWidth={2.5} />
                      </span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <div
                className="strath-article"
                dangerouslySetInnerHTML={{ __html: note.content }}
              />

              <section aria-labelledby="article-faqs" className="mt-20 border-t border-ink/15 pt-12">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#74521f]">Useful answers</p>
                <h2 id="article-faqs" className="mt-4 text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
                  Frequently asked questions
                </h2>
                <div className="mt-8 divide-y divide-ink/15 border-y border-ink/15">
                  {seo.faqs.map((faq, index) => (
                    <details key={faq.question} className="group py-2" open={index === 0}>
                      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold text-ink marker:content-none md:text-xl">
                        <span>{faq.question}</span>
                        <span className="text-2xl font-light text-[#74521f] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                      </summary>
                      <p className="max-w-3xl pb-6 pr-10 text-base leading-8 text-slate-700 md:text-lg">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

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
                          alt={`${relatedNote.title} — Strathmark editorial illustration`}
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
