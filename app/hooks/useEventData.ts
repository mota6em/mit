"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import type { ApiEvent } from "@/lib/types";
import { recordView } from "@/lib/views";

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

  // Only reached when neither the server render nor the session cache had it.
  useEffect(() => {
    if (event || !id) return;

    fetch(`/api/events?id=${encodeURIComponent(id)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id, event]);

  useEffect(() => {
    const viewId = id || event?._id;
    if (!viewId || hasIncremented.current) return;
    hasIncremented.current = true;

    recordView(viewId, "event", setViews);
  }, [id, event?._id]);

  return { event, loading, error, views };
}
