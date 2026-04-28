export interface StaffProperty {
  property_id: string;
  property_name: string;
  property_address: string | null;
  city: string | null;
  state: string | null;
  number_of_unit: number | null;
  property_type: string | null;
  property_purpose: string | null;
}

export interface StaffRole {
  id: string;
  name: string;
}

export interface StaffPermissions {
  total: number;
  enabled: number;
}

export interface StaffDetailsResponse {
  full_name: string;
  email: string;
  profile_image_url: string | null;
  designation: string | null;
  status: string;
  role: StaffRole;
  permissions: StaffPermissions;
  properties: StaffProperty[];
}
