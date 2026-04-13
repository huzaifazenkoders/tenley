"use client";
import { cn } from "@/lib/utils";
import { Popover } from "radix-ui";
import { ChevronUp, Search, UserPlus } from "lucide-react";
import { useState } from "react";

type StaffMember = { id: string; name: string; role: string };

const ROLES = [
  "All Staff",
  "Maintenance Supervisor",
  "Property Manager",
  "Maintenance Technician",
  "Manager Supervisor",
  "Regional Supervisor"
];

type Props = {
  staff: StaffMember[];
  selected: string[];
  onToggle: (id: string) => void;
  onInviteNew?: () => void;
};

const StaffSelectDropdown = ({
  staff,
  selected,
  onToggle,
  onInviteNew
}: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeRole, setActiveRole] = useState("All Staff");

  const filtered = staff.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = activeRole === "All Staff" || s.role === activeRole;
    return matchesSearch && matchesRole;
  });

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="w-56 px-4 py-2 rounded-lg outline outline-1 -outline-offset-1 outline-brand-primary-red-600-d inline-flex items-center justify-between gap-2 text-brand-Text-600 text-sm font-medium">
          Select Staff
          <ChevronUp
            className={cn("size-4 transition-transform", !open && "rotate-180")}
          />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={8}
          className="bg-white rounded-2xl shadow-[0px_1px_18px_0px_rgba(0,0,0,0.08)] flex flex-col z-50 outline outline-1 -outline-offset-1 outline-brand-Text-100"
        >
          {/* Search + Filter */}
          <div className="px-5 py-5 border-b border-border-primary flex items-center gap-3">
            <div className="flex-1 h-10 pl-3 pr-4 py-2 bg-white rounded-lg outline outline-1 -outline-offset-1 outline-border-primary flex items-center gap-3">
              <Search className="size-4 text-zinc-500 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="flex-1 text-brand-Text-500 text-base font-normal leading-6 outline-none bg-transparent"
              />
            </div>
            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="h-9 px-3 py-1.5 bg-white rounded-lg outline outline-1 -outline-offset-1 outline-brand-primary-red-600-d flex items-center gap-1 text-brand-Text-600 text-base font-normal whitespace-nowrap">
                  Filter
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  align="end"
                  sideOffset={8}
                  className="p-2 bg-white rounded-xl shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-200 flex flex-wrap gap-2 w-72 z-50"
                >
                  {ROLES.map((role) => (
                    <button
                      key={role}
                      onClick={() => setActiveRole(role)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-normal leading-4 transition-colors",
                        activeRole === role
                          ? "bg-brand-primary-red-50 outline outline-1 -outline-offset-1 outline-brand-primary-red-600-d text-brand-primary-red-500"
                          : "bg-brand-Text-50 text-brand-Text-600"
                      )}
                    >
                      {role}
                    </button>
                  ))}
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>

          {/* Staff list */}
          <div className="flex flex-col max-h-64 overflow-y-auto custom-scrollbar">
            {filtered.map((member) => (
              <button
                key={member.id}
                onClick={() => onToggle(member.id)}
                className="pl-2 py-2 flex items-center gap-2.5 hover:bg-brand-Text-50 transition-colors text-left"
              >
                <div className="size-7 rounded-full bg-brand-Text-100 shrink-0 flex items-center justify-center text-xs font-medium text-brand-Text-600">
                  {member.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      selected.includes(member.id)
                        ? "text-brand-primary-red-500"
                        : "text-brand-Text-950-d"
                    )}
                  >
                    {member.name}
                  </span>
                  <span className="text-brand-Text-500 text-xs font-normal">
                    {member.role}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border-primary">
            <button
              onClick={onInviteNew}
              className="flex items-center gap-2 text-brand-primary-red-600-d text-base font-medium leading-6"
            >
              <UserPlus className="size-4" /> Invite New User
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default StaffSelectDropdown;
