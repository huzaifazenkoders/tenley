export interface TenantListItem {
  tenant_id: string;
  tenant_name: string;
  tenant_email: string;
  phone: string;
  property_name: string;
  property_address: string;
  property_id: string;
  property_type: string;
  unit_name: string | null;
  unit_number: string | null;
  move_in_date: string;
  end_tenancy_reason: string | null;
  tenancy_ended_at: string | null;
}

export interface TenantListPagination {
  page: number;
  page_size: number;
  total_count: number;
  total_pages: number;
}

export interface TenantListResponse {
  data: TenantListItem[];
  pagination: TenantListPagination;
}

export interface ArchivedTenantHistoryItem {
  tenancy_id: string;
  property_id: string;
  unit_id: string | null;
  unit_name: string | null;
  unit_number: string | null;
  property_name: string;
  property_address: string;
  property_type: string;
  property_purpose: string;
  move_in_date: string;
  tenancy_ended_at: string | null;
  end_tenancy_reason: string | null;
  is_active: boolean;
}

export interface ArchivedTenantDetails {
  tenant: {
    tenant_id: string;
    tenant_name: string;
    email: string;
    phone: string;
    tenant_type: string;
  };
  history: ArchivedTenantHistoryItem[];
}

export interface GetTenantListParams {
  status: "active" | "archived";
  page?: number;
  pageSize?: number;
  search?: string | null;
  propertyType?: string | null;
  dateFrom?: string | null;
  dateTo?: string | null;
}
