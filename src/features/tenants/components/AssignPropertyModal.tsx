"use client";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { cn } from "@/lib/utils";
import { Building2, Search } from "lucide-react";
import { useState } from "react";

type Property = {
  id: string;
  name: string;
  address: string;
  units: number;
};

const properties: Property[] = [
  { id: "1", name: "Sunset Gardens", address: "123 Main St", units: 45 },
  { id: "2", name: "Ferry House", address: "123 Main Street", units: 1 },
  { id: "3", name: "Sunset Gardens", address: "123 Main Street", units: 45 },
  { id: "4", name: "Sunset Gardens", address: "123 Main Street", units: 45 },
  { id: "5", name: "Sunset Gardens", address: "123 Main Street", units: 45 },
  { id: "6", name: "Sunset Gardens", address: "123 Main Street", units: 45 },
];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AssignPropertyModal = ({ open, onOpenChange }: Props) => {
  const [selected, setSelected] = useState<string>("1");

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="w-[836px] p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2.5 bg-brand-primary-red-50 rounded-full">
            <Building2 className="size-6 text-brand-primary-red-600-d" />
          </div>
          <h2 className="text-brand-Text-950-d text-2xl font-bold leading-8">Assign New Property</h2>
        </div>
      </div>

      {/* Property list card */}
      <div className="p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6">
        {/* Filters */}
        <div className="flex justify-between items-center">
          <TextInput
            startIcon={<Search className="size-5 text-brand-Text-400" />}
            placeholder="Search..."
            containerClassName="w-96"
          />
          <Select
            options={[
              { label: "All Properties", value: "all" },
              { label: "Residential", value: "residential" },
              { label: "Commercial", value: "commercial" },
            ]}
            placeholder="All Properties"
            triggerClassName="w-56"
          />
        </div>

        {/* Property list */}
        <div className="flex flex-col gap-5 max-h-80 overflow-y-auto custom-scrollbar pr-1">
          {properties.map((prop) => {
            const isSelected = selected === prop.id;
            return (
              <button
                key={prop.id}
                onClick={() => setSelected(prop.id)}
                className={cn(
                  "w-full p-3 rounded-lg outline outline-1 -outline-offset-1 flex items-center gap-4 text-left transition-colors",
                  isSelected
                    ? "bg-brand-primary-red-50 outline-brand-primary-red-200"
                    : "bg-brand-base-white outline-brand-Text-100"
                )}
              >
                {/* Checkbox */}
                <div className="size-6 flex items-center justify-center shrink-0">
                  <div className={cn(
                    "size-4 rounded border-2 transition-colors",
                    isSelected
                      ? "bg-brand-primary-red-600-d border-brand-primary-red-600-d"
                      : "border-gray-500"
                  )} />
                </div>

                {/* Icon */}
                <div className={cn(
                  "p-2.5 rounded-full shrink-0",
                  isSelected ? "bg-brand-primary-red-100" : "bg-brand-Text-50"
                )}>
                  <Building2 className={cn(
                    "size-6",
                    isSelected ? "text-brand-primary-red-500" : "text-brand-Text-600"
                  )} />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1">
                  <span className={cn(
                    "text-base font-semibold leading-5",
                    isSelected ? "text-brand-primary-red-500" : "text-brand-Text-950-d"
                  )}>
                    {prop.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-xs font-normal leading-4",
                      isSelected ? "text-brand-primary-red-500" : "text-brand-Text-500"
                    )}>
                      {prop.address}
                    </span>
                    {isSelected && (
                      <>
                        <span className="size-[5px] bg-brand-primary-red-300 rounded-full" />
                        <span className="text-brand-primary-red-500 text-xs font-normal leading-4">
                          {prop.units} units
                        </span>
                      </>
                    )}
                    {!isSelected && (
                      <span className="text-brand-Text-500 text-xs font-normal leading-4">
                        • {prop.units} unit{prop.units !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end items-center gap-6">
        <Button variant="outline-transparent" size="lg" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button size="lg">
          Assign Property
        </Button>
      </div>
    </Modal>
  );
};

export default AssignPropertyModal;
