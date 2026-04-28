export interface AcceptInvitationResponse {
success: boolean;
company_id: string;
property_id: string | null;
}
Supabase Client Reference
import { supabase } from '@/lib/supabase';
import { AcceptInvitationResponse } from '@/types/accept-invitation';

export async function acceptInvitation(
token: string,
email: string
): Promise<AcceptInvitationResponse> {
const { data, error } = await supabase.rpc('accept_invitation', {
p_token: token,
p_email: email,
});

if (error) {
throw error;
}

return data as AcceptInvitationResponse;
}
Usage Example
const response = await acceptInvitation(
'8d9f1c2b3a4e5f6g7h8i9j',
'ali@example.com'
);

console.log(response);
Sample Success Response
{
"success": true,
"company_id": "2f4eaa11-44bc-4e91-a0f1-123456789abc",
"property_id": "11aa22bb-33cc-44dd-55ee-666666666666"
}
Possible Errors
{ "message": "User not authenticated" }
{ "message": "User profile not found" }
{ "message": "Invalid invite token" }
{ "message": "Invitation already accepted" }
{ "message": "Invitation is no longer valid" }
{ "message": "This invitation does not belong to this email" }
{ "message": "Logged-in user email does not match invitation" }
{ "message": "Already part of this company" }

So if the user is invited and there is not setup for him will be redirected to /auth/sign-up
with following search params:
token
email
name

if already exist then will redirect to /represented-company?token

in both cases accept invitation api would be called
also please note that iff the user is logged in or not if not then go to /auth/sign-in with fallback url
