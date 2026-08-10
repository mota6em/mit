import JoinMITHeroSection from "@/components/JoinMIT/JoinMITHeroSection";
import JoinMITNewsletterSection from "@/components/JoinMIT/JoinMITNewsletterSection";
import JoinMITSocialSection from "@/components/JoinMIT/JoinMITSocialSection";
import JoinMITVolunteerSection from "@/components/JoinMIT/JoinMITVolunteerSection";

export default function JoinMitPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <JoinMITHeroSection />
      <JoinMITVolunteerSection />
      <JoinMITSocialSection />
      <JoinMITNewsletterSection />
    </div>
  );
}
