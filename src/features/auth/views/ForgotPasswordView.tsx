"use client";
import { useState } from "react";
import ForgotPassword from "../components/ForgotPassword";
import OtpVerificationForm from "../components/OtpVerificationForm";
import SetPasswordForm from "../components/SetPasswordForm";
import { ForgotPasswordForm } from "../types/componentsTypes";
import AuthFormWrapper from "../components/AuthFormWrapper";

const ForgotPasswordView = () => {
  const [view, setView] = useState<ForgotPasswordForm>("forgot-password");
  switch (view) {
    case "forgot-password":
      return (
        <AuthFormWrapper>
          <ForgotPassword setView={setView} />
        </AuthFormWrapper>
      );
    case "otp-verification":
      return (
        <AuthFormWrapper>
          <OtpVerificationForm setView={setView} />
        </AuthFormWrapper>
      );
    case "set-password":
      return (
        <AuthFormWrapper>
          <SetPasswordForm setView={setView} />
        </AuthFormWrapper>
      );
  }
};

export default ForgotPasswordView;
