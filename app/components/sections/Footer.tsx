export function Footer() {
  return (
    <footer className="w-full py-12 border-t border-white/10 text-center text-steel text-sm font-mono bg-black/40">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-left">
          <div className="font-bold text-white mb-1">STRATHMARK CONSULTING</div>
          <div className="text-xs text-white/40">System Active // v1.2</div>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="hover:text-safety-orange transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-safety-orange transition-colors">Twitter/X</a>
          <a href="#" className="hover:text-safety-orange transition-colors">Terms</a>
        </div>

        <div className="text-right">
          <p>© {new Date().getFullYear()} Strathmark Consulting.</p>
          <p className="text-xs text-white/40 mt-1">Registered in Scotland.</p>
        </div>
      </div>
    </footer>
  );
}

