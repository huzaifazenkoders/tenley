"use client";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import TextInput from "@/components/ui/text-input";
import { inputStyles } from "@/styles/ui/inputStyles";
import { cn } from "@/lib/utils";
import { Switch } from "radix-ui";
import { useState } from "react";

type Permission = { id: string; label: string; enabled: boolean };

const initialPermissions: Permission[] = [
  { id: "dashboard", label: "Dashboard", enabled: false },
  { id: "property-management", label: "Property Management", enabled: true },
  { id: "staff-roles", label: "Staff & Roles", enabled: false },
  { id: "tenants", label: "Tenants", enabled: false },
  { id: "emergencies", label: "Emergencies", enabled: true },
  { id: "notifications", label: "Notifications", enabled: false },
  { id: "analytics", label: "Analytics & Reports", enabled: false },
  { id: "settings", label: "Settings", enabled: true }
];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CreateRoleModal = ({ open, onOpenChange }: Props) => {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] =
    useState<Permission[]>(initialPermissions);

  const enabledCount = permissions.filter((p) => p.enabled).length;

  const toggle = (id: string) =>
    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      className="w-[836px] p-6 flex flex-col gap-5"
    >
      <h2 className="text-brand-Text-950-d text-2xl font-bold leading-8">
        Create New Role
      </h2>

      <div className="p-4 rounded-2xl flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          {/* Role Name */}
          <TextInput
            label="Role Name"
            placeholder="Enter role name"
            value={roleName}
            setValue={setRoleName}
          />

          {/* Description */}
          <div className="flex flex-col gap-[3px]">
            <label className="text-brand-Text-950-d text-sm font-medium leading-5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={3}
              className={cn(inputStyles, "resize-none py-2 h-24")}
            />
          </div>

          {/* Permissions */}
          <div className="p-4 bg-brand-Text-50 rounded-xl flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-brand-Text-950-d text-xl font-semibold leading-6">
                  Permissions
                </span>
                <span className="text-brand-Text-600 text-xs font-normal leading-4">
                  Configure specific access controls for this staff member
                </span>
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
                    i < permissions.length - 1 &&
                      "border-b border-brand-Text-100"
                  )}
                >
                  <span className="text-brand-Text-800 text-sm font-medium leading-5">
                    {perm.label}
                  </span>
                  <Switch.Root
                    checked={perm.enabled}
                    onCheckedChange={() => toggle(perm.id)}
                    className={cn(
                      "w-9 h-5 rounded-xl p-0.5 flex items-center transition-colors duration-200 focus:outline-none",
                      perm.enabled
                        ? "bg-brand-primary-red-600-d justify-end"
                        : "bg-Text-200 justify-start"
                    )}
                  >
                    <Switch.Thumb className="size-4 bg-white rounded-full shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10)] block transition-transform duration-200" />
                  </Switch.Root>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-brand-Text-100" />

      <div className="flex justify-end items-center gap-6">
        <Button
          variant="outline-transparent"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button>Save Role</Button>
      </div>
    </Modal>
  );
};

export default CreateRoleModal;
