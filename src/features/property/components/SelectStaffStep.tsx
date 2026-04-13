"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import StaffSelectDropdown from "./StaffSelectDropdown";

type StaffMember = { id: string; name: string; role: string };

const STAFF: StaffMember[] = [
  { id: "1", name: "Jane Cooper", role: "Maintenance Tech" },
  { id: "2", name: "Brooklyn Simmons", role: "Community Manager" },
  { id: "3", name: "Bessie Cooper", role: "Maintenance Tech" },
  { id: "4", name: "Savannah Nguyen", role: "Leasing Agent" },
  { id: "5", name: "Arlene McCoy", role: "Maintenance Supervisor" },
  { id: "6", name: "Jerome Bell", role: "Property Administrator" },
  { id: "7", name: "Dianne Russell", role: "Maintenance Tech" },
  { id: "8", name: "Wade Warren", role: "Office Coordinator" },
  { id: "9", name: "Ronald Richards", role: "Maintenance Supervisor" },
  { id: "10", name: "Floyd Miles", role: "Maintenance Supervisor" },
  { id: "11", name: "Cameron Williamson", role: "Maintenance Supervisor" },
  { id: "12", name: "Ralph Edwards", role: "Maintenance Supervisor" },
  { id: "13", name: "Esther Howard", role: "Maintenance Supervisor" },
  { id: "14", name: "Jenny Wilson", role: "Maintenance Supervisor" },
];

const StaffCard = ({
  member,
  selected,
  onToggle,
}: {
  member: StaffMember;
  selected: boolean;
  onToggle: () => void;
}) => (
  <button
    onClick={onToggle}
    className={cn(
      "flex-1 p-3 rounded-lg outline outline-1 -outline-offset-1 flex items-center gap-2 text-left transition-colors",
      selected
        ? "bg-brand-primary-red-50 outline-brand-primary-red-200"
        : "bg-brand-base-white outline-brand-Text-100"
    )}
  >
    <Image
      src="https://placehold.co/44x44"
      alt={member.name}
      width={44}
      height={44}
      className="size-11 rounded-full object-cover shrink-0"
      unoptimized
    />
    <div className="flex flex-col gap-1">
      <span className={cn(
        "text-base font-semibold leading-5",
        selected ? "text-brand-primary-red-500" : "text-brand-Text-950-d"
      )}>
        {member.name}
      </span>
      <span className={cn(
        "text-xs font-normal leading-4",
        selected ? "text-brand-primary-red-500" : "text-brand-Text-500"
      )}>
        {member.role}
      </span>
    </div>
  </button>
);

const SelectStaffStep = () => {
  const [selected, setSelected] = useState<string[]>(["1", "5"]);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  const displayStaff = STAFF.filter((s) => selected.includes(s.id));
  // Show selected first, then fill remaining slots from unselected to always show 4 rows × 2
  const unselected = STAFF.filter((s) => !selected.includes(s.id));
  const grid = [...displayStaff, ...unselected].slice(0, 8);
  const rows = [grid.slice(0, 2), grid.slice(2, 4), grid.slice(4, 6), grid.slice(6, 8)];

  return (
    <div className="p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-brand-Text-800 text-xl font-bold leading-6">Assign Staff</h2>
        <StaffSelectDropdown
          staff={STAFF}
          selected={selected}
          onToggle={toggle}
        />
      </div>

      <div className="flex flex-col gap-5">
        {rows.map((row, i) => (
          <div key={i} className="flex items-start gap-5">
            {row.map((member) => (
              <StaffCard
                key={member.id}
                member={member}
                selected={selected.includes(member.id)}
                onToggle={() => toggle(member.id)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectStaffStep;
