export function HighlightSkeleton() {
  return (
    <div className="surface w-full overflow-hidden rounded-[1.75rem]">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-100 lg:col-span-7 lg:aspect-auto lg:min-h-[24rem]">
          <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>

        <div className="flex flex-col justify-center p-7 md:p-10 lg:col-span-5">
          <div className="h-3 w-28 rounded bg-ink-200" />
          <div className="mt-6 h-7 w-4/5 rounded bg-ink-200" />
          <div className="mt-3 h-7 w-2/5 rounded bg-ink-200" />

          <div className="mt-6 space-y-2.5">
            <div className="h-3 w-full rounded bg-ink-100" />
            <div className="h-3 w-11/12 rounded bg-ink-100" />
            <div className="h-3 w-3/5 rounded bg-ink-100" />
          </div>

          <div className="mt-8 h-10 w-32 rounded-full bg-ink-100" />
        </div>
      </div>
    </div>
  );
}
