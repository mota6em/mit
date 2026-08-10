import { Repeat } from "lucide-react";

import { cn } from "@/lib/utils";

type DateTileProps = {
  day?: string;
  month?: string;
  recurringLabel?: string;
  muted?: boolean;
  className?: string;
};

export default function DateTile({
  day,
  month,
  recurringLabel,
  muted = false,
  className,
}: DateTileProps) {
  const base =
    "flex h-[3.25rem] w-[3.25rem] shrink-0 flex-col items-center justify-center rounded-xl border text-center leading-none shadow-[0_2px_10px_rgba(18,22,15,0.18)] backdrop-blur-sm";

  if (recurringLabel) {
    return (
      <div
        className={cn(
          base,
          "gap-1 px-1",
          muted
            ? "border-white/25 bg-ink-900/70 text-white/85"
            : "border-brand-green/30 bg-brand-green text-white",
          className
        )}
      >
        <Repeat className="h-3.5 w-3.5" />
        <span className="text-[0.6rem] font-semibold uppercase tracking-wide">
          {recurringLabel}
        </span>
      </div>
    );
  }

  if (!day) return null;

  return (
    <div
      className={cn(
        base,
        muted
          ? "border-white/25 bg-ink-900/70 text-white/85"
          : "border-white/40 bg-white/95 text-ink-900",
        className
      )}
    >
      <span className="numeral text-[1.35rem] font-semibold">{day}</span>
      {month && (
        <span className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] opacity-70">
          {month}
        </span>
      )}
    </div>
  );
}
