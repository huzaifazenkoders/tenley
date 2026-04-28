import type { AuthResponse } from "@/features/auth/services/types";

export interface SearchStaffItem {
  id: string;
  full_name: string;
  email: string;
  profile_image_url: string | null;
}

export interface InviteManagerPayload {
  full_name: string;
  email: string;
  designation?: string | null;
  role_id?: string | null;
  property_id?: string | null;
}

export interface BulkAssignManagersResult {
  success: boolean;
  requested_assignments: number;
  created_assignments: number;
  already_assigned: number;
  skipped: number;
}

export const searchStaffByEmail = async (
  _keyword: string,
  _company_id: string,
  _limit = 10,
): Promise<AuthResponse<SearchStaffItem[]>> => {
  return { data: [], error: null };
};

export const inviteManager = async (
  _payload: InviteManagerPayload,
): Promise<
  AuthResponse<{ success: boolean; messageId: string; inviteLink: string }>
> => {
  return { data: null, error: null };
};

export type UnassignManagerAction =
  | "removed_from_company"
  | "unassigned_from_property";

export interface UnassignManagerResponse {
  success: boolean;
  action: UnassignManagerAction;
  property_id?: string;
}

export interface UnassignManagerParams {
  manager_id: string;
  property_id?: string | null;
  remove_from_company?: boolean;
}

export const unassignManager = async (
  _params: UnassignManagerParams,
): Promise<AuthResponse<UnassignManagerResponse>> => {
  return { data: null, error: null };
};

export const bulkAssignManagersToProperties = async (_params: {
  manager_ids: string[];
  property_ids: string[];
}): Promise<AuthResponse<BulkAssignManagersResult>> => {
  return {
    data: {
      success: true,
      requested_assignments: 0,
      created_assignments: 0,
      already_assigned: 0,
      skipped: 0,
    },
    error: null,
  };
};
