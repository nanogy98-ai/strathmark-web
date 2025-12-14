"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton({ label = "Go Back", className = "" }: { label?: string, className?: string }) {
  const router = useRouter();
  
  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button 
      onClick={handleBack} 
      className={`text-slate-500 hover:text-gold transition-colors inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest ${className}`}
    >
      <ArrowLeft size={14} /> {label}
    </button>
  );
}

