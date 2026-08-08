"use client";
import { HiSparkles } from "react-icons/hi";
import { motion } from "framer-motion";

type BadgeType = "stats" | "mobileFloating" | "desktopFloating";

interface HeroBadgesProps {
  t: (key: string) => string;
  type?: BadgeType;
}

export const HeroBadges = ({ t, type = "stats" }: HeroBadgesProps) => {
  if (type === "stats") {
    // Bottom stats badge (current)
    return (
      <div className="mt-4 flex items-center justify-center gap-0 text-sm text-ink-500 font-medium">
        <span className="grid h-6 w-6 place-items-center text-brand-gold-dark">
          <HiSparkles className="text-xl" />
        </span>
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
            <p className="text-xs text-ink-500 font-semibold uppercase mb-0.5">
              {t("hero.badgeJoin")}
            </p>
            <p className="text-sm font-semibold text-ink-800 leading-tight">
              {t("hero.badgeWeekly")}
            </p>
          </div>
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
        <div className="rounded-lg bg-brand-gold-soft p-2 text-brand-gold-dark">
          <HiSparkles className="text-xl" />
        </div>
        <div>
          <p className="text-xs text-ink-500 font-semibold uppercase mb-0.5">
            {t("hero.badgeJoin")}
          </p>
          <p className="text-sm font-semibold text-ink-800 leading-tight">
            {t("hero.badgeWeekly")}
          </p>
        </div>
      </div>

    </motion.div>
  );
};
