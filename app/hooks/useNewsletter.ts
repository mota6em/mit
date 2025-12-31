import { useState, useEffect } from "react";

interface Subscriber {
  _id: string;
  name: string;
  email: string;
}

export function useNewsletter() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [form, setForm] = useState({ name: "", email: "", _id: "" });
  const [loading, setLoading] = useState(true);
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
    if (isEditing) {
      const res = await fetch(`/api/newsletter/${form._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubscribers((prev) =>
          prev.map((s) => (s._id === form._id ? form : s))
        );
      }
    } else {
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

  const copyEmails = async () => {
    const emails = subscribers.map((s) => s.email).join(", ");
    await navigator.clipboard.writeText(emails);
    alert("Emails copied to clipboard!");
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
    copyEmails,
    refresh,
  };
}
