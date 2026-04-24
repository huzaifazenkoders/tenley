import { createClient } from "./client";

const BUCKET = "tenly";

export const uploadFile = async (
  file: File,
  path: string
): Promise<{ url: string | null; error: string | null }> => {
  const supabase = createClient();

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    upsert: true,
    contentType: file.type,
  });

  if (error) return { url: null, error: error.message };

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, error: null };
};

export const uploadLogo = async (
  file: File,
  userId: string
): Promise<{ url: string | null; error: string | null }> => {
  const ext = file.name.split(".").pop();
  const path = `logos/${userId}/logo.${ext}`;
  return uploadFile(file, path);
};

export const uploadPropertyImage = async (
  file: File,
  userId: string
): Promise<{ url: string | null; error: string | null }> => {
  const ext = file.name.split(".").pop();
  const path = `property-images/${userId}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  return uploadFile(file, path);
};
