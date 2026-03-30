import AuthLayout from "@/features/auth/layout/AuthLayout";
import OnboardingLayout from "@/features/onboarding/layout/OnboardingLayout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <OnboardingLayout>{children}</OnboardingLayout>;
};

export default layout;
