"use client";
import { useState } from "react";
import ForgotPassword from "../components/ForgotPassword";
import OtpVerificationForm from "../components/OtpVerificationForm";
import SetPasswordForm from "../components/SetPasswordForm";
import { ForgotPasswordForm } from "../types/componentsTypes";
import AuthFormWrapper from "../components/AuthFormWrapper";

const ForgotPasswordView = () => {
  const [view, setView] = useState<ForgotPasswordForm>("forgot-password");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  switch (view) {
    case "forgot-password":
      return (
        <AuthFormWrapper>
          <ForgotPassword setView={setView} setEmail={setEmail} />
        </AuthFormWrapper>
      );
    case "otp-verification":
      return (
        <AuthFormWrapper>
          <OtpVerificationForm
            type="forgot-password"
            email={email}
            setView={setView}
            onOtpVerified={setOtp}
          />
        </AuthFormWrapper>
      );
    case "set-password":
      return (
        <AuthFormWrapper>
          <SetPasswordForm setView={setView} email={email} otp={otp} />
        </AuthFormWrapper>
      );
  }
};

export default ForgotPasswordView;
