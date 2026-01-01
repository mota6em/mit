import { HighlightData } from "@/lib/types";
import { useState, useEffect, useCallback } from "react";

export function useHighlights() {
  const [highlights, setHighlights] = useState<HighlightData[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<HighlightData>({
    images: [],
    title_en: "",
    title_hu: "",
    desc_en: "",
    desc_hu: "",
    note_en: "",
    note_hu: "",
    year: "",
    category: "",
    status: "active",
    date: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch("/api/highlights")
      .then((res) => res.json())
      .then((data) => setHighlights(data));
  }, []);

  const createOrUpdateHighlight = async (highlightData: HighlightData) => {
    setLoading(true);
    const res = await fetch("/api/highlights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(highlightData),
    });

    if (res.status === 401) {
      setLoading(false);
      return false;
    }

    const refresh = await fetch("/api/highlights");
    setHighlights(await refresh.json());
    setLoading(false);
    return true;
  };

  const deleteHighlight = async (id: string) => {
    const res = await fetch("/api/highlights", {
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
    setHighlights(highlights.filter((h) => (h._id || h.id) !== id));
    window.location.reload();
    return true;
  };

  const handleEdit = (highlight: HighlightData) => {
    setForm({
      ...highlight,
      note_en: highlight.note_en || "",
      note_hu: highlight.note_hu || "",
      year: highlight.year || "",
      category: highlight.category || "",
      status: highlight.status || "active",
      date: highlight.date || "",
      images: highlight.images || [],
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setForm({
      images: [],
      title_en: "",
      title_hu: "",
      desc_en: "",
      desc_hu: "",
      note_en: "",
      note_hu: "",
      year: "",
      category: "",
      status: "active",
      date: "",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await deleteHighlight(id);
  };

  return {
    highlights,
    loading,
    createOrUpdateHighlight,
    deleteHighlight,
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
