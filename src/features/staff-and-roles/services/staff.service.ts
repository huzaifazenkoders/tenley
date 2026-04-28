import { createClient } from "@/features/supabase/client";
import type {
  ListCompanyStaffParams,
  ListCompanyStaffResponse,
} from "@/types/company-staff";
import type { StaffDetailsResponse } from "@/types/staff-details";
import type { UnassignManagerResponse } from "@/types/unassign-manager";

const supabase = createClient();

interface UnassignManagerParams {
  manager_id: string;
  company_id: string;
  property_id?: string | null;
  remove_from_company?: boolean;
}

export async function listCompanyStaff(
  params: ListCompanyStaffParams
): Promise<ListCompanyStaffResponse> {
  const {
    company_id,
    limit = 10,
    offset = 0,
    search = null,
    status = null,
    role_id = null,
  } = params;

  const { data, error } = await supabase.rpc("list_company_staff", {
    p_company_id: company_id,
    p_limit: limit,
    p_offset: offset,
    p_search: search,
    p_status: status,
    p_role_id: role_id,
  });

  if (error) {
    throw error;
  }

  return data as ListCompanyStaffResponse;
}

export async function getStaffDetails(
  companyId: string,
  managerId: string
): Promise<StaffDetailsResponse> {
  const { data, error } = await supabase.rpc("get_staff_details", {
    p_company_id: companyId,
    p_manager_id: managerId,
  });

  if (error) {
    throw error;
  }

  return data as StaffDetailsResponse;
}

export async function unassignManager(
  params: UnassignManagerParams
): Promise<UnassignManagerResponse> {
  const {
    manager_id,
    company_id,
    property_id = null,
    remove_from_company = false,
  } = params;

  const { data, error } = await supabase.rpc("unassign_manager", {
    p_manager_id: manager_id,
    p_company_id: company_id,
    p_property_id: property_id,
    p_remove_from_company: remove_from_company,
  });

  if (error) {
    throw error;
  }

  return data as UnassignManagerResponse;
}
