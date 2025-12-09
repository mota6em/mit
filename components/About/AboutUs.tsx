import HeroSection from "./HeroSection";
import VisionMissionSection from "./VisionMissionSection";
import CoreServicesSection from "./CoreServicesSection";
import CommunityRoleSection from "./CommunityRoleSection";
import AchievementsSection from "./AchievementsSection";
import FutureGoalsSection from "./FutureGoalsSection";
 
const AboutUs = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <VisionMissionSection />
      <CoreServicesSection />
      <CommunityRoleSection />
      <AchievementsSection />
      <FutureGoalsSection /> 
    </div>
  );
};

export default AboutUs;
