"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

/**
 * Hook to handle highlight data fetching and view tracking
 * Similar to useEventData but for highlights
 */
export function useHighlightData(initialHighlight: any) {
  const params = useParams();
  const [highlight, setHighlight] = useState(() => {
    if (initialHighlight) return initialHighlight;
    // Check sessionStorage for cached highlight data
    const id = params?.id as string;
    if (id && typeof window !== "undefined") {
      const cached = sessionStorage.getItem(`highlight-${id}`);
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch (e) {
          console.error("Failed to parse cached highlight data:", e);
        }
      }
    }
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
