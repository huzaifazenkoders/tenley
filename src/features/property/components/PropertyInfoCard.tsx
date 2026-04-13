"use client";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import EditPropertyModal from "./EditPropertyModal";

type Props = {
  name: string;
  address: string;
  type: string;
  images: string[];
  propertyAddress: string;
  propertyName: string;
  units: number;
  floors: number;
  city: string;
  state: string;
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-brand-Text-500 text-xs font-normal leading-4">{label}</span>
    <span className="text-brand-Text-950-d text-sm font-medium leading-5">{value}</span>
  </div>
);

const PropertyInfoCard = ({ name, address, type, images, propertyAddress, propertyName, units, floors, city, state }: Props) => {
  const [editOpen, setEditOpen] = useState(false);

  return (
  <div className="flex-1 p-6 bg-brand-base-white rounded-[20px] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6 overflow-hidden">
    <EditPropertyModal open={editOpen} onOpenChange={setEditOpen} />
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-brand-primary-red-50 rounded-lg">
          <Building2 className="size-5 text-brand-primary-red-600-d" />
        </div>
        <span className="text-brand-Text-950-d text-xl font-semibold leading-6">Property Information</span>
      </div>
      <Button variant="outline-transparent" size="sm" onClick={() => setEditOpen(true)}>
        <Pencil className="size-4" /> Edit Property
      </Button>
    </div>

    {/* Images */}
    <div className="flex items-center gap-3">
      {images.map((src, i) => (
        <Image key={i} src={src} alt={`property-${i}`} width={68} height={68} className="size-16 rounded object-cover" unoptimized />
      ))}
    </div>

    {/* Details */}
    <div className="flex flex-col gap-4 max-w-[453px]">
      <div className="flex items-start justify-between">
        <InfoRow label="Property Address" value={propertyAddress} />
        <InfoRow label="Property Name" value={propertyName} />
      </div>
      <hr className="border-brand-Text-100" />
      <div className="flex items-center justify-between">
        <InfoRow label="Number of Units" value={String(units)} />
        <InfoRow label="Number of Floors" value={String(floors)} />
      </div>
      <hr className="border-brand-Text-100" />
      <div className="flex items-start justify-between">
        <InfoRow label="City" value={city} />
        <InfoRow label="State" value={state} />
      </div>
    </div>
  </div>
  );
};

export default PropertyInfoCard;
