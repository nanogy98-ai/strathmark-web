import { Navigation } from "@/app/components/Navigation";
import { Hero } from "@/app/components/sections/Hero";
import { Proof } from "@/app/components/sections/Proof";
import { About } from "@/app/components/sections/About";
import { Services } from "@/app/components/sections/Services";
import { Approach } from "@/app/components/sections/Approach";
import { ProvenOutcomes } from "@/app/components/sections/ProvenOutcomes";
import { Insights } from "@/app/components/sections/Insights";
import { LeadMagnet } from "@/app/components/sections/LeadMagnet";
import { FAQ } from "@/app/components/sections/FAQ";
import { Contact } from "@/app/components/sections/Contact";
import { Footer } from "@/app/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-strath-navy text-slate-200">
      <Navigation />
      <Hero />
      <Proof />
      <Services />
      <ProvenOutcomes />
      <Approach />
      <About />
      <Insights />
      <LeadMagnet />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
