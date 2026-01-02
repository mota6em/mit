export function FeaturedAnnouncementSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/60">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Content skeleton */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
            <div className="h-6 w-24 bg-gray-200 rounded-full mb-6 animate-pulse" />
            <div className="space-y-3 mb-6">
              <div className="h-8 w-full bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-8 w-3/4 bg-gray-200 rounded-lg animate-pulse" />
            </div>
            <div className="space-y-2 mb-8">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-12 w-40 bg-gray-200 rounded-full animate-pulse" />
          </div>
          {/* Image skeleton */}
          <div className="relative h-64 md:h-80 lg:h-full lg:min-h-[480px] order-1 lg:order-2">
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
