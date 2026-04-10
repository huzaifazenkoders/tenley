"use client";
import { Button } from "@/components/ui/button";
import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Search,
  Users
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// ─── Stepper ────────────────────────────────────────────────────────────────

const steps = [
  { label: "Select Staff", sub: "step 1 of 3", icon: Users },
  { label: "Select Properties", sub: "step 2 of 3", icon: ClipboardList },
  { label: "Review & Confirm", sub: "Step 3 of 3", icon: ClipboardList }
];

const Stepper = ({ current }: { current: number }) => (
  <div className="flex items-center gap-3 justify-center">
    {steps.map((step, i) => {
      const isActive = i === current;
      const Icon = step.icon;
      return (
        <div key={i} className="flex items-center gap-1 w-60">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "p-2.5 rounded-full",
                isActive ? "bg-brand-primary-red-500" : "bg-brand-Text-400"
              )}
            >
              <Icon className="size-5 text-white" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-brand-Text-950-d text-base font-semibold leading-5">
                {step.label}
              </span>
              <span className="text-brand-Text-500 text-xs font-normal leading-4">
                {step.sub}
              </span>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 h-px bg-brand-Text-200 ml-1" />
          )}
        </div>
      );
    })}
  </div>
);

// ─── Staff card ──────────────────────────────────────────────────────────────

type StaffMember = {
  id: number;
  name: string;
  role: string;
  selected: boolean;
};

const initialStaff: StaffMember[] = [
  {
    id: 1,
    name: "Jane Cooper",
    role: "Maintenance Supervisor",
    selected: true
  },
  {
    id: 2,
    name: "Brooklyn Simmons",
    role: "Property Manager",
    selected: false
  },
  {
    id: 3,
    name: "Brooklyn Simmons",
    role: "Property Manager",
    selected: false
  },
  {
    id: 4,
    name: "Bessie Cooper",
    role: "Maintenance Technician",
    selected: false
  },
  {
    id: 5,
    name: "Savannah Nguyen",
    role: "Manager Supervisor",
    selected: false
  },
  {
    id: 6,
    name: "Savannah Nguyen",
    role: "Manager Supervisor",
    selected: false
  },
  { id: 7, name: "Arlene McCoy", role: "Maintenance Tech", selected: true },
  { id: 8, name: "Jerome Bell", role: "Regional Supervisor", selected: false },
  {
    id: 9,
    name: "Savannah Nguyen",
    role: "Manager Supervisor",
    selected: false
  },
  {
    id: 10,
    name: "Dianne Russell",
    role: "Regional Supervisor",
    selected: false
  },
  {
    id: 11,
    name: "Wade Warren",
    role: "Maintenance Technician",
    selected: false
  },
  {
    id: 12,
    name: "Wade Warren",
    role: "Maintenance Technician",
    selected: true
  },
  {
    id: 13,
    name: "Dianne Russell",
    role: "Regional Supervisor",
    selected: false
  },
  {
    id: 14,
    name: "Wade Warren",
    role: "Maintenance Technician",
    selected: false
  },
  {
    id: 15,
    name: "Wade Warren",
    role: "Maintenance Technician",
    selected: false
  },
  {
    id: 16,
    name: "Dianne Russell",
    role: "Regional Supervisor",
    selected: false
  },
  {
    id: 17,
    name: "Wade Warren",
    role: "Maintenance Technician",
    selected: false
  },
  {
    id: 18,
    name: "Wade Warren",
    role: "Maintenance Technician",
    selected: false
  }
];

const StaffCard = ({
  member,
  onToggle
}: {
  member: StaffMember;
  onToggle: () => void;
}) => (
  <button
    onClick={onToggle}
    className={cn(
      "flex-1 p-3 rounded-lg outline outline-1 -outline-offset-1 flex items-center gap-2 text-left transition-colors",
      member.selected
        ? "bg-brand-primary-red-50 outline-brand-primary-red-200"
        : "bg-brand-base-white outline-brand-Text-100"
    )}
  >
    <Image
      src="/assets/mock/person1.png"
      alt={member.name}
      width={44}
      height={44}
      className="size-11 rounded-full shrink-0"
    />
    <div className="flex flex-col gap-1">
      <span
        className={cn(
          "text-base font-semibold leading-5",
          member.selected
            ? "text-brand-primary-red-500"
            : "text-brand-Text-950-d"
        )}
      >
        {member.name}
      </span>
      <span
        className={cn(
          "text-xs font-normal leading-4",
          member.selected ? "text-brand-primary-red-500" : "text-brand-Text-500"
        )}
      >
        {member.role}
      </span>
    </div>
  </button>
);

// ─── Main view ───────────────────────────────────────────────────────────────

const BuilkAssignView = () => {
  const [currentStep] = useState(0);
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);

  const toggle = (id: number) =>
    setStaff((prev) =>
      prev.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s))
    );

  // chunk into rows of 3
  const rows: StaffMember[][] = [];
  for (let i = 0; i < staff.length; i += 3) rows.push(staff.slice(i, i + 3));

  return (
    <div className="min-h-screen bg-neutral-50 w-full flex flex-col">
      <div className="flex-1 px-28 py-14 pb-0 flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <h1 className="text-brand-Text-950-d text-2xl font-bold leading-8">
                Bulk Assign Properties
              </h1>
              <p className="text-brand-Text-500 text-base font-normal leading-5">
                Assign multiple staff members to multiple properties at once
              </p>
            </div>
            <Button variant="outline-transparent" size="lg">
              Cancel
            </Button>
          </div>
        </div>

        {/* Stepper */}
        <Stepper current={currentStep} />

        {/* Staff selection card */}
        <div className="p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6 overflow-hidden">
          {/* Toolbar */}
          <div className="flex justify-between items-center">
            <TextInput
              startIcon={<Search className="size-5 text-brand-Text-400" />}
              placeholder="Search..."
              containerClassName="w-96"
            />
            <div className="">
              <Select
                options={[
                  { label: "Maintenance Supervisor", value: "ms" },
                  { label: "Property Manager", value: "pm" },
                  { label: "Maintenance Technician", value: "mt" },
                  { label: "Regional Supervisor", value: "rs" },
                  { label: "Manager Supervisor", value: "mgs" }
                ]}
                placeholder="Select Staff"
                triggerClassName="w-56"
              />
            </div>
          </div>

          {/* Staff grid */}
          <div className="flex flex-col gap-5 max-h-115 overflow-auto custom-scrollbar">
            {rows.map((row, ri) => (
              <div key={ri} className="flex gap-5">
                {row.map((member) => (
                  <StaffCard
                    key={member.id}
                    member={member}
                    onToggle={() => toggle(member.id)}
                  />
                ))}
                {/* fill empty slots to keep 3-col layout */}
                {row.length < 3 &&
                  Array.from({ length: 3 - row.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="flex-1" />
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="px-40 py-5 bg-brand-base-white border-t border-zinc-200 flex items-center">
        <div className="flex-1 flex justify-between items-center">
          <Button
            variant="outline-transparent"
            size="lg"
            disabled
            className="gap-2 opacity-50"
          >
            <ChevronLeft className="size-5" />
            Previous
          </Button>
          <Button size="lg" className="gap-2">
            Continue
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuilkAssignView;
