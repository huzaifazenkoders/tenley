"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ClipboardList, Users } from "lucide-react";
import { useState } from "react";
import BulkAssignStep1 from "../components/bulk-assign/BulkAssignStep1";
import BulkAssignStep2 from "../components/bulk-assign/BulkAssignStep2";
import BulkAssignStep3 from "../components/bulk-assign/BulkAssignStep3";
import { Property, StaffMember } from "../components/bulk-assign/types";

// ─── Stepper ─────────────────────────────────────────────────────────────────

const steps = [
  { label: "Select Staff", sub: "step 1 of 3", icon: Users },
  { label: "Select Properties", sub: "step 2 of 3", icon: ClipboardList },
  { label: "Review & Confirm", sub: "Step 3 of 3", icon: ClipboardList },
];

const Stepper = ({ current }: { current: number }) => (
  <div className="flex items-center gap-3 justify-center">
    {steps.map((step, i) => {
      const isActive = i === current;
      const isDone = i < current;
      const Icon = step.icon;
      return (
        <div key={i} className="flex items-center gap-1 w-60">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "p-2.5 rounded-full",
                isActive ? "bg-brand-primary-red-500" : isDone ? "bg-Primary-Green-50" : "bg-brand-Text-400"
              )}
            >
              <Icon className="size-5 text-white" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-brand-Text-950-d text-base font-semibold leading-5">{step.label}</span>
              <span className="text-brand-Text-500 text-xs font-normal leading-4">{step.sub}</span>
            </div>
          </div>
          {i < steps.length - 1 && <div className="flex-1 h-px bg-brand-Text-200 ml-1" />}
        </div>
      );
    })}
  </div>
);

// ─── Initial data ─────────────────────────────────────────────────────────────

const initialStaff: StaffMember[] = [
  { id: 1, name: "Jane Cooper", role: "Maintenance Supervisor", selected: true },
  { id: 2, name: "Brooklyn Simmons", role: "Property Manager", selected: false },
  { id: 3, name: "Brooklyn Simmons", role: "Property Manager", selected: false },
  { id: 4, name: "Bessie Cooper", role: "Maintenance Technician", selected: false },
  { id: 5, name: "Savannah Nguyen", role: "Manager Supervisor", selected: false },
  { id: 6, name: "Savannah Nguyen", role: "Manager Supervisor", selected: false },
  { id: 7, name: "Arlene McCoy", role: "Maintenance Tech", selected: true },
  { id: 8, name: "Jerome Bell", role: "Regional Supervisor", selected: false },
  { id: 9, name: "Savannah Nguyen", role: "Manager Supervisor", selected: false },
  { id: 10, name: "Dianne Russell", role: "Regional Supervisor", selected: false },
  { id: 11, name: "Wade Warren", role: "Maintenance Technician", selected: false },
  { id: 12, name: "Wade Warren", role: "Maintenance Technician", selected: true },
  { id: 13, name: "Dianne Russell", role: "Regional Supervisor", selected: false },
  { id: 14, name: "Wade Warren", role: "Maintenance Technician", selected: false },
  { id: 15, name: "Wade Warren", role: "Maintenance Technician", selected: false },
  { id: 16, name: "Dianne Russell", role: "Regional Supervisor", selected: false },
  { id: 17, name: "Wade Warren", role: "Maintenance Technician", selected: false },
  { id: 18, name: "Wade Warren", role: "Maintenance Technician", selected: false },
];

const initialProperties: Property[] = [
  { id: 1, name: "Sunset Gardens", address: "123 Main St", units: "45 units", selected: true },
  { id: 2, name: "Ferry House", address: "123 Main Street", units: "1 unit", selected: false },
  { id: 3, name: "Sunset Gardens", address: "123 Main Street", units: "45 units", selected: false },
  { id: 4, name: "Sunset Gardens", address: "123 Main Street", units: "45 units", selected: false },
  { id: 5, name: "Sunset Gardens", address: "123 Main St", units: "45 units", selected: true },
  { id: 6, name: "Sunset Gardens", address: "123 Main Street", units: "45 units", selected: false },
];

// ─── Main view ────────────────────────────────────────────────────────────────

const BuilkAssignView = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  const toggleStaff = (id: number) =>
    setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s)));

  const toggleProperty = (id: number) =>
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p)));

  return (
    <div className="min-h-screen bg-neutral-50 w-full flex flex-col">
      <div className="flex-1 px-28 py-14 pb-0 flex flex-col gap-10">
        {/* Header */}
        <div className="flex justify-between items-center gap-4">
          <div className="flex-1 flex flex-col gap-1">
            <h1 className="text-brand-Text-950-d text-2xl font-bold leading-8">Bulk Assign Properties</h1>
            <p className="text-brand-Text-500 text-base font-normal leading-5">
              Assign multiple staff members to multiple properties at once
            </p>
          </div>
          <Button variant="outline-transparent" size="lg">Cancel</Button>
        </div>

        {/* Stepper */}
        <Stepper current={currentStep} />

        {/* Step content */}
        {currentStep === 0 && <BulkAssignStep1 staff={staff} toggle={toggleStaff} />}
        {currentStep === 1 && <BulkAssignStep2 properties={properties} toggle={toggleProperty} />}
        {currentStep === 2 && <BulkAssignStep3 staff={staff} properties={properties} />}
      </div>

      {/* Sticky footer */}
      <div className="px-40 py-5 bg-brand-base-white border-t border-zinc-200 flex items-center">
        <div className="flex-1 flex justify-between items-center">
          <Button
            variant="outline-transparent"
            size="lg"
            disabled={currentStep === 0}
            className="gap-2"
            onClick={() => setCurrentStep((s) => s - 1)}
          >
            <ChevronLeft className="size-5" />
            Previous
          </Button>
          <Button
            size="lg"
            className="gap-2"
            onClick={() => setCurrentStep((s) => Math.min(s + 1, 2))}
          >
            {currentStep === 2 ? "Bulk Assign Properties" : "Continue"}
            {currentStep < 2 && <ChevronRight className="size-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuilkAssignView;
