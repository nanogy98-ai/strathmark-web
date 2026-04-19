"use client";

import { useState, useEffect } from "react";
import { PenLine } from "lucide-react";
import { clsx } from "clsx";

export function StickySignCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 600px
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToApproval = () => {
    const element = document.getElementById("approval");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={clsx(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-lg transition-all duration-500 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      )}
    >
      <div className="bg-strath-navy/80 backdrop-blur-xl border border-gold/30 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="text-white font-serif font-bold text-sm">Ready to grow?</p>
          <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-0.5">Authorize & Proceed</p>
        </div>
        <button
          onClick={scrollToApproval}
          className="flex-1 sm:flex-initial bg-gold text-strath-navy px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2 group active:scale-95"
        >
          <PenLine size={16} className="group-hover:rotate-12 transition-transform" />
          <span>Sign Now</span>
        </button>
      </div>
    </div>
  );
}
