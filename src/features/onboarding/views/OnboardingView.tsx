"use client";
import React, { useState } from "react";
import OnboardingStep1 from "../components/OnboardingStep1";
import OnboardingStep2 from "../components/OnboardingStep2";
import OnboardingStep3 from "../components/OnboardingStep3";
import OnboardingStepper from "../components/OnboardingStepper";

const OnboardingView = () => {
  const [step, setStep] = useState(2);
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
