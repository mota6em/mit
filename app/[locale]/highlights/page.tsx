import HighlightsSection from "@/components/Highlights/HighlightsSection";
import Hero from "@/components/Highlights/Hero";
import ArchiveNote from "@/components/Highlights/ArchiveNote";

export default function HighlightsPage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="border-t border-ink-200 bg-ink-50 py-16 md:py-20">
        <HighlightsSection />
        <div className="mt-16 md:mt-20">
          <ArchiveNote />
        </div>
      </div>
    </div>
  );
}
