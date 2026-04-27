"use client";

import { Button } from "@/components/ui/button";
import { TypographyStyles } from "@/styles/common-typography";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { selectSubscriptionPlan } from "../services/onboardingService";
import { toast } from "sonner";

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
    <div className="text-brand-Text-700 text-lg font-semibold leading-4">
      {label}
    </div>
  </div>
);

const addons = [
  {
    label: "Additional property",
    price: "$1.60",
    unit: "/ unit",
    description: "Applied for each unit above your plan's included limit."
  },
  {
    label: "Additional staff account",
    price: "$14.99",
    unit: "/ staff",
    description: "Applied for each extra staff member added to your workspace."
  },
  {
    label: "New role",
    price: "$9.99",
    unit: "/ role",
    description: "Applied when you create an additional custom role."
  }
];

const OnboardingStep2 = ({ setStep }: { setStep: (step: number) => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleContinue = async () => {
    setIsSubmitting(true);
    const { error } = await selectSubscriptionPlan({
      p_plan_id: "9b2e1c3d-4f5a-6b7c-8d9e-0f1a2b3c4d5e"
    });
    setIsSubmitting(false);
    if (error) {
      toast.error(error);
      return;
    }
    setStep(3);
  };
  return (
    <div className="flex-col-10 w-full">
      <div className="w-full py-4 bg-brand-base-white rounded-2xl flex flex-col gap-3 overflow-hidden">
        <div className="flex flex-col gap-0.5">
          <div className={TypographyStyles.title}>Unit costs</div>
          <div className={TypographyStyles.subTitle}>
            These rates are shown for reference so the user can review the extra
            charges before moving forward.
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {addons.map((addon) => (
            <div
              key={addon.label}
              className="w-full rounded-xl border border-border-primary bg-white p-4 flex flex-col gap-3"
            >
              <FeatureItem label={addon.label} />
              <div className="pl-7 flex flex-col gap-1">
                <div>
                  <span className="text-primary text-base font-semibold leading-5">
                    {addon.price}
                  </span>
                  <span className="text-brand-Text-500 text-sm font-normal leading-5">
                    {addon.unit}
                  </span>
                </div>
                <p className="text-text-secondary text-xs font-normal leading-4">
                  {addon.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-col-1">
        <Button size="full" onClick={handleContinue} disabled={isSubmitting}>
          {isSubmitting ? (
            "Saving..."
          ) : (
            <>
              Continue <ChevronRight />
            </>
          )}
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
