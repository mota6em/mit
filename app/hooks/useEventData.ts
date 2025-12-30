import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

export function useEventData(initialEvent: any) {
  const params = useParams();
  const [event, setEvent] = useState(initialEvent);
  const [loading, setLoading] = useState(!initialEvent);
  const [error, setError] = useState(false);
  const [views, setViews] = useState(0);
  const hasIncremented = useRef(false);

  // Fetch event
  useEffect(() => {
    if (initialEvent) return;
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
  }, [params?.id, initialEvent]);

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
