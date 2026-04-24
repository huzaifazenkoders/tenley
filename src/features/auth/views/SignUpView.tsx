"use client";
import { useState } from "react";
import AuthFormWrapper from "../components/AuthFormWrapper";
import SignupForm from "../components/SignUpForm";
import { SignUpForm } from "../types/componentsTypes";
import OtpVerificationForm from "../components/OtpVerificationForm";

const SignUpView = () => {
  const [view, setView] = useState<SignUpForm>("sign-up");
  const [email, setEmail] = useState("");

  switch (view) {
    case "sign-up":
      return (
        <AuthFormWrapper>
          <SignupForm setView={setView} setEmail={setEmail} />
        </AuthFormWrapper>
      );
    case "otp-verification":
      return (
        <AuthFormWrapper>
          <OtpVerificationForm type="sign-up" email={email} setView={setView} />
        </AuthFormWrapper>
      );
  }
};

export default SignUpView;
