"use client";
import { useImageUpload } from "../../hooks/useEvents";
import { EventData } from "@/lib/types";
import FormHeader from "../admin/events/FormHeader";
import ImageUploadSection from "../admin/events/ImageUploadSection";
import ContentSection from "../admin/events/ContentSection";
import DateTimeSection from "../admin/events/DateTimeSection";
import LocationSection from "../admin/events/LocationSection";
import RegistrationSection from "../admin/events/RegistrationSection";
import SubmitButtons from "../admin/events/SubmitButtons";

interface EventFormProps {
  form: EventData;
  setForm: React.Dispatch<React.SetStateAction<EventData>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (eventData: EventData) => Promise<boolean>;
  onCancel: () => void;
  loading: boolean;
  resetForm: () => void;
}

export default function EventForm({
  form,
  setForm,
  isEditing,
  setIsEditing,
  onSubmit,
  onCancel,
  loading,
  resetForm,
}: EventFormProps) {
  const { uploadingImg, uploadImage } = useImageUpload();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.isRecurring && !form.date) {
      alert("Please select an Event Date (or mark as Recurring)");
      return;
    }

    const dataToSend = {
      ...form,
      date: form.isRecurring ? "" : form.date,
    };

    const success = await onSubmit(dataToSend);
    if (success) {
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-ink-200/50 overflow-hidden border border-ink-100">
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
            img={form.img}
            setForm={setForm}
            uploadingImg={uploadingImg}
            uploadImage={uploadImage}
          />

          <ContentSection
            title_en={form.title_en}
            desc_en={form.desc_en}
            note_en={form.note_en ?? ""}
            title_hu={form.title_hu ?? ""}
            desc_hu={form.desc_hu ?? ""}
            note_hu={form.note_hu ?? ""}
            title_ar={form.title_ar ?? ""}
            desc_ar={form.desc_ar ?? ""}
            note_ar={form.note_ar ?? ""}
            setForm={setForm}
          />

          <DateTimeSection
            isRecurring={form.isRecurring ?? false}
            date={form.date ?? ""}
            time={form.time ?? ""}
            recurringDays={form.recurringDays ?? []}
            setForm={setForm}
          />

          <LocationSection location={form.location ?? ""} setForm={setForm} />

          <RegistrationSection
            registrationUrl={form.registrationUrl ?? ""}
            setForm={setForm}
          />

          <SubmitButtons
            isEditing={isEditing ?? false}
            loading={loading}
            uploadingImg={uploadingImg ?? false}
            onCancel={onCancel}
          />
        </form>
      </div>
    </div>
  );
}
