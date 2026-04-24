"use client";

import { uploadPropertyImage } from "@/features/supabase/storage";
import { useUserStore } from "@/store/userStore";
import { cn } from "@/lib/utils";
import { CloudUpload, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const MAX_SIZE_MB = 5;
const MAX_FILES = 10;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

interface UploadingEntry {
  id: string;
  previewUrl: string;
  uploading: boolean;
}

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
}

const PropertyImagesUploader = ({ value, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<UploadingEntry[]>([]);
  const user = useUserStore((s) => s.user);

  const handleFiles = async (files: FileList) => {
    if (!user) {
      toast.error("You must be signed in to upload images");
      return;
    }

    const remaining = MAX_FILES - value.length - uploading.length;
    if (remaining <= 0) {
      toast.error(`You can upload at most ${MAX_FILES} images`);
      return;
    }

    const accepted = Array.from(files).slice(0, remaining);
    const valid: File[] = [];

    for (const file of accepted) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast.error(`${file.name}: only JPEG, PNG, WEBP and GIF are allowed`);
        continue;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast.error(`${file.name}: must be smaller than ${MAX_SIZE_MB} MB`);
        continue;
      }
      valid.push(file);
    }

    if (valid.length === 0) return;

    // Create preview entries immediately
    const entries: UploadingEntry[] = valid.map((file) => ({
      id: Math.random().toString(36).slice(2),
      previewUrl: URL.createObjectURL(file),
      uploading: true,
    }));

    setUploading((prev) => [...prev, ...entries]);

    // Upload all in parallel
    const results = await Promise.all(
      valid.map((file, i) => uploadPropertyImage(file, user.id).then((r) => ({ ...r, id: entries[i].id, preview: entries[i].previewUrl })))
    );

    const successUrls: string[] = [];
    for (const result of results) {
      if (result.error || !result.url) {
        toast.error(result.error ?? "Upload failed");
      } else {
        successUrls.push(result.url);
      }
      URL.revokeObjectURL(result.preview);
    }

    setUploading((prev) =>
      prev.filter((e) => !entries.some((en) => en.id === e.id))
    );

    if (successUrls.length > 0) {
      onChange([...value, ...successUrls]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (url: string) => {
    onChange(value.filter((u) => u !== url));
  };

  const hasImages = value.length > 0 || uploading.length > 0;

  return (
    <div className="flex flex-col gap-3">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="p-6 bg-brand-Text-50 rounded-xl outline-1 outline-brand-Text-200 flex flex-col items-center gap-4"
      >
        {!hasImages && (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="relative w-24 h-20 flex items-end justify-center">
              <div className="absolute size-16 top-0 left-4 bg-gray-200 rounded-full" />
              <div className="absolute w-20 h-11 left-3 top-2.5 bg-gray-50 rounded-lg shadow-[0px_5px_5px_-3px_rgba(16,24,40,0.03),0px_14px_16px_-3px_rgba(16,24,40,0.08)]" />
              <div className="absolute size-1.5 left-2.5 top-2.5 bg-gray-100 rounded-full" />
              <div className="absolute size-2.5 left-2 bottom-0 bg-gray-100 rounded-full" />
              <div className="absolute size-2.5 right-0 top-5 bg-gray-100 rounded-full" />
              <div className="absolute size-1.5 right-2 top-0.5 bg-gray-100 rounded-full" />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 size-8 bg-slate-700/40 rounded-3xl backdrop-blur-sm flex items-center justify-center">
                <CloudUpload className="size-4 text-white" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 w-full text-center">
              <p className="text-base">
                <span className="text-Neutral-Grey-100 font-semibold leading-5">
                  Upload Property Images{" "}
                </span>
                <span className="text-Neutral-Grey-70 font-semibold leading-5">
                  (Optional)
                </span>
              </p>
              <span className="text-Neutral-Grey-60 text-base font-normal">
                Drag and drop your property images here, or click to browse
              </span>
            </div>
          </div>
        )}

        {/* Thumbnails grid */}
        {hasImages && (
          <div className="grid grid-cols-4 gap-3 w-full">
            {value.map((url) => (
              <div
                key={url}
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group"
              >
                <Image
                  src={url}
                  alt="Property image"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(url)}
                  className="absolute top-1 right-1 size-6 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="size-3.5 text-white" />
                </button>
              </div>
            ))}

            {uploading.map((entry) => (
              <div
                key={entry.id}
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
              >
                <Image
                  src={entry.previewUrl}
                  alt="Uploading…"
                  fill
                  className="object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="size-5 text-white animate-spin drop-shadow" />
                </div>
              </div>
            ))}

            {value.length + uploading.length < MAX_FILES && (
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className={cn(
                  "aspect-square rounded-lg border-2 border-dashed border-gray-300",
                  "flex flex-col items-center justify-center gap-1 text-gray-400",
                  "hover:border-gray-400 hover:bg-gray-50 transition-colors"
                )}
              >
                <CloudUpload className="size-5" strokeWidth={1.5} />
                <span className="text-xs font-medium">Add more</span>
              </button>
            )}
          </div>
        )}

        <Button
          variant="outline-transparent"
          size="sm"
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={value.length + uploading.length >= MAX_FILES}
        >
          Browse Files
        </Button>

        {value.length + uploading.length >= MAX_FILES && (
          <p className="text-xs text-brand-Text-400">
            Maximum of {MAX_FILES} images reached
          </p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        multiple
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default PropertyImagesUploader;
