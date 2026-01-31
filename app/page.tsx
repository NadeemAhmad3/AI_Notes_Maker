import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/hero";
import SectionDivider from "@/components/SectionDivider";
import HowItWorks from "@/components/how-it-works/HowItWorks";
import LiveNotesPreview from "@/components/livenotespreview/LiveNotesPreview";
import KnowledgeExports from "@/components/KnowledgeExports";
import Pricing from "@/components/Pricing";
import FinalCommitment from "@/components/FinalCommitment";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full bg-[#F0F4F8] text-slate-900 overflow-x-hidden">
      <Navbar />
      
      {/* Pushed down by 80px to account for the Fixed Header */}
      <div className="pt-20">
        <Hero />
      </div>
      <div className="-my-10 relative z-20">
        <SectionDivider />
      </div>
      <HowItWorks />
      <LiveNotesPreview />
      <KnowledgeExports />
      <Pricing />
      <FinalCommitment />
    </main>
  );
}
