"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for footer columns
      gsap.from(".footer-column", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="relative bg-[#FAFAF9] pt-20 pb-10 px-6 border-t border-stone-200">
      {/* --- PERFORATED EDGE DETAIL --- */}
      <div className="absolute top-0 left-0 w-full h-4 overflow-hidden -translate-y-full opacity-10">
        <div className="flex w-full">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full bg-black shrink-0 -mt-2 mx-1" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          
          {/* 1. BRANDING / LOGO COLUMN */}
          <div className="footer-column md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-serif-display text-xl">N</div>
              <span className="font-serif-display text-2xl tracking-tight text-slate-900">Noted.</span>
            </div>
            <p className="text-slate-500 font-medium max-w-sm leading-relaxed mb-8">
              The intelligent layer for your academic life. Built for students who want to spend more time thinking and less time typing.
            </p>
            {/* Social "Stickers" */}
            <div className="flex gap-4">
              {['Twitter', 'Discord', 'Insta'].map((social) => (
                <a key={social} href="#" className="px-3 py-1 border border-stone-300 rounded text-[10px] font-mono uppercase tracking-widest text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* 2. LINKS COLUMNS */}
          <div className="footer-column md:col-span-2">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Product</h4>
            <ul className="space-y-4 font-medium text-slate-600">
              <li><a href="#" className="hover:text-slate-900 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div className="footer-column md:col-span-2">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Company</h4>
            <ul className="space-y-4 font-medium text-slate-600">
              <li><a href="#" className="hover:text-slate-900 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Our Vision</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Terms</a></li>
            </ul>
          </div>

          {/* 3. NEWSLETTER / "OFFICE" DETAIL */}
          <div className="footer-column md:col-span-3">
             <div className="bg-white p-6 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden">
                <h4 className="font-serif-display text-lg text-slate-900 mb-2">Internal Memo</h4>
                <p className="text-xs text-slate-500 mb-4 font-medium">Get tips on how to ace your finals using AI.</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="edu@email.com" className="bg-slate-50 border border-stone-200 rounded-lg px-3 py-2 text-xs w-full focus:outline-none focus:ring-1 focus:ring-slate-400" />
                  <button className="bg-slate-900 text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
                {/* Decoration: Tiny tape bit */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-3 bg-yellow-300/60 opacity-50" />
             </div>
          </div>

        </div>

        {/* --- BOTTOM METADATA BAR --- */}
        <div className="pt-10 border-t border-dashed border-stone-200 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-8 font-mono text-[10px] text-stone-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Systems: Nominal
            </div>
            <div>© 2024 Noted AI Corp</div>
            <div className="hidden sm:block">Lat: 34.0522° N, Long: 118.2437° W</div>
          </div>

          {/* Return to Top (Styled like a Paperclip) */}
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
          >
            <span>Back to top</span>
            <div className="w-8 h-12 border-2 border-stone-300 rounded-full relative flex items-start justify-center pt-2 group-hover:border-slate-900 transition-colors">
               <div className="w-1 h-3 bg-stone-300 rounded-full group-hover:bg-slate-900 group-hover:animate-bounce" />
               <div className="absolute inset-x-0 top-1/2 border-t border-stone-300 group-hover:border-slate-900" />
            </div>
          </button>
          
        </div>
      </div>

      {/* --- THE VERY BOTTOM RIBBON --- */}
      <div className="mt-10 w-full h-2 bg-yellow-400 opacity-20" />
    </footer>
  );
}
