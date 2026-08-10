import { cn } from "@/lib/utils";

type OrnamentProps = {
  className?: string;
  strokeWidth?: number;
};

export function StarMark({ className, strokeWidth = 1.25 }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      <path
        d="M36 3 69 36 36 69 3 36Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M12.3 12.3h47.4v47.4H12.3Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

export function EyebrowRule({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex items-center gap-1.5", className)}
    >
      <span className="h-px w-6 bg-current opacity-40" />
      <span className="inline-block h-[7px] w-[7px] rotate-45 border border-current opacity-70" />
      <span className="h-px w-6 bg-current opacity-40" />
    </span>
  );
}
