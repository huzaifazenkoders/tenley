import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { TypographyStyles } from "@/styles/common-typography";
import { ChevronRight } from "lucide-react";
import React from "react";

const OnboardingStep1 = ({ setStep }: { setStep: (step: number) => void }) => {
  return (
    <div className="flex-col-10">
      <div className="flex-col-2">
        <h2 className={TypographyStyles.title}>Tell us about your company</h2>
        <p className={TypographyStyles.subTitle}>
          This information will be used to set up your Tenley workspace.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-2">
          <TextInput label="Company Name" />
        </div>
        <TextInput label="Company Email" />
        <TextInput label="Website URL (Optional)" />
        <TextInput label="Registration No." />
        <TextInput label="Phone Number" disabled />
        <div className="col-span-2">
          <TextInput label="Address" />
        </div>
        <div className="col-span-2">
          <Button size={"full"} onClick={() => setStep(2)}>
            Continue <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep1;
