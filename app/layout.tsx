import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import "./globals.css";
import { CookieBanner } from "@/app/components/ui/CookieBanner";
import { Analytics } from "@/app/components/ui/Analytics";
import { FirstPartyVisitorTracker } from "@/app/components/ui/FirstPartyVisitorTracker";
import { ScrollBehaviorManager } from "@/app/components/ui/ScrollBehaviorManager";
import { LOGO_PATH, SHARE_IMAGE_PATH, SITE_NAME, SITE_URL } from "@/lib/site";

const geistSans = localFont({
  src: "./fonts/geist-latin.woff2",
  variable: "--font-geist-sans",
  display: "swap",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  weight: "100 900",
});

const playfair = localFont({
  src: "./fonts/playfair-display-latin.woff2",
  variable: "--font-playfair",
  display: "swap",
  weight: "400 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `AI Transformation for Technical SMEs | Strathmark`,
  description: "Independent AI transformation for founder-led engineering and manufacturing businesses. Find valuable workflows, control risk and prove the case before scaling.",
  openGraph: {
    title: `AI Transformation for Technical SMEs | Strathmark`,
    description: "Turn hard-won technical knowledge into an AI advantage, with controlled pilots, human authority and evidence before scale.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: SHARE_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `AI Transformation for Technical SMEs | Strathmark`,
    description: "Turn hard-won technical knowledge into an AI advantage, with controlled pilots and evidence before scale.",
    images: [SHARE_IMAGE_PATH],
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
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-strath-navy text-slate-200`}
        style={{ backgroundColor: "#0B1624", color: "#F8FAFC" }}
      >
        <Suspense fallback={null}>
          <FirstPartyVisitorTracker />
        </Suspense>
        <ScrollBehaviorManager />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": SITE_NAME,
              "url": SITE_URL,
              "logo": `${SITE_URL}${LOGO_PATH}`,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Edinburgh",
                "addressRegion": "Scotland",
                "addressCountry": "UK"
              },
              "description": "Independent AI transformation advisory for founder-led engineering, manufacturing and specialist technical businesses.",
              "priceRange": "£££",
              "areaServed": ["UK", "US", "UAE", "Europe"],
              "knowsAbout": ["AI Transformation", "Industrial AI", "AI Governance", "Knowledge Management", "Digital Strategy", "Technical SEO"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI transformation advisory services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Opportunity and Exposure Review" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Workflow and Knowledge Diagnostic" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Controlled AI Pilot" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Independent AI Oversight" } }
                ]
              }
            }),
          }}
        />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
