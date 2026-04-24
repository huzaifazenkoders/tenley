import { createClient } from "@/features/supabase/client";
import { getErrorMessage } from "@/features/supabase/errors";
import type { AuthResponse } from "@/features/auth/services/types";
import type { BulkCreateTenantPayload, Tenant, UpdateTenantPayload } from "../types";
import { toast } from "sonner";

const supabase = createClient();

export const bulkCreateTenants = async ({
  tenants,
  propertyId,
  unitId,
}: {
  tenants: BulkCreateTenantPayload[];
  propertyId?: string;
  unitId?: string;
}): Promise<AuthResponse<Tenant[]>> => {
  const { data, error } = await supabase.rpc("bulk_create_tenants", {
    p_tenants: tenants,
    p_property_id: propertyId ?? null,
    p_unit_id: unitId ?? null,
  });

  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};

export const updateTenant = async (
  tenantId: string,
  payload: UpdateTenantPayload
): Promise<AuthResponse<Tenant>> => {
  const { data, error } = await supabase.rpc("update_tenant", {
    p_tenant_id: tenantId,
    p_payload: payload,
  });

  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};

export const endTenant = async (
  tenantId: string,
  reason: string
): Promise<AuthResponse<null>> => {
  const { data, error } = await supabase.rpc("end_tenant", {
    p_tenant_id: tenantId,
    p_reason: reason,
  });

  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};
