import AchievementsSection from "@/components/About/AchievementsSection";
import CommunityRoleSection from "@/components/About/CommunityRoleSection";
import CoreServicesSection from "@/components/About/CoreServicesSection";
import HeroSection from "@/components/About/HeroSection";
import VisionMissionSection from "@/components/About/VisionMissionSection";

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
