"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UploadCloud, X, Star, GripVertical } from "lucide-react";
import type { ProductImage } from "@/lib/supabase/types";
import {
  uploadProductImage,
  deleteProductImage,
  reorderProductImages,
  setFeaturedImage,
} from "@/lib/actions/images";

export default function ImageUploader({
  productId,
  images,
}: {
  productId: string;
  images: ProductImage[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(images);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, startUpload] = useTransition();
  const dragIndexRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setUploadError(null);

    startUpload(async () => {
      for (const file of Array.from(fileList)) {
        const formData = new FormData();
        formData.append("file", file);
        const result = await uploadProductImage(productId, formData);
        if (!result.success) {
          setUploadError(result.error ?? "Upload failed.");
        }
      }
      router.refresh();
    });
  }

  function handleDelete(image: ProductImage) {
    if (!confirm("Remove this image?")) return;
    setItems((prev) => prev.filter((i) => i.id !== image.id));
    startUpload(async () => {
      await deleteProductImage(image.id, image.storage_path, productId);
      router.refresh();
    });
  }

  function handleSetFeatured(image: ProductImage) {
    setItems((prev) => prev.map((i) => ({ ...i, is_featured: i.id === image.id })));
    startUpload(async () => {
      await setFeaturedImage(productId, image.id);
      router.refresh();
    });
  }

  function handleDragStart(index: number) {
    dragIndexRef.current = index;
  }

  function handleDropReorder(index: number) {
    const from = dragIndexRef.current;
    dragIndexRef.current = null;
    if (from === null || from === index) return;

    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(index, 0, moved);
    setItems(next);

    startUpload(async () => {
      await reorderProductImages(productId, next.map((i) => i.id));
      router.refresh();
    });
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDraggingOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors duration-150 ${
          isDraggingOver ? "border-ink bg-canvas" : "border-line hover:border-stone"
        }`}
      >
        <UploadCloud className="mx-auto mb-3 text-stone" size={28} aria-hidden="true" />
        <p className="text-sm text-graphite">
          Drag &amp; drop images here, or click to browse
        </p>
        <p className="text-xs text-stone mt-1">JPG, PNG or WEBP — up to 8MB each</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {isUploading && <p className="text-sm text-graphite mt-3">Uploading…</p>}
      {uploadError && <p className="text-sm text-clay mt-3">{uploadError}</p>}

      {items.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {items.map((image, index) => (
            <div
              key={image.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDropReorder(index)}
              className="relative aspect-square bg-canvas border border-line group"
            >
              <span className="absolute top-2 left-2 z-10 text-white/80 cursor-grab" aria-hidden="true">
                <GripVertical size={16} />
              </span>
              <Image src={image.url} alt="" fill sizes="200px" className="object-cover" />

              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors duration-150 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => handleSetFeatured(image)}
                  title="Set as featured image"
                  className={`h-8 w-8 flex items-center justify-center rounded-full ${
                    image.is_featured ? "bg-clay text-white" : "bg-white/90 text-ink"
                  }`}
                >
                  <Star size={14} aria-hidden="true" fill={image.is_featured ? "currentColor" : "none"} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(image)}
                  title="Delete image"
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-white/90 text-clay"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </div>

              {image.is_featured && (
                <span className="absolute bottom-2 left-2 bg-clay text-white text-[10px] uppercase tracking-widest2 px-2 py-1">
                  Featured
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
