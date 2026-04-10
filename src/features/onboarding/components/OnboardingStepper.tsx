import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const stepLabels = ["Company Profile", "Subscription", "Terms & Privacy"];

type StepStatus = string;

const Connector = ({ status }: { status: "complete" | "upcoming" }) => (
  <div
    className={cn(
      "w-0.5 h-20",
      status === "complete" ? "bg-primary-green" : "bg-[#FDCFCB]",
      "relative"
    )}
  >
    <div
      className={cn(
        "absolute top-1/2 left-1/2 -translate-1/2 size-2.5 rounded-full",
        status === "complete" ? "bg-primary-green" : "bg-[#FDCFCB]"
      )}
    />
  </div>
);

const StepCircle = ({ id, status }: { id: number; status: StepStatus }) => {
  if (status === "complete") {
    return (
      <div className="flex size-12 items-center justify-center rounded-full border-2 border-primary-green bg-surface text-primary-green">
        <Check className="size-6" strokeWidth={2.5} />
      </div>
    );
  }

  if (status === "current") {
    return (
      <div className="flex size-12 items-center justify-center rounded-full bg-primary text-xl font-semibold leading-6 text-white">
        {id}
      </div>
    );
  }

  return (
    <div className="flex size-12 items-center justify-center rounded-full border-2 border-primary bg-surface text-xl font-semibold leading-6 text-text-primary">
      {id}
    </div>
  );
};

const OnboardingStepper = ({ currentStep }: { currentStep: number }) => {
  const steps = stepLabels.map((label, i) => ({
    id: i + 1,
    label,
    status:
      i + 1 < currentStep
        ? "complete"
        : i + 1 === currentStep
          ? "current"
          : "upcoming"
  })) as { id: number; label: string; status: StepStatus }[];

  return (
    <div className="grid w-full max-w-85 grid-cols-[minmax(0,1fr)_48px] gap-x-12">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const connectorStatus =
          steps[index].status === "complete" ? "complete" : "upcoming";

        return (
          <>
            <div
              key={`label-${step.id}`}
              className="flex min-h-12 items-center justify-end text-base text-text-primary"
            >
              {step.label}
            </div>
            <div
              key={`circle-${step.id}`}
              className="flex items-center justify-center"
            >
              <StepCircle id={step.id} status={step.status} />
            </div>
            {!isLast && (
              <>
                <div key={`gap-${step.id}`} />
                <div key={`conn-${step.id}`} className="flex justify-center">
                  <Connector status={connectorStatus} />
                </div>
              </>
            )}
          </>
        );
      })}
    </div>
  );
};

export default OnboardingStepper;
