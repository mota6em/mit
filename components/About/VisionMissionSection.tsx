"use client";
import { Target, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionHeader from "../reusable/SectionHeader";

const VisionMissionSection = () => {
  const t = useTranslations("aboutMIT.visionMission");

  return (
    <section className="py-10 pt-15 px-6 md:px-12 lg:px-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={t("title")}
          topText={t("coreFoundations")}
          className="mb-5 md:mb-14"
        />
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* --- VISION CARD (The Pulse) --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-slate-50 rounded-[2.5rem] p-10 md:p-14 overflow-hidden border border-slate-100 hover:border-blue-200 transition-colors duration-500"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6 text-ink-800">
                <Target className="w-8 h-8" />
                <h3 className="text-3xl font-medium">{t("vision.title")}</h3>
              </div>
              <p className="text-lg text-ink-800 leading-relaxed mb-8">
                {t("vision.description")}
              </p>
              <div className="flex items-center gap-2 text-ink-600 font-medium ">
                <span className="w-8 h-[2px] bg-ink-600"></span>
                <span>{t("vision.tagline")}</span>
              </div>
            </div>
          </motion.div>

          {/* --- MISSION CARD (The Trajectory) --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative bg-slate-50 rounded-[2.5rem] p-10 md:p-14 overflow-hidden border border-slate-100 hover:border-yellow-200 transition-colors duration-500"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6  text-ink-800">
                <Rocket className="w-8 h-8" />
                <h3 className="text-3xl font-medium">{t("mission.title")}</h3>
              </div>

              <p className="text-lg text-ink-800 leading-relaxed mb-8">
                {t("mission.description")}
              </p>

              <div className="flex items-center gap-2 text-ink-600 font-medium">
                <span className="w-8 h-[2px] bg-text bg-ink-600"></span>
                <span>{t("mission.tagline")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
