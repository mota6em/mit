import AchievementsSection from "@/components/About/AchievementsSection";
import CommunityRoleSection from "@/components/About/CommunityRoleSection";
import CoreServicesSection from "@/components/About/CoreServicesSection";
import HeroSection from "@/components/About/HeroSection";
import ValuesSection from "@/components/About/ValuesSection";
import VisionMissionSection from "@/components/About/VisionMissionSection";
import JoinCtaBand from "@/components/reusable/JoinCtaBand";

export default function AboutPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection />
      <VisionMissionSection />
      <ValuesSection />
      <CoreServicesSection />
      <CommunityRoleSection />
      <AchievementsSection />
      <JoinCtaBand />
    </div>
  );
}
