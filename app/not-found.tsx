import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Footer } from "@/app/components/sections/Footer";
import { Navigation } from "@/app/components/Navigation";
import { SectionLink } from "@/app/components/ui/SectionLink";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-strath-navy text-slate-200">
      <Navigation />
      <section className="relative flex min-h-[75svh] items-center overflow-hidden px-6 pb-20 pt-36">
        <div className="editorial-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[150px]" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.4fr_1fr] lg:items-center">
          <p className="font-serif text-[clamp(7rem,18vw,14rem)] font-semibold leading-none text-white/5">404</p>
          <div>
            <p className="section-kicker">Page not found</p>
            <h1 className="mt-6 max-w-3xl text-[clamp(3rem,7vw,6rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-white">
              This route does not lead anywhere useful.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              The page may have moved, or the address may be incorrect. Return home or continue to the latest insights.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex min-h-14 items-center justify-center gap-3 bg-gold px-7 text-sm font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-white"
              >
                <ArrowLeft aria-hidden="true" size={16} />
                Return home
              </Link>
              <SectionLink
                href="/insights"
                className="inline-flex min-h-14 items-center justify-center gap-3 border border-white/20 px-7 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-gold hover:text-gold"
              >
                Browse insights
                <ArrowRight aria-hidden="true" size={16} />
              </SectionLink>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
