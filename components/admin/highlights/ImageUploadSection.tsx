import { useCallback, useState, useRef } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import {
  HiCloudUpload,
  HiX,
  HiArrowUp,
  HiArrowDown,
  HiMenuAlt4,
} from "react-icons/hi";
import { HighlightData } from "@/lib/types";

interface ImageUploadSectionProps {
  images: string[];
  setForm: React.Dispatch<React.SetStateAction<HighlightData>>;
  uploadingImg: boolean;
  uploadImage: (file: File) => Promise<string | null>;
}

export default function ImageUploadSection({
  images,
  setForm,
  uploadingImg,
  uploadImage,
}: ImageUploadSectionProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragCounter = useRef(0);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        const url = await uploadImage(file);
        if (url) {
          setForm((prev: HighlightData) => ({
            ...prev,
            images: [...prev.images, url],
          }));
        }
      }
    },
    [uploadImage, setForm]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const removeImage = (index: number) => {
    setForm((prev: HighlightData) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= images.length) return;
    setForm((prev: HighlightData) => {
      const newImages = [...prev.images];
      const [movedImage] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, movedImage);
      return { ...prev, images: newImages };
    });
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    dragCounter.current++;
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDragOverIndex(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    dragCounter.current = 0;
    if (draggedIndex !== null && draggedIndex !== toIndex) {
      moveImage(draggedIndex, toIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
    dragCounter.current = 0;
  };

  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
        <HiCloudUpload className="text-lg text-blue-500" /> Highlight Images
      </label>
      {images.length > 1 && (
        <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
          <HiMenuAlt4 className="text-gray-400" />
          Drag images to reorder. First image will be the cover.
        </p>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {images.map((img, index) => (
            <div
              key={`${img}-${index}`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`relative group rounded-xl overflow-hidden border-2 transition-all cursor-grab active:cursor-grabbing ${
                draggedIndex === index
                  ? "opacity-50 scale-95 border-blue-400"
                  : dragOverIndex === index
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : index === 0
                  ? "border-emerald-400 ring-2 ring-emerald-100"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Order Badge */}
              <div
                className={`absolute top-2 left-2 z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${
                  index === 0
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-gray-700 border border-gray-200"
                }`}
              >
                {index + 1}
              </div>

              {/* Cover Label */}
              {index === 0 && (
                <div className="absolute top-2 right-10 z-10 px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full shadow-md">
                  COVER
                </div>
              )}

              <Image
                src={img}
                alt={`Image ${index + 1}`}
                width={200}
                height={150}
                className="w-full h-28 object-cover"
                draggable={false}
              />

              {/* Action Buttons Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                {/* Move Up */}
                {index > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveImage(index, index - 1);
                    }}
                    className="p-1.5 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    title="Move up"
                  >
                    <HiArrowUp className="text-gray-700 text-sm" />
                  </button>
                )}

                {/* Move Down */}
                {index < images.length - 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveImage(index, index + 1);
                    }}
                    className="p-1.5 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    title="Move down"
                  >
                    <HiArrowDown className="text-gray-700 text-sm" />
                  </button>
                )}

                {/* Remove */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="p-1.5 bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                  title="Remove image"
                >
                  <HiX className="text-white text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        {...getRootProps()}
        className={`relative w-full h-28 rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden group ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-gray-100"
        }`}
      >
        <input {...getInputProps()} />
        {uploadingImg ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-20">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mb-2" />
            <p className="text-xs text-blue-600 font-bold">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4 text-center">
            <HiCloudUpload className="text-2xl mb-1" />
            <p className="text-xs font-bold text-gray-600">
              {images.length === 0
                ? "Drop images here or click to upload"
                : "Add more images"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
