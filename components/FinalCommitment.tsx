"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FinalCommitment() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingTriggerRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. YELLOW TAPE MARQUEE (Matches KnowledgeExports)
      gsap.to(".final-tape-text", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });

      // 2. HIGHLIGHTER ANIMATION
      gsap.fromTo(".final-highlight", 
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: headingTriggerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 3. RUBBER STAMP POP (The "Official" feel)
      gsap.from(".official-stamp", {
        scale: 4,
        opacity: 0,
        rotate: -45,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".official-stamp",
          start: "top 90%",
        }
      });

      // 4. STAGGERED ENTRANCE FOR TEXT
      gsap.from(".reveal-item", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-48 pb-40 px-6 bg-[#FAFAF9] overflow-hidden"
    >
      {/* --- BACKGROUND GRID --- */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      {/* --- THE STYLISH DIVIDER: "Yellow Security Tape" --- */}
      <div className="absolute top-0 left-0 w-full z-20 transform rotate-1 -translate-y-1/2">
         <div className="w-[110%] -ml-[5%] h-14 bg-yellow-400 shadow-xl border-y-2 border-yellow-500 flex items-center overflow-hidden">
            {/* Scissor Cuts Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20" 
                 style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 10px)' }} />
            
            {/* Marquee Text */}
            <div className="final-tape-text flex whitespace-nowrap min-w-full font-mono text-sm font-bold tracking-widest text-yellow-900 uppercase">
               {[...Array(10)].map((_, i) => (
                  <span key={i} className="mx-8 flex items-center gap-4">
                     ✦ Final Step <span className="text-xl">●</span> Commit to Excellence <span className="text-xl">●</span> Join 10k+ Students
                  </span>
               ))}
            </div>
         </div>
      </div>


      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* Top Tag */}
        <span className="reveal-item block text-[11px] uppercase tracking-[0.4em] text-slate-400 mb-8 font-bold">
          The End of Manual Labor
        </span>

        {/* Heading */}
        <h2 className="reveal-item font-serif-display text-5xl sm:text-6xl md:text-7xl text-slate-900 leading-[1.1] mb-10">
          Your next lecture could be the last time you{" "}
          <span ref={headingTriggerRef} className="relative inline-block px-2">
            <span className="relative z-10">take notes manually</span>
            {/* Highlighter */}
            <span className="final-highlight absolute bottom-3 left-0 w-full h-[0.35em] bg-yellow-300/70 -z-10 origin-left scale-x-0 rounded-sm" />
          </span>
        </h2>

        {/* Supporting Text */}
        <p className="reveal-item text-slate-500 text-xl font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
          The future of learning is about <span className="text-slate-900 underline decoration-yellow-400 decoration-2 underline-offset-4">understanding</span>, not transcribing. Start your first lecture for free.
        </p>


        {/* --- THE CALL TO ACTION AREA --- */}
        <div className="reveal-item relative flex flex-col items-center gap-8">
          
          {/* Main Button */}
          <button className="group relative px-12 py-5 bg-slate-900 text-white rounded-2xl font-bold text-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
            <div className="absolute inset-0 bg-linear-to-tr from-slate-800 to-slate-900" />
            
            {/* Hover shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-linear-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out" />
            
            <span className="relative z-10 flex items-center gap-3">
              Start Recording for Free
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>

          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">
              No Credit Card Required • Instant Setup
            </span>
            {/* Tiny "Guaranteed" hand-drawn circle */}
            <div className="mt-2 text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              100% Student Approved
            </div>
          </div>


          {/* --- DECORATIVE RUBBER STAMP --- */}
          <div className="official-stamp absolute -right-4 -bottom-12 md:-right-20 md:-bottom-8 pointer-events-none select-none">
             <div className="relative w-32 h-32 md:w-40 md:h-40 border-4 border-red-500/40 rounded-full flex items-center justify-center rotate-[-15deg]">
                <div className="w-[85%] h-[85%] border-2 border-red-500/30 rounded-full flex flex-col items-center justify-center text-red-500/40 font-black leading-none text-center">
                   <span className="text-[10px] tracking-tighter mb-1 uppercase">Noted Official</span>
                   <span className="text-xl md:text-2xl tracking-tighter uppercase">VERIFIED</span>
                   <span className="text-[10px] tracking-tighter mt-1 uppercase">2024 ACCESS</span>
                </div>
                {/* Texture overlay for stamp */}
                <div className="absolute inset-0 opacity-20" 
                     style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stucco.png")' }} />
             </div>
          </div>

        </div>


        {/* --- SIGNATURE FOOTER --- */}
        <div className="reveal-item mt-32 relative inline-block">
          <div className="text-slate-300 font-serif-display italic text-2xl tracking-tight">
            See you in class,
          </div>
          {/* Hand-written style signature */}
          <div className="mt-2 font-serif text-4xl text-slate-900 opacity-80 -rotate-2">
            The Noted Team
          </div>
          {/* Underline flourish */}
          <svg className="absolute -bottom-4 left-0 w-full h-4 text-yellow-400 opacity-50" preserveAspectRatio="none" viewBox="0 0 100 20">
            <path d="M0,10 Q50,20 100,10" fill="none" stroke="currentColor" strokeWidth="4" />
          </svg>
        </div>

      </div>
    </section>
  );
}
