import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { notes } from "@/lib/notes-data";
import { formatDateOnly, getDateOnlyTime } from "@/lib/date-format";
import { Footer } from "@/app/components/sections/Footer";
import { Navigation } from "@/app/components/Navigation";
import { SHARE_IMAGE_PATH, SITE_URL } from "@/lib/site";
import { InsightsFilter, type InsightsFilterNote } from "./InsightsFilter";

export const metadata: Metadata = {
  title: "Intelligence Log — Digital Strategy Insights | Strathmark Consulting",
  description: "Strategic field notes on SEO, paid media, agency management, and digital infrastructure. Written for marketing leaders and commercial decision-makers.",
  openGraph: {
    title: "Intelligence Log — Digital Strategy Insights | Strathmark Consulting",
    description: "Strategic field notes on SEO, paid media, agency management, and digital infrastructure.",
    url: `${SITE_URL}/insights`,
    images: [SHARE_IMAGE_PATH],
  },
  alternates: {
    canonical: `${SITE_URL}/insights`,
  },
};

function formatDate(dateStr: string) {
  return formatDateOnly(dateStr);
}

const categories = Array.from(new Set(notes.map((n) => n.category)));
const sortedNotes = [...notes].sort(
  (a, b) => getDateOnlyTime(b.date) - getDateOnlyTime(a.date)
);
const featured = sortedNotes[0];
const rest = sortedNotes.slice(1);
const restSummaries: InsightsFilterNote[] = rest.map(
  ({ slug, category, title, excerpt, date, readingTime, shareImage }) => ({
    slug,
    category,
    title,
    excerpt,
    date,
    readingTime,
    shareImage,
  })
);

export default function InsightsIndex() {
  return (
    <main className="min-h-screen bg-strath-navy text-slate-200 selection:bg-gold selection:text-strath-navy flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Intelligence Log</h1>
          <p className="text-xl text-slate-400 max-w-2xl font-light">
            Strategic field notes on SEO, paid media, agency management, and digital infrastructure. Written for marketing leaders who care about outcomes, not activity.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-8 w-full">
        <h2 className="sr-only">Featured Article</h2>
        <Link href={`/insights/${featured.slug}`} className="group block">
          <article className="relative grid overflow-hidden border border-white/10 bg-white/[0.025] transition-all duration-300 hover:border-gold/45 md:grid-cols-12">
            <div className="relative min-h-[22rem] overflow-hidden bg-[#101f31] md:col-span-5 md:min-h-full">
              <Image
                src={featured.shareImage ?? "/share-image.png"}
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-strath-navy/55 via-transparent to-transparent" aria-hidden="true" />
              <span className="absolute left-6 top-6 bg-gold px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-ink">
                Latest intelligence
              </span>
            </div>

            <div className="relative flex flex-col p-8 md:col-span-7 md:p-12 lg:p-14">
              <div className="absolute left-0 top-0 h-full w-1 bg-gold" aria-hidden="true" />
              <div className="mb-7 flex flex-wrap items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{featured.category}</span>
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar aria-hidden="true" size={12} /> {formatDate(featured.date)}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock aria-hidden="true" size={12} /> {featured.readingTime}
                </span>
              </div>
              <h3 className="max-w-3xl text-3xl font-semibold leading-tight text-white transition-colors group-hover:text-gold md:text-4xl">
                {featured.title}
              </h3>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-400 md:text-lg">
                {featured.excerpt}
              </p>
              <div className="mt-auto flex items-center gap-3 pt-8 text-sm font-bold uppercase tracking-[0.13em] text-gold">
                Read full article
                <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </article>
        </Link>
      </section>

      {/* Category Filter + Articles Grid */}
      <section className="max-w-7xl mx-auto px-6 py-8 w-full flex-1">
        <InsightsFilter categories={categories} notes={restSummaries} />
      </section>

      <Footer />
    </main>
  );
}
