import React from "react";

import Reveal from "./Reveal";
import RevealText from "./RevealText";
import { EyebrowRule } from "./Ornament";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  topText?: string;
  description?: string;
  className?: string;
  underLine?: boolean;
  align?: "center" | "start";
  tone?: "ink" | "light";
  accentFrom?: number;
}

export default function SectionHeader({
  title,
  icon,
  topText,
  description,
  className = "",
  underLine = false,
  align = "center",
  tone = "ink",
  accentFrom,
}: SectionHeaderProps) {
  const centered = align === "center";
  const light = tone === "light";

  return (
    <div
      className={cn(
        "flex w-full flex-col",
        centered ? "items-center text-center" : "items-start text-start",
        className
      )}
    >
      {icon && (
        <Reveal
          y={0}
          scale={0.72}
          className={cn(
            "mb-6 grid h-14 w-14 place-items-center rounded-2xl",
            light
              ? "border border-white/15 bg-white/10 text-brand-gold"
              : "border border-ink-200 bg-white text-brand-green shadow-[0_1px_2px_rgba(18,22,15,0.04),0_4px_12px_rgba(18,22,15,0.05)]"
          )}
        >
          {icon}
        </Reveal>
      )}

      {topText && (
        <Reveal
          as="span"
          y={0}
          delay={60}
          className={cn(
            "eyebrow mb-5 inline-flex items-center gap-3",
            light ? "text-brand-gold" : "text-brand-green-dark"
          )}
        >
          <EyebrowRule />
          {topText}
        </Reveal>
      )}

      <RevealText
        as="h2"
        text={title}
        delay={topText ? 140 : 40}
        accentFrom={accentFrom}
        accentClassName={light ? "text-brand-gold" : "text-brand-gold-dark"}
        className={cn(
          "display display-4",
          light ? "text-white" : "text-ink-900"
        )}
      />

      {description && (
        <Reveal
          as="p"
          y={14}
          delay={280}
          className={cn(
            "lede mt-6 max-w-2xl",
            light && "text-ink-300",
            centered && "mx-auto"
          )}
        >
          {description}
        </Reveal>
      )}

      {underLine && (
        <Reveal
          variant="rule"
          delay={320}
          style={{ transformOrigin: centered ? "center" : "left" }}
          className="mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-brand-gold to-brand-green"
        />
      )}
    </div>
  );
}
