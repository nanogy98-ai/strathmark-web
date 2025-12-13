"use client";

import { Navigation } from "@/app/components/Navigation";
import { Hero } from "@/app/components/sections/Hero";
import { About } from "@/app/components/sections/About";
import { Services } from "@/app/components/sections/Services";
import { Approach } from "@/app/components/sections/Approach";
import { Proof } from "@/app/components/sections/Proof";
import { Insights } from "@/app/components/sections/Insights";
import { FAQ } from "@/app/components/sections/FAQ";
import { Contact } from "@/app/components/sections/Contact";
import { Footer } from "@/app/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-strath-navy text-slate-200 overflow-x-hidden selection:bg-gold selection:text-strath-navy">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Approach />
      <Insights />
      <Proof />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
