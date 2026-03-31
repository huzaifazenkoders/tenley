"use client";
import { useState } from "react";
import Image from "next/image";
import { Users, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import Select from "@/components/ui/select";
import { Dialog } from "radix-ui";

const staffList = [
  {
    id: "1",
    name: "Jane Cooper",
    role: "Maintenance Supervisor",
    selected: true
  },
  {
    id: "2",
    name: "Brooklyn Simmons",
    role: "Property Manager",
    selected: false
  },
  {
    id: "3",
    name: "Bessie Cooper",
    role: "Maintenance Technician",
    selected: false
  },
  {
    id: "4",
    name: "Savannah Nguyen",
    role: "Manager Supervisor",
    selected: false
  },
  { id: "5", name: "Arlene McCoy", role: "Maintenance Tech", selected: true },
  {
    id: "6",
    name: "Jerome Bell",
    role: "Regional Supervisor",
    selected: false
  },
  {
    id: "7",
    name: "Dianne Russell",
    role: "Regional Supervisor",
    selected: false
  },
  {
    id: "8",
    name: "Wade Warren",
    role: "Maintenance Technician",
    selected: false
  }
];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AssignStaffModal = ({ open, onOpenChange }: Props) => {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(staffList.filter((s) => s.selected).map((s) => s.id))
  );

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      className="w-[836px] p-6 flex flex-col gap-5"
    >
      {/* Header */}
      <Dialog.Title className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2.5 bg-brand-primary-red-50 rounded-full">
            <Users className="size-6 text-brand-primary-red-600-d" />
          </div>
          <span className="flex-1 text-brand-Text-950-d text-2xl font-bold leading-8">
            Assign Staff
          </span>
        </div>
        <div className="">
          <Select
            options={staffList.map((s) => ({ value: s.id, label: s.name }))}
            placeholder="Select Staff"
            triggerClassName="w-56 h-9 text-sm text-brand-Text-600 font-medium"
          />
        </div>
      </Dialog.Title>

      {/* Staff grid */}
      <div className="grid grid-cols-2 gap-5">
        {staffList.map((member) => {
          const isSelected = selected.has(member.id);
          return (
            <button
              key={member.id}
              onClick={() => toggle(member.id)}
              className={cn(
                "p-3 rounded-lg outline -outline-offset-1 hover:shadow-md cursor-pointer active:shadow-none flex items-center gap-2 text-left transition-all",
                isSelected
                  ? "bg-brand-primary-red-50 outline-brand-primary-red-200"
                  : "bg-brand-base-white outline-brand-Text-100"
              )}
            >
              <Image
                src="https://placehold.co/44x44"
                alt={member.name}
                width={44}
                height={44}
                className="rounded-full"
                unoptimized
              />
              <div className="flex flex-col gap-1">
                <span
                  className={cn(
                    "text-base font-semibold leading-5",
                    isSelected
                      ? "text-brand-primary-red-500"
                      : "text-brand-Text-950-d"
                  )}
                >
                  {member.name}
                </span>
                <span
                  className={cn(
                    "text-xs font-normal leading-4",
                    isSelected
                      ? "text-brand-primary-red-500"
                      : "text-brand-Text-500"
                  )}
                >
                  {member.role}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="self-stretch h-px bg-brand-Text-100" />

      {/* Footer */}
      <div className="flex justify-end items-center gap-3">
        <Button
          variant="outline-transparent"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button onClick={() => onOpenChange(false)}>Assign Staff</Button>
      </div>
    </Modal>
  );
};

export default AssignStaffModal;
