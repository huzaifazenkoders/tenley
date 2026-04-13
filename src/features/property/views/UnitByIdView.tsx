"use client";
import { Building2, ChevronLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import EmergenciesCard from "../components/EmergenciesCard";
import TenantInfoCard from "../components/TenantInfoCard";
import UnitInfoCard from "../components/UnitInfoCard";

const MOCK_UNIT = {
  unitNumber: "103-A",
  propertyAddress: "123 Main Street Boulevard",
  city: "Austin",
  state: "TX",
  propertyName: "Victoria Apartments",
  propertyAddress2: "123 Main Street, Los Angeles, CA 90001",
  propertyType: "Commercial"
};

const UnitByIdView = () => {
  const params = useParams<{ id: string; unitId: string }>();
  const unit = MOCK_UNIT;

  return (
    <div className="px-6 pt-10 pb-6 flex flex-col gap-6 w-full">
      {/* Breadcrumb */}
      <Link
        href={`/property/${params.id}`}
        className="flex items-center gap-2 text-brand-Text-950-d hover:opacity-70 transition-opacity w-fit"
      >
        <ChevronLeft className="size-4" />
        <span className="text-base font-normal leading-5">
          Apartment Details
        </span>
      </Link>

      {/* Page header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-brand-base-black text-2xl font-bold leading-8">
          {unit.propertyName}
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MapPin className="size-5 text-brand-Text-600" />
            <span className="text-brand-Text-600 text-base font-normal leading-5">
              {unit.propertyAddress2}
            </span>
          </div>
          <div className="w-px h-5 bg-brand-Text-200" />
          <span className="px-2 py-1 bg-Neutral-Grey-0 rounded-full outline outline-1 -outline-offset-1 outline-Neutral-Grey-10 flex items-center gap-1 text-brand-Text-700 text-sm font-medium leading-5">
            <Building2 className="size-4" />
            {unit.propertyType}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex items-start gap-6">
        {/* Left column */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex-1 self-stretch p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6 overflow-hidden">
            <UnitInfoCard
              unitNumber={unit.unitNumber}
              propertyAddress={unit.propertyAddress}
              city={unit.city}
              state={unit.state}
            />
            <TenantInfoCard />
          </div>
        </div>

        {/* Right column */}
        <div className="w-[549px] flex flex-col gap-6">
          <EmergenciesCard />
        </div>
      </div>
    </div>
  );
};

export default UnitByIdView;
