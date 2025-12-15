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
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-[#f1c34c] font-bold tracking-widest uppercase text-sm mb-3 block">
            {t("coreFoundations")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-widest Ang-font">
            {words.map((word, index) => {
              let colorClass = "text-yellow-600";
              // Adjust indices based on the length of words in different languages if needed
              // For "MIT VISION AND MISSION" (4 words): Index 1 is VISION (blue), Index 3 is MISSION (green)
              // For "MIT VÍZIÓ ÉS MISSZIÓ" (4 words): Index 1 is VÍZIÓ (blue), Index 3 is MISSZIÓ (green)
              if (index === 1) {
                colorClass = "text-blue-800";
              } else if (index === 3) {
                colorClass = "text-[#11b505]";
              }

              return (
                <span key={index} className={`inline-block mx-1 ${colorClass}`}>
                  {word}
                </span>
              );
            })}
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
            {/* Custom SVG Background: Radar Pulse */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full absolute -right-20 -top-20"
              >
                <circle
                  cx="300"
                  cy="100"
                  r="50"
                  fill="none"
                  stroke="#4d93fb"
                  strokeWidth="2"
                />
                <circle
                  cx="300"
                  cy="100"
                  r="100"
                  fill="none"
                  stroke="#4d93fb"
                  strokeWidth="2"
                  opacity="0.8"
                />
                <circle
                  cx="300"
                  cy="100"
                  r="150"
                  fill="none"
                  stroke="#4d93fb"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <motion.circle
                  cx="300"
                  cy="100"
                  r="200"
                  fill="none"
                  stroke="#4d93fb"
                  strokeWidth="1"
                  opacity="0.4"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.2, 0.4] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.circle
                  cx="300"
                  cy="100"
                  r="250"
                  fill="none"
                  stroke="#4d93fb"
                  strokeWidth="1"
                  opacity="0.2"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.1, 0.2] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6 text-blue-800">
                <Target className="w-8 h-8" />
                <h3 className="text-3xl font-bold">{t("vision.title")}</h3>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {t("vision.description")}
              </p>

              <div className="flex items-center gap-2 text-[#4d93fb] font-medium ">
                <span className="w-8 h-[2px] bg-[#4d93fb]"></span>
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
            className="group relative bg-slate-50 rounded-[2.5rem] p-10 md:p-14 overflow-hidden border border-slate-100 hover:border-green-200 transition-colors duration-500"
          >
            {/* Custom SVG Background: Rising Graph/Path */}
            <div className="absolute bottom-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <svg viewBox="0 0 400 400" className="w-full h-full absolute">
                <defs>
                  <linearGradient
                    id="grad1"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#11b505", stopOpacity: 0 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#11b505", stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                <line
                  x1="40"
                  y1="360"
                  x2="360"
                  y2="360"
                  stroke="#11b505"
                  strokeWidth="1"
                  opacity="0.3"
                />
                <line
                  x1="40"
                  y1="360"
                  x2="40"
                  y2="40"
                  stroke="#11b505"
                  strokeWidth="1"
                  opacity="0.3"
                />

                {/* Trajectory Curve */}
                <motion.path
                  d="M 40 360 Q 150 350 200 200 T 360 40"
                  fill="none"
                  stroke="url(#grad1)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />

                {/* Floating Dots along curve */}
                <circle cx="200" cy="200" r="6" fill="#11b505" opacity="0.4" />
                <circle cx="360" cy="40" r="8" fill="#11b505" opacity="0.6" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6 text-[#11b505]">
                <Rocket className="w-8 h-8" />
                <h3 className="text-3xl font-bold">{t("mission.title")}</h3>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {t("mission.description")}
              </p>

              <div className="flex items-center gap-2 text-[#11b505] font-medium">
                <span className="w-8 h-[2px] bg-[#11b505]"></span>
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
