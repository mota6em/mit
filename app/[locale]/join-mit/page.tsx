import JoinMITHeroSection from "@/components/JoinMIT/JoinMITHeroSection";
import JoinMITNewsletterSection from "@/components/JoinMIT/JoinMITNewsletterSection";
import JoinMITSocialSection from "@/components/JoinMIT/JoinMITSocialSection";
import JoinMITVolunteerSection from "@/components/JoinMIT/JoinMITVolunteerSection";

export default function JoinMitPage() {
  return (
    <div className="relative w-full min-h-screen  overflow-hidden">
      {/* Background Decor */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-brand-sky/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute left-0 top-[40%] h-[400px] w-[400px] -translate-x-1/3 rounded-full bg-brand-gold/[0.08] blur-3xl" />

      <JoinMITHeroSection />
      <JoinMITVolunteerSection />
      <JoinMITSocialSection />
      <JoinMITNewsletterSection />
    </div>
  );
}
