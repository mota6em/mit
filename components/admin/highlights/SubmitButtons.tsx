interface SubmitButtonsProps {
  isEditing: boolean;
  loading: boolean;
  onCancel: () => void;
}

export default function SubmitButtons({
  isEditing,
  loading,
  onCancel,
}: SubmitButtonsProps) {
  return (
    <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
      <button
        disabled={loading}
        type="submit"
        className={`grow md:grow-0 px-8 py-4 rounded-xl font-bold text-white shadow-md transform active:scale-95 transition-all ${
          isEditing
            ? "bg-amber-500 hover:bg-amber-600"
            : "bg-blue-600 hover:bg-blue-700"
        } ${loading ? "opacity-70 cursor-wait" : ""}`}
      >
        {loading
          ? "Saving..."
          : isEditing
          ? "Update Highlight"
          : "Create Highlight"}
      </button>
      {isEditing && (
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-4 rounded-xl font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
