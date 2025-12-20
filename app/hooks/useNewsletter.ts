// hooks/useNewsletter.ts
import { useState, useEffect } from "react";
import { NewsletterSubscriber } from "@/lib/types";

export function useNewsletter() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", _id: "" });
  const [isEditing, setIsEditing] = useState(false);

  const refresh = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/newsletter");
    if (res.ok) {
      const data = await res.json();
      setSubscribers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      setSubscribers(data.subscribers);
      resetForm();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove subscriber?")) return;
    const res = await fetch("/api/admin/newsletter", {
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

  const copyEmails = () => {
    const emails = subscribers.map((s) => s.email).join(", ");
    navigator.clipboard.writeText(emails);
    alert("All emails copied to clipboard!");
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
    copyEmails,
    resetForm,
  };
}
