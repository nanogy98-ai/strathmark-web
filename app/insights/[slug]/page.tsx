import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { notes } from "@/lib/notes-data";
import { Footer } from "@/app/components/sections/Footer";
import { Navigation } from "@/app/components/Navigation";
import { SHARE_IMAGE_PATH, SITE_NAME, SITE_URL } from "@/lib/site";
import { ReadingProgress } from "@/app/components/ReadingProgress";

interface PageProps {
  params: Promise<{ slug: string }>;
}

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
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
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
    return <div className="text-white text-center py-20">Entry not found</div>;
  }

  const related = getRelatedArticles(note.slug, note.tags);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.excerpt,
    author: {
      "@type": "Person",
      name: note.author,
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

      <article className="max-w-3xl mx-auto px-6 py-32 md:py-48 flex-1 w-full">
        <header className="mb-12 border-b border-white/5 pb-12">
          <Link
            href="/insights"
            className="text-slate-500 hover:text-gold transition-colors inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest mb-8"
          >
            <ArrowLeft size={14} /> Return to Intelligence Log
          </Link>

          <div className="text-gold font-mono text-xs mb-6 uppercase tracking-widest">
            {note.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight text-white">
            {note.title}
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mb-8">
            {note.excerpt}
          </p>

          {/* Author Bio & Meta */}
          <div className="mt-8 pt-8 border-t border-white/5">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
              <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-full border border-white/10">
                <Image
                  src="/founder.png"
                  alt={note.author}
                  fill
                  className="object-cover object-center"
                  sizes="64px"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-2">
                  <Link href="/#about" className="text-white font-serif font-bold text-lg hover:text-gold transition-colors">
                    {note.author}
                  </Link>
                  <span className="hidden sm:inline text-slate-600 font-serif">•</span>
                  <span className="text-xs font-mono text-gold uppercase tracking-widest">Principal Consultant</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-2xl">
                  Graeme is the founder and principal consultant at Strathmark Consulting. With over a decade of experience across agency, contracting, and in-house roles for major international brands, he advises leadership teams on digital strategy, agency oversight, and marketing infrastructure across the UK, US, UAE, and Europe.
                </p>
                <div className="flex justify-center sm:justify-start flex-wrap items-center gap-6 text-xs font-mono text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} /> {formatDate(note.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} /> {note.readingTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div
          className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-white prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-slate-300 prose-p:font-light prose-p:leading-relaxed prose-strong:text-white prose-a:text-gold hover:prose-a:text-white prose-li:text-slate-300 prose-ul:my-4 prose-li:my-1 prose-code:text-gold prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />



        {/* CTA */}
        <div className="mt-16 pt-12 border-t border-white/5">
          <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-white font-serif font-bold text-lg mb-2">
                Need a second opinion?
              </h2>
              <p className="text-slate-400 text-sm">
                I review infrastructure and spend for select clients.
              </p>
            </div>
            <Link
              href="/#contact"
              className="bg-gold text-strath-navy px-6 py-3 font-bold text-sm tracking-wide uppercase hover:bg-white transition-all whitespace-nowrap"
            >
              Request Analysis
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/5">
            <h2 className="text-2xl font-serif font-bold text-white mb-8">
              Related Reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  href={`/insights/${r.slug}`}
                  key={r.slug}
                  className="block group"
                >
                  <article className="bg-white/[0.02] border border-white/5 p-6 h-full hover:border-gold/30 transition-all duration-300 flex flex-col">
                    <span className="text-xs font-mono text-gold uppercase tracking-widest mb-3">
                      {r.category}
                    </span>
                    <h3 className="text-base font-serif font-bold text-white mb-3 group-hover:text-gold transition-colors leading-snug flex-1">
                      {r.title}
                    </h3>
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-xs text-slate-500 font-mono">
                        {r.readingTime}
                      </span>
                      <span className="text-xs text-slate-500 group-hover:text-gold transition-colors">
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </main>
  );
}
