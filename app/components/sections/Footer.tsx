import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLink } from "@/app/components/ui/SectionLink";

const FOOTER_COLUMNS = [
  {
    title: "AI advisory",
    links: [
      ["/#services", "Opportunity review"],
      ["/#services", "Workflow diagnostic"],
      ["/#services", "Controlled pilot"],
      ["/#governance", "Governance"],
    ],
  },
  {
    title: "Evidence & thinking",
    links: [
      ["/insights", "Intelligence Log"],
      ["/briefings/industrial-ai-systems-integrator", "Sample briefing"],
      ["/case-studies", "Digital case studies"],
      ["/#faq", "Questions"],
    ],
  },
  {
    title: "Company",
    links: [
      ["/#about", "About Strathmark"],
      ["/digital-performance", "Digital performance"],
      ["/#contact", "Discuss your business"],
      ["/privacy", "Privacy"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="w-full bg-[#07111d] text-slate-300">
      <div className="border-b border-white/10">
        <div className="section-shell grid gap-8 py-12 md:grid-cols-[1fr_auto] md:items-center md:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Independent AI transformation</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-white md:text-5xl">
              Ready to find the AI opportunity worth proving?
            </h2>
          </div>
          <SectionLink
            href="/#contact"
            className="group inline-flex min-h-14 w-full items-center justify-center gap-3 bg-gold px-7 text-sm font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-white md:w-auto"
          >
            Discuss your business
            <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-1" />
          </SectionLink>
        </div>
      </div>

      <div className="section-shell py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1.75fr] lg:gap-20">
          <div>
            <Link href="/" aria-label="Strathmark Consulting home" className="inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center border border-gold/45 bg-gold/10 font-serif text-xl font-bold text-gold">
                S
              </span>
              <span className="font-serif text-2xl tracking-[0.14em] text-white">STRATHMARK</span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              AI transformation for founder-led engineering, manufacturing and specialist technical businesses.
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Edinburgh · Working internationally
            </p>
          </div>

          <div className="grid gap-9 sm:grid-cols-3">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold">{column.title}</h3>
                <ul className="mt-5 space-y-3 text-sm">
                  {column.links.map(([href, label]) => (
                    <li key={label}>
                      <SectionLink href={href} className="inline-flex min-h-8 items-center text-slate-400 transition-colors hover:text-white">
                        {label}
                      </SectionLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-7 text-xs text-slate-400 md:flex-row md:items-end md:justify-between">
          <div>
            <p>Strathmark Consulting, Edinburgh.</p>
            <p className="mt-1">Registered in Scotland.</p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <p>© {new Date().getFullYear()} Strathmark Consulting. All rights reserved.</p>
            <p>Fixed fees. Human authority. Evidence before scale.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
