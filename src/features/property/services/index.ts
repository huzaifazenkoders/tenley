export { upsertProperty, updateProperty, getPropertiesList, getPropertyById } from "./propertyService";
export { bulkUpsertUnits, updateUnit, toggleUnitStatus, getUnitById } from "./unitService";
export { bulkCreateTenants, updateTenant, endTenant } from "./tenantService";
export { searchStaffByEmail, inviteManager, bulkAssignManagersToProperties } from "./staffService";
export type { SearchStaffItem, InviteManagerPayload, BulkAssignManagersResult } from "./staffService";
