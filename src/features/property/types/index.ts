import {
  PropertyPurpose,
  PropertyStatus,
  PropertyType,
  TenantType,
  UnitStatus
} from "./enums";

export interface UpsertPropertyPayload {
  id?: string;
  property_name: string;
  property_address: string;
  property_type: PropertyType;
  property_purpose: PropertyPurpose;
  property_images?: string[];
  property_id_prefix?: string;
  access_details?: string;
  city?: string;
  state?: string;
  number_of_unit?: number;
  number_of_floors?: number;
}

export interface Property {
  id: string;
  property_name: string;
  property_address: string;
  property_type: PropertyType;
  property_purpose: PropertyPurpose;
  property_images: string[];
  property_id_prefix: string | null;
  access_details: string | null;
  city: string | null;
  state: string | null;
  number_of_unit: number | null;
  number_of_floors: number | null;
  status: PropertyStatus;
  created_at: string;
  updated_at: string;
}

export interface BulkUnitPayload {
  property_id: string;
  unit_name: string;
  unit_number: string;
}

export interface UpdateUnitPayload {
  unit_id: string;
  unit_name?: string;
  unit_number?: string;
}

export interface Unit {
  id: string;
  property_id: string;
  unit_name: string;
  unit_number: string;
  status: UnitStatus;
  created_at: string;
}

export interface GetPropertiesListParams {
  limit?: number;
  offset?: number;
  search?: string | null;
  propertyType?: PropertyType | null;
  status?: PropertyStatus | null;
}

export interface PropertyListItem {
  id: string;
  property_name: string;
  property_address: string;
  property_type: PropertyType;
  property_status: PropertyStatus;
  units: number;
  staff_assigned: number;
}

export interface PropertiesListResponse {
  data: PropertyListItem[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
}

export interface UnitWithTenants {
  unit_id: string;
  unit_name: string;
  unit_number: string;
  status: UnitStatus;
  created_at: string;
  tenants: Tenant[];
}

export interface PropertyByIdResponse {
  property: Property;
  units: UnitWithTenants[];
  tenants: Tenant[];
}

export interface UnitByIdResponse {
  unit: Unit;
  tenants: Tenant[];
}

export interface BulkCreateTenantPayload {
  tenant_name: string;
  email: string;
  phone: string;
  tenant_type: TenantType;
}

export interface UpdateTenantPayload {
  tenant_name?: string;
  phone?: string;
  tenant_type?: TenantType;
}

export interface Tenant {
  id: string;
  unit_id: string | null;
  property_id: string | null;
  tenant_type: TenantType;
  tenant_name: string;
  email: string;
  phone: string;
  created_at: string;
  tenant_id: string;
}
