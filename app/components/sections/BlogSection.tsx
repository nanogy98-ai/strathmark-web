"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { ArrowRight } from "lucide-react";

export function BlogSection() {
  return (
    <section className="w-full max-w-6xl px-6 py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Intelligence Log</h2>
          <p className="text-steel text-xl">No fluff. Just engineering notes.</p>
        </div>
        <div className="hidden md:block">
          <Link href="/blog" className="text-safety-orange flex items-center gap-2 hover:gap-4 transition-all">
            View Archive <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogPosts.slice(0, 4).map((post, i) => (
          <Link href={`/blog/${post.slug}`} key={i} className="block group">
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-6 h-full hover:border-safety-orange/50 transition-colors flex flex-col"
            >
              <div className="text-xs font-mono text-safety-orange mb-3">{post.category}</div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-safety-orange transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-steel text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                {post.excerpt}
              </p>
              <div className="text-xs text-white/40 font-mono mt-auto">
                {post.date} • {post.readTime}
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
      
      <div className="mt-8 md:hidden text-center">
        <Link href="/blog" className="text-safety-orange inline-flex items-center gap-2">
          View All Logs <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

