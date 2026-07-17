import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { notes } from "@/lib/notes-data";
import { formatDateOnly, getDateOnlyTime } from "@/lib/date-format";

function formatDate(dateStr: string) {
  return formatDateOnly(dateStr, { month: "short" });
}

const sortedNotes = [...notes].sort(
  (a, b) => getDateOnlyTime(b.date) - getDateOnlyTime(a.date)
);

export function Insights() {
  const featuredNote = sortedNotes[0];
  const supportingNotes = sortedNotes.slice(1, 4);

  if (!featuredNote) return null;

  return (
    <section className="w-full bg-ivory py-20 text-ink md:py-28" id="insights">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="section-kicker !text-[#74521f]">Insights &amp; decision guides</p>
            <h2 className="mt-6 max-w-3xl text-[clamp(2.6rem,5vw,4.7rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
              Independent thinking for better digital decisions.
            </h2>
          </div>
          <Link
            href="/insights"
            className="group inline-flex min-h-13 items-center justify-center gap-3 border border-ink/20 bg-white px-6 text-xs font-bold uppercase tracking-[0.15em] text-[#74521f] transition-all hover:border-gold hover:bg-strath-navy hover:text-white"
          >
            View the Intelligence Log
            <ArrowRight aria-hidden="true" size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid items-start gap-5 lg:grid-cols-12">
          <Link href={`/insights/${featuredNote.slug}`} className="group block lg:col-span-7">
            <article className="flex flex-col overflow-hidden border border-ink/15 bg-white shadow-[0_22px_70px_rgba(11,22,36,0.09)] transition-transform duration-300 group-hover:-translate-y-1">
              <div className="relative aspect-[16/10] overflow-hidden bg-strath-navy">
                <Image
                  src={featuredNote.shareImage ?? "/share-image.png"}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-strath-navy/55 via-transparent to-transparent" aria-hidden="true" />
                <span className="absolute left-6 top-6 bg-gold px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-ink md:left-8 md:top-8">
                  Latest insight
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7 md:p-9">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
                  <span className="font-semibold uppercase tracking-[0.14em] text-[#74521f]">{featuredNote.category}</span>
                  <span className="flex items-center gap-2">
                    <Calendar aria-hidden="true" size={14} /> {formatDate(featuredNote.date)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock aria-hidden="true" size={14} /> {featuredNote.readingTime}
                  </span>
                </div>
                <h3 className="mt-6 max-w-2xl text-3xl font-semibold leading-[1.12] tracking-[-0.02em] transition-colors group-hover:text-[#74521f] md:text-4xl">
                  {featuredNote.title}
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                  {featuredNote.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-ink/10 pt-7 text-sm font-bold uppercase tracking-[0.13em] text-[#74521f]">
                  Read the full analysis
                  <ArrowRight aria-hidden="true" size={17} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              </article>
          </Link>

          <div className="grid gap-5 lg:col-span-5">
            {supportingNotes.map((note) => (
              <Link href={`/insights/${note.slug}`} key={note.slug} className="group block">
                <article className="grid h-full overflow-hidden border border-ink/15 bg-white transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-gold sm:grid-cols-[12rem_1fr] lg:grid-cols-[10rem_1fr] xl:grid-cols-[12rem_1fr]">
                  <div className="relative min-h-52 overflow-hidden bg-strath-navy sm:min-h-full">
                    <Image
                      src={note.shareImage ?? "/share-image.png"}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 200px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#74521f]">{note.category}</span>
                      <span className="text-sm text-slate-600">{formatDate(note.date)}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold leading-tight transition-colors group-hover:text-[#74521f] xl:text-2xl">
                      {note.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{note.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between pt-5 text-sm text-slate-600">
                      <span className="flex items-center gap-2">
                        <Clock aria-hidden="true" size={14} /> {note.readingTime}
                      </span>
                      <ArrowRight aria-hidden="true" size={16} className="text-[#74521f] transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
