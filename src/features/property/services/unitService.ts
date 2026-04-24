import { createClient } from "@/features/supabase/client";
import { getErrorMessage } from "@/features/supabase/errors";
import type { AuthResponse } from "@/features/auth/services/types";
import type { BulkUnitPayload, Unit, UpdateUnitPayload } from "../types";
import { toast } from "sonner";

const supabase = createClient();

export const bulkUpsertUnits = async (
  units: BulkUnitPayload[]
): Promise<AuthResponse<Unit[]>> => {
  const { data, error } = await supabase.rpc("bulk_upsert_units", {
    p_units: units,
  });

  if (error) { toast.error(getErrorMessage(error)); return { data: null, error: getErrorMessage(error) }; }
  return { data, error: null };
};

export const updateUnit = async (
  payload: UpdateUnitPayload
): Promise<AuthResponse<Unit>> => {
  const { data, error } = await supabase.rpc("update_unit", {
    p_unit_id: payload.unit_id,
    p_unit_name: payload.unit_name ?? null,
    p_unit_number: payload.unit_number ?? null,
  });

  if (error) { toast.error(getErrorMessage(error)); return { data: null, error: getErrorMessage(error) }; }
  return { data, error: null };
};

export const toggleUnitStatus = async (
  unitId: string
): Promise<AuthResponse<Unit>> => {
  const { data, error } = await supabase.rpc("toggle_unit_status", {
    p_unit_id: unitId,
  });

  if (error) { toast.error(getErrorMessage(error)); return { data: null, error: getErrorMessage(error) }; }
  return { data, error: null };
};
