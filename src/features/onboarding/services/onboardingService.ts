import { createClient } from "@/features/supabase/client";
import { getErrorMessage } from "@/features/supabase/errors";
import type { AuthResponse } from "@/features/auth/services/types";
import { toast } from "sonner";

export interface UpsertCompanyProfilePayload {
  company_name: string;
  company_email: string;
  website_url?: string;
  registration_number: string;
  phone_number: string;
  address: string;
  logo?: string;
}

export interface SelectSubscriptionPlanPayload {
  p_plan_id: string;
}

const supabase = createClient();

export const upsertCompanyProfile = async (
  payload: UpsertCompanyProfilePayload
): Promise<AuthResponse> => {
  const { data, error } = await supabase.rpc("upsert_company_profile", {
    p_payload: {
      company_name: payload.company_name,
      company_email: payload.company_email,
      website_url: payload.website_url ?? null,
      registration_number: payload.registration_number,
      phone_number: payload.phone_number,
      address: payload.address,
      logo: payload.logo ?? null
    }
  });
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};

export const selectSubscriptionPlan = async (
  payload: SelectSubscriptionPlanPayload
): Promise<AuthResponse> => {
  const { data, error } = await supabase.rpc("select_subscription_plan", {
    p_plan_id: payload.p_plan_id
  });
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};

export const profileComplete = async (): Promise<AuthResponse> => {
  const { data, error } = await supabase.rpc("profile_complete");
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};
