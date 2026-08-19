import { NewsletterSubscriber } from "./types";

export async function getSubscribers(): Promise<NewsletterSubscriber[]> {
  const res = await fetch("/api/newsletter", {});
  if (!res.ok) return [];
  return res.json();
}

export async function saveSubscriber(data: Partial<NewsletterSubscriber>) {
  return fetch("/api/newsletter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteSubscriber(id: string) {
  return fetch("/api/newsletter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "delete", id }),
  });
}
