"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import type { Note } from "@/lib/notes-data";
import { formatDateOnly } from "@/lib/date-format";

function formatDate(dateStr: string) {
  return formatDateOnly(dateStr);
}

export type InsightsFilterNote = Pick<
  Note,
  "slug" | "category" | "title" | "excerpt" | "date" | "readingTime" | "shareImage"
>;

interface InsightsFilterProps {
  categories: string[];
  notes: InsightsFilterNote[];
}

export function InsightsFilter({ categories, notes }: InsightsFilterProps) {
  const [active, setActive] = useState<string | null>(null);

  const filtered = active ? notes.filter((n) => n.category === active) : notes;

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-12">
        <button
          type="button"
          onClick={() => setActive(null)}
          aria-pressed={active === null}
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
            type="button"
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
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
        {filtered.map((note) => (
          <Link href={`/insights/${note.slug}`} key={note.slug} className="block group h-full">
            <article className="flex h-full flex-col overflow-hidden border border-white/10 bg-white/[0.025] transition-all duration-300 hover:-translate-y-1 hover:border-gold/45 hover:shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#101f31]">
                <Image
                  src={note.shareImage ?? "/share-image.png"}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-strath-navy/70 via-transparent to-transparent" aria-hidden="true" />
                <span className="absolute bottom-5 left-5 border border-white/15 bg-strath-navy/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold backdrop-blur-sm">
                  {note.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-2xl font-semibold leading-tight text-white transition-colors group-hover:text-gold">
                  {note.title}
                </h3>

                <p className="mt-4 line-clamp-3 flex-1 text-sm leading-7 text-slate-400">
                  {note.excerpt}
                </p>

                <div className="mt-7 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar aria-hidden="true" size={12} /> {formatDate(note.date)}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock aria-hidden="true" size={12} /> {note.readingTime}
                    </span>
                  </div>
                  <ArrowRight aria-hidden="true" size={16} className="shrink-0 text-gold transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
