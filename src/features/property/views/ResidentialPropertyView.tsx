"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, FileUp, Home, MapPin } from "lucide-react";
import Link from "next/link";
import AssignedStaffCard from "../components/AssignedStaffCard";
import EmergenciesCard from "../components/EmergenciesCard";
import PropertyInfoCard from "../components/PropertyInfoCard";
import TenantInfoCard from "../components/TenantInfoCard";

type Property = {
  id: string;
  name: string;
  address: string;
  type: string;
  propertyAddress: string;
  propertyName: string;
  units: number;
  floors: number;
  city: string;
  state: string;
  images: string[];
  staff: { id: string; name: string; role: string }[];
};

type Props = { property: Property };

const ResidentialPropertyView = ({ property }: Props) => (
  <div className="px-6 pt-10 pb-6 flex flex-col gap-6 w-full">
    {/* Breadcrumb */}
    <div className="flex items-center gap-2">
      <Link
        href="/property"
        className="flex items-center gap-1 text-brand-Text-950-d hover:opacity-70 transition-opacity"
      >
        <ChevronLeft className="size-4" />
        <span className="text-base font-normal leading-5">
          Property Details
        </span>
      </Link>
    </div>

    {/* Page header */}
    <div className="flex items-end justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-brand-base-black text-2xl font-bold leading-8">
          {property.name}
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MapPin className="size-5 text-brand-Text-600" />
            <span className="text-brand-Text-600 text-base font-normal leading-5">
              {property.address}
            </span>
          </div>
          <div className="w-px h-5 bg-brand-Text-200" />
          <span className="px-2 py-1 bg-Neutral-Grey-0 rounded-full outline outline-1 -outline-offset-1 outline-Neutral-Grey-10 flex items-center gap-1 text-brand-Text-700 text-sm font-medium leading-5">
            <Home className="size-4" />
            {property.type}
          </span>
        </div>
      </div>
      <Button size="sm">
        <FileUp className="size-4" /> Import CSV
      </Button>
    </div>

    {/* 2-column layout */}
    <div className="flex items-start gap-6">
      {/* Left column: Property Info + Tenant Info */}
      <div className="flex-1 flex flex-col gap-6">
        <PropertyInfoCard
          name={property.name}
          address={property.address}
          type={property.type}
          images={property.images}
          propertyAddress={property.propertyAddress}
          propertyName={property.propertyName}
          units={property.units}
          floors={property.floors}
          city={property.city}
          state={property.state}
        />
        <TenantInfoCard tenants={[]} />
      </div>

      {/* Right column: Assigned Staff + Emergencies */}
      <div className="flex-1 flex flex-col gap-6">
        <AssignedStaffCard staff={property.staff} />
        <EmergenciesCard />
      </div>
    </div>
  </div>
);

export default ResidentialPropertyView;
