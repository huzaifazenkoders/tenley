import { Button } from "@/components/ui/button";
import { Building2, Pencil } from "lucide-react";

type Props = {
  unitNumber: string;
  propertyAddress: string;
  city: string;
  state: string;
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-brand-Text-500 text-xs font-normal leading-4">{label}</span>
    <span className="text-brand-Text-950-d text-sm font-medium leading-5">{value}</span>
  </div>
);

const UnitInfoCard = ({ unitNumber, propertyAddress, city, state }: Props) => (
  <div className="p-6 bg-brand-base-white rounded-[20px] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-10 overflow-hidden">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-brand-primary-red-50 rounded-lg">
          <Building2 className="size-5 text-brand-primary-red-600-d" />
        </div>
        <span className="text-brand-Text-950-d text-xl font-semibold leading-6">Unit Information</span>
      </div>
      <Button variant="outline-transparent" size="sm">
        <Pencil className="size-4" /> Edit Unit
      </Button>
    </div>

    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <InfoRow label="Unit Number" value={unitNumber} />
        <InfoRow label="Property Address" value={propertyAddress} />
      </div>
      <hr className="border-brand-Text-100" />
      <div className="flex items-start justify-between">
        <InfoRow label="City" value={city} />
        <InfoRow label="State" value={state} />
      </div>
    </div>
  </div>
);

export default UnitInfoCard;
