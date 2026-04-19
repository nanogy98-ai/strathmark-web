import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    title: "Private Proposal | Ethical Coffee Ltd (t/a The Coffee Company)",
    description: "Private commercial proposal prepared for Ethical Coffee Ltd, trading as The Coffee Company.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: {
    canonical: `${SITE_URL}/proposals/the-coffee-company-ireland`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
