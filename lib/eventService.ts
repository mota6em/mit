/** Logic for interacting with the events API */
export async function getEvents() {
  try {
    const res = await fetch("/api/events");
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to fetch events:", err);
    return [];
  }
}
