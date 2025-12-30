"use client";
import { HiSparkles } from "react-icons/hi";
import { motion } from "framer-motion";

type BadgeType = "stats" | "mobileFloating" | "desktopFloating";

interface HeroBadgesProps {
  t: any;
  type?: BadgeType;
}

export const HeroBadges = ({ t, type = "stats" }: HeroBadgesProps) => {
  if (type === "stats") {
    // Bottom stats badge (current)
    return (
      <div className="mt-4 flex items-center justify-center gap-0 text-sm text-gray-500 font-medium">
        <div className="w-6 h-6 flex items-center justify-center text-yellow-600 text-3xl animate-pulse">
          <HiSparkles />
        </div>
        <p>{t("hero.joinStats")}</p>
      </div>
    );
  }

  if (type === "mobileFloating") {
    // Mobile floating badge
    return (
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-12 right-0 z-30 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/50 max-w-200"
      >
        <div className="flex items-start gap-3">
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-0.5">
              {t("hero.badgeJoin")}
            </p>
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              {t("hero.badgeWeekly")}
            </p>
          </div>
        </div>
        <div className="absolute bottom-8 left-2 z-20 text-[#e8b030] text-2xl animate-pulse">
          <HiSparkles />
        </div>
      </motion.div>
    );
  }

  // Desktop floating badge
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      className="absolute top-20 right-10 md:right-20 lg:right-10 lg:top-28 z-30 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/50 max-w-200"
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
      <div className="absolute lg:hidden xl:flex -bottom-62 right-126 z-20 text-[#e8b030] text-4xl animate-pulse">
        <HiSparkles />
      </div>
    </motion.div>
  );
};
