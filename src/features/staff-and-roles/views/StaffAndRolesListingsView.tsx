"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClipboardList, Plus, UserPlus } from "lucide-react";
import { useQueryState } from "nuqs";
import { useState } from "react";
import CreateRoleModal from "../components/CreateRoleModal";
import InviteStaffModal from "../components/InviteStaffModal";
import RolesPermissionsView from "../components/RolesPermissionsView";
import StaffTable from "../components/StaffTable";

const tabs = [
  { id: "staff", label: "Staff", icon: UserPlus },
  { id: "roles", label: "Roles", icon: ClipboardList }
];

const StaffAndRolesListingsView = () => {
  const [tab, setTab] = useQueryState("tab", { defaultValue: "staff" });
  const [createRoleOpen, setCreateRoleOpen] = useState(false);
  const [inviteStaffOpen, setInviteStaffOpen] = useState(false);

  return (
    <>
      <CreateRoleModal open={createRoleOpen} onOpenChange={setCreateRoleOpen} />
      <InviteStaffModal
        open={inviteStaffOpen}
        onOpenChange={setInviteStaffOpen}
      />
      <div className="px-6 pt-10 pb-6 flex flex-col gap-5 w-full">
        {/* Page header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-brand-Text-950-d text-2xl font-bold leading-8">
            Staff &amp; Roles
          </h1>
          <p className="text-brand-Text-500 text-base font-normal leading-5">
            Manage staff, assignments, and access across properties.
          </p>
        </div>

        {/* Tabs + actions row */}
        <div className="flex justify-between items-center">
          <div className="p-1 bg-zinc-100 rounded-full inline-flex w-fit">
            {tabs.map(({ id, label, icon: Icon }) => {
              const isActive = tab === id;
              return (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={cn(
                    "px-6 py-2 rounded-full flex items-center gap-2 text-xs leading-4 transition-all duration-200",
                    isActive
                      ? "bg-Static-White shadow-[3px_3px_8px_0px_rgba(0,0,0,0.06)] text-brand-Text-950-d font-medium"
                      : "text-brand-Text-600 font-normal"
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {tab === "staff" ? (
              <>
                {/* <Button
                  variant="outline-transparent"
                  className="gap-2"
                  onClick={() => setInviteStaffOpen(true)}
                >
                  <UserPlus className="size-4" />
                  Invite Staff
                </Button>
                <Button className="gap-2" link="/staff-and-roles/bulk-assign">
                  <List className="size-4" />
                  Bulk Assign
                </Button> */}
              </>
            ) : (
              <Button className="gap-2" onClick={() => setCreateRoleOpen(true)}>
                <Plus className="size-4" />
                Create New Role
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        {tab === "staff" ? <StaffTable /> : <RolesPermissionsView />}
      </div>
    </>
  );
};

export default StaffAndRolesListingsView;
