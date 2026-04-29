import { createClient } from "@/features/supabase/client";
import { getErrorMessage } from "@/features/supabase/errors";
import { toast } from "sonner";
import type {
  AuthResponse,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  SignInPayload,
  SignupCompletePayload,
  SignUpPayload,
  VerifyOtpPayload
} from "./types";

const supabase = createClient();

export const signUp = async (payload: SignUpPayload): Promise<AuthResponse> => {
  const { data: emailExists, error: checkError } = await supabase.rpc("email_exists", { p_email: payload.email });
  if (checkError) {
    const message = getErrorMessage(checkError);
    toast.error(message);
    return { data: null, error: message };
  }
  if (emailExists) {
    const message = "This email is taken. Please try another.";
    toast.error(message);
    return { data: null, error: message };
  }
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: { data: { full_name: payload.full_name } }
  });
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};

export const signupComplete = async (
  payload: SignupCompletePayload
): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.verifyOtp({
    email: payload.email,
    token: payload.otp,
    type: "signup"
  });
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};

export const signIn = async (payload: SignInPayload): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password
  });
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message, code: error.code };
  }
  return { data, error: null };
};

export const forgotPassword = async (
  payload: ForgotPasswordPayload
): Promise<AuthResponse> => {
  // Sends a 6-digit OTP to the user's email via magic link flow
  const { data, error } = await supabase.auth.resetPasswordForEmail(
    payload.email
  );
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};

export const verifyOtp = async (
  payload: VerifyOtpPayload
): Promise<AuthResponse> => {
  // Verifies the OTP and establishes a session so updateUser can be called next
  const { data, error } = await supabase.auth.verifyOtp({
    email: payload.email,
    token: payload.otp,
    type: "email"
  });
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};

export const signOut = async (): Promise<AuthResponse> => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data: null, error: null };
};

export interface AcceptInvitationResponse {
  success: boolean;
  company_id: string;
  property_id: string | null;
}

export const acceptInvitation = async (
  token: string,
  email: string
): Promise<AuthResponse<AcceptInvitationResponse>> => {
  const { data, error } = await supabase.rpc("accept_invitation", {
    p_token: token,
    p_email: email
  });
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};

export const resetPassword = async (
  payload: ResetPasswordPayload
): Promise<AuthResponse> => {
  // Session must already be established by verifyOtp before calling this
  const { data, error } = await supabase.auth.updateUser({
    password: payload.new_password
  });
  if (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return { data: null, error: message };
  }
  return { data, error: null };
};
