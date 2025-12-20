import HeroSection from "./HeroSection";
import VisionMissionSection from "./VisionMissionSection";
import CoreServicesSection from "./CoreServicesSection";
import CommunityRoleSection from "./CommunityRoleSection";
import AchievementsSection from "./AchievementsSection";
 
const AboutUs = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <VisionMissionSection />
      <CoreServicesSection />
      <CommunityRoleSection />
      <AchievementsSection /> 
    </div>
  );
};

export default AboutUs;
