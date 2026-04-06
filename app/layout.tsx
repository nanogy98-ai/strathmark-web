import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/app/components/ui/CookieBanner";
import { Analytics } from "@/app/components/ui/Analytics";
import { LOGO_PATH, SHARE_IMAGE_PATH, SITE_NAME, SITE_URL } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: `Independent Digital Advisory & Agency Oversight | Strathmark`,
  description: "Independent strategic digital consulting for organizations where spend, scale, and search matter. Commercial accountability and technical precision.",
  openGraph: {
    title: `Independent Digital Advisory & Agency Oversight | Strathmark`,
    description: "Independent strategic digital consulting for high-liability industries. Commercial accountability and technical precision.",
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
    title: `Independent Digital Advisory & Agency Oversight | Strathmark`,
    description: "Independent strategic digital consulting for high-liability industries.",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-strath-navy text-slate-200`}>
        <Analytics />
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
