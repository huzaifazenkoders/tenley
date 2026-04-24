import { createClient } from "@/features/supabase/client";
import { getErrorMessage } from "@/features/supabase/errors";
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
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: { data: { full_name: payload.full_name } }
  });
  if (error) return { data: null, error: getErrorMessage(error) };
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
  if (error) return { data: null, error: getErrorMessage(error) };
  return { data, error: null };
};

export const signIn = async (payload: SignInPayload): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password
  });
  if (error)
    return { data: null, error: getErrorMessage(error), code: error.code };
  return { data, error: null };
};

export const forgotPassword = async (
  payload: ForgotPasswordPayload
): Promise<AuthResponse> => {
  // Sends a 6-digit OTP to the user's email via magic link flow
  const { data, error } = await supabase.auth.resetPasswordForEmail(
    payload.email
  );
  if (error) return { data: null, error: getErrorMessage(error) };
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
  if (error) return { data: null, error: getErrorMessage(error) };
  return { data, error: null };
};

export const signOut = async (): Promise<AuthResponse> => {
  const { error } = await supabase.auth.signOut();
  if (error) return { data: null, error: getErrorMessage(error) };
  return { data: null, error: null };
};

export const resetPassword = async (
  payload: ResetPasswordPayload
): Promise<AuthResponse> => {
  // Session must already be established by verifyOtp before calling this
  const { data, error } = await supabase.auth.updateUser({
    password: payload.new_password
  });
  if (error) return { data: null, error: getErrorMessage(error) };
  return { data, error: null };
};
