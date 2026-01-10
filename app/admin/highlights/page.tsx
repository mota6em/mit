"use client";
import { useHighlights } from "@/app/hooks/useHighlights";
import HighlightForm from "../../../components/Highlights/HighlightForm";
import HighlightList from "../../../components/Highlights/HighlightList";

export default function AdminHighlights() {
  const {
    highlights,
    loading,
    createOrUpdateHighlight,
    form,
    setForm,
    isEditing,
    setIsEditing,
    handleEdit,
    handleCancel,
    resetForm,
  } = useHighlights();

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto gap-4 flex flex-col">
        <HighlightForm
          form={form}
          setForm={setForm}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onSubmit={createOrUpdateHighlight}
          onCancel={handleCancel}
          loading={loading}
          resetForm={resetForm}
        />
        <HighlightList highlights={highlights} onEdit={handleEdit} />
      </div>
    </div>
  );
}
