import type { AuthResponse } from "@/features/auth/services/types";
import type {
  BulkCreateTenantPayload,
  Tenant,
  UpdateTenantPayload
} from "../types";

export const bulkCreateTenants = async (_args: {
  tenants: BulkCreateTenantPayload[];
  propertyId?: string;
  unitId?: string;
}): Promise<AuthResponse<Tenant[]>> => {
  return { data: [], error: null };
};

export const updateTenant = async (
  _tenantId: string,
  _payload: UpdateTenantPayload
): Promise<AuthResponse<Tenant>> => {
  return { data: null, error: null };
};

export const endTenant = async (
  _tenantId: string,
  _reason: string
): Promise<AuthResponse<null>> => {
  return { data: null, error: null };
};
