/** Client-side highlight fetching */
export async function getHighlights(id?: string) {
  try {
    const url = id ? `/api/highlights?id=${id}` : "/api/highlights";
    const res = await fetch(url);

    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();

    if (id) {
      return data;
    }
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to fetch highlights:", err);
    return id ? null : [];
  }
}
