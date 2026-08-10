/**
 * View counting, kept off the critical path.
 *
 * The count is a vanity number, so it must never delay or block rendering:
 * the request is deferred until the browser is idle, marked `keepalive` so it
 * survives a fast navigation, and recorded per tab so a back-navigation or a
 * React strict-mode double-mount doesn't inflate it.
 */
export type ViewType = "event" | "highlight";

function alreadyCounted(id: string, type: ViewType): boolean {
  try {
    const key = `viewed:${type}:${id}`;
    if (sessionStorage.getItem(key)) return true;
    sessionStorage.setItem(key, "1");
    return false;
  } catch {
    return false;
  }
}

/** Fires the increment when the browser is idle; resolves with the new count. */
export function recordView(
  id: string,
  type: ViewType,
  onCount: (views: number) => void
) {
  if (typeof window === "undefined" || !id) return;
  if (alreadyCounted(id, type)) return;

  const send = () => {
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type }),
      keepalive: true,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.views) onCount(data.views);
      })
      .catch(() => {
        /* a missed view count is not worth surfacing */
      });
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(send, { timeout: 3000 });
  } else {
    setTimeout(send, 1000);
  }
}
