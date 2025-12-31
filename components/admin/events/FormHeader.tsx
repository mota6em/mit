import { HiPencil, HiPlus, HiX } from "react-icons/hi";

interface FormHeaderProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  resetForm: () => void;
}

export default function FormHeader({
  isEditing,
  setIsEditing,
  resetForm,
}: FormHeaderProps) {
  return (
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
  );
}
