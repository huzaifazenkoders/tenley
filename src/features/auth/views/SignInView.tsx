"use client";
import { useRouter } from "next/navigation";
import AuthFormWrapper from "../components/AuthFormWrapper";
import SigninForm from "../components/SigninForm";

const SignInView = () => {
  const router = useRouter();
  return (
    <AuthFormWrapper>
      <SigninForm onForgotPassword={() => router.push("/auth/forgot-password")} />
    </AuthFormWrapper>
  );
};

export default SignInView;
