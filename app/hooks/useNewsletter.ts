import { useState, useEffect } from "react";
import { NewsletterSubscriber } from "@/lib/types";

export function useNewsletter() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", _id: "" });
  const [isEditing, setIsEditing] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter");
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data);
      }
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.subscribers) setSubscribers(data.subscribers);
      resetForm();
    } else if (res.status === 401) {
      alert("Session expired. Please log in again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove subscriber?")) return;
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", id }),
    });
    if (res.ok) setSubscribers((prev) => prev.filter((s) => s._id !== id));
  };

  const resetForm = () => {
    setForm({ name: "", email: "", _id: "" });
    setIsEditing(false);
  };

  return {
    subscribers,
    form,
    setForm,
    loading,
    isEditing,
    setIsEditing,
    handleSave,
    handleDelete,
    resetForm,
    refresh,
  };
}
