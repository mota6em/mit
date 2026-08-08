"use client";

export default function BlogCardSkeleton() {
  return (
    <div className="surface flex h-full w-full animate-pulse flex-col overflow-hidden rounded-3xl">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-100">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        <div className="absolute left-3 top-3 h-6 w-24 rounded-full bg-ink-200" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-5 w-4/5 rounded bg-ink-200" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-ink-100" />
          <div className="h-3 w-11/12 rounded bg-ink-100" />
          <div className="h-3 w-2/3 rounded bg-ink-100" />
        </div>

        <div className="mt-auto flex items-center gap-2.5 pt-4">
          <div className="h-[26px] w-[26px] rounded-full bg-ink-200" />
          <div className="h-3 w-24 rounded bg-ink-100" />
        </div>
      </div>
    </div>
  );
}
