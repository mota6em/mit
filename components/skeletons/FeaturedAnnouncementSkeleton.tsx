export function FeaturedAnnouncementSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-200/60">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Content skeleton - matches HighlightContent padding */}
          <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center order-2 lg:order-1">
            {/* Badge skeleton */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-7 w-28 bg-gray-200 rounded-full animate-pulse" />
            </div>
            {/* Title skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-6 md:h-7 w-full bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-6 md:h-7 w-3/4 bg-gray-200 rounded-lg animate-pulse" />
            </div>
            {/* Description skeleton */}
            <div className="space-y-2 mb-6">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
            </div>
            {/* Button skeleton */}
            <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse" />
          </div>
          {/* Image skeleton - matches HighlightImage dimensions */}
          <div className="relative h-48 md:h-64 lg:h-full lg:min-h-[320px] order-1 lg:order-2">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
