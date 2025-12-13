import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Strathmark Consulting | Strategic Digital Advisory",
  description: "Strategic digital consulting for organisations where spend, scale, and search matter. Independent advisory and technical execution.",
  openGraph: {
    title: "Strathmark Consulting",
    description: "Strategic digital consulting for high-liability industries.",
    url: "https://strathmark.com",
    siteName: "Strathmark Consulting",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strathmark Consulting",
    description: "Strategic digital consulting for high-liability industries.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-strath-navy text-slate-200`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Strathmark Consulting",
              "url": "https://strathmark.com",
              "logo": "https://strathmark.com/logo.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Edinburgh",
                "addressRegion": "Scotland",
                "addressCountry": "UK"
              },
              "description": "Strategic digital consulting and technical SEO advisory.",
              "priceRange": "£££"
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
