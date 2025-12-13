"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { notes } from "@/lib/notes-data";
import { ArrowRight } from "lucide-react";

export function Insights() {
  return (
    <section className="w-full max-w-7xl px-6 py-24 mx-auto border-t border-white/5" id="insights">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Intelligence Log</h2>
          <p className="text-slate-400 text-lg">Field notes from the front lines of digital engineering.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {notes.map((note, i) => (
          <Link href={`/insights/${note.slug}`} key={i} className="block group h-full">
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.02] border border-white/5 p-8 h-full hover:border-gold/30 transition-colors flex flex-col"
            >
              <div className="text-xs font-mono text-gold mb-4 uppercase tracking-widest">{note.category}</div>
              <h3 className="text-lg font-bold text-white mb-4 group-hover:text-gold transition-colors leading-snug">
                {note.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-4 flex-1">
                {note.excerpt}
              </p>
              <div className="text-xs text-slate-500 font-mono flex items-center gap-2 group-hover:text-white transition-colors mt-auto">
                Read Entry <ArrowRight size={12} />
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </section>
  );
}

