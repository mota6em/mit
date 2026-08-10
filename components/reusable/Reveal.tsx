"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

const REVEAL_ATTRS = [
  "data-reveal",
  "data-reveal-rule",
  "data-reveal-words",
] as const;

let observer: IntersectionObserver | null = null;

function markIn(el: HTMLElement) {
  for (const attr of REVEAL_ATTRS) {
    if (el.hasAttribute(attr)) el.setAttribute(attr, "in");
  }
}

function getObserver() {
  if (observer || typeof window === "undefined") return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        markIn(entry.target as HTMLElement);
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.01 }
  );

  return observer;
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );
}

let sweepTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleSweep() {
  if (sweepTimer) clearTimeout(sweepTimer);

  sweepTimer = setTimeout(() => {
    sweepTimer = null;
    const pending = document.querySelectorAll<HTMLElement>(
      '[data-reveal=""],[data-reveal-rule=""],[data-reveal-words=""]'
    );

    for (const el of pending) {
      if (el.getBoundingClientRect().top < window.innerHeight * 1.25) {
        markIn(el);
      }
    }
  }, 1600);
}

export function observeReveal(el: HTMLElement | null) {
  if (!el) return () => {};

  if (typeof IntersectionObserver === "undefined" || prefersReducedMotion()) {
    markIn(el);
    return () => {};
  }

  const io = getObserver();
  io?.observe(el);
  scheduleSweep();

  return () => io?.unobserve(el);
}

type RevealProps = {
  children?: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  variant?: "fade" | "rule";
  style?: React.CSSProperties;
} & Record<string, unknown>;

export default function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 20,
  x = 0,
  scale = 1,
  variant = "fade",
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => observeReveal(ref.current), []);

  const attr =
    variant === "rule" ? { "data-reveal-rule": "" } : { "data-reveal": "" };

  return (
    <Tag
      ref={ref}
      {...attr}
      className={className}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-y": `${y}px`,
          "--reveal-x": `${x}px`,
          "--reveal-scale": scale,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
