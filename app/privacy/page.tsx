import type { Metadata } from "next";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/sections/Footer";
import { CookieResetButton } from "@/app/components/ui/CookieResetButton";
import { SectionLink } from "@/app/components/ui/SectionLink";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & Cookies | Strathmark Consulting",
  description: "Privacy and cookie information for Strathmark Consulting.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-strath-navy text-slate-200 selection:bg-gold selection:text-strath-navy flex flex-col">
      <Navigation />

      <article className="mx-auto w-full max-w-5xl flex-1 px-6 py-32 md:py-40">
        <header className="mb-10 border-b border-white/5 pb-10">
          <p className="text-gold font-mono text-xs uppercase tracking-widest mb-4">Legal</p>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Privacy & Cookies</h1>
          <p className="text-slate-400 leading-relaxed">
            This notice explains the information collected when you visit this website, why it
            is used, where it is handled, and the choices available to you.
          </p>
        </header>

        <section className="grid gap-x-12 gap-y-10 text-slate-300 leading-relaxed md:grid-cols-2">
          <h2 className="sr-only">Privacy Policy Sections</h2>
          <div>
            <h3 className="text-2xl font-serif font-bold text-white">First-party visitor log</h3>
            <p className="mt-4">
              Strathmark maintains a private operational log when pages are visited. It records
              the full IP address supplied to the hosting platform, date and time, pages viewed,
              referring page, browser and device information, approximate location supplied by
              the hosting network, visit-session identifier, and basic interaction and
              performance signals.
            </p>
            <p className="mt-4">
              This log is used to protect and operate the site, diagnose faults, understand visit
              journeys and traffic sources, and assess website performance. Full IP addresses are
              not shortened in this operational record. This logging is separate from optional
              Google Analytics and Microsoft Clarity.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-white">Storage and access</h3>
            <p className="mt-4">
              The website is hosted by Vercel and the private visitor records are stored in a
              restricted Supabase database. They are available only through the password-protected
              Strathmark operations dashboard and server-side credentials; the browser does not
              receive database access keys.
            </p>
            <p className="mt-4">
              Records are kept for operational and analytical use and are reviewed as the service
              develops. Access is restricted and records are not presented publicly.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-white">Cookies and local storage</h3>
            <p className="mt-4">
              Essential browser storage remembers your privacy choice and creates a visit-session
              identifier so activity from one visit can be organised coherently. You can change
              your optional analytics choice at any time.
            </p>
            <div className="mt-5">
              <CookieResetButton />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-white">Optional analytics</h3>
            <p className="mt-4">
              With your permission, Google Analytics (GA4) and Microsoft Clarity are used to
              understand site usage and improve performance, usability, and clarity. If you
              continue without analytics, analytics storage remains denied and those optional
              tools are not enabled for full analytics tracking.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-white">Enquiries</h3>
            <p className="mt-4">
              When you submit the contact form, the details you provide are sent to Strathmark
              Consulting so the enquiry can be assessed and answered. Please do not include
              sensitive information unless it is necessary for the enquiry.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-white">Your questions and rights</h3>
            <p className="mt-4">
              You may ask about personal information held in connection with the website, request
              correction where it is inaccurate, or raise a privacy concern. Use the{" "}
              <SectionLink href="/#contact" className="text-gold hover:text-white underline underline-offset-4">
                contact form
              </SectionLink>{" "}
              and identify the visit or enquiry as precisely as you can.
            </p>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
