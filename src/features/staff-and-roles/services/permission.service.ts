import { createClient } from "@/features/supabase/client";
import { getErrorMessage } from "@/features/supabase/errors";
import type { AuthResponse } from "@/features/auth/services/types";

const supabase = createClient();

export type Permission = {
  id: string;
  key: string;
  module: string;
  description: string;
};

export const getPermissions = async (): Promise<AuthResponse<Permission[]>> => {
  const { data, error } = await supabase.rpc("get_permissions");
  if (error) return { data: null, error: getErrorMessage(error) };
  return { data, error: null };
};
