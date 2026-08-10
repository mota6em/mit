import React from "react";
import Reveal from "./Reveal";

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  topText?: string;
  className?: string;
  underLine?: boolean;
  align?: "center" | "start";
}

/**
 * Every section on the site is introduced the same way, so this is the single
 * place the entrance choreography is defined: icon, eyebrow, heading and rule
 * arrive in that order, ~90ms apart, on the shared reveal observer.
 */
export default function SectionHeader({
  title,
  icon,
  topText,
  className = "",
  underLine = false,
  align = "center",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col ${
        centered ? "items-center text-center" : "items-start text-start"
      } ${className}`}
    >
      {icon && (
        <Reveal
          y={0}
          scale={0.7}
          className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-ink-200 bg-white text-brand-green shadow-[0_1px_2px_rgba(16,20,15,0.04),0_4px_12px_rgba(16,20,15,0.05)]"
        >
          {icon}
        </Reveal>
      )}

      {topText && (
        <Reveal
          as="span"
          y={-8}
          delay={60}
          className="eyebrow mb-4 inline-flex items-center gap-2 text-brand-green-dark"
        >
          <span className="h-px w-6 bg-brand-gold" />
          {topText}
        </Reveal>
      )}

      <Reveal
        as="h2"
        delay={topText ? 120 : 0}
        className="display text-[1.85rem] text-ink-900 sm:text-4xl md:text-[2.6rem]"
      >
        {title}
      </Reveal>

      {underLine && (
        <Reveal
          variant="rule"
          delay={220}
          style={{ transformOrigin: centered ? "center" : "left" }}
          className="mt-5 h-[3px] w-20 rounded-full bg-gradient-to-r from-brand-gold via-brand-gold to-brand-green"
        />
      )}
    </div>
  );
}
