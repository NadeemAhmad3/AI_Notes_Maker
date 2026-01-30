"use client";

export default function NavItem({ label, active = false }: { label: string, active?: boolean }) {
  return (
    <div className="group relative cursor-pointer px-5 py-6"> {/* Tall click area for navbar */}
      <div className="nav-text-container">
        {/* We render the text twice vertically. Hover slides them up. */}
        <span className={`nav-text-roll text-sm font-medium ${active ? 'text-slate-900' : 'text-slate-500 group-hover:text-cyan-600'}`}>
          {label}
        </span>
        <span className="nav-text-roll text-sm font-medium text-teal-600">
          {label}
        </span>
      </div>
      
      {/* Active Indicator (Dot) */}
      {active && (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-500 rounded-full" />
      )}
    </div>
  );
}