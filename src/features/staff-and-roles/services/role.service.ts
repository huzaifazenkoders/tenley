import { createClient } from "@/features/supabase/client";
import { getErrorMessage } from "@/features/supabase/errors";
import type { AuthResponse } from "@/features/auth/services/types";
import { toast } from "sonner";

const supabase = createClient();

export type RolePermission = {
  key: string;
  module: string;
  enabled: boolean;
};

export type Role = {
  id: string;
  name: string;
  description: string;
  permissions: RolePermission[];
};

export type RolePermissionDetail = {
  key: string;
  module: string;
  description: string;
  enabled: boolean;
};

export type RoleDetails = {
  id: string;
  name: string;
  description: string;
  permissions: RolePermissionDetail[];
};

export type CreateRolePayload = {
  name: string;
  description?: string;
  permissions: { key: string; enabled: boolean }[];
};

export type UpdateRolePayload = {
  name?: string;
  description?: string;
  permissions?: { key: string; enabled: boolean }[];
};

export const getRoles = async (): Promise<AuthResponse<Role[]>> => {
  const { data, error } = await supabase.rpc("get_roles");
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};

export const getRoleDetails = async (
  roleId: string
): Promise<AuthResponse<RoleDetails>> => {
  const { data, error } = await supabase.rpc("get_role_details", {
    p_role_id: roleId,
  });
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};

export const createRole = async (
  payload: CreateRolePayload
): Promise<AuthResponse<Role>> => {
  const { data, error } = await supabase.rpc("create_role", {
    p_payload: payload,
  });
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};

export const updateRole = async (
  roleId: string,
  payload: UpdateRolePayload
): Promise<AuthResponse<Role>> => {
  const { data, error } = await supabase.rpc("update_role", {
    p_role_id: roleId,
    p_payload: payload,
  });
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};
