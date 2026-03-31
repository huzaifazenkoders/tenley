import Image from "next/image";
import { AlertTriangle, Calendar } from "lucide-react";
import StatusBadge from "./StatusBadge";

const DetailRow = ({
  label,
  value,
  badge
}: {
  label: string;
  value?: string;
  badge?: boolean;
}) => (
  <div className="flex-1 flex flex-col gap-1">
    <span className="text-brand-Text-600 text-sm font-normal leading-5">{label}</span>
    {badge ? (
      <span className="w-fit px-2 py-1 bg-Neutral-Grey-0 rounded-full outline outline-1 outline-offset-[-1px] outline-Neutral-Grey-10 text-brand-Text-700 text-sm font-medium leading-5">
        {value}
      </span>
    ) : (
      <span className="text-brand-Text-950-d text-sm font-normal leading-5">{value}</span>
    )}
  </div>
);

const Divider = () => (
  <div className="self-stretch h-px bg-brand-Text-100" />
);

const EmergencyDetails = () => (
  <div className="w-full p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 outline-offset-[-1px] outline-brand-Text-100 flex flex-col gap-6">
    {/* Header */}
    <div className="flex items-center gap-3">
      <div className="p-2 bg-brand-primary-red-50 rounded-lg">
        <AlertTriangle className="size-5 text-brand-primary-red-600-d" />
      </div>
      <span className="text-brand-Text-950-d text-xl font-semibold leading-6">Emergency Details</span>
    </div>

    {/* Map placeholder */}
    <div className="w-full h-36 rounded-sm overflow-hidden relative bg-brand-Text-100">
      <Image
        src="https://placehold.co/477x477"
        alt="Map"
        fill
        className="object-cover"
        unoptimized
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="size-10 flex items-center justify-center">
          <div className="size-10 bg-brand-primary-red-600-d/30 rounded-full absolute" />
          <div className="size-4 bg-brand-primary-red-600-d rounded-full outline-2 outline-white shadow-sm" />
        </div>
      </div>
    </div>

    {/* Details */}
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <DetailRow label="Emergency Type" value="Plumbing" badge />
        <DetailRow label="Reported By" value="John Smith" badge />
      </div>
      <Divider />
      <div className="flex gap-3">
        <DetailRow label="Tenant Name" value="John Smith" />
        <DetailRow label="Phone Number" value="(555) 123-4567" />
      </div>
      <Divider />
      <DetailRow label="Address" value="123 Main Street, Los Angeles, CA 90001" />
      <Divider />
      <DetailRow label="Issue Summary" value="Water leak in bathroom ceiling. Water dripping from light fixture and spreading to adjacent rooms." />
    </div>
  </div>
);

export { StatusBadge };
export default EmergencyDetails;
