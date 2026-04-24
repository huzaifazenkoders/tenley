"use client";
import { Button } from "@/components/ui/button";
import { Building2, ChevronLeft, FileUp, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ImportPropertyCSVModal from "../components/ImportPropertyCSVModal";
import AssignedStaffCard from "../components/AssignedStaffCard";
import PropertyInfoCard from "../components/PropertyInfoCard";
import UnitsSection from "../components/UnitsSection";
import ResidentialPropertyView from "./ResidentialPropertyView";
import { getPropertyById } from "../services";
import type { PropertyByIdResponse } from "../types";
import { PropertyPurpose } from "../types/enums";

const PropertyByIdView = () => {
  const { id } = useParams<{ id: string }>();
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [propertyData, setPropertyData] = useState<PropertyByIdResponse | null>(
    null
  );

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const { data } = await getPropertyById(id);
      if (data) setPropertyData(data);
    };
    fetch();
  }, [id]);

  if (!propertyData) return null;

  const { property, units } = propertyData;

  if (property.property_purpose === PropertyPurpose.Residential) {
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
            <span className="px-2 py-1 bg-Neutral-Grey-0 rounded-full outline outline-1 -outline-offset-1 outline-Neutral-Grey-10 flex items-center gap-1 text-brand-Text-700 text-sm font-medium leading-5">
              <Building2 className="size-4" />
              {property.property_type}
            </span>
          </div>
        </div>
        {/* <Button size="sm" onClick={() => setCsvModalOpen(true)}>
          <FileUp className="size-4" /> Import CSV
        </Button> */}
      </div>

      {/* Info + Staff row */}
      <div className="flex items-start gap-6">
        <PropertyInfoCard
          name={property.property_name}
          address={property.property_address}
          type={property.property_type}
          images={property.property_images}
          propertyAddress={property.property_address}
          propertyName={property.property_name}
          units={property.number_of_unit ?? 0}
          floors={property.number_of_floors ?? 0}
          city={property.city ?? ""}
          state={property.state ?? ""}
        />
        <AssignedStaffCard staff={[]} />
      </div>

      {/* Units section */}
      <UnitsSection totalUnits={units.length} />

      <ImportPropertyCSVModal
        open={csvModalOpen}
        onOpenChange={setCsvModalOpen}
      />
    </div>
  );
};

export default PropertyByIdView;
