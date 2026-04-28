import type { AuthResponse } from "@/features/auth/services/types";

export type RolePermission = {
  key: string;
  module: string;
  enabled: boolean;
};

export type Role = {
  id: string;
  name: string;
  description: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  permissions?: RolePermission[];
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
  assigned_users_count: number;
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
  return { data: [], error: null };
};

export const getRoleDetails = async (
  _roleId: string
): Promise<AuthResponse<RoleDetails>> => {
  return { data: null, error: null };
};

export const createRole = async (
  _payload: CreateRolePayload
): Promise<AuthResponse<Role>> => {
  return { data: null, error: null };
};

export const updateRole = async (
  _roleId: string,
  _payload: UpdateRolePayload
): Promise<AuthResponse<Role>> => {
  return { data: null, error: null };
};
