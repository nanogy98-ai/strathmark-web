"use client";

import { Hero } from "@/app/components/sections/Hero";
import { Proof } from "@/app/components/sections/Proof";
import { Services } from "@/app/components/sections/Services";
import { Pricing } from "@/app/components/sections/Pricing";
import { BlogSection } from "@/app/components/sections/BlogSection";
import { About } from "@/app/components/sections/About";
import { Contact } from "@/app/components/sections/Contact";
import { Footer } from "@/app/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-strath-navy text-white overflow-hidden selection:bg-safety-orange selection:text-strath-navy">
      <Hero />
      <Proof />
      <Services />
      <About />
      <Pricing />
      <BlogSection />
      <Contact />
      <Footer />
    </main>
  );
}
