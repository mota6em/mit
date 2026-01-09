import HighlightsSection from "@/components/Highlights/HighlightsSection";
import Hero from "@/components/Highlights/Hero";
import ArchiveNote from "@/components/Highlights/ArchiveNote";

export default function HighlightsPage() {
  return (
    <div className="flex flex-col gap-8 mb-16">
      <Hero />
      <HighlightsSection />
      <ArchiveNote />
    </div>
  );
}
