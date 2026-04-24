"use client";
import { Building2, ChevronLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EmergenciesCard from "../components/EmergenciesCard";
import TenantInfoCard from "../components/TenantInfoCard";
import UnitInfoCard from "../components/UnitInfoCard";
import { getUnitById } from "../services";
import type { UnitByIdResponse } from "../types";

const UnitByIdView = () => {
  const { id, unitId } = useParams<{ id: string; unitId: string }>();
  const [unitData, setUnitData] = useState<UnitByIdResponse | null>(null);

  const fetchUnit = async () => {
    if (!unitId) return;
    const { data } = await getUnitById(unitId);
    if (data) setUnitData(data);
  };

  useEffect(() => {
    fetchUnit();
  }, [unitId]);

  if (!unitData) return null;

  const { unit, tenants } = unitData;

  return (
    <div className="px-6 pt-10 pb-6 flex flex-col gap-6 w-full">
      {/* Breadcrumb */}
      <Link
        href={`/property/${id}`}
        className="flex items-center gap-2 text-brand-Text-950-d hover:opacity-70 transition-opacity w-fit"
      >
        <ChevronLeft className="size-4" />
        <span className="text-base font-normal leading-5">Property Details</span>
      </Link>

      {/* Page header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-brand-base-black text-2xl font-bold leading-8">
          {unit.unit_name}
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MapPin className="size-5 text-brand-Text-600" />
            <span className="text-brand-Text-600 text-base font-normal leading-5">
              Unit {unit.unit_number}
            </span>
          </div>
          <div className="w-px h-5 bg-brand-Text-200" />
          <span className="px-2 py-1 capitalize bg-Neutral-Grey-0 rounded-full outline outline-1 -outline-offset-1 outline-Neutral-Grey-10 flex items-center gap-1 text-brand-Text-700 text-sm font-medium leading-5">
            <Building2 className="size-4" />
            {unit.status}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex items-start gap-6">
        {/* Left column */}
        <div className="flex-1 flex flex-col gap-6">
          <UnitInfoCard unit={unit} onSuccess={fetchUnit} />
          <TenantInfoCard
            tenants={tenants}
            unitId={unit.id}
            onRefetch={fetchUnit}
          />
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
