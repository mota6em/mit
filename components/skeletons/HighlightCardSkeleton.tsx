"use client";

export default function HighlightCardSkeleton() {
  return (
    <div className="w-full max-w-lg bg-white rounded-xl overflow-hidden   cursor-pointer   shadow-md relative flex flex-col h-full animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between p-2 md:p-3 border-b border-gray-100">
        <div className="flex items-center gap-2 md:gap-3">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          {/* Author Name */}
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
        {/* View Button */}
        <div className="h-7 w-20 bg-gray-200 rounded-full" />
      </div>

      {/* Image Skeleton */}
      <div className="relative w-full aspect-square bg-gray-200" />

      {/* Content Skeleton */}
      <div className="px-3 pb-10 pt-4 mb-4 space-y-3 grow">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
          <div className="h-5 w-3/4 bg-gray-200 rounded" />
        </div>

        {/* Description Line  */}
        <div className="space-y-2 pt-2">
          <div className="h-3 w-4/6 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Date Skeleton (Bottom Right) */}
      <div className="absolute bottom-2 right-2 h-3 w-24 bg-gray-200 rounded" />
    </div>
  );
}
