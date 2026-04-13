"use client";
import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Image from "next/image";
import { StaffMember } from "./types";

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

type Props = { staff: StaffMember[]; toggle: (id: number) => void };

const BulkAssignStep1 = ({ staff, toggle }: Props) => {
  const rows: StaffMember[][] = [];
  for (let i = 0; i < staff.length; i += 3) rows.push(staff.slice(i, i + 3));

  return (
    <div className="p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6 overflow-hidden">
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
            {row.length < 3 &&
              Array.from({ length: 3 - row.length }).map((_, i) => (
                <div key={`empty-${i}`} className="flex-1" />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BulkAssignStep1;
