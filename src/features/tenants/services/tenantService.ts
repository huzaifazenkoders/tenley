import type { AuthResponse } from "@/features/auth/services/types";
import type {
  ArchivedTenantDetails,
  GetTenantListParams,
  TenantListResponse
} from "../types";

export const getTenantList = async (
  _params: GetTenantListParams
): Promise<AuthResponse<TenantListResponse>> => {
  return {
    data: {
      data: [],
      pagination: { page: 1, page_size: 10, total_count: 0, total_pages: 0 }
    },
    error: null
  };
};

export const getArchivedTenantDetails = async (
  _tenantId: string
): Promise<AuthResponse<ArchivedTenantDetails>> => {
  return { data: null, error: null };
};

export const assignTenantProperty = async (
  _tenantId: string,
  _propertyId: string | null,
  _unitId?: string | null
): Promise<AuthResponse<null>> => {
  return { data: null, error: null };
};

export const reassignTenant = async (
  _tenantId: string,
  _propertyId: string,
  _unitId?: string | null
): Promise<AuthResponse<null>> => {
  return { data: null, error: null };
};
