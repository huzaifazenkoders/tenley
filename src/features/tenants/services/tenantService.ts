import { createClient } from "@/features/supabase/client";
import { getErrorMessage } from "@/features/supabase/errors";
import type { AuthResponse } from "@/features/auth/services/types";
import { toast } from "sonner";
import type {
  ArchivedTenantDetails,
  GetTenantListParams,
  TenantListResponse
} from "../types";

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

export const getArchivedTenantDetails = async (
  tenantId: string
): Promise<AuthResponse<ArchivedTenantDetails>> => {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.rpc("get_archived_tenant_details", {
    p_user_id: user?.id ?? null,
    p_tenant_id: tenantId
  });

  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};

export const assignTenantProperty = async (
  tenantId: string,
  propertyId: string | null,
  unitId?: string | null
): Promise<AuthResponse<null>> => {
  const { data, error } = await supabase.rpc("assign_tenant_property", {
    p_tenant_id: tenantId,
    p_property_id: propertyId ?? null,
    p_unit_id: unitId ?? null
  });

  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  toast.success("Property assigned successfully");
  return { data, error: null };
};

export const reassignTenant = async (
  tenantId: string,
  propertyId: string,
  unitId?: string | null
): Promise<AuthResponse<null>> => {
  const { data, error } = await supabase.rpc("reassign_tenant", {
    p_tenant_id: tenantId,
    p_property_id: propertyId,
    p_unit_id: unitId ?? null
  });

  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  toast.success("Tenant reassigned successfully");
  return { data, error: null };
};
