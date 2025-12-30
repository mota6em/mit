import JoinMITHeroSection from "@/components/JoinMIT/JoinMITHeroSection";
import JoinMITNewsletterSection from "@/components/JoinMIT/JoinMITNewsletterSection";
import JoinMITSocialSection from "@/components/JoinMIT/JoinMITSocialSection";
import JoinMITVolunteerSection from "@/components/JoinMIT/JoinMITVolunteerSection";

export const dynamic = "force-dynamic";

export default function JoinMitPage() {
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
