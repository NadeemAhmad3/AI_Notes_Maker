"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionDivider() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. The Marquee Animation (Infinite Scroll)
      // Moves the text strip left infinitely
      gsap.to(".marquee-track", {
        xPercent: -50, // Move halfway (since we duplicated content)
        ease: "none",
        duration: 10,
        repeat: -1,
      });

      // 2. Scroll Velocity Effect
      // When user scrolls fast, the tape skews/stretches slightly
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const skew = self.getVelocity() / 300;
          gsap.to(".tape-container", {
            skewX: skew,
            overwrite: true,
            duration: 0.1,
          });
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full py-24 overflow-hidden flex justify-center items-center z-20 pointer-events-none"
    >
      {/* 
        This acts as the "glue" between Hero and HowItWorks.
        We use negative margins in the parent implementation or just let it sit between them.
      */}

      {/* --- LAYER 1: The Black "Base" Tape (Static/Visual Anchor) --- */}
      <div 
        className="tape-container absolute w-[120%] h-16 bg-slate-900 shadow-2xl origin-center"
        style={{ 
          transform: 'rotate(-2deg)',
          // Custom clip-path for "ripped tape" edges
          clipPath: 'polygon(0% 10px, 5% 0px, 10% 12px, 15% 2px, 20% 10px, 25% 0px, 30% 12px, 35% 2px, 40% 10px, 45% 0px, 50% 12px, 55% 2px, 60% 10px, 65% 0px, 70% 12px, 75% 2px, 80% 10px, 85% 0px, 90% 12px, 95% 2px, 100% 10px, 100% 100%, 0% 100%)'
        }}
      />

      {/* --- LAYER 2: The Yellow "Highlighter" Tape (Animated Marquee) --- */}
      <div 
        className="tape-container absolute w-[120%] h-14 bg-yellow-400 shadow-lg border-y-2 border-yellow-300 origin-center flex items-center overflow-hidden"
        style={{ 
          transform: 'rotate(2deg)', 
           // Inverted ripped edge
          clipPath: 'polygon(0% 0%, 100% 0%, 100% calc(100% - 10px), 95% 100%, 90% calc(100% - 10px), 85% 100%, 80% calc(100% - 10px), 75% 100%, 70% calc(100% - 10px), 65% 100%, 60% calc(100% - 10px), 55% 100%, 50% calc(100% - 10px), 45% 100%, 40% calc(100% - 10px), 35% 100%, 30% calc(100% - 10px), 25% 100%, 20% calc(100% - 10px), 15% 100%, 10% calc(100% - 10px), 5% 100%, 0% calc(100% - 10px))'
        }}
      >
        {/* The Rolling Text Track */}
        <div className="marquee-track flex whitespace-nowrap min-w-full">
          {/* We duplicate the content to create the seamless loop */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-4 px-2">
              <span className="text-xl font-bold font-serif-display uppercase tracking-wider text-slate-900 flex items-center gap-4">
                Audio to Intelligence <span className="text-sm">●</span> 
                Structure your Chaos <span className="text-sm">●</span> 
                Instant Summaries <span className="text-sm">●</span> 
                Never Miss a Detail <span className="text-sm">●</span>
                Ace the Exam <span className="text-sm">●</span>
              </span>
              <span className="text-xl font-bold font-serif-display uppercase tracking-wider text-slate-900 flex items-center gap-4">
                Audio to Intelligence <span className="text-sm">●</span> 
                Structure your Chaos <span className="text-sm">●</span> 
                Instant Summaries <span className="text-sm">●</span> 
                Never Miss a Detail <span className="text-sm">●</span>
                Ace the Exam <span className="text-sm">●</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
