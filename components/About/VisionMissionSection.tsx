"use client";
import { Target, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const VisionMissionSection = () => {
  const t = useTranslations("aboutMIT.visionMission");

  // Title coloring logic
  const titleString = t("title");
  const words = titleString.split(" ");

  return (
    <section className="py-10 pt-15 px-6 md:px-12 lg:px-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-5 md:mb-14"
        >
          <span className="text-gray-900/90 font-medium tracking-widest text-sm mb-3 block">
            {t("coreFoundations")}
          </span>
          <h2 className="font-semibold mb-4 text-3xl md:text-4xl poppins.className text-gray-600">
            {t("title")}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* --- VISION CARD (The Pulse) --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-slate-50 rounded-[2.5rem] p-10 md:p-14 overflow-hidden border border-slate-100 hover:border-blue-200 transition-colors duration-500"
          >
            {/* Custom SVG Background: Rising Graph/Path */}
            <div className="absolute bottom-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <svg viewBox="0 0 400 400" className="w-full h-full absolute">
                <defs>
                  <linearGradient
                    id="gradYellow"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#F9BC15", stopOpacity: 0 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#F9BC15", stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>

                <line
                  x1="40"
                  y1="360"
                  x2="360"
                  y2="360"
                  stroke="#F9BC15"
                  strokeWidth="1"
                  opacity="0.3"
                />
                <line
                  x1="40"
                  y1="360"
                  x2="40"
                  y2="40"
                  stroke="#F9BC15"
                  strokeWidth="1"
                  opacity="0.3"
                />

                <motion.path
                  d="M 40 360 Q 150 350 200 200 T 360 40"
                  fill="none"
                  stroke="url(#gradYellow)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />

                <circle cx="200" cy="200" r="6" fill="#F9BC15" opacity="0.4" />
                <circle cx="360" cy="40" r="8" fill="#F9BC15" opacity="0.6" />
              </svg>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6 text-gray-700">
                <Target className="w-8 h-8" />
                <h3 className="text-3xl font-medium">{t("vision.title")}</h3>
              </div>

              <p className="text-lg text-gray-900 leading-relaxed mb-8">
                {t("vision.description")}
              </p>

              <div className="flex items-center gap-2 text-gray-900 font-medium ">
                <span className="w-8 h-[2px] bg-yellow-900"></span>
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
            {/* Custom SVG Background: Rising Graph/Path */}
            <div className="absolute bottom-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <svg viewBox="0 0 400 400" className="w-full h-full absolute">
                <defs>
                  <linearGradient
                    id="gradYellow"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#F9BC15", stopOpacity: 0 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#F9BC15", stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>

                <line
                  x1="40"
                  y1="360"
                  x2="360"
                  y2="360"
                  stroke="#F9BC15"
                  strokeWidth="1"
                  opacity="0.3"
                />
                <line
                  x1="40"
                  y1="360"
                  x2="40"
                  y2="40"
                  stroke="#F9BC15"
                  strokeWidth="1"
                  opacity="0.3"
                />

                <motion.path
                  d="M 40 360 Q 150 350 200 200 T 360 40"
                  fill="none"
                  stroke="url(#gradYellow)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />

                {/* Floating Dots along curve - Now Yellow */}
                <circle cx="200" cy="200" r="6" fill="#F9BC15" opacity="0.4" />
                <circle cx="360" cy="40" r="8" fill="#F9BC15" opacity="0.6" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6  text-gray-700">
                <Rocket className="w-8 h-8" />
                <h3 className="text-3xl font-medium">{t("mission.title")}</h3>
              </div>

              <p className="text-lg text-gray-900 leading-relaxed mb-8">
                {t("mission.description")}
              </p>

              <div className="flex items-center gap-2 text-gray-900 font-medium">
                <span className="w-8 h-[2px] bg-text bg-yellow-900"></span>
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
