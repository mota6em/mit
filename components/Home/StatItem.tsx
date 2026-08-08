"use client";

import { useRef, memo } from "react";
import { motion, useInView } from "framer-motion";
import { useCounter } from "@/app/hooks/useCounter";
import { STATS_CONFIG } from "@/data/constants/statistics";

interface StatItemProps {
  stat: (typeof STATS_CONFIG)[number];
  label: string;
  index?: number;
}

export const StatItem = memo(({ stat, label, index = 0 }: StatItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // display is a MotionValue object
  const display = useCounter(stat.target, stat.suffix, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col items-center px-4 text-center"
    >
      <div
        className={`mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-ink-200 bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:shadow-[0_4px_8px_rgba(16,20,15,0.06),0_24px_48px_-12px_rgba(16,20,15,0.18)] ${stat.color}`}
      >
        <stat.icon className="text-2xl" aria-hidden="true" />
      </div>

      <motion.span className="display text-5xl tabular-nums text-ink-900 md:text-6xl">
        {display}
      </motion.span>

      <p className="eyebrow mt-3 text-ink-400">{label}</p>
    </motion.div>
  );
});

StatItem.displayName = "StatItem";
