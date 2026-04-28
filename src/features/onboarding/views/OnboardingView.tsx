"use client";
import { useEffect, useState } from "react";
import OnboardingStep1 from "../components/OnboardingStep1";
import OnboardingStep2 from "../components/OnboardingStep2";
import OnboardingStep3 from "../components/OnboardingStep3";
import OnboardingStepper from "../components/OnboardingStepper";
import { useUserStore } from "@/store/userStore";
import { Loader2 } from "lucide-react";

const stepFromOnboardingSteps = (onboardingSteps?: string): number => {
  switch (onboardingSteps) {
    case "company_profile":
      return 2;
    case "subscription":
    case "terms_privacy":
      return 3;
    default:
      return 1;
  }
};

const OnboardingView = () => {
  const { profile, isMeLoading } = useUserStore();
  const [step, setStep] = useState(1);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!isMeLoading && !initialized) {
      setStep(stepFromOnboardingSteps(profile?.onboarding_steps));
      setInitialized(true);
    }
  }, [isMeLoading, initialized, profile?.onboarding_steps]);

  if (!initialized) {
    return (
      <div className="flex min-h-full items-center justify-center w-full">
        <Loader2 className="size-10 animate-spin text-brand-primary-red-600-d" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-5 w-full">
      <div className="col-span-1 flex flex-col justify-center items-end">
        <OnboardingStepper currentStep={step} />
      </div>
      <div className="col-span-2 flex center">
        <div className="max-w-167 w-full">
          {step === 1 ? <OnboardingStep1 setStep={setStep} /> : null}
          {step === 2 ? <OnboardingStep2 setStep={setStep} /> : null}
          {step === 3 ? <OnboardingStep3 setStep={setStep} /> : null}
        </div>
      </div>
    </div>
  );
};

export default OnboardingView;
