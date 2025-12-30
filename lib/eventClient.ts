/** Logic for interacting with the events API on the client side */
export async function getEvents(id?: string) {
  try {
    const url = id ? `/api/events?id=${id}` : "/api/events";
    const res = await fetch(url);

    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();

    if (id) {
      return data;
    }
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to fetch events:", err);
    return id ? null : [];
  }
}
