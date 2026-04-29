"use client";

import { Button } from "@/components/ui/button";
import { TypographyStyles } from "@/styles/common-typography";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/checkbox";
import { profileComplete } from "../services/onboardingService";
import { toast } from "sonner";

const policies = [
  {
    id: "terms",
    label: "Terms of Service",
    title: "Terms of Service",
    body: "By using Tenley, you agree to these terms. Tenley provides a property management platform for businesses to manage their properties, tenants, and staff. You are responsible for the data you input into the platform and for the actions taken by users you invite. Tenley reserves the right to suspend or terminate accounts that violate these terms. Subscription fees are billed in advance and are non-refundable except as required by law. You may cancel your subscription at any time, and access will continue until the end of the billing period. Tenley may update these terms with 30 days notice."
  },
  {
    id: "privacy",
    label: "Privacy Policy",
    title: "Privacy Policy",
    body: "Tenley collects information you provide, including company and contact details, to deliver our services. We do not sell your personal data to third parties. Data is processed in accordance with applicable data protection laws. We use industry-standard encryption and security practices to protect your information. You have the right to access, correct, or delete your data at any time by contacting our support team. Tenley may share data with trusted service providers who assist in operating our platform under strict confidentiality agreements. We use cookies to improve your experience on our platform."
  }
];

const OnboardingStep3 = ({ setStep }: { setStep: (step: number) => void }) => {
  const router = useRouter();
  const [agreed, setAgreed] = useState({ terms: false, privacy: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAccept = async () => {
    setIsSubmitting(true);
    const { error } = await profileComplete();
    setIsSubmitting(false);
    if (error) { toast.error(error); return; }
    router.replace("/");
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-1">
        <h2 className={TypographyStyles.title}>Terms &amp; Privacy</h2>
        <p className={TypographyStyles.subTitle}>
          Please review and accept our policies before continuing.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {policies.map((policy) => (
          <div
            key={policy.id}
            className="p-4 rounded-2xl outline outline-1 outline-offset-[-1px] outline-border-primary flex flex-col gap-2.5 overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              <div className="text-text-primary text-base font-semibold leading-5">
                {policy.title}
              </div>
              <div className="text-text-secondary text-xs font-normal leading-4 max-h-32 overflow-y-auto pr-1">
                {policy.body}
              </div>
            </div>
          </div>
        ))}
      </div>

      {policies.map((policy) => (
        <label
          key={policy.id}
          className="flex items-center gap-2 cursor-pointer w-fit"
        >
          <Checkbox
            checked={agreed[policy.id as keyof typeof agreed]}
            onCheckedChange={(v) =>
              setAgreed((prev) => ({ ...prev, [policy.id]: v }))
            }
          />
          <span className="text-text-secondary text-sm font-normal leading-5">
            I have read and agree to the{" "}
            <Link
              href={""}
              className="text-primary font-medium hover:underline"
            >
              {policy.label}
            </Link>
          </span>
        </label>
      ))}

      <div className="flex flex-col items-center gap-3">
        <Button
          size="full"
          disabled={!agreed.terms || !agreed.privacy || isSubmitting}
          onClick={handleAccept}
        >
          {isSubmitting ? "Completing..." : <> Accept &amp; Continue <ChevronRight /></>}
        </Button>
        <button
          onClick={() => setStep(2)}
          className="text-primary text-sm font-medium leading-5 cursor-pointer"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep3;
