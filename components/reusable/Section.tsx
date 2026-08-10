import { cn } from "@/lib/utils";

type SectionTone = "plain" | "tinted" | "raised" | "dark";
type SectionWidth = "narrow" | "default" | "wide";
type SectionSpace = "compact" | "default" | "loose";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  /**
   * Background treatment. Sections alternate `plain` / `tinted` down a page so
   * the eye reads one continuous document instead of stacked slabs — the
   * boundary is a tone shift, never a hard rule.
   */
  tone?: SectionTone;
  width?: SectionWidth;
  space?: SectionSpace;
  className?: string;
  innerClassName?: string;
  /**
   * Skips layout and paint for this section until it nears the viewport.
   * Opt-in rather than automatic: it also applies paint containment, which
   * clips decoration deliberately positioned outside the section box.
   */
  deferPaint?: boolean;
}

const toneClasses: Record<SectionTone, string> = {
  plain: "bg-white text-ink-800",
  tinted: "bg-ink-50 text-ink-800",
  raised: "bg-gradient-to-b from-white to-ink-50 text-ink-800",
  dark: "bg-ink-900 text-ink-100",
};

const widthClasses: Record<SectionWidth, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

/** One vertical rhythm for the whole site, so section spacing is never ad hoc. */
const spaceClasses: Record<SectionSpace, string> = {
  compact: "py-14 md:py-16",
  default: "py-20 md:py-28",
  loose: "py-24 md:py-36",
};

export default function Section({
  children,
  id,
  tone = "plain",
  width = "default",
  space = "default",
  className,
  innerClassName,
  deferPaint = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        toneClasses[tone],
        spaceClasses[space],
        deferPaint && "defer-paint",
        className
      )}
    >
      <div
        className={cn(
          "relative mx-auto px-5 sm:px-8 lg:px-12",
          widthClasses[width],
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
