import type { AuthResponse } from "@/features/auth/services/types";

export type Permission = {
  id: string;
  key: string;
  module: string;
  description: string;
};

export const getPermissions = async (): Promise<AuthResponse<Permission[]>> => {
  return { data: [], error: null };
};
