export type UnassignManagerAction =
  | "removed_from_company"
  | "unassigned_from_property";

export interface UnassignManagerResponse {
  success: boolean;
  action: UnassignManagerAction;
  property_id?: string;
}
