import { useCallback } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { HiCloudUpload, HiX } from "react-icons/hi";
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

  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-4">
        <HiCloudUpload className="text-lg text-blue-500" /> Highlight Images
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {images.map((img, index) => (
          <div key={index} className="relative group">
            <Image
              src={img}
              alt={`Preview ${index + 1}`}
              width={200}
              height={150}
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <HiX className="text-sm" />
            </button>
          </div>
        ))}
      </div>
      <div
        {...getRootProps()}
        className={`relative w-full h-32 rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden group ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-gray-100"
        }`}
      >
        <input {...getInputProps()} />
        {uploadingImg ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2" />
            <p className="text-sm text-blue-600 font-bold">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4 text-center">
            <HiCloudUpload className="text-3xl mb-2" />
            <p className="text-sm font-bold text-gray-600">
              Drag & drop or click to add images
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
