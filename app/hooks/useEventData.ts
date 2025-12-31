import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

export function useEventData(initialEvent: any) {
  const params = useParams();
  const [event, setEvent] = useState(() => {
    if (initialEvent) return initialEvent;
    // Check sessionStorage for cached event data
    const id = params?.id as string;
    if (id && typeof window !== "undefined") {
      console.time(`cache-check-${id}`);
      const cached = sessionStorage.getItem(`event-${id}`);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          console.timeEnd(`cache-check-${id}`);
          console.log(`Using cached event data for ${id}`);
          return parsed;
        } catch (e) {
          console.error("Failed to parse cached event data:", e);
          console.timeEnd(`cache-check-${id}`);
        }
      } else {
        console.timeEnd(`cache-check-${id}`);
      }
    }
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
