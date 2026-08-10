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
      y={28}
      delay={index * 120}
      className="group relative flex flex-col items-center px-4 text-center"
    >
      <div
        className={`mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-ink-200 bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:shadow-[0_4px_8px_rgba(16,20,15,0.06),0_24px_48px_-12px_rgba(16,20,15,0.18)] ${stat.color}`}
      >
        <stat.icon className="text-2xl" aria-hidden="true" />
      </div>

      <span
        ref={ref}
        className="display text-5xl tabular-nums text-ink-900 md:text-6xl"
      >
        {display}
      </span>

      <p className="eyebrow mt-3 text-ink-400">{label}</p>
    </Reveal>
  );
});

StatItem.displayName = "StatItem";
