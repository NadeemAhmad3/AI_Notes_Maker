"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 0. Draw the Highlighter line on "understanding"
      tl.to(".hiw-highlight-underline", {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
      }, 0.2);

      // 1. "The Desk Toss" - Cards slide in and rotate into their tilted positions
      gsap.from(".premium-tilted-card", {
        scrollTrigger: {
          trigger: ".cards-container",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        rotation: (i) => (i === 0 ? -20 : i === 1 ? 20 : -15),
        stagger: 0.2,
        duration: 1.2,
        ease: "power4.out",
      });

      // 2. Internal Content Fade
      gsap.from(".card-content-inner", {
        scrollTrigger: {
          trigger: ".cards-container",
          start: "top 70%",
        },
        opacity: 0,
        y: 20,
        stagger: 0.3,
        duration: 1,
        delay: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* --- ORIGINAL HEADING STYLE --- */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-slate-900 leading-tight">
          From sound to{" "}
          <span className="relative inline-block">
            understanding
            <span className="hiw-highlight-underline absolute bottom-2 left-0 w-full h-[0.35em] bg-yellow-300/60 -z-10 origin-left scale-x-0 rounded-sm" />
          </span>
        </h2>
        <p className="mt-6 text-slate-500 text-lg font-medium">
          What happens in between is where the intelligence lives.
        </p>
      </div>

      {/* --- PREMIUM TILTED CARDS CONTAINER --- */}
      <div className="cards-container relative max-w-6xl mx-auto grid md:grid-cols-3 gap-12 lg:gap-16 perspective-1000">
        
        {/* CARD 01 */}
        <div className="premium-tilted-card group relative cursor-pointer" 
             style={{ transform: 'rotate(-3deg)' }}>
          {/* Paper Shadow Stack (Creates depth) */}
          <div className="absolute inset-0 bg-slate-200 translate-x-1 translate-y-1 rounded-sm -z-10" />
          
          <div className="relative bg-white border border-stone-200 shadow-paper p-8 h-full transition-all duration-500 group-hover:rotate-0 group-hover:-translate-y-4 group-hover:shadow-2xl">
            {/* Binder Clip Detail */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-8 bg-slate-800 rounded-t-md flex items-center justify-center shadow-md">
               <div className="w-4 h-4 border-2 border-slate-400 rounded-full" />
            </div>

            <div className="card-content-inner pt-4">
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Step 01
              </span>
              <h3 className="mt-4 font-serif-display text-3xl text-slate-900">
                The lecture is captured
              </h3>
              <div className="my-6 h-1px w-full bg-slate-100 relative">
                 <div className="absolute top-0 left-0 h-full bg-slate-900 w-0 group-hover:w-full transition-all duration-1000" />
              </div>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">
                Your teacher speaks naturally. We preserve tone, pauses,
                and emphasis — not just raw words.
              </p>

              {/* Interactive Audio Visualizer */}
              <div className="mt-8 flex items-end gap-1 h-8">
                {[0.4, 0.7, 0.3, 0.9, 0.5, 0.8, 0.4].map((h, i) => (
                  <div key={i} className="flex-1 bg-slate-200 group-hover:bg-slate-900 transition-colors" 
                       style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CARD 02 */}
        <div className="premium-tilted-card group relative cursor-pointer" 
             style={{ transform: 'rotate(2deg) translateY(10px)' }}>
          <div className="absolute inset-0 bg-stone-200 translate-x-1 translate-y-1 rounded-sm -z-10" />
          
          <div className="relative bg-[#FFFFF5] border border-stone-200 shadow-paper p-8 h-full transition-all duration-500 group-hover:rotate-0 group-hover:-translate-y-4 group-hover:shadow-2xl">
            {/* Ink Stain Accent */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />

            <div className="card-content-inner pt-4">
              <span className="text-[11px] font-bold tracking-widest text-emerald-600 uppercase">
                Step 02
              </span>
              <h3 className="mt-4 font-serif-display text-3xl text-slate-900">
                The AI listens & thinks
              </h3>
              <div className="my-6 h-px w-full bg-emerald-100 relative">
                 <div className="absolute top-0 left-0 h-full bg-emerald-500 w-0 group-hover:w-full transition-all duration-1000" />
              </div>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">
                The lecture is transcribed, segmented, and understood.
                Concepts are separated from noise.
              </p>

              {/* Intelligence Nodes */}
              <div className="mt-8 flex gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse delay-75" />
                <div className="w-2 h-2 rounded-full bg-emerald-200 animate-pulse delay-150" />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 03 */}
        <div className="premium-tilted-card group relative cursor-pointer" 
             style={{ transform: 'rotate(-2deg)' }}>
          <div className="absolute inset-0 bg-slate-200 translate-x-1 translate-y-1 rounded-sm -z-10" />
          
          <div className="relative bg-white border border-stone-200 shadow-paper p-8 h-full transition-all duration-500 group-hover:rotate-0 group-hover:-translate-y-4 group-hover:shadow-2xl">
            {/* Corner Fold Accent */}
            <div className="absolute top-0 right-0 w-8 h-8 bg-stone-50" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />

            <div className="card-content-inner pt-4">
              <span className="text-[11px] font-bold tracking-widest text-yellow-600 uppercase">
                Step 03
              </span>
              <h3 className="mt-4 font-serif-display text-3xl text-slate-900">
                Notes organize themselves
              </h3>
              <div className="my-6 h-px w-full bg-yellow-100 relative">
                 <div className="absolute top-0 left-0 h-full bg-yellow-400 w-0 group-hover:w-full transition-all duration-1000" />
              </div>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">
                What you get is not a summary — but structured,
                revision-ready knowledge.
              </p>

              {/* Tag Badges */}
              <div className="mt-8 flex gap-2">
                <div className="px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[9px] font-bold text-slate-400 group-hover:border-yellow-200 group-hover:text-yellow-700 transition-colors">SUMMARY.PDF</div>
                <div className="px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[9px] font-bold text-slate-400 group-hover:border-yellow-200 group-hover:text-yellow-700 transition-colors">QUIZ.DAT</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
