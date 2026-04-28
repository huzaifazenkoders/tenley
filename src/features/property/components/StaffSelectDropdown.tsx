"use client";
import { cn } from "@/lib/utils";
import { Popover } from "radix-ui";
import { ChevronUp, Loader2, Search, UserPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { getCompanyIdFromUser } from "@/features/staff-and-roles/utils/company";
import { searchStaffByEmail, type SearchStaffItem } from "../services/staffService";
import Image from "next/image";

type Props = {
  selectedIds: string[];
  onToggle: (item: SearchStaffItem) => void;
  onInviteNew?: () => void;
};

const StaffSelectDropdown = ({ selectedIds, onToggle, onInviteNew }: Props) => {
  const user = useUserStore((s) => s.user);
  const company = useUserStore((s) => s.company);
  const companyId =
    company?.id ?? company?.company_id ?? getCompanyIdFromUser(user) ?? "";
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchStaffItem[]>([]);
  const [defaultResults, setDefaultResults] = useState<SearchStaffItem[]>([]);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!companyId) return;
    searchStaffByEmail("", companyId).then(({ data }) => {
      if (data) setDefaultResults(data);
    });
  }, [companyId]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!search.trim() || !companyId) {
      setResults([]);
      return;
    }
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      const { data } = await searchStaffByEmail(search.trim(), companyId);
      setResults(data ?? []);
      setLoading(false);
    }, 400);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [search, companyId]);

  const displayed = search.trim() ? results : defaultResults;

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
          className="bg-white rounded-2xl shadow-[0px_1px_18px_0px_rgba(0,0,0,0.08)] flex flex-col z-50 outline outline-1 -outline-offset-1 outline-brand-Text-100 w-80"
        >
          {/* Search */}
          <div className="px-5 py-5 border-b border-border-primary">
            <div className="h-10 pl-3 pr-4 py-2 bg-white rounded-lg outline outline-1 -outline-offset-1 outline-border-primary flex items-center gap-3">
              <Search className="size-4 text-zinc-500 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email"
                className="flex-1 text-brand-Text-500 text-base font-normal leading-6 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col max-h-64 overflow-y-auto custom-scrollbar">
            {loading && (
              <div className="flex justify-center py-4">
                <Loader2 className="size-4 animate-spin text-brand-Text-400" />
              </div>
            )}
            {!loading && displayed.length === 0 && (
              <p className="text-center text-brand-Text-400 text-sm py-4">
                No staff found
              </p>
            )}
            {displayed.map((member) => (
              <button
                key={member.id}
                onClick={() => onToggle(member)}
                className="pl-3 pr-4 py-2 flex items-center gap-2.5 hover:bg-brand-Text-50 transition-colors text-left"
              >
                {member.profile_image_url ? (
                  <Image
                    src={member.profile_image_url}
                    alt={member.full_name}
                    width={28}
                    height={28}
                    className="size-7 rounded-full object-cover shrink-0"
                    unoptimized
                  />
                ) : (
                  <div className="size-7 rounded-full bg-brand-Text-100 shrink-0 flex items-center justify-center text-xs font-medium text-brand-Text-600">
                    {member.full_name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span
                    className={cn(
                      "text-sm font-medium truncate",
                      selectedIds.includes(member.id)
                        ? "text-brand-primary-red-500"
                        : "text-brand-Text-950-d"
                    )}
                  >
                    {member.full_name}
                  </span>
                  <span className="text-brand-Text-500 text-xs font-normal truncate">
                    {member.email}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border-primary">
            <button
              onClick={() => {
                setOpen(false);
                onInviteNew?.();
              }}
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
