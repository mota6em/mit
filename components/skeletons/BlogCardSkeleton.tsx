export default function BlogCardSkeleton() {
  return (
    <div className="surface flex h-full w-full flex-col overflow-hidden rounded-[1.5rem]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-100">
        <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        <div className="absolute start-3.5 top-3.5 h-[3.25rem] w-[3.25rem] rounded-xl bg-ink-200" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="h-5 w-4/5 rounded bg-ink-200" />
        <div className="mt-3 h-3 w-1/3 rounded bg-ink-100" />

        <div className="mt-4 space-y-2">
          <div className="h-3 w-full rounded bg-ink-100" />
          <div className="h-3 w-11/12 rounded bg-ink-100" />
          <div className="h-3 w-2/3 rounded bg-ink-100" />
        </div>

        <div className="mt-auto pt-6">
          <div className="rule-fade" />
          <div className="mt-4 h-3 w-24 rounded bg-ink-100" />
        </div>
      </div>
    </div>
  );
}
