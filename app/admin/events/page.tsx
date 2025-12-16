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
} from "react-icons/hi";
import Link from "next/link";
import AdminPasswordInput from "@/components/admin/events/AdminPasswordInput";

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
  const [uploadingImg, setUploadingImg] = useState(false);

  // Fetch Events
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  // --- NEW DROPZONE HANDLER ---
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles?.[0]) return;

      // Check auth first
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
          alert("Wrong Password!" + adminPassword);
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

  // Configure Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxFiles: 1,
  });

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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto gap-4 flex flex-col">
        {/* --- HEADER & AUTH --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Events Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage your community programs
            </p>
            <Link href="/">
              <button className="mt-2 px-4 cursor-pointer py-2 bg-blue-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-200 shadow-lg">
                Go Back to MIT home page
              </button>
            </Link>
          </div>

          <Suspense
            fallback={
              <div className="w-full md:w-auto h-12 bg-gray-200 rounded-xl animate-pulse" />
            }
          >
            <AdminPasswordInput
              adminPassword={adminPassword}
              setAdminPassword={setAdminPassword}
            />
          </Suspense>
        </div>

        {/* --- MAIN FORM CARD --- */}
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
                  {isEditing ? "Edit Existing Event" : "Create New Event"}
                </h2>
              </div>
              {isEditing && (
                <button
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
                  className="text-gray-400 hover:text-gray-600"
                >
                  <HiX className="text-2xl" />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="gap-4 flex flex-col">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                  <HiCloudUpload className="text-lg text-blue-500" />
                  Event Cover Image
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
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-3"></div>
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
                        <p className="font-bold">
                          Click or drag to change image
                        </p>
                      </div>
                    </>
                  ) : (
                    // Empty State
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4 text-center">
                      <HiCloudUpload
                        className={`text-5xl mb-4 ${
                          isDragActive ? "text-blue-500" : "text-gray-300"
                        }`}
                      />
                      {isDragActive ? (
                        <p className="text-blue-500 font-bold text-lg">
                          Drop the image here...
                        </p>
                      ) : (
                        <div>
                          <p className="text-lg font-bold text-gray-600">
                            Drag & drop an image here, or click to select
                          </p>
                          <p className="text-sm mt-2">
                            Recommended: JPG/PNG, Max 2MB
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Text Fields Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* English Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200">
                      EN
                    </span>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                      English Content
                    </h3>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      required
                      value={form.title_en}
                      onChange={(e) =>
                        setForm({ ...form, title_en: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                      placeholder="e.g. Summer Camp 2025"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.desc_en}
                      onChange={(e) =>
                        setForm({ ...form, desc_en: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none"
                      placeholder="Brief summary of the event..."
                    />
                  </div>
                </div>

                {/* Hungarian Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 border border-green-200">
                      HU
                    </span>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                      Hungarian Content
                    </h3>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Cím (Title)
                    </label>
                    <input
                      required
                      value={form.title_hu}
                      onChange={(e) =>
                        setForm({ ...form, title_hu: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none"
                      placeholder="pl. Nyári Tábor 2025"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Leírás (Description)
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.desc_hu}
                      onChange={(e) =>
                        setForm({ ...form, desc_hu: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none resize-none"
                      placeholder="Rövid összefoglaló..."
                    />
                  </div>
                </div>
              </div>

              {/* Date Field */}
              <div className="pt-4 border-t border-gray-100">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Event Date
                </label>
                <div className="relative max-w-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiCalendar className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="block w-full pl-10 px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none"
                  />
                </div>
              </div>

              {/* ---  BUTTONS UI --- */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <button
                  disabled={loading || uploadingImg}
                  type="submit"
                  className={`flex-grow md:flex-grow-0 px-8 py-4 rounded-xl font-bold text-white shadow-md transform active:scale-95 transition-all
                    ${
                      isEditing
                        ? "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20"
                        : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20"
                    } ${
                    loading || uploadingImg
                      ? "opacity-70 cursor-wait"
                      : "hover:-translate-y-1"
                  }`}
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
                    className="px-6 py-4 rounded-xl font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* --- EVENTS LIST --- */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm">
              {events.length}
            </span>
            Active Events
          </h2>

          <div className="grid gap-4">
            {events.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <HiCalendar className="text-6xl text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">
                  No events found yet. Create your first one above!
                </p>
              </div>
            )}

            {events.map((event) => (
              <div
                key={event.id}
                className="group flex flex-col md:flex-row bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 overflow-hidden"
              >
                {/* --- IMAGE SECTION --- */}
                <div className="relative w-full h-48 md:w-72 md:h-auto shrink-0 bg-gray-200">
                  {event.img ? (
                    <Image
                      src={event.img}
                      alt={event.title_en}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-300">
                      <HiCloudUpload className="text-4xl" />
                    </div>
                  )}

                  {/* Mobile Date Overlay */}
                  <div className="absolute top-3 left-3 md:hidden bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-gray-700 shadow-sm flex items-center gap-1">
                    <HiCalendar className="text-blue-500" />
                    {event.date}
                  </div>
                </div>

                {/* --- CONTENT SECTION --- */}
                <div className="flex flex-col flex-1 p-5 md:p-6">
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl leading-tight">
                          {event.title_en}
                        </h3>
                        <p className="text-sm text-gray-400 font-medium italic mt-1">
                          {event.title_hu}
                        </p>
                      </div>
                      <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 shrink-0 ml-4">
                        <HiCalendar className="text-blue-500" />
                        <span>{event.date}</span>
                      </div>
                    </div>

                    {/* Description*/}
                    <p className="text-gray-600 text-sm mt-3 leading-relaxed line-clamp-2 md:line-clamp-none">
                      {event.desc_en}
                    </p>
                  </div>

                  {/* Lower Content: Buttons */}
                  {/* Grid on mobile, Flex row on desktop */}
                  <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-gray-100 md:border-t-0 md:pt-0 md:mt-6 md:flex md:justify-start">
                    <button
                      onClick={() => handleEdit(event)}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-semibold text-sm hover:bg-blue-100 transition-colors"
                    >
                      <HiPencil className="text-lg" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDelete(event.id!)}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-500 font-semibold text-sm hover:bg-red-100 transition-colors"
                    >
                      <HiTrash className="text-lg" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
