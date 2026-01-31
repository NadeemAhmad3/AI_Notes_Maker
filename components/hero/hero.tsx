"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Text reveals with a "Ink Bleed" effect
      tl.from(".hero-char", {
        y: 100,
        opacity: 0,
        rotate: 5,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      });

      // 2. Floating Widgets pop in
      tl.from(".float-widget", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      }, "-=0.5");

      // 3. Draw the Highlighter line
      gsap.to(".highlight-underline", {
        scaleX: 1,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.inOut",
      });

      // 4. Continuous Floating Motion (Zero Gravity)
      gsap.to(".floating-element", {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-5, 5)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { amount: 1, from: "random" }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // --- Mouse Magnet Effect ---
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const xFactor = (clientX / window.innerWidth - 0.5) * 40;
    const yFactor = (clientY / window.innerHeight - 0.5) * 40;

    // Move widgets slightly opposite to mouse for depth
    gsap.to(".float-widget", {
      x: xFactor,
      y: yFactor,
      duration: 1,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] w-full flex flex-col justify-center items-center overflow-hidden pt-20 pb-20"
    >
      {/* Background Grid (Engineering Paper) */}
      <div className="absolute inset-0 z-[-1] opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      {/* --- FLOATING UI ISLANDS (The "Unique" Part) --- */}
      {/* These elements float around the text like a disorganized desk organizing itself */}
      
      {/* 1. The Audio Player Widget (Top Left) */}
      <div className="floating-element float-widget absolute top-[15%] left-[5%] lg:left-[15%] z-10 hidden lg:block">
        <div className="bg-white p-4 rounded-2xl shadow-paper border border-slate-100 flex items-center gap-4 w-64 transform -rotate-6 transition-transform hover:rotate-0 hover:scale-105 duration-300">
           <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
             <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
           </div>
           <div className="flex-1 space-y-2">
             <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full w-2/3 bg-black rounded-full" />
             </div>
             <div className="flex justify-between text-[10px] text-slate-400 font-mono">
               <span>04:20</span>
               <span>12:00</span>
             </div>
           </div>
        </div>
      </div>

      {/* 2. The "A+" Grade Stamp (Top Right) */}
      <div className="floating-element float-widget absolute top-[20%] right-[10%] z-0 hidden lg:block">
         <div className="w-24 h-24 rounded-full border-4 border-emerald-500/20 flex items-center justify-center transform rotate-12">
            <span className="text-4xl font-serif-display font-bold text-emerald-600">A+</span>
         </div>
      </div>

      {/* 3. The Smart Summary Note (Bottom Right) */}
      <div className="floating-element float-widget absolute bottom-[20%] right-[-10%] lg:right-[5%] z-20 hidden lg:block">
        <div className="bg-[#FFFFF0] p-6 rounded-sm shadow-paper border border-stone-200 w-64 transform rotate-3 transition-transform hover:rotate-0 duration-300 relative">
           {/* Pin */}
           <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-400 shadow-sm" />
           
           <h4 className="font-bold text-stone-800 mb-2 font-serif-display">Key Concepts</h4>
           <ul className="space-y-2 text-xs text-stone-600 font-medium list-disc pl-4 marker:text-stone-400">
             <li>Neural Networks</li>
             <li>Backpropagation</li>
             <li>Gradient Descent</li>
           </ul>
           <div className="mt-4 flex gap-2">
             <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] rounded-md font-bold">#AI</span>
             <span className="px-2 py-1 bg-orange-100 text-orange-700 text-[10px] rounded-md font-bold">#CS101</span>
           </div>
        </div>
      </div>


      {/* --- MAIN TYPOGRAPHY --- */}
      <div className="relative z-10 text-center max-w-4xl px-4 sm:px-6">
        
        <p className="hero-char text-xs sm:text-sm font-bold tracking-[0.2em] text-slate-400 uppercase mb-4 sm:mb-6">
          The New Standard for Students
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif-display text-slate-900 leading-[0.9] tracking-tight mb-6 sm:mb-8">
          <span className="block hero-char">Dont just</span>
          <span className="hero-char relative inline-block">
            take notes.
            {/* The Highlighter Underline */}
            <span className="highlight-underline absolute bottom-2 left-0 w-full h-[0.3em] bg-yellow-300/60 -z-10 origin-left scale-x-0" style={{ borderRadius: '4px' }}></span>
          </span>
        </h1>

        <p className="hero-char text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed px-2">
          Record your lectures and let our AI turn messy audio into 
          <span className="text-slate-900 font-bold decoration-wavy underline decoration-slate-300 underline-offset-4 mx-1">structured knowledge</span> 
          instantly.
        </p>

        {/* --- CTA AREA --- */}
        <div className="hero-char flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 w-full px-2">
          
          {/* Primary Button - Minimalist Black */}
          <button 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 text-white rounded-full font-medium overflow-hidden transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Recording
              <svg className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            {/* Subtle fill effect */}
            <div className="absolute inset-0 bg-slate-800 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>

          {/* Secondary Button - Outline */}
          <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-slate-200 text-slate-600 font-medium hover:bg-white hover:border-slate-400 transition-colors bg-white/50 w-full sm:w-auto">
            See an Example
          </button>
        </div>

      </div>
    </section>
  );
}
