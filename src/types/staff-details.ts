export interface StaffProperty {
  property_id: string;
  property_name: string;
  property_address?: string | null;
  city?: string | null;
  state?: string | null;
  number_of_unit?: number | null;
  property_type?: string | null;
  property_purpose?: string | null;
  property_manager_status?: string | null;
  role: StaffRole | null;
  permissions: StaffPermissions;
}

export interface StaffRole {
  id: string;
  name: string;
}

export interface StaffPermissions {
  total: number;
  enabled: number;
  list?: StaffPermissionItem[];
}

export interface StaffPermissionItem {
  permission_key: string;
  enabled: boolean;
}

export interface StaffDetailsResponse {
  full_name: string;
  email: string;
  profile_image_url?: string | null;
  designation?: string | null;
  status?: string | null;
  properties: StaffProperty[];
}
