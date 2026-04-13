"use client";
import { ClipboardList, X } from "lucide-react";
import Image from "next/image";
import { Property, StaffMember } from "./types";

const SelectedStaffCard = ({ member }: { member: StaffMember }) => (
  <div className="flex-1 h-16 p-3 bg-brand-base-white rounded-lg outline outline-1 -outline-offset-1 outline-brand-Text-100 flex items-center gap-4">
    <X className="size-5 text-brand-primary-red-500 shrink-0" />
    <div className="flex items-center gap-2">
      <Image
        src="/assets/mock/person1.png"
        alt={member.name}
        width={44}
        height={44}
        className="size-11 rounded-full shrink-0"
      />
      <div className="flex flex-col gap-1">
        <span className="text-brand-Text-950-d text-base font-semibold leading-5">{member.name}</span>
        <span className="text-brand-Text-500 text-xs font-normal leading-4">{member.role}</span>
      </div>
    </div>
  </div>
);

const SelectedPropertyCard = ({ property }: { property: Property }) => (
  <div className="flex-1 p-3 bg-brand-base-white rounded-lg outline outline-1 -outline-offset-1 outline-brand-Text-100 flex items-center gap-4">
    <X className="size-5 text-brand-primary-red-500 shrink-0" />
    <div className="flex items-center gap-2">
      <div className="p-2.5 bg-brand-Text-50 rounded-full">
        <ClipboardList className="size-6 text-brand-Text-600" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-brand-Text-950-d text-base font-semibold leading-5">{property.name}</span>
        <div className="flex items-center gap-2">
          <span className="text-brand-Text-500 text-xs font-normal leading-4">{property.address}</span>
          <div className="size-[5px] bg-brand-Text-200 rounded-full" />
          <span className="text-brand-Text-500 text-xs font-normal leading-4">{property.units}</span>
        </div>
      </div>
    </div>
  </div>
);

type Props = {
  staff: StaffMember[];
  properties: Property[];
};

const BulkAssignStep3 = ({ staff, properties }: Props) => {
  const selectedStaff = staff.filter((s) => s.selected);
  const selectedProperties = properties.filter((p) => p.selected);

  const staffRows: StaffMember[][] = [];
  for (let i = 0; i < selectedStaff.length; i += 2) staffRows.push(selectedStaff.slice(i, i + 2));

  const propRows: Property[][] = [];
  for (let i = 0; i < selectedProperties.length; i += 2) propRows.push(selectedProperties.slice(i, i + 2));

  return (
    <div className="p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-8 overflow-hidden">
      {/* Selected Staff */}
      <div className="flex flex-col gap-6">
        <span className="text-brand-Text-950-d text-2xl font-bold leading-8">Selected Staff</span>
        <div className="flex flex-col gap-3">
          {staffRows.map((row, ri) => (
            <div key={ri} className="flex gap-3">
              {row.map((member) => (
                <SelectedStaffCard key={member.id} member={member} />
              ))}
              {row.length < 2 && <div className="flex-1" />}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Properties */}
      <div className="flex flex-col gap-6">
        <span className="text-brand-Text-950-d text-2xl font-bold leading-8">Selected Properties</span>
        <div className="flex flex-col gap-3">
          {propRows.map((row, ri) => (
            <div key={ri} className="flex gap-3">
              {row.map((property) => (
                <SelectedPropertyCard key={property.id} property={property} />
              ))}
              {row.length < 2 && <div className="flex-1" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BulkAssignStep3;
