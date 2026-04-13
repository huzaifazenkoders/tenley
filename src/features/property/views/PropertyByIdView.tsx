"use client";
import { Button } from "@/components/ui/button";
import { Building2, ChevronLeft, FileUp, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ImportPropertyCSVModal from "../components/ImportPropertyCSVModal";
import AssignedStaffCard from "../components/AssignedStaffCard";
import PropertyInfoCard from "../components/PropertyInfoCard";
import UnitsSection from "../components/UnitsSection";
import ResidentialPropertyView from "./ResidentialPropertyView";

const MOCK_COMMERCIAL = {
  id: "1",
  name: "Victoria Apartments",
  address: "123 Main Street, Los Angeles, CA 90001",
  type: "Commercial",
  propertyAddress: "123 Main Street Boulevard",
  propertyName: "123 Main Street Boulevard",
  units: 150,
  floors: 10,
  city: "Austin",
  state: "TX",
  images: [
    "/assets/mock/person1.png",
    "/assets/mock/person1.png",
    "/assets/mock/person1.png",
    "/assets/mock/person1.png"
  ],
  staff: [
    { id: "s1", name: "Jane Cooper", role: "Maintenance Tech" },
    { id: "s2", name: "Jacob Jones", role: "Maintenance Tech" },
    { id: "s3", name: "Ralph Edwards", role: "Maintenance Tech" }
  ]
};

const MOCK_RESIDENTIAL = {
  id: "2",
  name: "Sunset Gardens",
  address: "123 Main Street, Los Angeles, CA 90001",
  type: "Residential",
  propertyAddress: "123 Main Street Boulevard",
  propertyName: "123 Main Street Boulevard",
  units: 1,
  floors: 2,
  city: "Austin",
  state: "TX",
  images: [
    "https://placehold.co/100x100",
    "https://placehold.co/100x100",
    "https://placehold.co/100x100"
  ],
  staff: []
};

// Toggle between "Commercial" and "Residential" to preview each layout
const ACTIVE_TYPE: "Commercial" | "Residential" = "Residential";

const PropertyByIdView = () => {
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const property =
    ACTIVE_TYPE === "Residential" ? MOCK_RESIDENTIAL : MOCK_COMMERCIAL;

  if (property.type === "Residential") {
    return <ResidentialPropertyView property={property} />;
  }

  return (
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
              <Building2 className="size-4" />
              {property.type}
            </span>
          </div>
        </div>
        <Button size="sm" onClick={() => setCsvModalOpen(true)}>
          <FileUp className="size-4" /> Import CSV
        </Button>
      </div>

      {/* Info + Staff row */}
      <div className="flex items-start gap-6">
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
        <AssignedStaffCard staff={property.staff} />
      </div>

      {/* Units section */}
      <UnitsSection totalUnits={property.units} />
      <ImportPropertyCSVModal
        open={csvModalOpen}
        onOpenChange={setCsvModalOpen}
      />
    </div>
  );
};

export default PropertyByIdView;
