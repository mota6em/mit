"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  HiCalendar,
  HiArrowRight,
  HiSparkles,
  HiLocationMarker,
} from "react-icons/hi";

// Reusing the Pill Tag from your design system
type SectionTagColor = "green" | "gold" | "blue";

const SectionTag = ({
  text,
  color = "blue",
}: {
  text: string;
  color?: SectionTagColor;
}) => {
  const colorClasses: Record<SectionTagColor, string> = {
    green: "bg-green-100 text-green-600",
    gold: "bg-yellow-100 text-yellow-600",
    blue: "bg-blue-100 text-blue-600",
  };

  return (
    <div
      className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 ${colorClasses[color]}`}
    >
      {text}
    </div>
  );
};

const Hero = () => {
  const t = useTranslations("events");

  return (
    <div className="relative w-full overflow-hidden bg-white pt-12 pb-16 md:pb-4 md:pt-0 md:px-5">
      <div className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] bg-green-100/40 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3" />
      <div className="pointer-events-none absolute left-0 w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-3xl translate-y-1/3 translate-x-1/3" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-100/40 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3" />
      <div className="absolute bottom-50 left-0 w-[200px] h-[200px] bg-blue-50/40 rounded-full blur-3xl translate-y-1/3 translate-x-1/3" />
      <div className=" mx-auto px-4 relative z-10">
        <div className="grid relative lg:grid-cols-2 gap-12 lg:gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:-mt-10"
          >
            <SectionTag text={t("hero.tag") || "Community Life"} color="blue" />

            <h1 className="text-5xl md:text6xl w-full font-semibold md:mt-12 lg:mt-0  mb-0 md:mb-2 leading-tight">
              <span className="text-[#4d93fb] drop-shadow-sm">
                {t("hero.title").split(" ")[0] || "Sharing"}{" "}
              </span>
              <span className="text-[#e8b030] drop-shadow-sm">
                {t("hero.title").split(" ")[1] || "Special"}{" "}
              </span>
              <br className="hidden md:block" />
              <span className="text-[#11b505] drop-shadow-sm">
                {t("hero.title").split(" ")[2] || "Moments"}
              </span>
            </h1>
            {/* Image section for only mobile devices */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[400px] md:h-[550px] w-full lg:hidden"
            >
              {/* Image 1: Main Large (Tilted Left) */}
              <div className="absolute top-6 md:top-8 left-0 sm:left-28 md:left-24 w-80 md:w-96 h-68 md:h-80 -rotate-4 sm:-rotate-8 md:rotate-[-4deg] z-10 ">
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-[6px] border-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                  <Image
                    src="/imgs/events/event-group.jpg"
                    alt="Lecture Event"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Image 2: Secondary Small (Tilted Right) */}
              <div className="absolute bottom-10 md:bottom-16 right-4 sm:right-28 md:right-24 w-48 md:w-72 h-32 md:h-56 rotate-[8deg] z-20 ">
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-[6px] border-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                  <Image
                    src="/imgs/home/hero/picnic.jpg"
                    alt="Community Picnic"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Floating Badge (Glassmorphism) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="absolute top-10 sm:top-36 md:top-20 right-0 sm:right-10 md:right-20 z-30 bg-white/75 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-white/50 max-w-[800px]"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-red-100 hidden sm:block text-red-600 p-2 rounded-lg">
                    <HiSparkles className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-0.5">
                      {t("hero.badgeJoin")}
                    </p>
                    <p className="text-sm font-semibold text-gray-800 leading-tight">
                      {t("hero.badgeWeekly")}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Sparkle */}
              <div className="absolute bottom-32 left-10 text-[#e8b030] text-4xl animate-pulse">
                <HiSparkles />
              </div>
            </motion.div>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed -mt-4 sm:mt-4 md:mt-0 mb-6 mx-auto lg:mx-0">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center ">
              <button
                className="px-8 py-3.5 cursor-pointer bg-[#4d93fb] text-white rounded-full font-semibold hover:bg-[#3b7ddb] transition-all shadow-[0_4px_15px_rgba(77,147,251,0.3)] hover:-translate-y-1 flex items-center justify-center gap-2"
                onClick={() => {
                  const el = document.getElementById("upcoming-events");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <HiCalendar className="text-xl" />
                {t("hero.primaryBtn")}
              </button>
              <button
                className="px-8 py-3.5 cursor-pointer bg-white text-gray-600 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                onClick={() => {
                  const el = document.getElementById("past-events");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("hero.secondaryBtn")} <HiArrowRight />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-0 text-sm text-gray-500 font-medium">
              <div className="w-6 h-6 flex items-center justify-center text-yellow-600 text-3xl animate-pulse">
                <HiSparkles />
              </div>
              <p>{t("hero.joinStats")}</p>
            </div>
          </motion.div>
          {/* Image section for only desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] md:h-[550px] w-full hidden lg:block"
          >
            {/* Image 1: Main Large (Tilted Left) */}
            <div className="absolute top-12 left-8 md:left-16 w-64 md:w-96 h-80 md:h-80 rotate-[-4deg] z-10 ">
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-[6px] border-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <Image
                  src="/imgs/events/event-group.jpg"
                  alt="Lecture Event"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Image 2: Secondary Small (Tilted Right) */}
            <div className="absolute bottom-16 right-8 md:left-54   w-48 md:w-72 h-48 md:h-46   rotate-[8deg] z-20 ">
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-[6px] border-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <Image
                  src="/imgs/home/hero/picnic.jpg"
                  alt="Community Picnic"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Floating Badge (Glassmorphism) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-20 right-10 md:right-20 lg:right-10  lg:top-28 z-30 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/50 max-w-[800px]"
            >
              <div className="flex items-start gap-3">
                <div className="bg-red-100 text-red-600 p-2 rounded-lg">
                  <HiSparkles className="text-xl" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase mb-0.5">
                    {t("hero.badgeJoin")}
                  </p>
                  <p className="text-sm font-semibold text-gray-800 leading-tight">
                    {t("hero.badgeWeekly")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Decorative Sparkle */}
            <div className="absolute bottom-32 left-10 text-[#e8b030] text-4xl animate-pulse">
              <HiSparkles />
            </div>
          </motion.div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Hero;
