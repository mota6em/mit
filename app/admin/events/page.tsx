"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface EventData {
  id?: string;
  img: string;
  title_en: string;
  title_hu: string;
  desc_en: string;
  desc_hu: string;
  date: string;
}

export default function AdminEvents() {
  const [adminPassword, setAdminPassword] = useState("");

  const [events, setEvents] = useState<EventData[]>([]);
  const [form, setForm] = useState<EventData>({
    img: "",
    title_en: "",
    title_hu: "",
    desc_en: "",
    desc_hu: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch Events
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  // Handle Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    // Check auth first
    if (!adminPassword) {
      alert("Please enter admin password first");
      return;
    }

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      headers: { "x-admin-secret": adminPassword }, 
    });

    if (res.status === 401) {
      alert("Wrong Password!");
      return;
    }

    const data = await res.json();
    if (data.success) setForm({ ...form, img: data.url });
  };

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPassword) {
      alert("Please enter admin password");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": adminPassword,  
      },
      body: JSON.stringify(form),
    });

    if (res.status === 401) {
      alert("Wrong Password!");
      setLoading(false);
      return;
    }

    // Refresh list
    const refresh = await fetch("/api/events");
    setEvents(await refresh.json());
    setForm({
      img: "",
      title_en: "",
      title_hu: "",
      desc_en: "",
      desc_hu: "",
      date: "",
    });
    setIsEditing(false);
    setLoading(false);
  };

  // Delete Event
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    if (!adminPassword) {
      const pass = prompt("Enter Admin Password to delete:");
      if (!pass) return;
      setAdminPassword(pass); // Save it for session
    }

    const res = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": adminPassword,
      },
      body: JSON.stringify({ action: "delete", id }),
    });

    if (res.status === 401) {
      alert("Wrong Password!");
      return;
    }

    setEvents(events.filter((e) => e.id !== id));
  };

  // Populate form for edit
  const handleEdit = (event: EventData) => {
    setForm(event);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-4xl mx-auto p-10 font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Event Dashboard</h1>

        {/* PASSWORD INPUT */}
        <div className="flex gap-2 items-center bg-gray-100 p-2 rounded-lg">
          <span className="text-sm font-bold text-gray-500">🔒 Key:</span>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="bg-white border px-2 py-1 rounded text-sm"
          />
        </div>
      </div>

      {/* --- FORM --- */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-10 border border-gray-200">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Event" : "Add New Event"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-bold mb-2">Event Image</label>
            <input type="file" onChange={handleImageUpload} className="mb-2" />
            {form.img && (
              <div className="relative w-full h-40 rounded-lg overflow-hidden border">
                <Image
                  src={form.img}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold">Title (English)</label>
              <input
                required
                value={form.title_en}
                onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-bold">
                Title (Hungarian)
              </label>
              <input
                required
                value={form.title_hu}
                onChange={(e) => setForm({ ...form, title_hu: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold">
                Description (English)
              </label>
              <textarea
                required
                value={form.desc_en}
                onChange={(e) => setForm({ ...form, desc_en: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-bold">
                Description (Hungarian)
              </label>
              <textarea
                required
                value={form.desc_hu}
                onChange={(e) => setForm({ ...form, desc_hu: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold">Date</label>
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex gap-6 p-4 items-center justify-center">
            <button
              disabled={loading}
              type="submit"
              className="bg-accent cursor-pointer outline text-green-500 px-6 py-2 rounded-lg font-bold hover:bg-blue-700"
            >
              {loading
                ? "Saving..."
                : isEditing
                ? "Update Event"
                : "Create Event"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setForm({
                    img: "",
                    title_en: "",
                    title_hu: "",
                    desc_en: "",
                    desc_hu: "",
                    date: "",
                  });
                }}
                className="bg-gray-800 cursor-pointer outline outline-red-600 text-red-500 px-6 py-2 rounded-lg font-bold"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* --- LIST --- */}
      <div className="grid gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border items-center"
          >
            <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
              <Image
                src={event.img}
                alt={event.title_en}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-bold">{event.title_en}</h3>
              <p className="text-sm text-gray-500">{event.date}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleEdit(event)}
                className="text-blue-500 text-sm font-bold"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id!)}
                className="text-red-500 text-sm font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
