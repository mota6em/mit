"use client";

import { useEffect, useRef, useState, memo } from "react";
import { useParams } from "next/navigation";

import { useCounter } from "@/app/hooks/useCounter";
import { STATS_CONFIG } from "@/data/constants/statistics";
import Reveal from "@/components/reusable/Reveal";
import { toLocale } from "@/lib/i18n";

interface StatItemProps {
  stat: (typeof STATS_CONFIG)[number];
  label: string;
  index?: number;
}

export const StatItem = memo(({ stat, label, index = 0 }: StatItemProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const params = useParams();
  const locale = toLocale(params?.locale);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      const timer = setTimeout(() => setIsInView(true), 0);
      return () => clearTimeout(timer);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const display = useCounter(stat.target, stat.suffix, isInView, locale);

  return (
    <Reveal
      y={26}
      delay={index * 130}
      className="group relative flex flex-col items-center px-4 text-center md:items-start md:text-start"
    >
      <span className="mb-7 h-[3px] w-12 rounded-full bg-gradient-to-r from-brand-gold to-brand-gold/0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-20" />

      <span
        ref={ref}
        className="numeral display-1 block leading-none text-ink-900"
      >
        {display}
      </span>

      <span className="mt-6 flex items-center gap-2.5 text-ink-500">
        <stat.icon
          className={`text-base transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 ${stat.color}`}
          aria-hidden="true"
        />
        <span className="eyebrow">{label}</span>
      </span>
    </Reveal>
  );
});

StatItem.displayName = "StatItem";
