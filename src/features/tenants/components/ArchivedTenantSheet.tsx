"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Accordion } from "radix-ui";
import { ChevronDown, Mail, Phone, User, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AssignPropertyModal from "./AssignPropertyModal";
import ReassignPropertyModal from "./ReassignPropertyModal";
import { Dialog } from "radix-ui";
import { ReactDispatch } from "@/types/common";

type PropertyEntry = {
  id: string;
  address: string;
  propertyName: string;
  city: string;
  state: string;
  moveIn: string;
  moveOut: string;
  tenantAvatars: number;
  showReassign: boolean;
  comment?: string;
};

const properties: PropertyEntry[] = [
  {
    id: "prop-1",
    address: "123 Main Street Boulevard",
    propertyName: "123 Main Street Boulevard",
    city: "Austin",
    state: "TX",
    moveIn: "12/12/2024",
    moveOut: "12/12/2025",
    tenantAvatars: 3,
    showReassign: true,
    comment:
      "Tenant failed to pay rent for three consecutive months despite multiple written notices and reminders."
  },
  {
    id: "prop-2",
    address: "123 Main Street Boulevard",
    propertyName: "123 Main Street Boulevard",
    city: "Austin",
    state: "TX",
    moveIn: "12/12/2024",
    moveOut: "12/12/2025",
    tenantAvatars: 3,
    showReassign: false
  },
  {
    id: "prop-3",
    address: "123 Main Street Boulevard",
    propertyName: "123 Main Street Boulevard",
    city: "Austin",
    state: "TX",
    moveIn: "12/12/2024",
    moveOut: "12/12/2025",
    tenantAvatars: 3,
    showReassign: false
  },
  {
    id: "prop-4",
    address: "123 Main Street Boulevard",
    propertyName: "123 Main Street Boulevard",
    city: "Austin",
    state: "TX",
    moveIn: "12/12/2024",
    moveOut: "12/12/2025",
    tenantAvatars: 3,
    showReassign: true
  }
];

const InfoField = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-brand-Text-500 text-xs font-normal leading-4">
      {label}
    </span>
    <span className="text-brand-Text-950-d text-xs font-medium leading-4">
      {value}
    </span>
  </div>
);

const TenantAvatars = ({ count }: { count: number }) => (
  <div className="flex items-center">
    {Array.from({ length: count }).map((_, i) => (
      <Image
        key={i}
        src="https://placehold.co/24x24"
        alt="tenant"
        width={24}
        height={24}
        className="size-6 rounded-full border-[1.36px] border-white -ml-1.5 first:ml-0"
      />
    ))}
  </div>
);

