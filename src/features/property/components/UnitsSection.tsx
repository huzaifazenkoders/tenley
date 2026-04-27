"use client";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";
import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { cn } from "@/lib/utils";
import {
  Building2,
  Loader2,
  Mail,
  MoreVertical,
  Phone,
  Plus,
  User,
  Users
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import EditUnitModal from "./EditUnitModal";
import DeleteUnitModal from "./DeleteUnitModal";
import { bulkUpsertUnits, toggleUnitStatus } from "../services";
import type { Tenant, UnitWithTenants } from "../types";
import { TenantType, UnitStatus } from "../types/enums";
import { toast } from "sonner";

const roleBadge: Record<
  TenantType,
  { bg: string; text: string; label: string }
> = {
  [TenantType.HeadOfHousehold]: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-500",
    label: "Head of Household"
  },
  [TenantType.FamilyMember]: {
    bg: "bg-red-500/10",
    text: "text-red-500",
    label: "Family Member"
  }
};

const TenantCard = ({ tenant }: { tenant: Tenant }) => {
  const badge = roleBadge[tenant.tenant_type];
  return (
    <div className="p-3 bg-brand-base-white rounded-xl outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-brand-Text-50 rounded-full">
            <User className="size-4 text-brand-Text-800" />
          </div>
          <div className="flex flex-col">
            <span className="text-brand-Text-500 text-xs font-normal leading-4">
              Tenant Name
            </span>
            <span className="text-brand-Text-800 text-xs font-medium leading-4">
              {tenant.tenant_name}
            </span>
          </div>
        </div>
        <span
          className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium leading-4",
            badge.bg,
            badge.text
          )}
        >
          {badge.label}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-brand-Text-50 rounded-full">
            <Mail className="size-4 text-brand-Text-800" />
          </div>
          <div className="flex flex-col">
            <span className="text-brand-Text-500 text-xs font-normal leading-4">
              Email
            </span>
            <span className="text-brand-Text-800 text-xs font-medium leading-4">
              {tenant.email}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 w-36">
          <div className="p-1.5 bg-brand-Text-50 rounded-full">
            <Phone className="size-4 text-brand-Text-800" />
          </div>
          <div className="flex flex-col">
            <span className="text-brand-Text-500 text-xs font-normal leading-4">
              Phone Number
            </span>
            <span className="text-brand-Text-800 text-xs font-medium leading-4">
              {tenant.phone}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: UnitStatus }) => (
  <span
    className={cn(
      "px-2.5 py-[3px] rounded-xl text-sm font-normal leading-5",
      status === UnitStatus.Active
        ? "bg-green-600/10 text-green-600"
        : "bg-gray-500/10 text-neutral-500"
    )}
  >
    {status === UnitStatus.Active ? "Active" : "Inactive"}
  </span>
);

