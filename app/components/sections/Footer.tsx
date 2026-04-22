import Image from "next/image";
import { caseStudies } from "@/lib/case-studies-data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLink } from "@/app/components/ui/SectionLink";

export function Footer() {
  const featuredCaseStudies = caseStudies.filter((study) => study.featured).slice(0, 3);
  const quickLinks = [
    ["/", "Home"],
    ["/#about", "About"],
    ["/#services", "Services"],
    ["/#approach", "Approach"],
    ["/#briefing", "5-Minute Briefing"],
    ["/#faq", "FAQ"],
  ];
  const resourceLinks = [
    ["/case-studies", "Case Studies"],
    ["/insights", "Intelligence Log"],
  ];
  const supportLinks = [
    ["/#briefing", "Read the 5-minute briefing"],
    ["/#contact", "Request Review"],
    ["/privacy", "Privacy"],
  ];

  return (
    <footer className="w-full border-t border-white/5 bg-black/20 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.1fr_0.85fr_0.9fr_0.9fr] lg:gap-12">
          <div className="space-y-4">
            <Image 
              src="/logo-footer.png" 
              alt="Strathmark Consulting" 
              width={180} 
              height={60} 
              className="h-12 w-auto object-contain opacity-80"
            />
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500 font-mono">
              Strategic Digital Advisory
            </p>
            <p className="text-sm leading-relaxed text-slate-400">
              Independent advisory for commercial decision-makers who prefer commercial clarity over vanity numbers.
            </p>
            <div className="pt-3">
              <SectionLink
                href="/#briefing"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] border border-white/10 px-4 py-3 hover:border-gold hover:text-gold transition-colors"
              >
                5-Minute Briefing <ArrowRight size={12} />
              </SectionLink>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-gold mb-4">Navigation</p>
            <ul className="space-y-2 text-sm">
              {quickLinks.map(([href, label]) => (
                <li key={label}>
                  <SectionLink href={href} className="hover:text-white transition-colors">
                    {label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-gold mb-4">Work & Resources</p>
            <div className="space-y-3">
              <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500">Featured Case Studies</p>
              <ul className="mt-2 space-y-2 text-sm">
                {featuredCaseStudies.map((study) => (
                  <li key={study.slug}>
                    <Link href={`/case-studies/${study.slug}`} className="hover:text-white transition-colors">
                      {study.client}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/case-studies" className="text-gold hover:text-white transition-colors">
                    Browse all case studies
                  </Link>
                </li>
              </ul>
              <div className="pt-3">
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500 mb-2">Content</p>
                <ul className="space-y-2 text-sm">
                  {resourceLinks.map(([href, label]) => (
                    <li key={label}>
                      <Link href={href} className="hover:text-white transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-gold mb-4">Action & Compliance</p>
            <ul className="space-y-2 text-sm">
              {supportLinks.map(([href, label]) => (
                <li key={label}>
                  <SectionLink href={href} className="hover:text-white transition-colors">
                    {label}
                  </SectionLink>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-xs text-slate-500">
              <p>Strathmark Consulting, Edinburgh.</p>
              <p>Registered in Scotland.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Strathmark Consulting. All rights reserved.</p>
          <p>Fixed fees. No lock-in. Advisory-first.</p>
        </div>
      </div>
    </footer>
  );
}
