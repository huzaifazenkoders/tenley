"use client";

import { Button } from "@/components/ui/button";
import { TypographyStyles } from "@/styles/common-typography";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { selectSubscriptionPlan } from "../services/onboardingService";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.99935 18.3332C14.5827 18.3332 18.3327 14.5832 18.3327 9.99984C18.3327 5.4165 14.5827 1.6665 9.99935 1.6665C5.41602 1.6665 1.66602 5.4165 1.66602 9.99984C1.66602 14.5832 5.41602 18.3332 9.99935 18.3332Z"
      stroke="var(--brand-primary-red-500, #ED5346)"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.45898 9.99993L8.81732 12.3583L13.5423 7.6416"
      stroke="var(--brand-primary-red-500, #ED5346)"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FeatureItem = ({ label }: { label: string }) => (
  <div className="flex-1 flex justify-start items-center gap-2">
    <CheckIcon />
    <div className="text-brand-Text-700 text-xs font-normal leading-4">
      {label}
    </div>
  </div>
);

const plans = [
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    name: "Starter Plan",
    price: "$49",
    popular: false,
    features: [
      "Up to 20 units",
      "2 staff accounts",
      "Basic emergency response",
      "Email notifications",
    ],
  },
  {
    id: "9b2e1c3d-4f5a-6b7c-8d9e-0f1a2b3c4d5e",
    name: "Professional Plan",
    price: "$149",
    popular: true,
    features: [
      "Up to 100 units",
      "10 staff accounts",
      "Full emergency response",
      "AI call handling (500 mins)",
    ],
  },
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    name: "Enterprise Plan",
    price: "$399",
    popular: false,
    features: [
      "Unlimited units",
      "50 staff accounts",
      "AI professional features",
      "AI call handling (unlimited mins)",
    ],
  },
];

const OnboardingStep2 = ({ setStep }: { setStep: (step: number) => void }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    if (!selectedPlanId) {
      toast.error("Please select a plan");
      return;
    }
    setIsSubmitting(true);
    const { error } = await selectSubscriptionPlan({ p_plan_id: selectedPlanId });
    setIsSubmitting(false);
    if (error) { toast.error(error); return; }
    setStep(3);
  };

  return (
    <div className="flex-col-10 w-full">
      <div className="flex-col-2">
        <h2 className={TypographyStyles.title}>Choose your plan</h2>
        <p className={TypographyStyles.subTitle}>
          Pick a plan that suits your need the best.
        </p>
      </div>
      <div className="flex-col-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlanId(plan.id)}
            className={cn(
              "w-full p-4 relative bg-white rounded-2xl shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] flex flex-col gap-2.5 overflow-hidden cursor-pointer",
              selectedPlanId === plan.id
                ? "outline outline-2 outline-offset-[-2px] outline-primary"
                : plan.popular
                  ? "outline outline-2 outline-offset-[-2px] outline-primary/40"
                  : "outline outline-1 outline-offset-[-1px] outline-border-primary"
            )}
          >
            {plan.popular && (
              <div className="w-28 px-2 py-[5px] right-0 top-0 absolute bg-primary rounded-bl-lg inline-flex justify-center items-center">
                <span className="text-white text-sm font-semibold leading-5">
                  Most Popular
                </span>
              </div>
            )}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-brand-Text-950-d text-base font-semibold leading-5">
                  {plan.name}
                </div>
                <div>
                  <span className="text-primary text-2xl font-bold leading-8">
                    {plan.price}
                  </span>
                  <span className="text-brand-Text-500 text-sm font-normal leading-5">
                    /mo
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {[0, 2].map((i) => (
                  <div key={i} className="flex gap-2">
                    <FeatureItem label={plan.features[i]} />
                    <FeatureItem label={plan.features[i + 1]} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr className="border-border-primary" />
      <div className="w-full p-4 bg-brand-base-white rounded-2xl shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 outline-offset-[-1px] outline-border-primary flex flex-col gap-2.5 overflow-hidden">
        <div className="flex flex-col gap-0.5">
          <div className="text-brand-Text-950-d text-base font-semibold leading-5">
            Expand your plan with add-ons
          </div>
          <div className="text-text-secondary text-xs font-normal leading-4">
            Add more capacity and unlock advanced features without moving to a
            larger tier before you are ready.
          </div>
        </div>
        <div className="flex gap-2.5">
          {[
            { label: "Additional Property", price: "$1.60", unit: "/unit" },
            { label: "Additional Staff", price: "$14.99", unit: "/staff" },
            { label: "New Role", price: "$9.99", unit: "/role" },
          ].map((addon) => (
            <div
              key={addon.label}
              className="flex-1 p-3 rounded-lg outline outline-1 outline-offset-[-1px] outline-border-primary flex flex-col gap-1 overflow-hidden"
            >
              <div className="text-primary text-xs font-medium leading-4">
                {addon.label}
              </div>
              <div>
                <span className="text-brand-Text-950-d text-xs font-bold leading-4">
                  {addon.price}
                </span>
                <span className="text-text-secondary text-xs font-normal leading-4">
                  {addon.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-col-1">
        <Button size="full" onClick={handleContinue} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : <> Continue <ChevronRight /></>}
        </Button>
        <div className="flex center">
          <Button size="fit" onClick={() => setStep(1)} variant="link">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep2;
