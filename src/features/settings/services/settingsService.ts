import { createClient } from "@/features/supabase/client";
import { getErrorMessage } from "@/features/supabase/errors";
import type { AuthResponse } from "@/features/auth/services/types";
import { toast } from "sonner";

const supabase = createClient();

export interface ProfileInfo {
  id?: string;
  email?: string;
  full_name?: string;
  phone?: string;
  profile_image_url?: string;
}

export interface CompanyInfo {
  company_name?: string;
  company_email?: string;
  website_url?: string | null;
  registration_number?: string;
  phone_number?: string;
  address?: string;
  logo?: string | null;
}

export interface MeResponse {
  profile?: ProfileInfo | null;
  company?: CompanyInfo | null;
  company_profile?: CompanyInfo | null;
  profile_information?: ProfileInfo | null;
  company_information?: CompanyInfo | null;
  email?: string;
  full_name?: string;
  phone?: string;
  profile_image_url?: string;
}

export const getMe = async (): Promise<AuthResponse<MeResponse>> => {
  const { data, error } = await supabase.rpc("me");
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data: data as MeResponse, error: null };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) return { data: null, error: getErrorMessage(error) };
  return { data: data.user, error: null };
};

export const updateProfile = async (payload: {
  full_name: string;
  phone: string;
  profile_image_url?: string;
}): Promise<AuthResponse> => {
  const { data, error } = await supabase.rpc("update_profile", {
    p_payload: {
      full_name: payload.full_name,
      phone: payload.phone,
      profile_image_url: payload.profile_image_url ?? ""
    }
  });
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  toast.success("Profile updated successfully");
  return { data, error: null };
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
