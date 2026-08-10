"use client";

import { useEffect, useRef, type ElementType } from "react";
import { observeReveal } from "./Reveal";

type RevealTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  accentFrom?: number;
  accentClassName?: string;
};

export default function RevealText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  accentFrom,
  accentClassName = "text-brand-gold-dark",
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => observeReveal(ref.current), []);

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag
      ref={ref}
      data-reveal-words=""
      className={className}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="word-mask"
          style={{ "--word-index": index } as React.CSSProperties}
        >
          <span
            className={
              accentFrom !== undefined && index >= accentFrom
                ? accentClassName
                : undefined
            }
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
