"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import {
  HiPencil,
  HiTrash,
  HiCloudUpload,
  HiCalendar,
  HiPlus,
  HiX,
  HiExclamation,
  HiClock,
  HiRefresh,
} from "react-icons/hi";
import Link from "next/link";

interface EventData {
  _id?: string;
  id?: string;
  img: string;
  title_en: string;
  title_hu: string;
  desc_en: string;
  desc_hu: string;
  note_en?: string;
  note_hu?: string;
  date?: string; // Optional now
  time?: string;
  isRecurring?: boolean;
  recurringDays?: string[];
}

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function AdminEvents() {
  const [adminPassword, setAdminPassword] = useState("");
  const [events, setEvents] = useState<EventData[]>([]);

  const [form, setForm] = useState<EventData>({
    img: "",
    title_en: "",
    title_hu: "",
    desc_en: "",
    desc_hu: "",
    note_en: "",
    note_hu: "",
    date: "",
    time: "",
    isRecurring: false,
    recurringDays: [],
  });

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles?.[0]) return;
      if (!adminPassword) {
        alert("Please enter admin password first");
        return;
      }
      setUploadingImg(true);
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
          headers: { "x-admin-secret": adminPassword },
        });

        if (res.status === 401) {
          alert("Wrong Password!");
          setUploadingImg(false);
          return;
        }

        const data = await res.json();
        if (data.success) {
          setForm((prev) => ({ ...prev, img: data.url }));
        }
      } catch (error) {
        console.error("Upload failed", error);
        alert("Image upload failed");
      } finally {
        setUploadingImg(false);
      }
    },
    [adminPassword]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const toggleDay = (day: string) => {
    setForm((prev) => {
      const currentDays = prev.recurringDays || [];
      if (currentDays.includes(day)) {
        return { ...prev, recurringDays: currentDays.filter((d) => d !== day) };
      } else {
        return { ...prev, recurringDays: [...currentDays, day] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPassword) {
      alert("Please enter admin password");
      return;
    }

    // --- NEW VALIDATION: Date is required ONLY if NOT recurring ---
    if (!form.isRecurring && !form.date) {
      alert("Please select an Event Date (or mark as Recurring)");
      return;
    }

    setLoading(true);

    // If recurring, we can optionally clear the date to avoid confusion
    const dataToSend = {
      ...form,
      date: form.isRecurring ? "" : form.date,
    };

    const res = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": adminPassword,
      },
      body: JSON.stringify(dataToSend),
    });

    if (res.status === 401) {
      alert("Wrong Password!");
      setLoading(false);
      return;
    }

    const refresh = await fetch("/api/events");
    setEvents(await refresh.json());
    resetForm();
    setIsEditing(false);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
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
    setEvents(events.filter((e) => (e._id || e.id) !== id));
  };

  const handleEdit = (event: EventData) => {
    setForm({
      ...event,
      note_en: event.note_en || "",
      note_hu: event.note_hu || "",
      time: event.time || "",
      isRecurring: event.isRecurring || false,
      recurringDays: event.recurringDays || [],
      date: event.date || "",
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setForm({
      img: "",
      title_en: "",
      title_hu: "",
      desc_en: "",
      desc_hu: "",
      note_en: "",
      note_hu: "",
      date: "",
      time: "",
      isRecurring: false,
      recurringDays: [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto gap-4 flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Events Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage your community programs
            </p>
            <Link href="/">
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-200 shadow-lg">
                Go Back to MIT home page
              </button>
            </Link>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
          <div
            className={`p-1 h-2 w-full ${
              isEditing ? "bg-amber-400" : "bg-blue-500"
            }`}
          />
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-full ${
                    isEditing
                      ? "bg-amber-100 text-amber-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {isEditing ? (
                    <HiPencil className="text-xl" />
                  ) : (
                    <HiPlus className="text-xl" />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {isEditing ? "Edit Event" : "Create New Event"}
                </h2>
              </div>
              {isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <HiX className="text-2xl" />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="gap-6 flex flex-col">
              {/* Image Upload Area */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                  <HiCloudUpload className="text-lg text-blue-500" /> Event
                  Cover Image
                </label>
                <div
                  {...getRootProps()}
                  className={`relative w-full h-64 rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden group ${
                    isDragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-gray-100"
                  }`}
                >
                  <input {...getInputProps()} />
                  {uploadingImg ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-20">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-3" />
                      <p className="text-sm text-blue-600 font-bold">
                        Uploading...
                      </p>
                    </div>
                  ) : form.img ? (
                    <>
                      <Image
                        src={form.img}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white z-10">
                        <HiCloudUpload className="text-4xl mb-2" />
                        <p className="font-bold">Click to change</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4 text-center">
                      <HiCloudUpload className="text-5xl mb-4" />
                      <p className="text-lg font-bold text-gray-600">
                        Drag & drop or click
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Languages Grid */}
              <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                {/* English Content */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200">
                      EN
                    </span>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                      English Content
                    </h3>
                  </div>
                  <input
                    required
                    value={form.title_en}
                    onChange={(e) =>
                      setForm({ ...form, title_en: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none"
                    placeholder="Title"
                  />
                  <textarea
                    required
                    rows={4}
                    value={form.desc_en}
                    onChange={(e) =>
                      setForm({ ...form, desc_en: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none resize-none"
                    placeholder="Description..."
                  />
                  {/* English Note */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                      <HiExclamation className="text-amber-500" /> Note
                      (Optional)
                    </label>
                    <input
                      value={form.note_en}
                      onChange={(e) =>
                        setForm({ ...form, note_en: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-amber-500 outline-none text-sm"
                      placeholder="e.g. Hungarian speakers only"
                    />
                  </div>
                </div>

                {/* Hungarian Content */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 border border-green-200">
                      HU
                    </span>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                      Hungarian Content
                    </h3>
                  </div>
                  <input
                    required
                    value={form.title_hu}
                    onChange={(e) =>
                      setForm({ ...form, title_hu: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none"
                    placeholder="Cím"
                  />
                  <textarea
                    required
                    rows={4}
                    value={form.desc_hu}
                    onChange={(e) =>
                      setForm({ ...form, desc_hu: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none resize-none"
                    placeholder="Leírás..."
                  />
                  {/* Hungarian Note */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                      <HiExclamation className="text-amber-500" /> Megjegyzés
                      (Opcionális)
                    </label>
                    <input
                      value={form.note_hu}
                      onChange={(e) =>
                        setForm({ ...form, note_hu: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-amber-500 outline-none text-sm"
                      placeholder="pl. Csak magyar nyelven"
                    />
                  </div>
                </div>
              </div>

              {/* DATE, TIME & RECURRING SECTION */}
              <div className="pt-6 border-t border-gray-100 bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <HiClock className="text-blue-600" /> Date & Time Settings
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Recurring Toggle */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-3 cursor-pointer group w-fit">
                      <div
                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                          form.isRecurring ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                            form.isRecurring ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={form.isRecurring}
                        onChange={(e) =>
                          setForm({ ...form, isRecurring: e.target.checked })
                        }
                      />
                      <span className="font-bold text-gray-700 flex items-center gap-2">
                        <HiRefresh
                          className={
                            form.isRecurring ? "text-blue-600" : "text-gray-400"
                          }
                        />
                        Weekly / Recurring Event
                      </span>
                    </label>
                  </div>

                  {/* Date Picker - HIDDEN if Recurring */}
                  {!form.isRecurring && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Event Date (Start Date)
                      </label>
                      <input
                        type="date"
                        required
                        value={form.date}
                        onChange={(e) =>
                          setForm({ ...form, date: e.target.value })
                        }
                        className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none bg-white"
                      />
                    </div>
                  )}

                  {/* Time Picker */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Time (Optional)
                    </label>
                    <input
                      type="time"
                      value={form.time}
                      onChange={(e) =>
                        setForm({ ...form, time: e.target.value })
                      }
                      className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none bg-white"
                    />
                  </div>
                </div>

                {/* Day Selector (Conditional) */}
                {form.isRecurring && (
                  <div className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm font-bold text-blue-800 mb-3">
                      Select Repeating Days:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {DAYS_OF_WEEK.map((day) => {
                        const isSelected = form.recurringDays?.includes(day);
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => toggleDay(day)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-all ${
                              isSelected
                                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            {day.slice(0, 3)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <button
                  disabled={loading || uploadingImg}
                  type="submit"
                  className={`flex-grow md:flex-grow-0 px-8 py-4 rounded-xl font-bold text-white shadow-md transform active:scale-95 transition-all ${
                    isEditing
                      ? "bg-amber-500 hover:bg-amber-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  } ${loading ? "opacity-70 cursor-wait" : ""}`}
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
                      resetForm();
                    }}
                    className="px-6 py-4 rounded-xl font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* --- LIST VIEW --- */}
        <div className="space-y-6 pb-20">
          <h2 className="text-xl font-bold text-gray-800">
            Active Events ({events.length})
          </h2>
          <div className="grid gap-4">
            {events.map((event) => (
              <div
                key={event._id || event.id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    {event.img && (
                      <Image
                        src={event.img}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {event.title_en}
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-1">
                      {/* Show date only if NOT recurring */}
                      {!event.isRecurring && event.date && (
                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1">
                          <HiCalendar /> {event.date}
                        </span>
                      )}

                      {event.time && (
                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1">
                          <HiClock /> {event.time}
                        </span>
                      )}

                      {event.isRecurring && (
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1 border border-blue-100">
                          <HiRefresh />{" "}
                          {event.recurringDays
                            ?.map((d) => d.slice(0, 3))
                            .join(", ")}
                        </span>
                      )}
                    </div>

                    {(event.note_en || event.note_hu) && (
                      <div className="flex gap-2 mt-1">
                        {event.note_en && (
                          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 flex items-center gap-1">
                            <HiExclamation /> EN: {event.note_en}
                          </span>
                        )}
                        {event.note_hu && (
                          <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 flex items-center gap-1">
                            <HiExclamation /> HU: {event.note_hu}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <HiPencil className="text-lg" />
                  </button>
                  <button
                    onClick={() => handleDelete(event._id || event.id!)}
                    className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <HiTrash className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
