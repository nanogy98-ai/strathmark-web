import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/sections/Footer";
import { CookieResetButton } from "@/app/components/ui/CookieResetButton";
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

      <article className="max-w-3xl mx-auto px-6 py-32 md:py-40 flex-1 w-full">
        <header className="mb-10 border-b border-white/5 pb-10">
          <p className="text-gold font-mono text-xs uppercase tracking-widest mb-4">Legal</p>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Privacy & Cookies</h1>
          <p className="text-slate-400 leading-relaxed">
            This page explains how Strathmark Consulting handles basic privacy and cookie-related storage on this website.
          </p>
        </header>

        <section className="space-y-6 text-slate-300 leading-relaxed">
          <h2 className="sr-only">Privacy Policy Sections</h2>
          <h3 className="text-2xl font-serif font-bold text-white">Cookies and local storage</h3>
          <p>
            We use essential storage to remember site preferences, such as your cookie choices.
          </p>

          <h3 className="text-2xl font-serif font-bold text-white">Analytics</h3>
          <p>
            With your permission, we use Google Analytics (GA4) and Microsoft Clarity to understand how the site is used and to improve performance, usability, and clarity.
            If you reject analytics cookies, analytics storage remains denied and these tools are not enabled for full analytics tracking.
          </p>

          <h3 className="text-2xl font-serif font-bold text-white">Contact form submissions</h3>
          <p>
            When you submit the contact form, the information you provide is sent to Strathmark Consulting for the purpose of responding to your enquiry.
          </p>

          <div className="pt-2">
            <CookieResetButton />
          </div>

          <h3 className="text-2xl font-serif font-bold text-white">Contact</h3>
          <p>
            If you have questions about privacy or data handling, please use the{" "}
            <Link href="/#contact" className="text-gold hover:text-white underline underline-offset-4">
              contact form
            </Link>
            .
          </p>

          <p className="text-xs text-slate-500">
            Note: this page is intentionally concise and can be expanded once advertising or additional vendors are introduced.
          </p>
        </section>
      </article>

      <Footer />
    </main>
  );
}
