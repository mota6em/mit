"use client";

import { SWRConfig, type Cache, type State } from "swr";
import { Toaster, toast } from "react-hot-toast";

/**
 * Persists the SWR cache to sessionStorage so moving between pages — or
 * reloading — paints from memory instantly instead of showing skeletons while
 * a request is in flight. Content is public and short-lived, so a per-tab
 * store is the right scope.
 */
function sessionCacheProvider(): Cache {
  const map = new Map<string, State>();

  if (typeof window === "undefined") return map as Cache;

  try {
    const stored = sessionStorage.getItem("mit-swr-cache");
    if (stored) {
      for (const [key, value] of JSON.parse(stored) as [string, State][]) {
        map.set(key, value);
      }
    }
  } catch {
    // A corrupt or full store is never worth failing a page render over.
  }

  const persist = () => {
    try {
      sessionStorage.setItem(
        "mit-swr-cache",
        JSON.stringify(Array.from(map.entries()))
      );
    } catch {
      /* quota exceeded — the in-memory cache still works */
    }
  };

  window.addEventListener("pagehide", persist);
  window.addEventListener("beforeunload", persist);

  return map as Cache;
}

/** Single fetcher for every hook, so keys can just be URLs. */
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("Request failed") as Error & { status?: number };
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        provider: sessionCacheProvider,

        /**
         * The content is edited a few times a month, so treat cached data as
         * good. Nothing refetches on focus, reconnect, or remount — only an
         * explicit `mutate` or a fresh tab pulls again.
         */
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
        keepPreviousData: true,
        dedupingInterval: 600_000, // 10 minutes
        errorRetryCount: 2,

        // Global Error Handling
        onError: (error) => {
          if (error.status !== 403 && error.status !== 404) {
            console.error("Global SWR Error:", error);
            toast.error("Oops! Could not load data.");
          }
        },
      }}
    >
      {children}
      <Toaster position="bottom-right" />
    </SWRConfig>
  );
};
