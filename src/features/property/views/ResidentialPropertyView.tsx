"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, FileUp, Home, MapPin } from "lucide-react";
import Link from "next/link";
import AssignedStaffCard from "../components/AssignedStaffCard";
import EmergenciesCard from "../components/EmergenciesCard";
import PropertyInfoCard from "../components/PropertyInfoCard";
import TenantInfoCard from "../components/TenantInfoCard";
import type { Property, PropertyManager, Tenant } from "../types";

type Props = {
  property: Property;
  tenants: Tenant[];
  managers: PropertyManager[];
  onRefetch: () => void;
};

const ResidentialPropertyView = ({ property, tenants, managers, onRefetch }: Props) => (
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
          {property.property_name}
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MapPin className="size-5 text-brand-Text-600" />
            <span className="text-brand-Text-600 text-base font-normal leading-5">
              {property.property_address}
            </span>
          </div>
          <div className="w-px h-5 bg-brand-Text-200" />
          <span className="px-2 py-1 capitalize bg-Neutral-Grey-0 rounded-full outline outline-1 -outline-offset-1 outline-Neutral-Grey-10 flex items-center gap-1 text-brand-Text-700 text-sm font-medium leading-5">
            <Home className="size-4" />
            {property.property_type}
          </span>
          <div className="w-px h-5 bg-brand-Text-200" />
          <span className="px-2 py-1 capitalize bg-Neutral-Grey-0 rounded-full outline outline-1 -outline-offset-1 outline-Neutral-Grey-10 flex items-center gap-1 text-brand-Text-700 text-sm font-medium leading-5">
            <Home className="size-4" />
            {property.property_purpose}
          </span>
        </div>
      </div>
      <Button size="sm">
        <FileUp className="size-4" /> Import CSV
      </Button>
    </div>

    {/* 2-column layout */}
    <div className="flex items-start gap-6">
      <div className="flex-1 flex flex-col gap-6">
        <PropertyInfoCard property={property} onSuccess={onRefetch} />
        <TenantInfoCard
          tenants={tenants}
          propertyId={property.id}
          onRefetch={onRefetch}
        />
      </div>
      <div className="flex-1 flex flex-col gap-6">
        <AssignedStaffCard managers={managers} propertyId={property.id} onRefetch={onRefetch} />
        <EmergenciesCard />
      </div>
    </div>

  </div>
);

export default ResidentialPropertyView;
