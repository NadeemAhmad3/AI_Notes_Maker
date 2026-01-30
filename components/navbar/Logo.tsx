export default function Logo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer group select-none">
      {/* The Constructivist Mark */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        
        {/* Animated Main Shape with Gradient Overlay */}
        <div className="absolute inset-0 rounded-lg transform transition-transform duration-500 group-hover:rotate-45 group-hover:scale-90 overflow-hidden">
           {/* Default Black Background */}
           <div className="absolute inset-0 bg-slate-900 z-0" />
           
           {/* HOVER EFFECT: Gradient that fades in (matches your button) */}
           <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        </div>

        {/* The Glassy Overlay Shape */}
        <div className="absolute inset-0 bg-white/20 rounded-lg backdrop-blur-sm transform rotate-45 transition-transform duration-500 group-hover:rotate-90 pointer-events-none" />
        
        {/* Central Node */}
        <div className="relative w-3 h-3 bg-white rounded-sm animate-pulse z-20" />
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <span className="brand-font text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors duration-300">
          NOTED
        </span>
        <span className="text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase">
          Intelligence
        </span>
      </div>
    </div>
  );
}