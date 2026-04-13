"use client";
import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { cn } from "@/lib/utils";
import { ClipboardList, Search } from "lucide-react";
import { Property } from "./types";

const PropertyCard = ({
  property,
  onToggle
}: {
  property: Property;
  onToggle: () => void;
}) => (
  <button
    onClick={onToggle}
    className={cn(
      "flex-1 p-3 rounded-lg outline outline-1 -outline-offset-1 flex items-center gap-2 text-left transition-colors",
      property.selected
        ? "bg-brand-primary-red-50 outline-brand-primary-red-200"
        : "bg-brand-base-white outline-brand-Text-100"
    )}
  >
    <div
      className={cn(
        "p-2.5 rounded-full",
        property.selected ? "bg-brand-primary-red-100" : "bg-brand-Text-50"
      )}
    >
      <ClipboardList
        className={cn(
          "size-6",
          property.selected
            ? "text-brand-primary-red-500"
            : "text-brand-Text-600"
        )}
      />
    </div>
    <div className="flex flex-col gap-1">
      <span
        className={cn(
          "text-base font-semibold leading-5",
          property.selected
            ? "text-brand-primary-red-500"
            : "text-brand-Text-950-d"
        )}
      >
        {property.name}
      </span>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-xs font-normal leading-4",
            property.selected
              ? "text-brand-primary-red-500"
              : "text-brand-Text-500"
          )}
        >
          {property.address}
        </span>
        <div
          className={cn(
            "size-[5px] rounded-full",
            property.selected ? "bg-brand-primary-red-300" : "bg-brand-Text-300"
          )}
        />
        <span
          className={cn(
            "text-xs font-normal leading-4",
            property.selected
              ? "text-brand-primary-red-500"
              : "text-brand-Text-500"
          )}
        >
          {property.units}
        </span>
      </div>
    </div>
  </button>
);

type Props = { properties: Property[]; toggle: (id: number) => void };

const BulkAssignStep2 = ({ properties, toggle }: Props) => {
  const rows: Property[][] = [];
  for (let i = 0; i < properties.length; i += 3)
    rows.push(properties.slice(i, i + 3));

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
              { label: "All Properties", value: "all" },
              { label: "Residential", value: "residential" },
              { label: "Commercial", value: "commercial" }
            ]}
            placeholder="All Properties"
            triggerClassName="w-56"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 max-h-115 overflow-auto custom-scrollbar">
        {rows.map((row, ri) => (
          <div key={ri} className="flex gap-5">
            {row.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onToggle={() => toggle(property.id)}
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

export default BulkAssignStep2;
