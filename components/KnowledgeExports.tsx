"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function KnowledgeExports() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingTriggerRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. HIGHLIGHTER (Standardized Logic)
      gsap.fromTo(".ke-highlight-underline", 
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: headingTriggerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 2. THE SECURITY TAPE MARQUEE (Infinite Scroll)
      gsap.to(".tape-text", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });

      // 3. CARDS ENTRANCE (Staggered Pop)
      gsap.from(".export-card-wrapper", {
        scrollTrigger: {
          trigger: ".export-grid",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.5)",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pb-40 pt-24 px-4 sm:px-6 bg-[#FAFAF9] overflow-hidden"
    >
      {/* --- BACKGROUND GRID --- */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      {/* --- THE STYLISH DIVIDER: "Security Tape" --- */}
      <div className="absolute top-0 left-0 w-full z-20 transform -rotate-1 -translate-y-1/2">
         <div className="w-[110%] -ml-[5%] h-14 bg-yellow-400 shadow-lg border-y-2 border-yellow-500 flex items-center overflow-hidden">
            {/* Scissor Cuts Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20" 
                 style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 10px)' }} />
            
            {/* Marquee Text */}
            <div className="tape-text flex whitespace-nowrap min-w-full font-mono text-sm font-bold tracking-widest text-yellow-900 uppercase">
               {[...Array(10)].map((_, i) => (
                  <span key={i} className="mx-8 flex items-center gap-4">
                     ⚠ Export Ready <span className="text-xl">●</span> Download Data <span className="text-xl">●</span> No Limits
                  </span>
               ))}
            </div>
         </div>
      </div>


      {/* --- HEADING --- */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-24 mt-12">
        <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-slate-900 leading-tight">
          <span ref={headingTriggerRef} className="relative inline-block px-2">
            <span className="relative z-10"> Knowledge ready to use</span>
            {/* Highlighter */}
            <span className="ke-highlight-underline absolute bottom-2 left-0 w-full h-[0.35em] bg-yellow-300/60 -z-10 origin-left scale-x-0 rounded-sm" />
          </span>
        </h2>
        <p className="mt-6 text-slate-500 text-lg font-medium">
          Dont let your notes rot in an app. Take them where you work.
        </p>
      </div>


      {/* --- 10/10 EXPORT GRID --- */}
      <div className="export-grid max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">

        {/* CARD 1: PDF (Red Theme) */}
        <ExportCard 
          title="PDF Notes" 
          ext=".pdf"
          desc="Print-ready documents with smart formatting."
          color="bg-rose-500" 
          shadow="shadow-rose-200"
          icon={(
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          )}
        />

        {/* CARD 2: FLASHCARDS (Emerald Theme) */}
        <ExportCard 
          title="Anki Deck" 
          ext=".apkg"
          desc="Spaced repetition cards generated automatically."
          color="bg-emerald-500" 
          shadow="shadow-emerald-200"
          icon={(
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
          )}
        />

        {/* CARD 3: QUIZ (Amber Theme) */}
        <ExportCard 
          title="Auto Quiz" 
          ext=".json"
          desc="MCQ and Short Answer tests to grade yourself."
          color="bg-amber-500" 
          shadow="shadow-amber-200"
          icon={(
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
          )}
        />

        {/* CARD 4: NOTION (Blue Theme) */}
        <ExportCard 
          title="Notion Page" 
          ext=".md"
          desc="Syncs directly to your workspace via API."
          color="bg-blue-500" 
          shadow="shadow-blue-200"
          icon={(
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          )}
        />

      </div>
    </section>
  );
}

// --- THE STYLISH 3D CARD COMPONENT ---
interface ExportCardProps {
  title: string;
  ext: string;
  desc: string;
  color: string;
  shadow: string;
  icon: React.ReactNode;
}

function ExportCard({ title, ext, desc, color, shadow, icon }: ExportCardProps) {
  return (
    <div className="export-card-wrapper group relative h-80 w-full cursor-pointer perspective-1000">
      
      {/* 1. LAYER: THE SHADOW (Bottom) */}
      <div className={`absolute inset-0 rounded-2xl ${shadow} bg-opacity-40 transition-all duration-500 group-hover:translate-y-8 group-hover:scale-90 group-hover:blur-md`} />

      {/* 2. LAYER: THE BASE (Middle - Color) */}
      <div className={`absolute inset-0 rounded-2xl ${color} transition-all duration-500 group-hover:translate-y-4 group-hover:-translate-x-2 group-hover:rotate-[-5deg]`}>
         {/* Decorative Pattern on Base */}
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '10px 10px' }} />
      </div>

      {/* 3. LAYER: THE CONTENT (Top - White) */}
      <div className="absolute inset-0 bg-white rounded-2xl border-2 border-slate-900 p-6 flex flex-col justify-between transition-all duration-500 group-hover:-translate-y-2 group-hover:translate-x-2 shadow-xl overflow-hidden">
         
         {/* Giant Watermark Icon (Absolute) */}
         <div className={`absolute -right-8 -bottom-8 w-40 h-40 opacity-[0.03] transform rotate-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-0 text-slate-900`}>
           {icon}
         </div>

         {/* Top Header */}
         <div className="flex justify-between items-start z-10">
            <div className={`w-10 h-10 rounded-lg ${color} bg-opacity-10 flex items-center justify-center text-slate-900`}>
              {/* Mini Icon */}
              <div className="w-5 h-5 opacity-70">
                {icon}
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-colors">
              {ext}
            </span>
         </div>

         {/* Middle Content */}
         <div className="z-10 mt-4">
           <h3 className="font-serif-display text-2xl text-slate-900 group-hover:text-blue-600 transition-colors">
             {title}
           </h3>
           <p className="mt-2 text-sm text-slate-500 font-medium leading-relaxed">
             {desc}
           </p>
         </div>

         {/* Bottom Action Area */}
         <div className="z-10 mt-auto pt-6 border-t border-dashed border-slate-200">
           <div className="flex items-center gap-2 group/btn">
             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
               Export
             </span>
             <div className="h-px flex-1 bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
             </div>
             <svg className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transform group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
             </svg>
           </div>
         </div>

      </div>
    </div>
  );
}
