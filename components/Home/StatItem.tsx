"use client";

import { useRef, memo } from "react";
import { motion, useInView } from "framer-motion";
import { useCounter } from "@/app/hooks/useCounter";
import { STATS_CONFIG } from "@/data/constants/statistics";

interface StatItemProps {
  stat: (typeof STATS_CONFIG)[number];
  label: string;
}

export const StatItem = memo(({ stat, label }: StatItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // display is a MotionValue object
  const display = useCounter(stat.target, stat.suffix, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center px-4 group"
    >
      <div
        className={`mb-6 p-5 rounded-2xl bg-gray-50 transition-all duration-300 
                      group-hover:bg-white group-hover:shadow-xl group-hover:-translate-y-1 
                      ${stat.color}`}
      >
        <stat.icon className="text-3xl" aria-hidden="true" />
      </div>

      <motion.span className="text-4xl md:text-5xl text-gray-900 tabular-nums tracking-tight mb-2">
        {display}
      </motion.span>

      <p className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-[0.2em]">
        {label}
      </p>
    </motion.div>
  );
});

StatItem.displayName = "StatItem";
