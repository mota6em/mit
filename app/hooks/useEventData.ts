import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import type { ApiEvent } from "@/lib/types";

/**
 * Get cached event data from sessionStorage
 * This is used when navigating from BlogCard which caches the event data
 */
function getCachedEvent(id: string): ApiEvent | null {
  if (typeof window === "undefined") return null;
  try {
    const cached = sessionStorage.getItem(`event-${id}`);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
}

export function useEventData(initialEvent: ApiEvent | null) {
  const params = useParams();
  const id = params?.id as string;

  // Priority: initialEvent (SSR) > cached data > null
  const [event, setEvent] = useState<ApiEvent | null>(() => {
    if (initialEvent) return initialEvent;
    if (id) return getCachedEvent(id);
    return null;
  });
  const [loading, setLoading] = useState(!event);
  const [error, setError] = useState(false);
  const [views, setViews] = useState(0);
  const hasIncremented = useRef(false);

  // Fetch event
  useEffect(() => {
    if (event) return; // Already have event from initial or cache
    const id = params?.id as string;
    if (!id) return;

    fetch(`/api/events?id=${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [params?.id, event]);

  // Increment views
  useEffect(() => {
    const id = (params?.id as string) || event?._id;
    if (!id || hasIncremented.current) return;
    hasIncremented.current = true;

    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => data.views && setViews(data.views))
      .catch(console.error);
  }, [params?.id, event?._id]);

  return { event, loading, error, views };
}
