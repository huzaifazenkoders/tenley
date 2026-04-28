"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { queryKeys } from "@/query-keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FileText, Pencil, ShieldOff } from "lucide-react";
import { Switch } from "radix-ui";
import { useState } from "react";
import { toast } from "sonner";
import { PERMISSION_LABELS } from "../services/permission.constants";
import { getPermissions } from "../services/permission.service";
import {
  getRoleDetails,
  getRoles,
  updateRole,
  type RolePermissionDetail,
} from "../services/role.service";

const RoleListSkeleton = () => (
  <div className="flex flex-col gap-1 p-2">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="p-4 rounded-xl flex flex-col gap-2 animate-pulse">
        <div className="h-4 w-3/4 bg-brand-Text-100 rounded" />
        <div className="h-3 w-1/2 bg-brand-Text-100 rounded" />
      </div>
    ))}
  </div>
);

const PermissionsSkeleton = () => (
  <div className="w-full flex flex-col">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className={cn("p-3 flex justify-between items-center animate-pulse", i < 7 && "border-b border-brand-Text-100")}
      >
        <div className="h-4 w-40 bg-brand-Text-100 rounded" />
        <div className="w-9 h-5 bg-brand-Text-100 rounded-xl" />
      </div>
    ))}
  </div>
);

const RolesPermissionsView = () => {
  const queryClient = useQueryClient();
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<RolePermissionDetail[]>([]);

  const { data: rolesData, isLoading: rolesLoading } = useQuery({
    queryKey: queryKeys.roles.all,
    queryFn: getRoles,
  });

  const { data: permissionsData, isLoading: permissionsLoading } = useQuery({
    queryKey: queryKeys.permissions.all,
    queryFn: getPermissions,
  });

  const roles = rolesData?.data ?? [];
  const activeRoleId = selectedRoleId ?? roles[0]?.id ?? null;

  const { data: roleDetailsData, isLoading: roleDetailsLoading } = useQuery({
    queryKey: queryKeys.roles.details(activeRoleId ?? ""),
    queryFn: () => getRoleDetails(activeRoleId!),
    enabled: !!activeRoleId,
  });

  const allPermissions = permissionsData?.data ?? [];
  const roleDetails = roleDetailsData?.data;

  // Build merged permissions list: all permissions with enabled state from role
  const mergedPermissions: RolePermissionDetail[] = allPermissions.map((p) => {
    const rolePermission = roleDetails?.permissions.find((rp) => rp.key === p.key);
    return {
      key: p.key,
      module: p.module,
      description: p.description,
      enabled: rolePermission?.enabled ?? false,
    };
  });

  const activePerms = editing ? draft : mergedPermissions;

  const { mutate: saveRole, isPending } = useMutation({
    mutationFn: () =>
      updateRole(activeRoleId!, {
        permissions: draft.map((p) => ({ key: p.key, enabled: p.enabled })),
      }),
    onSuccess: ({ error }) => {
      if (error) { toast.error(error); return; }
      toast.success("Role updated successfully");
      queryClient.invalidateQueries({ queryKey: queryKeys.roles.details(activeRoleId!) });
      setEditing(false);
    },
  });

  const handleEditClick = () => {
    setDraft([...mergedPermissions]);
    setEditing(true);
  };

  const toggleDraft = (key: string) =>
    setDraft((prev) =>
      prev.map((p) => (p.key === key ? { ...p, enabled: !p.enabled } : p))
    );

  const selectedRole = roles.find((r) => r.id === activeRoleId);
  const userCount = selectedRole
    ? (rolesData?.data?.find((r) => r.id === activeRoleId)?.permissions?.length ?? 0)
    : 0;

  const permissionsLoaderVisible = roleDetailsLoading || permissionsLoading;

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
        <div className="w-72 shrink-0 bg-brand-base-white rounded-xl shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col p-2">
          {rolesLoading ? (
            <RoleListSkeleton />
          ) : roles.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-10 px-4 text-center">
              <ShieldOff className="size-8 text-brand-Text-300" />
              <span className="text-brand-Text-600 text-sm font-medium">No roles found</span>
              <span className="text-brand-Text-400 text-xs">Create a role to get started.</span>
            </div>
          ) : (
            roles.map((role) => {
              const isActive = activeRoleId === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => { setSelectedRoleId(role.id); setEditing(false); }}
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
            })
          )}
        </div>

        {/* Permissions panel */}
        <div className="flex-1 p-4 bg-brand-base-white rounded-xl shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col items-end gap-4">
          <div className="w-full flex justify-between items-center">
            <span className="text-brand-Text-950-d text-base font-semibold leading-5">Permissions</span>
            {activeRoleId && (
              <div className="flex items-center gap-6">
                <span className="px-2.5 py-1 bg-brand-primary-blue-50 rounded-lg outline outline-1 -outline-offset-1 outline-brand-primary-blue-200 text-brand-primary-blue-600 text-xs font-medium leading-4">
                  {roleDetails?.assigned_users_count} Users
                </span>
                {!editing && (
                  <button className="p-1.5 bg-brand-Text-50 rounded-full" onClick={handleEditClick}>
                    <Pencil className="size-4 text-brand-Text-950-d" />
                  </button>
                )}
              </div>
            )}
          </div>

          {permissionsLoaderVisible ? (
            <PermissionsSkeleton />
          ) : !activeRoleId ? (
            <div className="w-full flex flex-col items-center justify-center gap-2 py-10 text-center">
              <ShieldOff className="size-8 text-brand-Text-300" />
              <span className="text-brand-Text-600 text-sm font-medium">No role selected</span>
              <span className="text-brand-Text-400 text-xs">Create a role first to configure its permissions.</span>
            </div>
          ) : activePerms.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center gap-2 py-10 text-center">
              <ShieldOff className="size-8 text-brand-Text-300" />
              <span className="text-brand-Text-600 text-sm font-medium">No permissions available</span>
              <span className="text-brand-Text-400 text-xs">There are no permissions configured for this role.</span>
            </div>
          ) : (
            <div className="w-full flex flex-col">
              {activePerms.map((perm, i) => (
                <div
                  key={perm.key}
                  className={cn("p-3 flex justify-between items-center", i < activePerms.length - 1 && "border-b border-brand-Text-100")}
                >
                  <span className="text-brand-Text-800 text-sm font-medium leading-5">
                    {PERMISSION_LABELS[perm.key] ?? perm.key}
                  </span>
                  <Switch.Root
                    checked={perm.enabled}
                    onCheckedChange={() => editing && toggleDraft(perm.key)}
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
          )}

          {editing && (
            <div className="flex items-center gap-4">
              <Button variant="outline-transparent" size="sm" onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => saveRole()} disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RolesPermissionsView;
