"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function About() {
  return (
    <section className="w-full max-w-7xl px-6 py-24 mx-auto border-t border-white/5" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-5">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 leading-tight">
            Independent Advisory.<br/>Global Reach.
          </h2>
          <div className="h-1 w-20 bg-gold mb-8"></div>
          
          <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-light">
            <p>
              Strathmark Consulting is an independent advisory firm built on the principles of commercial accountability and technical precision. We are not a volume agency.
            </p>
            <p>
              Headquartered in Edinburgh, Scotland, we operate globally, advising leadership teams in the US, UAE, and Europe. We believe that digital performance is a structural function of your business, not a marketing add-on. We fix the machine first, then we fuel it.
            </p>
          </div>
        </div>
        
        <div className="lg:col-span-7 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/5 pb-12">
            <div>
              <h4 className="text-white font-bold mb-2">Unbiased Oversight</h4>
              <p className="text-sm text-slate-400 leading-relaxed">We audit your agencies and internal teams without conflict of interest. Pure strategic clarity.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Commercial Focus</h4>
              <p className="text-sm text-slate-400 leading-relaxed">We prioritise revenue impact and profit over vanity traffic metrics. ROI is the only KPI.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Technical Depth</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Deep engineering capability to solve complex infrastructure issues that generic agencies miss.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Selective Client Roster</h4>
              <p className="text-sm text-slate-400 leading-relaxed">We cap our active engagements to ensure senior-led attention on every account.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3 flex-shrink-0">
              <div className="relative group w-full max-w-[200px]">
                <div className="absolute inset-0 bg-gold/10 transform translate-x-2 translate-y-2 rounded-none group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-500 ease-out"></div>
                <div className="relative aspect-[3/4] w-full transition-all duration-700 ease-in-out bg-slate-900 overflow-hidden">
                  <Image 
                    src="/founder.png"
                    alt="Graeme Tudhope - Principal Consultant"
                    fill
                    className="object-cover object-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-strath-navy/80 via-transparent to-transparent opacity-60"></div>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-xl font-serif font-bold text-white mb-4">Principal-Led Advisory</h3>
              <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
                <p>
                  Strathmark is led by Graeme, a principal consultant with over a decade of experience across agency, contracting, and in-house roles for major international brands.
                </p>
                <p>
                  Starting in technical support for SMEs at 17, Graeme's career evolved through building digital products, managing complex agency projects for finance and automotive clients, and leading in-house growth teams for high-velocity brands.
                </p>
                <p>
                  He founded Strathmark to solve a specific problem: too many organisations spend significantly on digital marketing without clarity on what works. Strathmark exists to remove that noise and restore commercial focus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
