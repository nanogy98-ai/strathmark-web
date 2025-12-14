import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/sections/Footer";
import { CookieResetButton } from "@/app/components/ui/CookieResetButton";

export const metadata: Metadata = {
  title: "Privacy & Cookies | Strathmark Consulting",
  description: "Privacy and cookie information for Strathmark Consulting.",
  alternates: {
    canonical: "https://strathmark.com/privacy",
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
          <h2 className="text-2xl font-serif font-bold text-white">Cookies and local storage</h2>
          <p>
            We use essential storage to remember site preferences, such as your cookie choices.
          </p>

          <h2 className="text-2xl font-serif font-bold text-white">Analytics</h2>
          <p>
            With your permission, we use Google Analytics (GA4) to understand how the site is used and to improve performance and clarity.
            If you reject analytics cookies, Google Analytics will not load.
          </p>

          <h2 className="text-2xl font-serif font-bold text-white">Contact form submissions</h2>
          <p>
            When you submit the contact form, the information you provide is sent to Strathmark Consulting for the purpose of responding to your enquiry.
          </p>

          <div className="pt-2">
            <CookieResetButton />
          </div>

          <h2 className="text-2xl font-serif font-bold text-white">Contact</h2>
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


