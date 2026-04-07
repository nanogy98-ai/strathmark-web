import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { notes } from "@/lib/notes-data";
import { Footer } from "@/app/components/sections/Footer";
import { Navigation } from "@/app/components/Navigation";
import { SHARE_IMAGE_PATH, SITE_URL } from "@/lib/site";
import { InsightsFilter } from "./InsightsFilter";

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
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const categories = Array.from(new Set(notes.map((n) => n.category)));
const sortedNotes = [...notes].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
const featured = sortedNotes[0];
const rest = sortedNotes.slice(1);

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
        <Link href={`/insights/${featured.slug}`} className="block group">
          <article className="bg-white/[0.02] border border-white/5 p-8 md:p-12 hover:border-gold/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-xs font-mono text-gold uppercase tracking-widest">{featured.category}</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-500 font-mono flex items-center gap-1.5">
                <Calendar size={11} /> {formatDate(featured.date)}
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-500 font-mono flex items-center gap-1.5">
                <Clock size={11} /> {featured.readingTime}
              </span>
            </div>
            <h3 className="text-2xl md:text-4xl font-serif font-bold text-white mb-4 group-hover:text-gold transition-colors leading-snug max-w-3xl">
              {featured.title}
            </h3>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl mb-6">
              {featured.excerpt}
            </p>
            <div className="text-sm text-slate-500 font-mono flex items-center gap-2 group-hover:text-gold transition-colors">
              Read Full Article <ArrowRight size={14} />
            </div>
          </article>
        </Link>
      </section>

      {/* Category Filter + Articles Grid */}
      <section className="max-w-7xl mx-auto px-6 py-8 w-full flex-1">
        <InsightsFilter categories={categories} notes={rest} />
      </section>

      <Footer />
    </main>
  );
}
