"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthFormWrapper from "../components/AuthFormWrapper";
import SignupForm from "../components/SignUpForm";
import { SignUpForm } from "../types/componentsTypes";
import OtpVerificationForm from "../components/OtpVerificationForm";

const SignUpView = () => {
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("token") ?? "";
  const inviteEmail = searchParams.get("email") ?? "";
  const inviteName = searchParams.get("name") ?? "";

  const [view, setView] = useState<SignUpForm>("sign-up");
  const [email, setEmail] = useState(inviteEmail);
  const [fullName, setFullName] = useState(inviteName);

  switch (view) {
    case "sign-up":
      return (
        <AuthFormWrapper>
          <SignupForm
            setView={setView}
            setEmail={setEmail}
            setFullName={setFullName}
            initialEmail={inviteEmail}
            initialFullName={inviteName}
          />
        </AuthFormWrapper>
      );
    case "otp-verification":
      return (
        <AuthFormWrapper>
          <OtpVerificationForm
            type="sign-up"
            email={email}
            fullName={fullName}
            setView={setView}
            inviteToken={inviteToken}
          />
        </AuthFormWrapper>
      );
  }
};

export default SignUpView;
