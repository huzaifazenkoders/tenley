import { createClient } from "@/features/supabase/client";
import { getErrorMessage } from "@/features/supabase/errors";
import type { AuthResponse } from "@/features/auth/services/types";
import { toast } from "sonner";
import type { GetTenantListParams, TenantListResponse } from "../types";

const supabase = createClient();

export const getTenantList = async (
  params: GetTenantListParams
): Promise<AuthResponse<TenantListResponse>> => {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.rpc("get_tenant_list", {
    p_user_id: user?.id ?? null,
    p_status: params.status,
    p_page: params.page ?? 1,
    p_page_size: params.pageSize ?? 10,
    p_search: params.search ?? null,
    p_property_purpose: params.propertyType ?? null,
    p_start_date: params.dateFrom ?? null,
    p_end_date: params.dateTo ?? null
  });

  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};
