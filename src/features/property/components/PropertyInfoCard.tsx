"use client";
import { Button } from "@/components/ui/button";
import { Building2, Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Property } from "../types";
import EditPropertyModal from "./EditPropertyModal";

type Props = { property: Property };

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-0.5 w-full md:w-1/2">
    <span className="text-brand-Text-500 text-xs font-normal leading-4">
      {label}
    </span>
    <span className="text-brand-Text-950-d text-sm font-medium leading-5">
      {value}
    </span>
  </div>
);

const PropertyInfoCard = ({ property }: Props) => {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="flex-1 p-6 bg-brand-base-white rounded-[20px] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6 overflow-hidden">
      <EditPropertyModal
        open={editOpen}
        onOpenChange={setEditOpen}
        property={property}
      />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-primary-red-50 rounded-lg">
            <Building2 className="size-5 text-brand-primary-red-600-d" />
          </div>
          <span className="text-brand-Text-950-d text-xl font-semibold leading-6">
            Property Information
          </span>
        </div>
        <Button
          variant="outline-transparent"
          size="sm"
          onClick={() => setEditOpen(true)}
        >
          <Pencil className="size-4" /> Edit Property
        </Button>
      </div>

      {/* Images */}
      {property.property_images.length > 0 && (
        <div className="flex items-center gap-3">
          {property.property_images.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`property-${i}`}
              width={68}
              height={68}
              className="size-16 rounded object-cover"
              unoptimized
            />
          ))}
        </div>
      )}

      {/* Details */}
      <div className="flex flex-col gap-4 max-w-[453px]">
        <div className="flex items-start flex-col md:flex-row">
          <InfoRow label="Property Address" value={property.property_address} />
          <InfoRow label="Property Name" value={property.property_name} />
        </div>
        <hr className="border-brand-Text-100" />
        <div className="flex items-center flex-col md:flex-row">
          <InfoRow label="Number of Units" value={String(property.number_of_unit ?? 0)} />
          <InfoRow label="Number of Floors" value={String(property.number_of_floors ?? 0)} />
        </div>
        <hr className="border-brand-Text-100" />
        <div className="flex items-start flex-col md:flex-row">
          <InfoRow label="City" value={property.city ?? "—"} />
          <InfoRow label="State" value={property.state ?? "—"} />
        </div>
        {property.access_details && (
          <>
            <hr className="border-brand-Text-100" />
            <InfoRow label="Access Details" value={property.access_details} />
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyInfoCard;
