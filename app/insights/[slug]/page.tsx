import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notes } from "@/lib/notes-data";
import { Footer } from "@/app/components/sections/Footer";
import { Navigation } from "@/app/components/Navigation";

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
    title: note ? `${note.title} | Strathmark` : "Entry Not Found",
    description: note?.excerpt,
  };
}

export default async function NotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);

  if (!note) {
    return <div className="text-white text-center py-20">Entry not found</div>;
  }

  return (
    <main className="min-h-screen bg-strath-navy text-slate-200 selection:bg-gold selection:text-strath-navy flex flex-col">
      <Navigation />
      
      <article className="max-w-3xl mx-auto px-6 py-32 md:py-48 flex-1 w-full">
        <header className="mb-12 border-b border-white/5 pb-12">
          <Link href="/#insights" className="text-slate-500 hover:text-gold transition-colors inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest mb-8">
            <ArrowLeft size={14} /> Return to Intelligence Log
          </Link>
          
          <div className="text-gold font-mono text-xs mb-6 uppercase tracking-widest">{note.category}</div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight text-white">{note.title}</h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
            {note.excerpt}
          </p>
        </header>

        <div 
          className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300 prose-p:font-light prose-strong:text-white prose-a:text-gold hover:prose-a:text-white prose-li:text-slate-300"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
        
        <div className="mt-16 pt-12 border-t border-white/5">
          <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-white font-serif font-bold text-lg mb-2">Need a second opinion?</h4>
              <p className="text-slate-400 text-sm">We review infrastructure and spend for select clients.</p>
            </div>
            <Link 
              href="/#contact" 
              className="bg-gold text-strath-navy px-6 py-3 font-bold text-sm tracking-wide uppercase hover:bg-white transition-all whitespace-nowrap"
            >
              Request Analysis
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}

