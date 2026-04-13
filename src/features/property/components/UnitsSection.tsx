"use client";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";
import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { cn } from "@/lib/utils";
import {
  Building2,
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

type TenantRole = "Head of Household" | "Family Member";

type Tenant = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: TenantRole;
};

type Unit = {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  tenants: Tenant[];
};

const UNITS: Unit[] = [
  {
    id: "1",
    name: "101-A",
    status: "Active",
    tenants: [
      {
        id: "t1",
        name: "John Smith",
        email: "john@example.com",
        phone: "(555) 123-4567",
        role: "Head of Household"
      },
      {
        id: "t2",
        name: "Max William",
        email: "max@example.com",
        phone: "(555) 123-4567",
        role: "Family Member"
      },
      {
        id: "t3",
        name: "Max William",
        email: "max@example.com",
        phone: "(555) 123-4567",
        role: "Family Member"
      }
    ]
  },
  { id: "2", name: "102-A", status: "Inactive", tenants: [] },
  {
    id: "3",
    name: "103-A",
    status: "Active",
    tenants: [
      {
        id: "t4",
        name: "John Smith",
        email: "john@example.com",
        phone: "(555) 123-4567",
        role: "Head of Household"
      },
      {
        id: "t5",
        name: "Max William",
        email: "max@example.com",
        phone: "(555) 123-4567",
        role: "Family Member"
      },
      {
        id: "t6",
        name: "Max William",
        email: "max@example.com",
        phone: "(555) 123-4567",
        role: "Family Member"
      }
    ]
  },
  {
    id: "4",
    name: "104-A",
    status: "Active",
    tenants: [
      {
        id: "t7",
        name: "John Smith",
        email: "john@example.com",
        phone: "(555) 123-4567",
        role: "Head of Household"
      },
      {
        id: "t8",
        name: "Max William",
        email: "max@example.com",
        phone: "(555) 123-4567",
        role: "Family Member"
      },
      {
        id: "t9",
        name: "Max William",
        email: "max@example.com",
        phone: "(555) 123-4567",
        role: "Family Member"
      }
    ]
  }
];

const roleBadge: Record<
  TenantRole,
  { bg: string; text: string; label: string }
> = {
  "Head of Household": {
    bg: "bg-indigo-500/10",
    text: "text-indigo-500",
    label: "Head of Household"
  },
  "Family Member": {
    bg: "bg-red-500/10",
    text: "text-red-500",
    label: "Family Member"
  }
};

const TenantCard = ({ tenant }: { tenant: Tenant }) => {
  const badge = roleBadge[tenant.role];
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
              {tenant.name}
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

const StatusBadge = ({ status }: { status: "Active" | "Inactive" }) => (
  <span
    className={cn(
      "px-2.5 py-[3px] rounded-xl text-sm font-normal leading-5",
      status === "Active"
        ? "bg-green-600/10 text-green-600"
        : "bg-gray-500/10 text-neutral-500"
    )}
  >
    {status}
  </span>
);

const UnitCard = ({ unit }: { unit: Unit }) => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="w-full p-4 bg-brand-base-white rounded-xl shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-4">
      <EditUnitModal
        open={editOpen}
        onOpenChange={setEditOpen}
        unitName={unit.name}
      />
      <DeleteUnitModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        unitName={unit.name}
      />
      {/* Unit header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <span className="text-brand-Text-950-d text-xl font-semibold leading-6 shrink-0">
            {unit.name}
          </span>
          <Dropdown
            items={[
              {
                value: "edit",
                label: "Edit Unit",
                onClick: () => setEditOpen(true)
              },
              {
                value: "delete",
                label: "Delete Unit",
                onClick: () => setDeleteOpen(true)
              }
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
          onClick={() => router.push(`/property/${params.id}/${unit.id}`)}
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

const UnitsSection = ({ totalUnits }: { totalUnits: number }) => (
  <div className="w-full p-6 bg-brand-base-white rounded-[20px] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6">
    {/* Section header */}
    <div className="flex items-center gap-3">
      <div className="p-2 bg-brand-primary-red-50 rounded-lg">
        <Building2 className="size-5 text-brand-primary-red-600-d" />
      </div>
      <span className="text-brand-Text-950-d text-xl font-semibold leading-6">
        All Units ({totalUnits})
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
          containerClassName="w-[458px]"
        />
      </div>
      <div className="flex items-center gap-4">
        <Select
          options={[
            { label: "All Status", value: "all" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" }
          ]}
          placeholder="Status"
          triggerClassName="whitespace-nowrap"
        />
        <Button size="sm">
          <Plus className="size-4" /> Add Unit
        </Button>
      </div>
    </div>

    {/* Unit cards */}
    <div className="flex flex-col gap-4">
      {UNITS.map((unit) => (
        <UnitCard key={unit.id} unit={unit} />
      ))}
    </div>
  </div>
);

export default UnitsSection;
