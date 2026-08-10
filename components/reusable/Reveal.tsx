"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * A single IntersectionObserver shared by every `<Reveal>` on the page.
 *
 * The previous approach mounted a Framer Motion `whileInView` element per card
 * and per heading; each one ran its own observer plus a JS-driven animation
 * loop, and several animated `filter: blur()`, which forces a full repaint of
 * the element on every frame. Here the observer's only job is to flip an
 * attribute — the transition itself is CSS, and it runs on the compositor.
 */
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer || typeof window === "undefined") return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        // Reveals play once — re-animating on every scroll-by reads as noise.
        el.setAttribute(
          el.hasAttribute("data-reveal-rule") ? "data-reveal-rule" : "data-reveal",
          "in"
        );
        observer?.unobserve(el);
      }
    },
    // Start slightly before the element is on screen so the motion finishes
    // as the reader arrives at it rather than after.
    { rootMargin: "0px 0px -12% 0px", threshold: 0.01 }
  );

  return observer;
}

type RevealProps = {
  children?: ReactNode;
  /** Element to render. Use the semantically correct tag, not always a div. */
  as?: ElementType;
  className?: string;
  /** Stagger, in milliseconds — pass `index * 80` for a list. */
  delay?: number;
  /** Vertical travel. `0` gives a pure fade. */
  y?: number;
  /** Horizontal travel, for side-entering columns. */
  x?: number;
  /** Starting scale, for imagery that should settle rather than slide. */
  scale?: number;
  /** Renders as a horizontal wipe instead of a fade — for accent rules. */
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No observer support, or reduced motion: show the content immediately.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      el.setAttribute(
        variant === "rule" ? "data-reveal-rule" : "data-reveal",
        "in"
      );
      return;
    }

    const io = getObserver();
    io?.observe(el);
    return () => io?.unobserve(el);
  }, [variant]);

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
