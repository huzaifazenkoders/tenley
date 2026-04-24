"use client";
import { Button } from "@/components/ui/button";
import { Building2, Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const InfoField = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-brand-Text-500 text-xs font-normal leading-4">
      {label}
    </span>
    <span className="text-brand-Text-950-d text-sm font-medium leading-5">
      {value}
    </span>
  </div>
);

const PropertyInfoCard = ({
  address = "123 Main Street Boulevard",
  name = "123 Main Street Boulevard",
  city = "Austin",
  state = "TX",
  units = 150,
  floors = 10,
  type = "Commercial",
  images = [
    "/assets/mock/mock1.jpeg",
    "/assets/mock/mock1.jpeg",
    "/assets/mock/mock1.jpeg"
  ]
}: {
  address?: string;
  name?: string;
  city?: string;
  state?: string;
  units?: number;
  floors?: number;
  type?: string;
  images?: string[];
} = {}) => {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="p-6 bg-brand-base-white rounded-[20px] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-10 overflow-hidden">
      <div className="flex justify-between items-center">
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
          className="gap-2"
          onClick={() => setEditOpen(true)}
        >
          <Pencil className="size-4" />
          Edit Property
        </Button>
      </div>

      <div className="flex items-center gap-3">
        {images.map((image, i) => (
          <Image
            key={i}
            src={image}
            alt="property"
            width={96}
            height={96}
            className="rounded-xl object-cover shrink-0 aspect-square"
          />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <InfoField label="Property Address" value={address} />
          <InfoField label="Property Name" value={name} />
        </div>
        <div className="h-px bg-brand-Text-100" />
        <div className="flex justify-between">
          <InfoField label="City" value={city} />
          <InfoField label="State" value={state} />
        </div>
      </div>
    </div>
  );
};

export default PropertyInfoCard;
