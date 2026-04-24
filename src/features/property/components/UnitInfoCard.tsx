"use client";
import { Button } from "@/components/ui/button";
import { Building2, Pencil } from "lucide-react";
import { useState } from "react";
import type { Unit } from "../types";
import EditUnitModal from "./EditUnitModal";

type Props = {
  unit: Unit;
  onSuccess?: () => void;
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-brand-Text-500 text-xs font-normal leading-4">{label}</span>
    <span className="text-brand-Text-950-d text-sm font-medium leading-5">{value}</span>
  </div>
);

const UnitInfoCard = ({ unit, onSuccess }: Props) => {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <div className="p-6 bg-brand-base-white rounded-[20px] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-10 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-primary-red-50 rounded-lg">
              <Building2 className="size-5 text-brand-primary-red-600-d" />
            </div>
            <span className="text-brand-Text-950-d text-xl font-semibold leading-6">Unit Information</span>
          </div>
          <Button variant="outline-transparent" size="sm" onClick={() => setEditOpen(true)}>
            <Pencil className="size-4" /> Edit Unit
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <InfoRow label="Unit Name" value={unit.unit_name} />
            <InfoRow label="Unit Number" value={unit.unit_number} />
          </div>
          <hr className="border-brand-Text-100" />
          <div className="flex items-start justify-between">
            <InfoRow label="Status" value={unit.status} />
            <InfoRow label="Created" value={new Date(unit.created_at).toLocaleDateString()} />
          </div>
        </div>
      </div>

      <EditUnitModal
        open={editOpen}
        onOpenChange={setEditOpen}
        unitId={unit.id}
        unitName={unit.unit_name}
        unitNumber={unit.unit_number}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default UnitInfoCard;
