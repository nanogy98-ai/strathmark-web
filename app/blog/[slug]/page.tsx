import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import { Footer } from "@/app/components/sections/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} | Strathmark` : "Article Not Found",
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <div className="text-white text-center py-20">Article not found</div>;
  }

  return (
    <main className="min-h-screen bg-strath-navy text-white selection:bg-safety-orange selection:text-strath-navy flex flex-col">
      <nav className="p-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-steel hover:text-safety-orange transition-colors inline-flex items-center gap-2 font-mono text-sm">
            <ArrowLeft size={16} /> Return to System
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-24 flex-1">
        <header className="mb-12 border-b border-white/10 pb-12">
          <div className="text-safety-orange font-mono text-sm mb-4 uppercase tracking-widest">{post.category}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-steel font-mono text-sm">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div 
          className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-steel prose-a:text-safety-orange prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <Footer />
    </main>
  );
}

