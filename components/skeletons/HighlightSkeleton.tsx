"use client";

import { motion } from "framer-motion";

export function HighlightSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto animate-pulse"
    >
      <div className="group relative overflow-hidden rounded-3xl bg-white border border-ink-200/60">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-ink-50/50 via-transparent to-transparent pointer-events-none z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image Section Skeleton (only visible on mobile) */}
          <div className="lg:hidden relative h-64 lg:aspect-square bg-ink-200" />
          {/* Content Section Skeleton */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            {/* Title */}
            <div className="space-y-3 mb-4">
              <div className="h-8 w-1/2 bg-ink-200 rounded" />
            </div>

            {/* Description */}
            <div className="space-y-2 mb-4">
              <div className="h-4 w-full bg-ink-200 rounded" />
              <div className="h-4 w-5/6 bg-ink-200 rounded" />
              <div className="h-4 w-4/6 bg-ink-200 rounded" />
            </div>

            {/* CTA Button */}
            <div className="h-8 w-28 bg-ink-200 rounded-full" />
          </div>
          {/* Image Section Skeleton  (only visible on desktop) */}
          <div className="hidden lg:block relative aspect-[4/3] lg:aspect-square bg-ink-200" />
        </div>
      </div>
    </motion.div>
  );
}
