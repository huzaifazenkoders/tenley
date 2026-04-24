"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AssignStaffStep from "../components/AssignStaffStep";
import SelectStaffStep from "../components/SelectStaffStep";
import PropertyInfoStep, {
  PropertyFormData,
  PropertyInfoStepHandle
} from "../components/PropertyInfoStep";
import UnitInfoStep, { UnitEntry } from "../components/UnitInfoStep";
import { bulkUpsertUnits, getPropertyById, upsertProperty } from "../services";
import { toast } from "sonner";
import { Property } from "../types";
import { PropertyPurpose, PropertyType } from "../types/enums";

const mapPropertyToFormData = (p: Property): PropertyFormData => ({
  propertyType: p.property_type,
  propertyPurpose: p.property_purpose,
  address: p.property_address,
  propertyName: p.property_name,
  sameAsAddress: p.property_name === p.property_address,
  idPrefix: p.property_id_prefix ?? "",
  units: String(p.number_of_unit ?? ""),
  floors: String(p.number_of_floors ?? ""),
  gateCode: "",
  city: p.city ?? "",
  state: p.state ?? "",
  accessDetails: p.access_details ?? "",
  propertyImages: p.property_images ?? []
});

const buildUnits = (totalUnits: number, floors: number): UnitEntry[] => {
  const safeTotalUnits = Math.max(0, totalUnits);
  const safeFloors = Math.max(1, floors);
  const result: UnitEntry[] = [];
  let remainingUnits = safeTotalUnits;

  for (let floor = 1; floor <= safeFloors && remainingUnits > 0; floor++) {
    const floorsLeft = safeFloors - floor + 1;
    const unitsOnThisFloor = Math.ceil(remainingUnits / floorsLeft);

    for (let unit = 1; unit <= unitsOnThisFloor; unit++) {
      const num = `${floor}${String(unit).padStart(2, "0")}`;
      result.push({ unit_name: num, unit_number: num });
    }

    remainingUnits -= unitsOnThisFloor;
  }

  return result;
};

const generateUnits = (p: Property): UnitEntry[] => {
  const floors = p.number_of_floors ?? 1;
  return buildUnits(p.number_of_unit ?? 0, floors);
};

const AddManualPropertyView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [prefillValues, setPrefillValues] = useState<Partial<PropertyFormData>>(
    {}
  );
  const [units, setUnits] = useState<UnitEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const propertyInfoRef = useRef<PropertyInfoStepHandle>(null);

  // Restore state from URL on mount
  useEffect(() => {
    const urlPropertyId = searchParams.get("propertyId");
    const urlStep = parseInt(searchParams.get("step") ?? "1") || 1;

    if (!urlPropertyId) return;

    setPropertyId(urlPropertyId);
    setStep(urlStep);

    getPropertyById(urlPropertyId).then(({ data }) => {
      if (!data) return;
      setPrefillValues(mapPropertyToFormData(data.property));
      if (urlStep >= 2) setUnits(generateUnits(data.property));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const syncUrl = (nextStep: number, pid: string) => {
    router.replace(`?propertyId=${pid}&step=${nextStep}`);
  };

  const handlePropertyInfoSubmit = async (values: PropertyFormData) => {
    setIsSubmitting(true);
    const unitCount = parseInt(values.units) || 0;

    const { data, error } = await upsertProperty({
      property_name: values.propertyName,
      property_address: values.address,
      property_type: values.propertyType as PropertyType,
      property_purpose: values.propertyPurpose as PropertyPurpose,
      property_images: values.propertyImages.length
        ? values.propertyImages
        : undefined,
      property_id_prefix: values.idPrefix || undefined,
      access_details: values.accessDetails || undefined,
      city: values.city || undefined,
      state: values.state || undefined,
      number_of_unit: unitCount || undefined,
      number_of_floors: parseInt(values.floors) || undefined
    });

    if (error || !data) {
      setIsSubmitting(false);
      return;
    }

    const pid = data.id;
    setPropertyId(pid);

    const floors = parseInt(values.floors) || 1;
    const generatedUnits = buildUnits(unitCount, floors);
    setUnits(generatedUnits);
    setIsSubmitting(false);
    syncUrl(2, pid);
    setStep(2);
  };

  const handleStep2Submit = async () => {
    if (!propertyId) return;
    setIsSubmitting(true);

    const filled = units.filter((u) => u.unit_name && u.unit_number);
    if (filled.length > 0) {
      const { error } = await bulkUpsertUnits(
        filled.map((u) => ({ ...u, property_id: propertyId }))
      );
      if (error) {
        setIsSubmitting(false);
        return;
      }
    }

    setIsSubmitting(false);
    syncUrl(3, propertyId);
    setStep(3);
  };

  const handlePrevious = async () => {
    if (step <= 1) return;

    // Going back to step 1 from step 2: fetch latest saved data to prefill
    if (step === 2 && propertyId) {
      setIsSubmitting(true);
      const { data } = await getPropertyById(propertyId);
      if (data) setPrefillValues(mapPropertyToFormData(data.property));
      setIsSubmitting(false);
      syncUrl(1, propertyId);
    }

    setStep((s) => s - 1);
  };

  const handleUnitChange = (index: number, patch: Partial<UnitEntry>) => {
    setUnits((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...patch };
      return next;
    });
  };

  const handleContinue = () => {
    if (step === 1) {
      propertyInfoRef.current?.submitForm();
      return;
    }
    if (step === 2) return handleStep2Submit();
    if (step === 4) {
      toast.success("Property added successfully");
      router.push("/property");
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col w-full relative">
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
        <Button
          variant="outline-transparent"
          size="lg"
          onClick={() => router.back()}
        >
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
            <PropertyInfoStep
              ref={propertyInfoRef}
              onValidSubmit={handlePropertyInfoSubmit}
              defaultValues={prefillValues}
            />
          )}
          {step === 2 && (
            <UnitInfoStep
              unitCount={units.length}
              units={units}
              onUnitChange={handleUnitChange}
            />
          )}
          {step === 3 && <AssignStaffStep onInviteStaff={() => setStep(4)} />}
          {step === 4 && <SelectStaffStep />}
        </div>
      </div>

      {/* Sticky footer */}
      <div className="absolute bottom-0 left-0 right-0 px-10 py-5 bg-brand-base-white border-t border-zinc-200 flex items-center justify-between z-10">
        <Button
          variant="outline-transparent"
          size="lg"
          disabled={step === 1 || isSubmitting}
          onClick={handlePrevious}
        >
          <ChevronLeft className="size-4" /> Previous
        </Button>
        <Button size="lg" onClick={handleContinue} disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Continue <ChevronRight className="size-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddManualPropertyView;
