"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import type { Note } from "@/lib/notes-data";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface InsightsFilterProps {
  categories: string[];
  notes: Note[];
}

export function InsightsFilter({ categories, notes }: InsightsFilterProps) {
  const [active, setActive] = useState<string | null>(null);

  const filtered = active ? notes.filter((n) => n.category === active) : notes;

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-12">
        <button
          onClick={() => setActive(null)}
          className={`px-4 py-2 text-xs font-mono uppercase tracking-widest border transition-all duration-200 ${
            active === null
              ? "bg-gold text-strath-navy border-gold"
              : "bg-transparent text-slate-400 border-white/10 hover:border-gold/40 hover:text-white"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-widest border transition-all duration-200 ${
              active === cat
                ? "bg-gold text-strath-navy border-gold"
                : "bg-transparent text-slate-400 border-white/10 hover:border-gold/40 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <h2 className="sr-only">All Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((note, i) => (
          <Link href={`/insights/${note.slug}`} key={i} className="block group h-full">
            <article className="bg-white/[0.02] border border-white/5 p-8 h-full hover:border-gold/30 transition-all duration-300 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-gold uppercase tracking-widest">{note.category}</span>
              </div>

              <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-gold transition-colors leading-snug">
                {note.title}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                {note.excerpt}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                    <Calendar size={10} /> {formatDate(note.date)}
                  </span>
                  <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                    <Clock size={10} /> {note.readingTime}
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-mono flex items-center gap-1.5 group-hover:text-gold transition-colors">
                  Read <ArrowRight size={10} />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
