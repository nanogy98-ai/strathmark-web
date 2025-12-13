import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies-data";
import { Footer } from "@/app/components/sections/Footer";
import { Navigation } from "@/app/components/Navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  return {
    title: study ? `${study.title} | Strathmark Case Study` : "Case Study Not Found",
    description: study?.excerpt,
    openGraph: {
      title: study ? `${study.title} | Strathmark` : "Case Study",
      description: study?.excerpt,
      type: "article",
    }
  };
}

export default async function CaseStudyDetail({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    return <div className="text-white text-center py-20">Case study not found</div>;
  }

  return (
    <main className="min-h-screen bg-strath-navy text-slate-200 selection:bg-gold selection:text-strath-navy flex flex-col">
      <Navigation />
      
      {/* Hero */}
      <header className="pt-32 pb-16 px-6 border-b border-white/5 bg-gradient-to-b from-strath-navy to-[#0a101d]">
        <div className="max-w-4xl mx-auto">
          <Link href="/case-studies" className="text-slate-500 hover:text-gold transition-colors inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest mb-8">
            <ArrowLeft size={14} /> Return to Index
          </Link>
          
          <div className="flex flex-wrap gap-4 mb-6 text-xs font-mono uppercase tracking-widest">
            <span className="bg-gold/10 text-gold px-3 py-1 border border-gold/20">{study.industry}</span>
            <span className="bg-white/5 text-slate-300 px-3 py-1 border border-white/10">{study.region}</span>
            <span className="bg-white/5 text-slate-300 px-3 py-1 border border-white/10">{study.engagementType}</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 leading-tight text-white">
            {study.title}
          </h1>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-white/10">
            {study.metrics.map((m, i) => (
              <div key={i} className="border-l-2 border-gold pl-4">
                <div className="text-3xl font-bold text-white">{m.value}</div>
                <div className="text-sm text-slate-400 mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16 md:py-24 w-full">
        {/* GSC Performance Graph */}
        <figure className="mb-16 -mx-6 md:-mx-12 lg:-mx-24 bg-black/20 border-y border-white/5 p-6 md:p-12 text-center">
          <div className="relative w-full bg-slate-900 border border-white/10 flex items-center justify-center overflow-hidden">
             <Image 
               src="/case-studies/organic-turnaround-gsc.png"
               alt="Google Search Console Performance Graph"
               width={1200}
               height={675}
               className="w-full h-auto object-cover"
               priority
             />
          </div>
          <figcaption className="text-xs text-slate-500 font-mono mt-4">
            Figure 1: Google Search Console performance (client name withheld).
          </figcaption>
        </figure>

        <div 
          className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300 prose-p:font-light prose-strong:text-white prose-ul:text-slate-300 prose-li:marker:text-gold"
          dangerouslySetInnerHTML={{ __html: study.content }}
        />
        
        {/* CTA Block */}
        <div className="mt-24 bg-white/[0.02] border border-white/10 p-8 md:p-12 text-center">
          <h3 className="text-2xl font-serif font-bold text-white mb-4">Request a Review</h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
            If organic performance has plateaued or declined despite investment, the issue is usually structural. Request a review to identify what will actually move the needle.
          </p>
          <Link 
            href="/#contact" 
            className="bg-gold text-strath-navy px-8 py-4 font-bold text-sm tracking-wide uppercase hover:bg-white transition-all inline-flex items-center gap-2"
          >
            Start Diagnostic <ArrowRight size={16} />
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
