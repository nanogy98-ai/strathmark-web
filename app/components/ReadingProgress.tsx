"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          setProgress(Math.min((scrollTop / docHeight) * 100, 100));
        }
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 z-[60] bg-transparent">
      <div
        className="h-full bg-gold transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
