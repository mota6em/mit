"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import type { ApiHighlight } from "@/lib/types";

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

  // Fetch highlight if not provided
  useEffect(() => {
    if (highlight) return;
    const id = params?.id as string;
    if (!id) return;

    fetch(`/api/highlights?id=${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setHighlight(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [params?.id, highlight]);

  // Increment views
  useEffect(() => {
    const id = (params?.id as string) || highlight?._id;
    if (!id || hasIncremented.current) return;
    hasIncremented.current = true;

    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type: "highlight" }),
    })
      .then((res) => res.json())
      .then((data) => data.views && setViews(data.views))
      .catch(console.error);
  }, [params?.id, highlight?._id]);

  return { highlight, loading, error, views };
}
