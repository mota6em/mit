/** Client-side event fetching */
export async function getEvents(
  id?: string,
  params?: { type?: string; limit?: number; search?: string }
) {
  try {
    let url = id ? `/api/events?id=${id}` : "/api/events";
    if (params) {
      const query = new URLSearchParams();
      if (params.type) query.set("type", params.type);
      if (params.limit) query.set("limit", params.limit.toString());
      if (params.search) query.set("search", params.search);
      if (query.toString()) {
        url += `?${query.toString()}`;
      }
    }
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
