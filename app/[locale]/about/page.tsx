import AchievementsSection from "@/components/About/AchievementsSection";
import CommunityRoleSection from "@/components/About/CommunityRoleSection";
import CoreServicesSection from "@/components/About/CoreServicesSection";
import HeroSection from "@/components/About/HeroSection";
import VisionMissionSection from "@/components/About/VisionMissionSection";

/**
 * Section tones alternate plain → tinted → plain and close on dark, so the page
 * reads as one continuous document with a deliberate final beat rather than
 * five interchangeable card grids.
 */
export default function AboutPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection />
      <VisionMissionSection />
      <CoreServicesSection />
      <CommunityRoleSection />
      <AchievementsSection />
    </div>
  );
}
