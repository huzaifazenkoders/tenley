import { createClient } from "@/features/supabase/client";
import { getErrorMessage } from "@/features/supabase/errors";
import { toast } from "sonner";

const supabase = createClient();

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) return { data: null, error: getErrorMessage(error) };
  return { data: data.user, error: null };
};

export const updateProfile = async (payload: {
  full_name?: string;
  phone?: string;
  avatar_url?: string;
}) => {
  const { data, error } = await supabase.auth.updateUser({ data: payload });
  if (error) {
    toast.error(getErrorMessage(error));
    return { data: null, error: getErrorMessage(error) };
  }
  toast.success("Profile updated successfully");
  return { data: data.user, error: null };
};

export const changePassword = async (
  email: string,
  currentPassword: string,
  newPassword: string
) => {
  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword
  });
  if (verifyError) {
    toast.error("Current password is incorrect");
    return { error: "Current password is incorrect" };
  }
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) {
    toast.error(getErrorMessage(error));
    return { error: getErrorMessage(error) };
  }
  toast.success("Password updated successfully");
  return { error: null };
};

export const uploadAvatar = async (file: File, userId: string) => {
  const ext = file.name.split(".").pop();
  const path = `avatars/${userId}/avatar.${ext}`;
  const { error } = await supabase.storage
    .from("tenly")
    .upload(path, file, { upsert: true, contentType: file.type });
  if (error) return { url: null, error: error.message };
  const { data } = supabase.storage.from("tenly").getPublicUrl(path);
  return { url: data.publicUrl, error: null };
};
