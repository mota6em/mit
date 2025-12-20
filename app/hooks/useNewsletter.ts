// hooks/useNewsletter.ts
import { useState, useEffect } from "react";
import { NewsletterSubscriber } from "@/lib/types";
import {
  getSubscribers,
  saveSubscriber,
  deleteSubscriber,
} from "@/lib/newsletterService";

export function useNewsletter() { 
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", _id: "" });

  const refresh = async () => {
    if (!password) return;
    const data = await getSubscribers(password);
    setSubscribers(data);
  };

  useEffect(() => {
    refresh();
  }, [password]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await saveSubscriber(form, password);
    if (res.ok) {
      await refresh();
      setForm({ name: "", email: "", _id: "" });
    } else {
      alert("Error saving subscriber");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove subscriber?")) return;
    const res = await deleteSubscriber(id, password);
    if (res.ok) setSubscribers((prev) => prev.filter((s) => s._id !== id));
  };

  const copyEmails = () => {
    const emails = subscribers.map((s) => s.email).join(", ");
    navigator.clipboard.writeText(emails);
    alert("All emails copied to clipboard!");
  };

  return {
    password,
    setPassword,
    subscribers,
    form,
    setForm,
    loading,
    handleSave,
    handleDelete,
    copyEmails,
    refresh,
  };
}