const UnitCard = ({
  unit,
  onSuccess
}: {
  unit: UnitWithTenants;
  onSuccess?: () => void;
}) => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleToggleStatus = async () => {
    const { error } = await toggleUnitStatus(unit.unit_id);
    if (!error) onSuccess?.();
  };

  return (
    <div className="w-full p-4 bg-brand-base-white rounded-xl shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-4">
      <EditUnitModal
        open={editOpen}
        onOpenChange={setEditOpen}
        unitId={unit.unit_id}
        unitName={unit.unit_name}
        unitNumber={unit.unit_number}
        onSuccess={onSuccess}
      />
      <DeleteUnitModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        unitName={unit.unit_name}
      />
      {/* Unit header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <span className="text-brand-Text-950-d text-xl font-semibold leading-6 shrink-0">
            {unit.unit_name}
          </span>
          <Dropdown
            items={[
              {
                value: "edit",
                label: "Edit Unit",
                onClick: () => setEditOpen(true)
              },
              {
                value: "toggle",
                label:
                  unit.status === UnitStatus.Active ? "Deactivate" : "Activate",
                onClick: handleToggleStatus
              }
              // {
              //   value: "delete",
              //   label: "Delete Unit",
              //   onClick: () => setDeleteOpen(true)
              // }
            ]}
            contentClassName="w-36"
          >
            <Button
              size="icon"
              variant="ghost"
              className="size-8 rounded-lg outline outline-1 -outline-offset-1 outline-brand-Text-300"
            >
              <MoreVertical className="size-4 text-brand-Text-950-d" />
            </Button>
          </Dropdown>
          <StatusBadge status={unit.status} />
        </div>
        <Button
          size="xs"
          variant="outline"
          className="text-brand-primary-red-500 outline-brand-primary-red-200 hover:bg-brand-primary-red-50"
          onClick={() => router.push(`/property/${params.id}/${unit.unit_id}`)}
        >
          View Details
        </Button>
      </div>

      {/* Tenants or empty state */}
      {unit.tenants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {unit.tenants.map((t) => (
            <TenantCard key={t.id} tenant={t} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-6">
          <div className="p-4 bg-brand-Text-50 rounded-full">
            <Users className="size-8 text-brand-Text-800" />
          </div>
          <span className="text-brand-Text-950-d text-base font-medium leading-5">
            No tenants added yet
          </span>
        </div>
      )}
    </div>
  );
};

type Props = {
  propertyId: string;
  totalUnitsRequired: number;
  floors: number;
  units: UnitWithTenants[];
  onRefetch: () => void;
};

const buildExpectedUnitNumbers = (totalUnits: number, floors: number) => {
  const safeTotalUnits = Math.max(0, totalUnits);
  const safeFloors = Math.max(1, floors);
  const result: string[] = [];
  let remainingUnits = safeTotalUnits;

  for (let floor = 1; floor <= safeFloors && remainingUnits > 0; floor++) {
    const floorsLeft = safeFloors - floor + 1;
    const unitsOnThisFloor = Math.ceil(remainingUnits / floorsLeft);

    for (let unit = 1; unit <= unitsOnThisFloor; unit++) {
      result.push(`${floor}${String(unit).padStart(2, "0")}`);
    }

    remainingUnits -= unitsOnThisFloor;
  }

  return result;
};

const UnitsSection = ({
  propertyId,
  totalUnitsRequired,
  floors,
  units,
  onRefetch
}: Props) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddingUnit, setIsAddingUnit] = useState(false);

  const expectedUnitNumbers = buildExpectedUnitNumbers(
    totalUnitsRequired,
    floors
  );
  const existingUnitNumbers = new Set(units.map((unit) => unit.unit_number));
  const nextMissingUnitNumber = expectedUnitNumbers.find(
    (unitNumber) => !existingUnitNumbers.has(unitNumber)
  );
  const canAddUnit = Boolean(nextMissingUnitNumber);

  const handleAddUnit = async () => {
    if (!nextMissingUnitNumber) {
      toast.error("All required units have already been added");
      return;
    }

    setIsAddingUnit(true);
    const { error } = await bulkUpsertUnits([
      {
        property_id: propertyId,
        unit_name: nextMissingUnitNumber,
        unit_number: nextMissingUnitNumber
      }
    ]);
    setIsAddingUnit(false);

    if (error) return;

    toast.success(`Unit ${nextMissingUnitNumber} added successfully`);
    onRefetch();
  };

  const filtered = units
    .filter((u) => {
      const matchesSearch =
        !search ||
        u.unit_name.toLowerCase().includes(search.toLowerCase()) ||
        u.unit_number.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || u.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return (
    <div className="w-full p-6 bg-brand-base-white rounded-[20px] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6">
      {/* Section header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-brand-primary-red-50 rounded-lg">
          <Building2 className="size-5 text-brand-primary-red-600-d" />
        </div>
        <span className="text-brand-Text-950-d text-xl font-semibold leading-6">
          All Units ({units.length})
        </span>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <TextInput
            startIcon={
              <span className="size-5 text-brand-Text-400">
                <svg viewBox="0 0 20 20" fill="none" className="size-5">
                  <circle
                    cx="9"
                    cy="9"
                    r="5.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M14 14l2.5 2.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            }
            placeholder="Search..."
            value={search}
            setValue={setSearch}
            containerClassName="w-[458px]"
          />
        </div>
        <div className="flex items-center gap-4">
          <Select
            options={[
              { label: "All Status", value: "all" },
              { label: "Active", value: UnitStatus.Active },
              { label: "Inactive", value: UnitStatus.Inactive }
            ]}
            value={statusFilter}
            onValueChange={setStatusFilter}
            placeholder="Status"
            triggerClassName="whitespace-nowrap"
          />
          <Button
            size="sm"
            onClick={handleAddUnit}
            disabled={!canAddUnit || isAddingUnit}
          >
            {isAddingUnit ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Plus className="size-4" />
            )}{" "}
            Add Unit
          </Button>
        </div>
      </div>

      {/* Unit cards */}
      <div className="flex flex-col gap-4">
        {filtered.map((unit) => (
          <UnitCard key={unit.unit_id} unit={unit} onSuccess={onRefetch} />
        ))}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-10">
            <div className="p-4 bg-brand-Text-50 rounded-full">
              <Building2 className="size-8 text-brand-Text-400" />
            </div>
            <span className="text-brand-Text-950-d text-base font-medium leading-5">
              No units found
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitsSection;
