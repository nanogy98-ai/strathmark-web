import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { ContactSuccessClient } from "./ContactSuccessClient";

export const metadata: Metadata = {
  title: "Application Received | Strathmark Consulting",
  description: "Confirmation page for submitted enquiry forms.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${SITE_URL}/contact-success`,
  },
};

export default function ContactSuccessPage() {
  return <ContactSuccessClient />;
}
