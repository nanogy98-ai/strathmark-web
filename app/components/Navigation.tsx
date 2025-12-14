"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Approach", href: "/#approach" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Intelligence Log", href: "/insights" },
    { name: "FAQs", href: "/#faq" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (window.location.pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      setIsOpen(false);
      const id = href.replace("/", "");
      const element = document.querySelector(id);
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    } else {
      setIsOpen(false);
    }
  };

  return (
    <nav 
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b",
        scrolled 
          ? "bg-strath-navy/95 backdrop-blur-md border-slate-800 py-4 shadow-lg" 
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="group flex flex-col justify-center">
          <span className="font-serif text-2xl tracking-[0.15em] text-white group-hover:text-gold transition-colors duration-300">
            STRATHMARK
          </span>
          <span className="hidden md:block text-[0.6rem] tracking-[0.4em] text-slate-400 uppercase mt-1 pl-1">
            Consulting
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-medium text-slate-300 hover:text-white hover:text-gold transition-colors uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/#contact"
            onClick={(e) => handleLinkClick(e, "/#contact")}
            className="bg-white text-strath-navy px-6 py-2.5 text-sm font-bold tracking-wide hover:bg-gold hover:text-white transition-all duration-300 uppercase"
          >
            Request a Review
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white hover:text-gold transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-strath-navy border-b border-slate-800 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-xl font-serif text-slate-200 hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/#contact"
                onClick={(e) => handleLinkClick(e, "/#contact")}
                className="mt-4 text-center bg-gold text-strath-navy py-4 font-bold uppercase tracking-widest"
              >
                Request a Review
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
