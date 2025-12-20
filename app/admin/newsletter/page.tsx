"use client";
import { useState, useEffect } from "react";
import {
  HiTrash,
  HiPencil,
  HiClipboardCopy,
  HiPlus,
  HiX,
  HiCheck,
} from "react-icons/hi";
import { NewsletterSubscriber } from "@/lib/types";

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ _id: "", name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/admin/newsletter")
      .then((res) => res.json())
      .then((data) => {
        setSubscribers(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  const handleCopyEmails = () => {
    const emailList = subscribers.map((s) => s.email).join(", ");
    navigator.clipboard.writeText(emailList);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    if (!confirm("Remove this subscriber?")) return;
    const res = await fetch("/api/admin/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", id }),
    });
    if (res.ok) setSubscribers(subscribers.filter((s) => s._id !== id));
  };

  const resetForm = () => {
    setForm({ _id: "", name: "", email: "" });
    setIsEditing(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Newsletter Subscribers
        </h1>
        <button
          onClick={handleCopyEmails}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-bold shadow-md"
        >
          {copied ? <HiCheck /> : <HiClipboardCopy />}
          {copied ? "Copied!" : "Copy All Emails"}
        </button>
      </div>

      {/* Quick Add/Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl border shadow-sm flex flex-wrap gap-4 items-end"
      >
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-bold text-gray-400 uppercase">
            Name
          </label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-bold text-gray-400 uppercase">
            Email
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-bold hover:bg-black"
          >
            {isEditing ? "Update" : "Add"}
          </button>
          {isEditing && (
            <button
              onClick={resetForm}
              type="button"
              className="p-2 text-gray-400"
            >
              <HiX size={24} />
            </button>
          )}
        </div>
      </form>

      {/* List Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {subscribers.map((s) => (
              <tr
                key={s._id}
                className="hover:bg-gray-50 transition-colors text-sm"
              >
                <td className="px-6 py-4 font-medium">{s.name}</td>
                <td className="px-6 py-4 text-gray-500">{s.email}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setForm(s);
                      setIsEditing(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <HiPencil />
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <HiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && subscribers.length === 0 && (
          <p className="p-10 text-center text-gray-400">
            No subscribers found.
          </p>
        )}
      </div>
    </div>
  );
}
