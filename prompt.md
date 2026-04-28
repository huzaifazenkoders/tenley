in src/features/property/components/AssignStaffStep.tsx implement these:

export interface SearchStaffItem {
id: string;
full_name: string;
email: string;
profile_image_url: string | null;
}

export interface SearchStaffResponse {
data: SearchStaffItem[];
}

import { supabase } from '@/lib/supabase';
import { SearchStaffResponse } from '@/types/search-staff';

export async function searchStaffByEmail(
keyword: string,
limit: number = 10
): Promise<SearchStaffResponse> {
const { data, error } = await supabase.rpc('search_staff_by_email', {
p_keyword: keyword,
p_limit: limit,
});

if (error) {
throw error;
}

return data as SearchStaffResponse;
}

Usage Example
const result = await searchStaffByEmail('ali');

console.log(result);

Sample Response
{
"data": [
{
"id": "7c18f5d1-7d32-45b7-a6f4-111111111111",
"full_name": "Ali Raza",
"email": "ali@example.com",
"profile_image_url": "https://cdn.domain.com/profile/ali.jpg"
},
{
"id": "8d29f6a2-8e21-49f1-b7f5-222222222222",
"full_name": "Ali Hassan",
"email": "alihassan@example.com",
"profile_image_url": null
}
]
}

export interface InviteManagerPayload {
full_name: string;
email: string;
designation?: string | null;
role_id?: string | null;
company_id: string;
added_by: string;
property_id?: string | null;
}

export interface InviteManagerResponse {
success: boolean;
messageId: string;
inviteLink: string;
}

import { supabase } from '@/lib/supabase';
import {
InviteManagerPayload,
InviteManagerResponse,
} from '@/types/invite-manager';

export async function inviteManager(
payload: InviteManagerPayload
): Promise<InviteManagerResponse> {
const { data, error } = await supabase.functions.invoke(
'invite_manager',
{
body: payload,
}
);

if (error) {
throw error;
}

return data as InviteManagerResponse;
}

export interface BulkAssignManagersResponse {
success: boolean;
requested_assignments: number;
created_assignments: number;
already_assigned: number;
skipped: number;
}
Supabase Client Reference
import { supabase } from '@/lib/supabase';
import { BulkAssignManagersResponse } from '@/types/bulk-assign-managers';

interface BulkAssignManagersParams {
company_id: string;
manager_ids: string[];
property_ids: string[];
}

export async function bulkAssignManagersToProperties(
params: BulkAssignManagersParams
): Promise<BulkAssignManagersResponse> {
const { company_id, manager_ids, property_ids } = params;

const { data, error } = await supabase.rpc(
'bulk_assign_managers_to_properties',
{
p_company_id: company_id,
p_manager_ids: manager_ids,
p_property_ids: property_ids,
}
);

if (error) {
throw error;
}

return data as BulkAssignManagersResponse;
}
Usage Example
const response = await bulkAssignManagersToProperties({
company_id: '2f4eaa11-44bc-4e91-a0f1-123456789abc',
manager_ids: [
'7c18f5d1-7d32-45b7-a6f4-111111111111',
'8d29f6a2-8e21-49f1-b7f5-222222222222',
],
property_ids: [
'11aa22bb-33cc-44dd-55ee-666666666666',
'77ff88gg-99hh-00ii-11jj-222222222222',
],
});

console.log(response);
Sample Response
{
"success": true,
"requested_assignments": 4,
"created_assignments": 3,
"already_assigned": 1,
"skipped": 1
}

apart from AssignStaffStep you also need to integrate the apis while creating propery flow in staff member.
