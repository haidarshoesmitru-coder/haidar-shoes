"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UploadCloud } from "lucide-react";
import { uploadCategoryImage } from "@/lib/actions/images";

export default function CategoryImageUploader({
  categoryId,
  imageUrl,
}: {
  categoryId: string;
  imageUrl: string | null;
}) {
  const router = useRouter();
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, startUpload] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    startUpload(async () => {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadCategoryImage(categoryId, formData);
      if (!result.success) setError(result.error ?? "Upload failed.");
      router.refresh();
    });
  }

  return (
    <div>
      {imageUrl && (
        <div className="relative w-full aspect-[16/9] mb-4 bg-canvas">
          <Image src={imageUrl} alt="" fill sizes="600px" className="object-cover" />
        </div>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDraggingOver(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors duration-150 ${
          isDraggingOver ? "border-ink bg-canvas" : "border-line hover:border-stone"
        }`}
      >
        <UploadCloud className="mx-auto mb-2 text-stone" size={22} aria-hidden="true" />
        <p className="text-sm text-graphite">
          {imageUrl ? "Drop a new image to replace it" : "Drag & drop an image, or click to browse"}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      {isUploading && <p className="text-sm text-graphite mt-2">Uploading…</p>}
      {error && <p className="text-sm text-clay mt-2">{error}</p>}
    </div>
  );
}
