"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section className="w-full max-w-7xl px-6 py-24 mx-auto border-t border-white/5" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Independent Advisory.<br/>Global Reach.
          </h2>
          <div className="h-1 w-20 bg-gold mb-8"></div>
        </div>
        
        <div className="lg:col-span-8 space-y-8 text-slate-300 text-lg leading-relaxed font-light">
          <p>
            Strathmark Consulting is an independent advisory firm built on the principles of commercial accountability and technical precision. We are not a volume agency.
          </p>
          <p>
            Headquartered in Edinburgh, Scotland, we operate globally, advising leadership teams in the US, UAE, and Europe. We believe that digital performance is a structural function of your business, not a marketing add-on. We fix the machine first, then we fuel it.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/5">
            <div>
              <h4 className="text-white font-bold mb-2">Unbiased Oversight</h4>
              <p className="text-sm text-slate-400">We audit your agencies and internal teams without conflict of interest.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Commercial Focus</h4>
              <p className="text-sm text-slate-400">We prioritise revenue impact and profit over vanity traffic metrics.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Technical Depth</h4>
              <p className="text-sm text-slate-400">Deep engineering capability to solve complex infrastructure issues.</p>
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-white/5">
            <h3 className="text-2xl font-serif font-bold text-white mb-6">Principal-Led Advisory</h3>
            <div className="space-y-6 text-base text-slate-400">
              <p>
                Strathmark is led by Graeme, a principal consultant with over a decade of experience across agency, contracting, and in-house roles for major international brands.
              </p>
              <p>
                Starting in technical support for SMEs at 17, Graeme's career evolved through building digital products, managing complex agency projects for finance and automotive clients, and leading in-house growth teams for high-velocity brands.
              </p>
              <p>
                He founded Strathmark to solve a specific problem: too many organisations spend significantly on digital marketing without clarity on what works. Reporting becomes theatre; accountability disappears. Strathmark exists to remove that noise and restore commercial focus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
