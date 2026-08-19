"use client";

import { useEffect } from "react";
import { SWRConfig, useSWRConfig } from "swr";

type Fallback = Record<string, unknown>;

/**
 * Writes the server-rendered data into the live SWR cache.
 *
 * `fallback` alone only covers keys that have no cache entry yet, and the
 * session-persisted cache means most keys *do* have one. Pushing the server's
 * copy in on mount keeps the freshest data winning without any network request.
 */
function SyncServerData({ fallback }: { fallback: Fallback }) {
  const { mutate } = useSWRConfig();

  useEffect(() => {
    for (const [key, value] of Object.entries(fallback)) {
      if (value !== undefined) mutate(key, value, { revalidate: false });
    }
  }, [fallback, mutate]);

  return null;
}

/**
 * Seeds client-side caches from a server component, so data-driven sections
 * render with real content on the very first paint — no skeleton, no fetch.
 */
export default function DataPreload({
  fallback,
  children,
}: {
  fallback: Fallback;
  children: React.ReactNode;
}) {
  return (
    <SWRConfig value={{ fallback }}>
      <SyncServerData fallback={fallback} />
      {children}
    </SWRConfig>
  );
}
