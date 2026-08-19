import { EventData } from "@/lib/types";
import { useState, useEffect, useCallback } from "react";

export function useEvents() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<EventData>({
    img: "",
    title_en: "",
    title_hu: "",
    title_ar: "",
    desc_en: "",
    desc_hu: "",
    desc_ar: "",
    note_en: "",
    note_hu: "",
    note_ar: "",
    date: "",
    time: "",
    isRecurring: false,
    recurringDays: [],
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const createOrUpdateEvent = async (eventData: EventData) => {
    setLoading(true);
    const res = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (res.status === 401) {
      setLoading(false);
      return false;
    }

    // The write already returns the updated list — no second round-trip, and
    // no chance of reading back through a cache that hasn't been purged yet.
    const { events: updated } = await res.json();
    if (Array.isArray(updated)) setEvents(updated);
    setLoading(false);
    return true;
  };

  const deleteEvent = async (id: string) => {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "delete", id }),
    });

    if (res.status === 401) {
      alert("Wrong Password!");
      return false;
    }
    // Removing the row locally is enough; the full-page reload this used to do
    // threw away the whole app and re-downloaded every asset.
    setEvents(events.filter((e) => (e._id || e.id) !== id));
    return true;
  };
  const handleEdit = (event: EventData) => {
    setForm({
      ...event,
      title_ar: event.title_ar || "",
      desc_ar: event.desc_ar || "",
      note_en: event.note_en || "",
      note_hu: event.note_hu || "",
      note_ar: event.note_ar || "",
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

  const handleCancel = () => {
    setIsEditing(false);
    resetForm();
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await deleteEvent(id);
  };

  return {
    events,
    loading,
    createOrUpdateEvent,
    deleteEvent,
    form,
    setForm,
    isEditing,
    setIsEditing,
    handleEdit,
    handleCancel,
    handleDelete,
    resetForm,
  };
}

export function useImageUpload() {
  const [uploadingImg, setUploadingImg] = useState(false);

  const uploadImage = useCallback(async (file: File) => {
    setUploadingImg(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        return data.url;
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("Image upload failed");
    } finally {
      setUploadingImg(false);
    }
    return null;
  }, []);

  return { uploadingImg, uploadImage };
}
