import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/app/components/ui/CookieBanner";

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
  description: "Independent strategic digital consulting for organizations where spend, scale, and search matter. Commercial accountability and technical precision.",
  openGraph: {
    title: "Strathmark Consulting",
    description: "Independent strategic digital consulting for high-liability industries. Commercial accountability and technical precision.",
    url: "https://strathmark.com",
    siteName: "Strathmark Consulting",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://strathmark.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Strathmark Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strathmark Consulting",
    description: "Independent strategic digital consulting for high-liability industries.",
    images: ["https://strathmark.com/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://strathmark.com",
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
              "description": "Independent strategic digital consulting and technical advisory.",
              "priceRange": "£££",
              "founder": {
                "@type": "Person",
                "name": "Graeme"
              },
              "areaServed": ["UK", "US", "UAE", "Europe"],
              "knowsAbout": ["Digital Strategy", "Technical SEO", "Marketing Infrastructure"]
            }),
          }}
        />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
