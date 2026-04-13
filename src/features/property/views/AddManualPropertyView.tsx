"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AssignStaffStep from "../components/AssignStaffStep";
import SelectStaffStep from "../components/SelectStaffStep";
import PropertyInfoStep, { PropertyFormData } from "../components/PropertyInfoStep";
import UnitInfoStep from "../components/UnitInfoStep";

const defaultFormData: PropertyFormData = {
  propertyType: "",
  propertyPurpose: "",
  address: "",
  propertyName: "",
  sameAsAddress: true,
  idPrefix: "",
  units: "",
  floors: "",
  gateCode: "",
  city: "",
  state: "",
};

const AddManualPropertyView = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PropertyFormData>(defaultFormData);
  const [unitNames, setUnitNames] = useState<string[]>([]);

  const unitCount = parseInt(formData.units) || 0;

  const handleFormChange = (patch: Partial<PropertyFormData>) => {
    setFormData((prev) => {
      const next = { ...prev, ...patch };
      if (patch.units !== undefined) {
        const count = parseInt(patch.units) || 0;
        setUnitNames(Array.from({ length: count }, (_, i) => String(101 + i)));
      }
      return next;
    });
  };

  const handleUnitChange = (index: number, value: string) => {
    setUnitNames((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Page header */}
      <div className="px-6 pt-10 pb-4 flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <h1 className="text-brand-Text-950-d text-2xl font-bold leading-8">
            Add New Property
          </h1>
          <p className="text-brand-Text-500 text-base font-normal leading-5">
            Create a new property by entering details manually.
          </p>
        </div>
        <Button variant="outline-transparent" size="lg" onClick={() => router.back()}>
          Cancel
        </Button>
        {step >= 3 && (
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/property")}
          >
            Skip
          </Button>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="max-w-[836px] mx-auto">
          {step === 1 && (
            <PropertyInfoStep data={formData} onChange={handleFormChange} />
          )}
          {step === 2 && (
            <UnitInfoStep
              unitCount={unitCount}
              unitNames={unitNames}
              onUnitChange={handleUnitChange}
            />
          )}
          {step === 3 && <AssignStaffStep onInviteStaff={() => setStep(4)} />}
          {step === 4 && <SelectStaffStep />}
        </div>
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 px-10 py-5 bg-brand-base-white border-t border-zinc-200 flex items-center justify-between z-10">
        <Button
          variant="outline-transparent"
          size="lg"
          disabled={step === 1}
          onClick={() => setStep((s) => s - 1)}
        >
          <ChevronLeft className="size-4" /> Previous
        </Button>
        <Button size="lg" onClick={() => setStep((s) => s + 1)}>
          Continue <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default AddManualPropertyView;
