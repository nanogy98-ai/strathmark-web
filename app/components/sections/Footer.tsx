import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full py-12 border-t border-white/5 text-center text-slate-400 text-sm font-mono bg-black/20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="text-left flex flex-col items-start gap-4">
          <Image 
            src="/logo-footer.png" 
            alt="Strathmark Consulting" 
            width={180} 
            height={60} 
            className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
          <div className="text-xs text-slate-500">System Active // v1.2</div>
        </div>
        
        <div className="flex gap-8 text-sm">
          <a href="#" className="hover:text-gold transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-gold transition-colors">Twitter/X</a>
          <a href="#" className="hover:text-gold transition-colors">Terms</a>
        </div>

        <div className="text-right text-slate-500">
          <p>© {new Date().getFullYear()} Strathmark Consulting.</p>
          <p className="text-xs mt-1">Registered in Scotland.</p>
        </div>
      </div>
    </footer>
  );
}

