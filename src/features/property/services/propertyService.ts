import { createClient } from "@/features/supabase/client";
import { getErrorMessage } from "@/features/supabase/errors";
import { toast } from "sonner";
import type { AuthResponse } from "@/features/auth/services/types";
import type {
  GetPropertiesListParams,
  PropertiesListResponse,
  PropertyByIdResponse,
  Property,
  UpsertPropertyPayload,
} from "../types";

const supabase = createClient();

export const upsertProperty = async (
  payload: UpsertPropertyPayload
): Promise<AuthResponse<Property>> => {
  const { data, error } = await supabase.rpc("upsert_property", {
    p_payload: payload,
  });

  if (error) { toast.error(getErrorMessage(error)); return { data: null, error: getErrorMessage(error) }; }
  return { data, error: null };
};

export const updateProperty = async (
  payload: UpsertPropertyPayload & { id: string }
): Promise<AuthResponse<Property>> => {
  const { data, error } = await supabase.rpc("update_property", {
    p_payload: payload,
  });

  if (error) { toast.error(getErrorMessage(error)); return { data: null, error: getErrorMessage(error) }; }
  return { data, error: null };
};

export const getPropertiesList = async ({
  limit = 10,
  offset = 0,
  search = null,
  propertyType = null,
  status = null,
}: GetPropertiesListParams = {}): Promise<AuthResponse<PropertiesListResponse>> => {
  const { data, error } = await supabase.rpc("get_properties_list", {
    p_limit: limit,
    p_offset: offset,
    p_search: search,
    p_property_type: propertyType,
    p_status: status,
  });

  if (error) { toast.error(getErrorMessage(error)); return { data: null, error: getErrorMessage(error) }; }
  return { data, error: null };
};

export const getPropertyById = async (
  propertyId: string
): Promise<AuthResponse<PropertyByIdResponse>> => {
  const { data, error } = await supabase.rpc("get_property_by_id", {
    p_property_id: propertyId,
  });

  if (error) { toast.error(getErrorMessage(error)); return { data: null, error: getErrorMessage(error) }; }
  return { data, error: null };
};
