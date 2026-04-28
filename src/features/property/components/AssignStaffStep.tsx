"use client";
import { Button } from "@/components/ui/button";
import { UserPlus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import StaffSelectDropdown from "./StaffSelectDropdown";
import type { SearchStaffItem } from "../services/staffService";

const AssignStaffIllustration = () => (
  <svg
    width="200"
    height="140"
    viewBox="0 0 200 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="10" y="128" width="180" height="3" rx="1.5" fill="#E5E5E5" />
    <rect x="15" y="60" width="40" height="68" rx="2" fill="#475569" />
    <rect x="15" y="60" width="40" height="5" rx="1" fill="#334155" />
    {[0, 1].map((c) =>
      [0, 1, 2, 3].map((r) => (
        <rect
          key={`bl-${c}-${r}`}
          x={21 + c * 16}
          y={70 + r * 14}
          width="8"
          height="9"
          rx="1"
          fill="white"
          opacity="0.25"
        />
      ))
    )}
    <rect x="65" y="40" width="35" height="88" rx="2" fill="#334155" />
    <rect x="65" y="40" width="35" height="5" rx="1" fill="#1E293B" />
    {[0, 1].map((c) =>
      [0, 1, 2, 3, 4].map((r) => (
        <rect
          key={`bc-${c}-${r}`}
          x={70 + c * 14}
          y={50 + r * 14}
          width="8"
          height="9"
          rx="1"
          fill="white"
          opacity="0.2"
        />
      ))
    )}
    <rect x="145" y="55" width="42" height="73" rx="2" fill="#475569" />
    <rect x="145" y="55" width="42" height="5" rx="1" fill="#334155" />
    {[0, 1].map((c) =>
      [0, 1, 2, 3].map((r) => (
        <rect
          key={`br-${c}-${r}`}
          x={151 + c * 16}
          y={65 + r * 14}
          width="8"
          height="9"
          rx="1"
          fill="white"
          opacity="0.25"
        />
      ))
    )}
    <circle cx="100" cy="95" r="8" fill="#E5E7EB" />
    <rect x="88" y="105" width="24" height="23" rx="4" fill="#D1D5DB" />
    <circle cx="76" cy="98" r="7" fill="#E5E7EB" />
    <rect x="65" y="107" width="22" height="21" rx="4" fill="#D1D5DB" />
    <circle cx="124" cy="98" r="7" fill="#E5E7EB" />
    <rect x="113" y="107" width="22" height="21" rx="4" fill="#D1D5DB" />
    <circle cx="130" cy="88" r="9" fill="#DB3E31" />
    <rect x="129" y="83" width="2" height="10" rx="1" fill="white" />
    <rect x="125" y="87" width="10" height="2" rx="1" fill="white" />
    <rect x="10" y="125" width="180" height="6" rx="1" fill="#D1D5DB" />
    <rect x="45" y="127" width="12" height="2" rx="1" fill="white" opacity="0.6" />
    <rect x="94" y="127" width="12" height="2" rx="1" fill="white" opacity="0.6" />
    <rect x="143" y="127" width="12" height="2" rx="1" fill="white" opacity="0.6" />
  </svg>
);

type Props = {
  onInviteStaff?: () => void;
  onSelectionChange?: (ids: string[]) => void;
};

const AssignStaffStep = ({ onInviteStaff, onSelectionChange }: Props) => {
  const [selected, setSelected] = useState<SearchStaffItem[]>([]);

  const toggle = (item: SearchStaffItem) => {
    setSelected((prev) =>
      prev.some((s) => s.id === item.id)
        ? prev.filter((s) => s.id !== item.id)
        : [...prev, item]
    );
  };

  const remove = (id: string) =>
    setSelected((prev) => prev.filter((s) => s.id !== id));

  useEffect(() => {
    onSelectionChange?.(selected.map((s) => s.id));
  }, [selected, onSelectionChange]);

  const hasStaff = selected.length > 0;

  return (
    <div className="p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6 min-w-sm md:min-w-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-brand-Text-800 text-xl font-bold leading-6">
          <span>Assign Staff </span>
          <span className="text-brand-Text-800 text-sm font-normal">
            (Optional)
          </span>
        </h2>
        <StaffSelectDropdown
          selectedIds={selected.map((s) => s.id)}
          onToggle={toggle}
          onInviteNew={onInviteStaff}
        />
      </div>

      {hasStaff ? (
        <div className="flex flex-col gap-5">
          {selected.map((member) => (
            <div key={member.id} className="flex items-start gap-5">
              <div className="flex-1 p-3 bg-brand-base-white rounded-lg outline-1 -outline-offset-1 outline-brand-Text-100 flex items-center gap-2">
                {member.profile_image_url ? (
                  <Image
                    src={member.profile_image_url}
                    alt={member.full_name}
                    width={44}
                    height={44}
                    className="size-11 rounded-full object-cover shrink-0"
                    unoptimized
                  />
                ) : (
                  <div className="size-11 rounded-full bg-brand-Text-100 shrink-0 flex items-center justify-center text-base font-semibold text-brand-Text-600">
                    {member.full_name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <span className="text-brand-Text-950-d text-base font-semibold leading-5 truncate">
                    {member.full_name}
                  </span>
                  <span className="text-brand-Text-500 text-xs font-normal leading-4 truncate">
                    {member.email}
                  </span>
                </div>
                <button
                  onClick={() => remove(member.id)}
                  className="size-6 flex items-center justify-center text-brand-primary-red-600-d hover:opacity-70 transition-opacity shrink-0"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-10">
          <AssignStaffIllustration />
          <div className="flex flex-col items-center gap-1 text-center max-w-xs">
            <p className="text-brand-Text-950-d text-xl font-bold leading-6">
              No Staff Members Added Yet
            </p>
            <p className="text-brand-Text-500 text-sm font-normal leading-5">
              Add staff members to manage and oversee your properties.
            </p>
          </div>
          <Button size="sm" onClick={onInviteStaff}>
            <UserPlus className="size-4" /> Invite Staff
          </Button>
        </div>
      )}
    </div>
  );
};

export default AssignStaffStep;
