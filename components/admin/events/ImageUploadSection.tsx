import { useCallback } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { HiCloudUpload } from "react-icons/hi";
import { EventData } from "@/lib/types";

interface ImageUploadSectionProps {
  img: string;
  setForm: React.Dispatch<React.SetStateAction<EventData>>;
  uploadingImg: boolean;
  uploadImage: (file: File) => Promise<string | null>;
}

export default function ImageUploadSection({
  img,
  setForm,
  uploadingImg,
  uploadImage,
}: ImageUploadSectionProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles?.[0]) return;
      const url = await uploadImage(acceptedFiles[0]);
      if (url) {
        setForm((prev: EventData) => ({ ...prev, img: url }));
      }
    },
    [uploadImage, setForm]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-4">
        <HiCloudUpload className="text-lg text-blue-500" /> Event Cover Image
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
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-3" />
            <p className="text-sm text-blue-600 font-bold">Uploading...</p>
          </div>
        ) : img ? (
          <>
            <Image src={img} alt="Preview" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white z-10">
              <HiCloudUpload className="text-4xl mb-2" />
              <p className="font-bold">Click to change</p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4 text-center">
            <HiCloudUpload className="text-5xl mb-4" />
            <p className="text-lg font-bold text-gray-600">
              Drag & drop or click
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
