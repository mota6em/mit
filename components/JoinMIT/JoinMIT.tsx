import JoinMITHeroSection from "./JoinMITHeroSection";
import JoinMITVolunteerSection from "./JoinMITVolunteerSection";
import JoinMITSocialSection from "./JoinMITSocialSection";
import JoinMITNewsletterSection from "./JoinMITNewsletterSection";

export default function JoinMIT() {
  return (
    <div className="relative w-full min-h-screen  overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute top-[40%] left-0 w-[400px] h-[400px] bg-yellow-100/40 rounded-full blur-3xl -translate-x-1/3" />

      <JoinMITHeroSection />
      <JoinMITVolunteerSection />
      <JoinMITSocialSection />
      <JoinMITNewsletterSection />
    </div>
  );
}
