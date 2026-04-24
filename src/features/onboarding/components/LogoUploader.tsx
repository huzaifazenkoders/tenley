"use client";

import { uploadLogo } from "@/features/supabase/storage";
import { cn } from "@/lib/utils";
import { CloudUpload, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/features/supabase/client";

interface LogoUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

const LogoUploader = ({ value, onChange }: LogoUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!inputRef.current) return;
    inputRef.current.value = "";

    if (!file) return;

    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be smaller than 2 MB");
      return;
    }

    setUploading(true);

    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("You must be signed in to upload a logo");
      setUploading(false);
      return;
    }

    const { url, error } = await uploadLogo(file, user.id);
    setUploading(false);

    if (error || !url) {
      toast.error(error ?? "Upload failed");
      return;
    }

    onChange(url);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <div className="flex flex-col gap-1.5">
      {/* <span className="text-sm font-medium text-gray-700">
        Company Logo <span className="text-gray-400 font-normal">(Optional)</span>
      </span> */}
      <button
        type="button"
        onClick={() => !uploading && inputRef.current?.click()}
        className={cn(
          "relative w-[130px] h-[130px] rounded-xl border-2 border-dashed border-gray-300",
          "bg-gray-50 flex flex-col items-center justify-center gap-2",
          "transition-colors hover:border-gray-400 hover:bg-gray-100",
          uploading && "cursor-not-allowed opacity-60",
          value && "border-solid border-gray-200 bg-white p-1"
        )}
      >
        {value ? (
          <>
            <Image
              src={value}
              alt="Company logo"
              fill
              className="object-contain rounded-xl p-2"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 z-10 bg-white border border-gray-200 rounded-full p-0.5 shadow-sm hover:bg-gray-50"
            >
              <X className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </>
        ) : uploading ? (
          <Loader2 className="w-7 h-7 text-gray-400 animate-spin" />
        ) : (
          <>
            <CloudUpload className="w-7 h-7 text-gray-400" strokeWidth={1.5} />
            <span className="text-sm text-gray-500 font-medium">
              Upload Logo
            </span>
          </>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default LogoUploader;
