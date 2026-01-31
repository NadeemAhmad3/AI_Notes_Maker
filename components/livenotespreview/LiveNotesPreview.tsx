"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export default function LiveNotesPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingTriggerRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. HIGHLIGHTER ANIMATION
      gsap.fromTo(".lnp-highlight-underline", 
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

      // 2. AUDIO BARS ANIMATION (Looping)
      // We animate them using GSAP instead of CSS to avoid hydration issues
      gsap.to(".audio-bar", {
        scaleY: "random(0.5, 1.5)",
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.1,
          from: "center",
          repeat: -1,
          yoyo: true
        }
      });

      // 3. DATA FLOW ANIMATION (The Interactive Connector)
      // A dot travels along the curved SVG path
      gsap.to(".data-packet", {
        motionPath: {
          path: "#connector-path",
          align: "#connector-path",
          alignOrigin: [0.5, 0.5],
        },
        duration: 2,
        repeat: -1,
        ease: "power1.inOut",
      });

      // 4. CARDS ENTRANCE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".notes-preview-container",
          start: "top 70%",
        }
      });

      tl.from(".card-input", { x: -50, opacity: 0, duration: 1, ease: "power4.out" })
        .from(".card-output", { x: 50, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.8");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Fixed data for audio bars to prevent "Impure Function" error
  // These numbers are static, so they render exactly the same on server and client
  const barHeights = [40, 70, 50, 90, 60, 30, 80, 50, 70, 40, 60, 90, 50, 30, 60];

  return (
    <section
      ref={sectionRef}
      className="relative pt-32 pb-40 overflow-visible w-full bg-[#FAFAF9]" // Matching Hero Background
    >
      {/* --- BACKGROUND: ENGINEERING GRID (Identical to Hero) --- */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      {/* --- THE DIVIDER: Spiral Binding (Seamless Integration) --- */}
      <div className="absolute top-0 left-0 w-full flex justify-center -mt-8 z-20 overflow-hidden">
        <div className="flex gap-4 sm:gap-8 md:gap-12 min-w-[120%] justify-center opacity-40">
          {[...Array(20)].map((_, i) => (
             <div key={i} className="flex flex-col items-center gap-1 transform rotate-6">
                <div className="w-2 h-2 bg-stone-800 rounded-full" />
                {/* The Spiral Ring */}
                <svg width="20" height="60" className="stroke-stone-400 fill-none" strokeWidth="2">
                   <path d="M10,0 C20,10 20,20 10,30 C0,40 0,50 10,60" />
                </svg>
                <div className="w-2 h-2 bg-stone-300 rounded-full border border-stone-400" />
             </div>
          ))}
        </div>
      </div>

      {/* --- HEADING AREA --- */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-20 px-4">
        <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-slate-900 leading-tight">
          <span ref={headingTriggerRef} className="relative inline-block px-2">
            <span className="relative z-10">Watch notes build themselves</span>
            {/* Highlighter */}
            <span className="lnp-highlight-underline absolute bottom-2 left-0 w-full h-[0.35em] bg-yellow-300/60 -z-10 origin-left scale-x-0 rounded-sm" />
          </span>
        </h2>
        <p className="mt-6 text-slate-500 text-lg font-medium max-w-2xl mx-auto">
          We turn the chaos of a live lecture into the clarity of a textbook.
        </p>
      </div>

      {/* --- PREVIEW CONTAINER --- */}
      <div className="notes-preview-container relative max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* --- THE INTERACTIVE CONNECTION (Curve & Data Packet) --- */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 z-10 hidden md:block pointer-events-none">
           <svg className="w-full h-full overflow-visible">
              {/* The Path definition */}
              <path 
                id="connector-path" 
                d="M 0,60 C 80,60 80,60 128,30 C 176,0 176,0 256,0" 
                fill="none" 
                stroke="#E2E8F0" 
                strokeWidth="2" 
                strokeDasharray="8 8"
              />
              {/* The Floating Packet */}
              <g className="data-packet">
                <circle r="6" fill="#10B981" />
                <circle r="10" fill="#10B981" opacity="0.3" />
              </g>
           </svg>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-24 items-center">
          
          {/* --- LEFT CARD: INPUT (Light Theme / Digital) --- */}
          <div className="card-input group relative">
             {/* Subtle shadow glow behind */}
            <div className="absolute inset-0 bg-blue-100 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            
            <div className="relative bg-white rounded-2xl border border-slate-200 shadow-paper p-8 overflow-hidden h-full min-h-105 flex flex-col">
               
               {/* Header: Recording UI */}
               <div className="flex justify-between items-center mb-10">
                 <div className="flex items-center gap-3 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Rec</span>
                 </div>
                 <span className="font-mono text-slate-400 text-xs">00:14:22</span>
               </div>

               {/* Audio Visualizer (Fixed Logic) */}
               <div className="flex items-center justify-center gap-1.5 h-16 mb-10">
                 {barHeights.map((height, i) => (
                   <div 
                        key={i} 
                        className="audio-bar w-1.5 bg-slate-800 rounded-full" 
                        style={{ height: `${height}%` }} // Initial height
                   />
                 ))}
               </div>

               {/* Transcript Stream */}
               <div className="space-y-4 font-mono text-sm text-slate-600 flex-1">
                 <p className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                   &quot; Okay, so today... today we are going to talk about backpropagation.&Idquo;
                 </p>
                 <p className="bg-slate-50 p-3 rounded-lg border border-slate-100 opacity-60">
                   &quot; It &quot;s basically how the network learns. You look at the error...&Idquo;
                 </p>
                 <p className="bg-slate-50 p-3 rounded-lg border border-slate-100 opacity-30">
                   &quot; And you push it backwards...&Idquo;
                 </p>
               </div>
            </div>
          </div>


          {/* --- RIGHT CARD: OUTPUT (Paper / Structured) --- */}
          <div className="card-output group relative">
             {/* Paper Stack Effect */}
             <div className="absolute inset-0 bg-stone-200 rounded-sm transform rotate-3 translate-x-2 translate-y-2 shadow-sm border border-stone-200" />
             
             {/* Main Paper */}
             <div className="relative bg-white rounded-sm p-8 shadow-paper border border-stone-200 h-full min-h-105 flex flex-col transform hover:-rotate-1 transition-transform duration-500">
                
                {/* Yellow Sticky Note Accent */}
                <div className="absolute -top-2 right-6 w-8 h-12 bg-yellow-200 shadow-sm transform -rotate-3" />

                <span className="inline-block px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wide rounded mb-6 w-fit">
                  Auto-Summarized
                </span>

                <h3 className="font-serif-display text-3xl text-slate-900 mb-2">Neural Networks</h3>
                {/* Decorative underline */}
                <div className="h-0.5 w-12 bg-emerald-400 mb-8" />

                <div className="space-y-6 flex-1">
                   <div className="group/item">
                      <h4 className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Backpropagation
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed pl-3.5 border-l border-slate-200 group-hover/item:border-emerald-300 transition-colors">
                        Algorithm to update weights by propagating error <span className="bg-yellow-100 px-1 font-medium text-slate-900">backward</span> from output to input.
                      </p>
                   </div>

                   <div className="group/item">
                      <h4 className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Gradient Descent
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed pl-3.5 border-l border-slate-200 group-hover/item:border-emerald-300 transition-colors">
                        Method to minimize loss by iteratively adjusting parameters.
                      </p>
                   </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                   <div className="flex gap-1">
                     <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                     <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                   </div>
                   <span className="font-serif-display text-slate-300 text-xl italic">A+</span>
                </div>

             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
