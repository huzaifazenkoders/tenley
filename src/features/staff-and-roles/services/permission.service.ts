import { createClient } from "@/features/supabase/client";
import { getErrorMessage } from "@/features/supabase/errors";
import type { AuthResponse } from "@/features/auth/services/types";
import { toast } from "sonner";

const supabase = createClient();

export type Permission = {
  id: string;
  key: string;
  module: string;
  description: string;
};

export const getPermissions = async (): Promise<AuthResponse<Permission[]>> => {
  const { data, error } = await supabase.rpc("get_permissions");
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};
