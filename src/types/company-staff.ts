export type InviteStatus =
  | "invitation_sent"
  | "invitation_accepted"
  | "invitation_rejected"
  | "invitation_expired";

export interface ListCompanyStaffParams {
  company_id: string;
  limit?: number;
  offset?: number;
  search?: string | null;
  status?: InviteStatus | null;
  role_id?: string | null;
}

export interface CompanyStaffItem {
  id: string;
  name: string;
  email: string;
  profile_image_url: string | null;
  designation: string | null;
  status: InviteStatus;
  role_id: string | null;
  role_name: string | null;
  is_tenant: boolean;
  property_count: number;
  total_permissions: number;
  enabled_permissions: number;
  created_at: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface ListCompanyStaffResponse {
  data: CompanyStaffItem[];
  pagination: PaginationMeta;
}
