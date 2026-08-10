"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import type { ApiHighlight } from "@/lib/types";
import { recordView } from "@/lib/views";

/**
 * Get cached highlight data from sessionStorage
 * This is used when navigating from FeaturedAnnouncement which caches the data
 */
function getCachedHighlight(id: string): ApiHighlight | null {
  if (typeof window === "undefined") return null;
  try {
    const cached = sessionStorage.getItem(`highlight-${id}`);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
}

/**
 * Hook to handle highlight data fetching and view tracking
 * Priority: initialHighlight (SSR) > cached data > fetch from API
 */
export function useHighlightData(initialHighlight: ApiHighlight | null) {
  const params = useParams();
  const id = params?.id as string;

  // Priority: initialHighlight (SSR) > cached data > null
  const [highlight, setHighlight] = useState<ApiHighlight | null>(() => {
    if (initialHighlight) return initialHighlight;
    if (id) return getCachedHighlight(id);
    return null;
  });
  const [loading, setLoading] = useState(!highlight);
  const [error, setError] = useState(false);
  const [views, setViews] = useState(0);
  const hasIncremented = useRef(false);

  // Only reached when neither the server render nor the session cache had it.
  useEffect(() => {
    if (highlight || !id) return;

    fetch(`/api/highlights?id=${encodeURIComponent(id)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setHighlight(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id, highlight]);

  useEffect(() => {
    const viewId = id || highlight?._id;
    if (!viewId || hasIncremented.current) return;
    hasIncremented.current = true;

    recordView(viewId, "highlight", setViews);
  }, [id, highlight?._id]);

  return { highlight, loading, error, views };
}
