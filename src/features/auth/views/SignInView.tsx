"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthFormWrapper from "../components/AuthFormWrapper";
import SigninForm from "../components/SigninForm";
import OtpVerificationForm from "../components/OtpVerificationForm";

type SignInView = "sign-in" | "verify-email";

const SignInView = () => {
  const router = useRouter();
  const [view, setView] = useState<SignInView>("sign-in");
  const [email, setEmail] = useState("");

  switch (view) {
    case "sign-in":
      return (
        <AuthFormWrapper>
          <SigninForm
            onForgotPassword={() => router.push("/auth/forgot-password")}
            onEmailNotConfirmed={(unconfirmedEmail) => {
              setEmail(unconfirmedEmail);
              setView("verify-email");
            }}
          />
        </AuthFormWrapper>
      );
    case "verify-email":
      return (
        <AuthFormWrapper>
          <OtpVerificationForm
            type="verify-email"
            email={email}
            setView={() => setView("sign-in")}
          />
        </AuthFormWrapper>
      );
  }
};

export default SignInView;
