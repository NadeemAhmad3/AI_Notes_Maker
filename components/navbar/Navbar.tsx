"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Logo from "./Logo";
import Link from "next/link";

const NAV_ITEMS = ["Studio", "Solutions", "Pricing", "Research"];

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Spotlight State
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverRect, setHoverRect] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0
  });
  
  const navListRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth slide down from -100% (hidden) to 0% (visible)
      gsap.from(headerRef.current, {
        yPercent: -100, 
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  // Spotlight Logic
  const handleMouseEnter = (index: number, e: React.MouseEvent<HTMLLIElement>) => {
    if (!navListRef.current) return;
    const parentRect = navListRef.current.getBoundingClientRect();
    const itemRect = e.currentTarget.getBoundingClientRect();
    
    setHoverRect({
      left: itemRect.left - parentRect.left,
      width: itemRect.width,
      opacity: 1
    });
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
    setHoverRect((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    // FIXED: top-0, left-0, w-full ensures it touches edges
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 h-20
                 bg-white/80 backdrop-blur-xl border-b border-slate-200/60
                 flex items-center justify-between px-4 md:px-10"
    >
      {/* 1. Logo (Interactive Gradient) */}
      <div className="shrink-0">
        <Logo />
      </div>

      {/* 2. Navigation (Centered) */}
      <nav 
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-full"
        onMouseLeave={handleMouseLeave}
      >
        <ul ref={navListRef} className="relative flex items-center h-full gap-8">
          
          {/* Spotlight Background (Moves behind text) */}
          <div 
            className="absolute h-9 top-1/2 -translate-y-1/2 bg-slate-100/80 rounded-lg pointer-events-none transition-all duration-300 ease-out z-0"
            style={{ 
              left: hoverRect.left, 
              width: hoverRect.width, 
              opacity: hoverRect.opacity 
            }}
          />

          {NAV_ITEMS.map((item, i) => (
            <li 
              key={item}
              onMouseEnter={(e) => handleMouseEnter(i, e)}
              className="relative z-10 py-4 flex items-center"
            >
              <Link 
                href="#" 
                className={`text-sm font-semibold transition-colors duration-200 px-4 py-2 ${
                  activeIndex === i ? "text-slate-900" : "text-slate-500"
                }`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden z-50 flex flex-col gap-1.5"
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-slate-900 transition-all duration-300 ${
          mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
        }`}></span>
        <span className={`block w-6 h-0.5 bg-slate-900 transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-0' : ''
        }`}></span>
        <span className={`block w-6 h-0.5 bg-slate-900 transition-all duration-300 ${
          mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
        }`}></span>
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-lg animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col p-4 gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item}
                href="#"
                className="px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <button className="px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-left">
              Log in
            </button>
          </nav>
        </div>
      )}

      {/* 3. Actions */}
      <div className="hidden md:flex items-center gap-6">
        <button className="hidden lg:block text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          Log in
        </button>

        <button className="relative group overflow-hidden bg-slate-900 text-white text-sm font-semibold px-6 py-3 rounded-lg shadow-lg shadow-slate-200/50 hover:shadow-slate-300/50 transition-all hover:-translate-y-0.5">
           {/* Gradient that matches the Logo hover */}
           <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
           
           <span className="relative z-10 flex items-center gap-2">
             Start Free Trial
             <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 12 12" fill="none">
               <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
           </span>
        </button>
      </div>
    </header>
  );
}
