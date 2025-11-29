"use client";

import Hero from "@/components/Home/Hero";
import ImpactSection from "@/components/Home/ImpactSection";
import NavBar from "@/components/NavBar/NavBar";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("common");

  return (
    <div className="overflow-hidden md:mx-10">
      <NavBar />
      <div className="text-center py-10 text-4xl font-bold">
        {t("welcome")}
      </div>
      <Hero />
      <ImpactSection />
    </div>
  );
};

export default Page;
