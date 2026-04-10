"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileText, Pencil } from "lucide-react";
import { Switch } from "radix-ui";
import { useState } from "react";

type Role = { id: string; name: string; description: string };

const roles: Role[] = [
  { id: "property-manager", name: "Property Manager", description: "Full property management for assigned properties" },
  { id: "maintenance-technician", name: "Maintenance Technician", description: "Can view and update emergencies for assigned properties" },
  { id: "maintenance-supervisor", name: "Maintenance Supervisor", description: "Oversee maintenance operations across multiple properties" },
  { id: "regional-supervisor", name: "Regional Supervisor", description: "Multi-property oversight and coordination" },
  { id: "company-admin", name: "Company Admin", description: "Full platform access including billing and settings" },
];

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

const RolesPermissionsView = () => {
  const [selectedRole, setSelectedRole] = useState("property-manager");
  const [permissions, setPermissions] = useState<Permission[]>(defaultPermissions);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Permission[]>(defaultPermissions);

  const handleEditClick = () => {
    setDraft([...permissions]);
    setEditing(true);
  };

  const handleCancel = () => setEditing(false);

  const handleSave = () => {
    setPermissions(draft);
    setEditing(false);
  };

  const toggleDraft = (id: string) =>
    setDraft((prev) => prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));

  const activePerms = editing ? draft : permissions;

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header card */}
      <div className="p-6 bg-brand-base-white rounded-xl shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6 overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-primary-red-50 rounded-lg">
            <FileText className="size-5 text-brand-primary-red-600-d" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-brand-Text-950-d text-xl font-semibold leading-6">Role-Based Permissions</span>
            <span className="text-brand-Text-600 text-xs font-normal leading-4">View and manage permissions for each role in your organization</span>
          </div>
        </div>
      </div>

      {/* Role list + permissions panel */}
      <div className="flex items-start gap-5">
        {/* Role list */}
        <div className="w-96 bg-brand-base-white rounded-xl shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col p-2">
          {roles.map((role) => {
            const isActive = selectedRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={cn(
                  "w-full p-4 rounded-xl flex flex-col gap-1 text-left transition-colors",
                  isActive ? "bg-brand-primary-red-50" : "hover:bg-brand-Text-50"
                )}
              >
                <span className={cn("text-base font-semibold leading-5", isActive ? "text-brand-primary-red-500" : "text-brand-Text-950-d")}>
                  {role.name}
                </span>
                <span className={cn("text-xs font-normal leading-4", isActive ? "text-brand-primary-red-400" : "text-brand-Text-600")}>
                  {role.description}
                </span>
              </button>
            );
          })}
        </div>

        {/* Permissions panel */}
        <div className="flex-1 p-4 bg-brand-base-white rounded-xl shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col items-end gap-4">
          {/* Header */}
          <div className="w-full flex justify-between items-center">
            <span className="text-brand-Text-950-d text-base font-semibold leading-5">Permissions</span>
            <div className="flex items-center gap-6">
              <span className="px-2.5 py-1 bg-brand-primary-blue-50 rounded-lg outline outline-1 -outline-offset-1 outline-brand-primary-blue-200 text-brand-primary-blue-600 text-xs font-medium leading-4">
                8 Users
              </span>
              {!editing && (
                <button className="p-1.5 bg-brand-Text-50 rounded-full" onClick={handleEditClick}>
                  <Pencil className="size-4 text-brand-Text-950-d" />
                </button>
              )}
            </div>
          </div>

          {/* Permission rows */}
          <div className="w-full flex flex-col">
            {activePerms.map((perm, i) => (
              <div
                key={perm.id}
                className={cn("p-3 flex justify-between items-center", i < activePerms.length - 1 && "border-b border-brand-Text-100")}
              >
                <span className="text-brand-Text-800 text-sm font-medium leading-5">{perm.label}</span>
                <Switch.Root
                  checked={perm.enabled}
                  onCheckedChange={() => editing && toggleDraft(perm.id)}
                  disabled={!editing}
                  className={cn(
                    "w-9 h-5 rounded-xl p-0.5 flex items-center transition-colors duration-200 focus:outline-none",
                    perm.enabled ? "bg-brand-primary-red-600-d justify-end" : "bg-Text-200 justify-start",
                    !editing && "opacity-50 cursor-default"
                  )}
                >
                  <Switch.Thumb className="size-4 bg-white rounded-full shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10)] block" />
                </Switch.Root>
              </div>
            ))}
          </div>

          {/* Edit mode action buttons */}
          {editing && (
            <div className="flex items-center gap-4">
              <Button variant="outline-transparent" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RolesPermissionsView;
