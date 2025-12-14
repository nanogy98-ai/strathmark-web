import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notes } from "@/lib/notes-data";
import { Footer } from "@/app/components/sections/Footer";
import { Navigation } from "@/app/components/Navigation";

export const metadata: Metadata = {
  title: "Intelligence Log | Strathmark Consulting",
  description: "Field notes and commercial breakdowns from the front lines of digital engineering.",
  openGraph: {
    title: "Intelligence Log | Strathmark Consulting",
    description: "Field notes and commercial breakdowns from the front lines of digital engineering.",
    url: "https://strathmark.com/insights",
  },
};

export default function InsightsIndex() {
  return (
    <main className="min-h-screen bg-strath-navy text-slate-200 selection:bg-gold selection:text-strath-navy flex flex-col">
      <Navigation />
      
      <section className="pt-32 pb-16 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Intelligence Log</h1>
          <p className="text-xl text-slate-400 max-w-2xl font-light">Field notes from the front lines of digital engineering.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.map((note, i) => (
            <Link href={`/insights/${note.slug}`} key={i} className="block group h-full">
              <article 
                className="bg-white/[0.02] border border-white/5 p-8 h-full hover:border-gold/30 transition-colors flex flex-col"
              >
                <div className="text-xs font-mono text-gold mb-4 uppercase tracking-widest">{note.category}</div>
                <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-gold transition-colors leading-snug">
                  {note.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-4 flex-1">
                  {note.excerpt}
                </p>
                <div className="text-xs text-slate-500 font-mono flex items-center gap-2 group-hover:text-white transition-colors mt-auto">
                  Read Entry <ArrowRight size={12} />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

