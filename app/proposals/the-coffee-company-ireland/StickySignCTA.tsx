"use client";

import { useState, useEffect } from "react";
import { PenLine } from "lucide-react";
import { clsx } from "clsx";
import { ctaPrimaryClass } from "./cta";

export function StickySignCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isApprovalInView, setIsApprovalInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 900);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const approval = document.getElementById("approval");
    if (!approval) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsApprovalInView(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    observer.observe(approval);
    return () => observer.disconnect();
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
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm transition-all duration-500 transform md:hidden",
        isVisible && !isApprovalInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      )}
    >
      <div className="bg-strath-navy/85 backdrop-blur-xl border border-white/10 p-3 shadow-[0_18px_40px_rgba(0,0,0,0.45)] rounded-2xl flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-white font-serif font-bold text-sm leading-none">Secure your start date</p>
          <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-1">Proceed to approval</p>
        </div>
        <button
          onClick={scrollToApproval}
          className={clsx(ctaPrimaryClass, "shrink-0 px-4 py-2.5 text-[11px]")}
        >
          <PenLine size={16} className="group-hover:rotate-12 transition-transform" />
          <span>Sign proposal</span>
        </button>
      </div>
    </div>
  );
}
