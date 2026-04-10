"use client";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { cn } from "@/lib/utils";
import { UserPlus } from "lucide-react";
import { Switch } from "radix-ui";
import { useState } from "react";

type Permission = { id: string; label: string; enabled: boolean };

const defaultPermissions: Permission[] = [
  { id: "dashboard", label: "Dashboard", enabled: false },
  { id: "property-management", label: "Property Management", enabled: false },
  { id: "staff-roles", label: "Staff & Roles", enabled: true },
  { id: "tenants", label: "Tenants", enabled: true },
  { id: "emergencies", label: "Emergencies", enabled: true },
  { id: "notifications", label: "Notifications", enabled: true },
  { id: "analytics", label: "Analytics & Reports", enabled: true },
  { id: "settings", label: "Settings", enabled: true },
];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const InviteStaffModal = ({ open, onOpenChange }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>(defaultPermissions);

  const enabledCount = permissions.filter((p) => p.enabled).length;

  const toggle = (id: string) =>
    setPermissions((prev) => prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="w-[836px] p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2.5 bg-brand-primary-red-50 rounded-full">
            <UserPlus className="size-6 text-brand-primary-red-600-d" />
          </div>
          <h2 className="text-brand-Text-950-d text-2xl font-bold leading-8">Invite Staff Member</h2>
        </div>
        <p className="text-brand-Text-500 text-sm font-normal leading-5">
          Enter the employee&apos;s email address and assign their role. They&apos;ll receive an email invitation to join and manage assigned properties.
        </p>
      </div>

      {/* Form */}
      <div className="p-4 rounded-2xl flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex gap-6">
            <TextInput
              label="Name"
              placeholder="Enter name"
              value={name}
              setValue={setName}
              containerClassName="flex-1"
            />
            <TextInput
              label="Email"
              placeholder="Enter email"
              value={email}
              setValue={setEmail}
              type="email"
              containerClassName="flex-1"
            />
          </div>
          <div className="flex gap-6">
            <TextInput
              label="Designation"
              placeholder="Enter designation"
              value={designation}
              setValue={setDesignation}
              containerClassName="flex-1"
            />
            <Select
              label="Role"
              placeholder="Select Staff Role"
              value={role}
              onValueChange={setRole}
              options={[
                { label: "Property Manager", value: "property-manager" },
                { label: "Maintenance Technician", value: "maintenance-technician" },
                { label: "Maintenance Supervisor", value: "maintenance-supervisor" },
                { label: "Regional Supervisor", value: "regional-supervisor" },
                { label: "Company Admin", value: "company-admin" },
              ]}
              containerClassName="flex-1"
            />
          </div>
        </div>

        {/* Permissions — shown only when role is selected */}
        {role && (
          <div className="p-4 bg-brand-Text-50 rounded-xl flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-brand-Text-950-d text-xl font-semibold leading-6">Permissions</span>
                <span className="text-brand-Text-600 text-xs font-normal leading-4">Configure specific access controls for this staff member</span>
              </div>
              <span className="px-3 py-1.5 bg-brand-primary-red-50 rounded-full outline outline-1 -outline-offset-1 outline-brand-primary-red-200 text-brand-primary-red-600-d text-xs font-medium leading-4">
                {enabledCount}/8 Permissions
              </span>
            </div>

            <div className="flex flex-col">
              {permissions.map((perm, i) => (
                <div
                  key={perm.id}
                  className={cn(
                    "px-4 py-2 bg-brand-Text-50 flex justify-between items-center",
                    i < permissions.length - 1 && "border-b border-brand-Text-100"
                  )}
                >
                  <span className="text-brand-Text-800 text-sm font-medium leading-5">{perm.label}</span>
                  <Switch.Root
                    checked={perm.enabled}
                    onCheckedChange={() => toggle(perm.id)}
                    className={cn(
                      "w-9 h-5 rounded-xl p-0.5 flex items-center transition-colors duration-200 focus:outline-none",
                      perm.enabled ? "bg-brand-primary-red-600-d justify-end" : "bg-Text-200 justify-start opacity-50"
                    )}
                  >
                    <Switch.Thumb className="size-4 bg-white rounded-full shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10)] block" />
                  </Switch.Root>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="h-px bg-brand-Text-100" />

      {/* Footer */}
      <div className="flex justify-end items-center gap-6">
        <Button variant="outline-transparent" size="lg" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button size="lg">
          Send Invitation
        </Button>
      </div>
    </Modal>
  );
};

export default InviteStaffModal;
