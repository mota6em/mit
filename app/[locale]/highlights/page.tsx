import HighlightsSection from "@/components/Highlights/HighlightsSection";
import Hero from "@/components/Highlights/Hero";

export default function HighlightsPage() {
  return (
    <div className="flex flex-col gap-8 mb-16">
      <Hero />
      <HighlightsSection />
    </div>
  );
}
