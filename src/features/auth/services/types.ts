export interface SignUpPayload {
  full_name: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  new_password: string;
}

export interface SignupCompletePayload {
  email: string;
  otp: string;
}

export interface AuthResponse<T = unknown> {
  data: T | null;
  error: string | null;
}
