"use client";
import { Button } from "@/components/ui/button";
import { Modal, ModalClose } from "@/components/ui/modal";
import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { cn } from "@/lib/utils";
import { Dialog } from "radix-ui";
import { useState } from "react";
import { Users } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ROLES = [
  { label: "Maintenance Supervisor", value: "maintenance_supervisor" },
  { label: "Property Manager", value: "property_manager" },
  { label: "Leasing Agent", value: "leasing_agent" },
  { label: "Office Coordinator", value: "office_coordinator" },
];

const ALL_PERMISSIONS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "property_management", label: "Property Management" },
  { key: "staff_roles", label: "Staff & Roles" },
  { key: "tenants", label: "Tenants" },
  { key: "emergencies", label: "Emergencies" },
  { key: "notifications", label: "Notifications" },
  { key: "analytics", label: "Analytics & Reports" },
  { key: "settings", label: "Settings" },
];

const DEFAULT_PERMISSIONS: Record<string, boolean> = {
  dashboard: false,
  property_management: false,
  staff_roles: true,
  tenants: true,
  emergencies: true,
  notifications: true,
  analytics: true,
  settings: true,
};

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className={cn(
      "w-9 h-5 p-0.5 rounded-xl flex items-center transition-colors duration-200",
      checked ? "bg-brand-primary-red-600-d justify-end" : "bg-Text-200 justify-start"
    )}
  >
    <div className="size-4 bg-white rounded-full shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)]" />
  </button>
);

const InviteStaffModal = ({ open, onOpenChange }: Props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState<Record<string, boolean>>(DEFAULT_PERMISSIONS);

  const enabledCount = Object.values(permissions).filter(Boolean).length;

  const togglePermission = (key: string) =>
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="w-[836px] p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-brand-primary-red-50 rounded-full">
              <Users className="size-6 text-brand-primary-red-600-d" />
            </div>
            <Dialog.Title className="text-brand-Text-950-d text-2xl font-bold leading-8">
              Invite Staff Member
            </Dialog.Title>
          </div>
          <ModalClose />
        </div>
        <Dialog.Description className="text-brand-Text-500 text-sm font-normal leading-5">
          Enter the employee&apos;s email address and assign their role. They&apos;ll receive an email invitation to join and manage assigned properties.
        </Dialog.Description>
      </div>

      {/* Form */}
      <div className="p-4 rounded-2xl flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          {/* Row 1: Email + Name */}
          <div className="flex items-start gap-6">
            <TextInput
              label="Email"
              value={email}
              setValue={setEmail}
              placeholder="alexander@example.com"
              type="email"
              containerClassName="flex-1"
            />
            <TextInput
              label="Name"
              value={name}
              setValue={setName}
              placeholder="Alexander McGurk"
              containerClassName="flex-1"
            />
          </div>

          {/* Row 2: Designation + Role */}
          <div className="flex items-start gap-6">
            <TextInput
              label="Designation"
              value={designation}
              setValue={setDesignation}
              placeholder="Jr. Maintenance Supervisor"
              containerClassName="flex-1"
            />
            <Select
              label="Role"
              value={role}
              onValueChange={setRole}
              placeholder="Select role"
              options={ROLES}
              containerClassName="flex-1"
            />
          </div>
        </div>

        {/* Permissions — visible when role is selected */}
        {role && (
          <div className="p-4 bg-brand-Text-50 rounded-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-brand-Text-950-d text-xl font-semibold leading-6">Permissions</span>
                <span className="text-brand-Text-600 text-xs font-normal leading-4">
                  Configure specific access controls for this staff member
                </span>
              </div>
              <span className="px-3 py-1.5 bg-brand-primary-red-50 rounded-full outline outline-1 -outline-offset-1 outline-brand-primary-red-200 text-brand-primary-red-600-d text-xs font-medium leading-4">
                {enabledCount}/{ALL_PERMISSIONS.length} Permissions
              </span>
            </div>

            <div className="flex flex-col">
              {ALL_PERMISSIONS.map(({ key, label }, i) => (
                <div
                  key={key}
                  className={cn(
                    "px-4 py-2 bg-brand-Text-50 flex items-center justify-between",
                    i < ALL_PERMISSIONS.length - 1 && "border-b border-brand-Text-100"
                  )}
                >
                  <span className="text-brand-Text-800 text-sm font-medium leading-5">{label}</span>
                  <Toggle
                    checked={permissions[key] ?? false}
                    onChange={() => togglePermission(key)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <hr className="border-brand-Text-100" />
      <Dialog.Close asChild>
        <div className="flex justify-end items-center gap-6">
          <Button variant="outline-transparent" size="lg" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button size="lg">Assign Staff</Button>
        </div>
      </Dialog.Close>
    </Modal>
  );
};

export default InviteStaffModal;