const PropertyAccordionItem = ({
  prop,
  setReassignOpen
}: {
  prop: PropertyEntry;
  setReassignOpen: ReactDispatch<boolean>;
}) => (
  <Accordion.Item
    value={prop.id}
    className="bg-brand-base-white rounded-lg outline outline-1 outline-brand-Text-100 overflow-hidden"
  >
    <Accordion.Header>
      <Accordion.Trigger className="w-full p-4 flex justify-between items-center group">
        <span className="text-brand-Text-950-d text-base font-semibold leading-5">
          {prop.address}
        </span>
        <div className="flex items-center gap-4">
          {prop.showReassign && (
            <Button
              variant="outline"
              size="xs"
              className="text-brand-primary-red-500 border-brand-primary-red-300 hover:bg-brand-primary-red-50 text-xs font-medium"
              onClick={(e) => {
                e.stopPropagation();
                setReassignOpen(true);
              }}
            >
              Re-assign Property
            </Button>
          )}
          <ChevronDown
            className={cn(
              "size-5 text-brand-Text-600 transition-transform duration-200",
              "group-data-[state=open]:rotate-180"
            )}
          />
        </div>
      </Accordion.Trigger>
    </Accordion.Header>

    <Accordion.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 overflow-hidden">
      <div className="px-4 pb-4 flex flex-col gap-3">
        <div className="h-px bg-brand-Text-100" />

        {prop.comment && (
          <div className="p-3 bg-Error-Red-50 rounded-lg flex flex-col gap-1">
            <span className="text-Error-Red-60 text-xs font-semibold leading-4">
              Comments (Optional)
            </span>
            <span className="text-Error-Red-60 text-xs font-medium leading-4 opacity-80">
              {prop.comment}
            </span>
          </div>
        )}

        <div className="flex justify-between items-start">
          <InfoField label="Property Name" value={prop.propertyName} />
          <InfoField label="City" value={prop.city} />
          <InfoField label="State" value={prop.state} />
        </div>

        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-0.5">
            <span className="text-brand-Text-500 text-xs font-normal leading-4">
              Tenants
            </span>
            <TenantAvatars count={prop.tenantAvatars} />
          </div>
          <InfoField label="Move In" value={prop.moveIn} />
          <InfoField label="Move Out" value={prop.moveOut} />
        </div>
      </div>
    </Accordion.Content>
  </Accordion.Item>
);

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ArchivedTenantSheet = ({ open, onOpenChange }: Props) => {
  const [assignOpen, setAssignOpen] = useState(false);
  const [reassignOpen, setReassignOpen] = useState(false);

  return (
    <>
      <AssignPropertyModal open={assignOpen} onOpenChange={setAssignOpen} />
      <ReassignPropertyModal
        open={reassignOpen}
        onOpenChange={setReassignOpen}
      />
      <Sheet
        open={open}
        onOpenChange={onOpenChange}
        className="w-[743px] flex flex-col"
      >
        {/* Header */}
        <Dialog.DialogTitle className="px-6 pt-8 pb-4 flex items-center gap-3 border-b border-brand-Text-100">
          <div className="flex-1 flex items-center gap-3">
            <div className="p-2 bg-brand-primary-red-50 rounded-lg">
              <Users className="size-5 text-brand-primary-red-600-d" />
            </div>
            <span className="text-brand-Text-950-d text-xl font-semibold leading-6">
              Tenant Information
            </span>
          </div>
          <SheetClose />
        </Dialog.DialogTitle>

        {/* Body */}
        <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
          {/* Tenant summary card */}
          <div className="p-3 bg-brand-base-white rounded-xl outline outline-1 outline-brand-Text-100 flex flex-col gap-2.5 overflow-hidden shrink-0 shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-brand-Text-50 rounded-full">
                    <User className="size-4 text-brand-Text-800" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-brand-Text-500 text-xs font-normal leading-4">
                      Tenant Name
                    </span>
                    <span className="text-brand-Text-800 text-xs font-medium leading-4">
                      John Smith
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-indigo-500/10 rounded-full text-indigo-500 text-xs font-medium leading-4">
                  Head of Household
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-brand-Text-50 rounded-full">
                    <Mail className="size-4 text-brand-Text-800" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-brand-Text-500 text-xs font-normal leading-4">
                      Email
                    </span>
                    <span className="text-brand-Text-800 text-xs font-medium leading-4">
                      john@example.com
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-brand-Text-50 rounded-full">
                    <Phone className="size-4 text-brand-Text-800" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-brand-Text-500 text-xs font-normal leading-4">
                      Phone Number
                    </span>
                    <span className="text-brand-Text-800 text-xs font-medium leading-4">
                      (555) 123-4567
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Property accordion */}
          <Accordion.Root
            type="multiple"
            defaultValue={["prop-1", "prop-2"]}
            className="flex flex-col gap-4"
          >
            {properties.map((prop) => (
              <PropertyAccordionItem
                key={prop.id}
                prop={prop}
                setReassignOpen={setReassignOpen}
              />
            ))}
          </Accordion.Root>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-brand-Text-100 flex justify-end items-center gap-6">
          <Button
            variant="outline-transparent"
            size="lg"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button size="lg" onClick={() => setAssignOpen(true)}>
            Assign New Property
          </Button>
        </div>
      </Sheet>
    </>
  );
};

export default ArchivedTenantSheet;
