import { StarMark } from "./Ornament";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  duration?: number;
  className?: string;
};

export default function Marquee({
  items,
  duration = 44,
  className,
}: MarqueeProps) {
  if (items.length === 0) return null;

  const run = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className={cn("marquee-mask relative w-full overflow-hidden", className)}
    >
      <div
        className="marquee-track items-center"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {run.map((item, index) => (
          <span key={index} className="flex shrink-0 items-center">
            <span className="display display-6 whitespace-nowrap px-7 text-ink-800/80">
              {item}
            </span>
            <span className="h-3.5 w-3.5 shrink-0 text-brand-gold">
              <StarMark strokeWidth={2.5} />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
