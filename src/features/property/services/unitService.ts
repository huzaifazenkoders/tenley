import type { AuthResponse } from "@/features/auth/services/types";
import type { BulkUnitPayload, Unit, UnitByIdResponse, UpdateUnitPayload } from "../types";

export const bulkUpsertUnits = async (
  _units: BulkUnitPayload[]
): Promise<AuthResponse<Unit[]>> => {
  return { data: [], error: null };
};

export const updateUnit = async (
  _payload: UpdateUnitPayload
): Promise<AuthResponse<Unit>> => {
  return { data: null, error: null };
};

export const toggleUnitStatus = async (
  _unitId: string
): Promise<AuthResponse<Unit>> => {
  return { data: null, error: null };
};

export const getUnitById = async (
  _unitId: string
): Promise<AuthResponse<UnitByIdResponse>> => {
  return { data: null, error: null };
};
