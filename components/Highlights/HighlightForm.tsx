"use client";
import { useImageUpload } from "@/app/hooks/useHighlights";
import { HighlightData } from "@/lib/types";
import FormHeader from "../admin/highlights/FormHeader";
import ImageUploadSection from "../admin/highlights/ImageUploadSection";
import ContentSection from "../admin/highlights/ContentSection";
import SubmitButtons from "../admin/highlights/SubmitButtons";

interface HighlightFormProps {
  form: HighlightData;
  setForm: React.Dispatch<React.SetStateAction<HighlightData>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (highlightData: HighlightData) => Promise<boolean>;
  onCancel: () => void;
  loading: boolean;
  resetForm: () => void;
}

export default function HighlightForm({
  form,
  setForm,
  isEditing,
  setIsEditing,
  onSubmit,
  onCancel,
  loading,
  resetForm,
}: HighlightFormProps) {
  const { uploadingImg, uploadImage } = useImageUpload();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await onSubmit(form);
    if (success) {
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
      <div
        className={`p-1 h-2 w-full ${
          isEditing ? "bg-amber-400" : "bg-blue-500"
        }`}
      />
      <div className="p-8">
        <FormHeader
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          resetForm={resetForm}
        />

        <form onSubmit={handleSubmit} className="gap-6 flex flex-col">
          <ImageUploadSection
            images={form.images}
            setForm={setForm}
            uploadingImg={uploadingImg}
            uploadImage={uploadImage}
          />

          <ContentSection
            title_en={form.title_en}
            desc_en={form.desc_en}
            title_hu={form.title_hu ?? ""}
            desc_hu={form.desc_hu ?? ""}
            date={form.date}
            setForm={setForm}
          />

          <SubmitButtons
            isEditing={isEditing}
            loading={loading}
            onCancel={onCancel}
          />
        </form>
      </div>
    </div>
  );
}
