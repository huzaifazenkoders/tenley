import { PostgrestError, AuthError } from "@supabase/supabase-js";

export type SupabaseError = PostgrestError | AuthError | null;

export const getErrorMessage = (error: SupabaseError): string => {
  if (!error) return "An unknown error occurred";
  return error.message;
};

export const isSupabaseError = (
  error: unknown
): error is PostgrestError | AuthError =>
  typeof error === "object" &&
  error !== null &&
  "message" in error;
