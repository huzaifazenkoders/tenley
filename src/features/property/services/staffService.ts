import { createClient, supabaseEdgeClient } from "@/features/supabase/client";
import { getErrorMessage } from "@/features/supabase/errors";
import type { AuthResponse } from "@/features/auth/services/types";
import { toast } from "sonner";
import { getMe } from "@/features/settings/services/settingsService";

const supabase = createClient();
const supabaseEdge = supabaseEdgeClient();

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

const getCompanyAndUser = async () => {
  const { data: me } = await getMe();
  const company =
    me?.company ?? me?.company_profile ?? me?.company_information ?? null;
  const profile = me?.profile ?? me?.profile_information ?? null;
  const company_id = company?.company_id ?? company?.id ?? "";
  const user_id = profile?.id ?? "";
  return { user_id, company_id };
};

export const searchStaffByEmail = async (
  keyword: string,
  limit = 10
): Promise<AuthResponse<SearchStaffItem[]>> => {
  const { data, error } = await supabase.rpc("search_staff_by_email", {
    p_keyword: keyword,
    p_limit: limit
  });
  if (error) {
    return { data: null, error: getErrorMessage(error) };
  }
  return { data: (data as { data: SearchStaffItem[] }).data, error: null };
};

export const inviteManager = async (
  payload: InviteManagerPayload
): Promise<
  AuthResponse<{ success: boolean; messageId: string; inviteLink: string }>
> => {
  const { user_id, company_id } = await getCompanyAndUser();
  const { data, error } = await supabaseEdge.functions.invoke(
    "invite_manager",
    {
      body: {
        ...payload,
        company_id: company_id || undefined,
        added_by: user_id
      }
    }
  );
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  toast.success("Invitation sent successfully");
  return { data, error: null };
};

export const bulkAssignManagersToProperties = async (params: {
  manager_ids: string[];
  property_ids: string[];
}): Promise<AuthResponse<BulkAssignManagersResult>> => {
  const { company_id } = await getCompanyAndUser();
  const { data, error } = await supabase.rpc(
    "bulk_assign_managers_to_properties",
    {
      p_company_id: company_id,
      p_manager_ids: params.manager_ids,
      p_property_ids: params.property_ids
    }
  );
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};
