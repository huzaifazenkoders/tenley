import type {
  ListCompanyStaffParams,
  ListCompanyStaffResponse,
} from "@/types/company-staff";
import type { StaffDetailsResponse } from "@/types/staff-details";
import type { UnassignManagerResponse } from "@/types/unassign-manager";

interface UnassignManagerParams {
  manager_id: string;
  company_id: string;
  property_id?: string | null;
  remove_from_company?: boolean;
}

export async function listCompanyStaff(
  _params: ListCompanyStaffParams
): Promise<ListCompanyStaffResponse> {
  return {
    data: [],
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      total_pages: 0,
      has_next: false,
      has_prev: false,
    },
  };
}

export async function getStaffDetails(
  _companyId: string,
  _managerId: string
): Promise<StaffDetailsResponse> {
  return {
    full_name: "",
    email: "",
    profile_image_url: null,
    designation: null,
    status: "",
    role: { id: "", name: "" },
    permissions: { total: 0, enabled: 0 },
    properties: [],
  };
}

export async function unassignManager(
  _params: UnassignManagerParams
): Promise<UnassignManagerResponse> {
  return {
    success: true,
    action: "unassigned_from_property",
  };
}
