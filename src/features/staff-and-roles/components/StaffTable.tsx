"use client";
import { Button } from "@/components/ui/button";
import Select from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TextInput from "@/components/ui/text-input";
import { queryKeys } from "@/query-keys";
import { useUserStore } from "@/store/userStore";
import type { CompanyStaffItem, InviteStatus } from "@/types/company-staff";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Search,
  ShieldOff,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { getRoles } from "../services/role.service";
import { listCompanyStaff } from "../services/staff.service";
import { getCompanyIdFromUser } from "../utils/company";

const LIMIT = 10;
const ALL_VALUE = "all";

const statusLabels: Record<InviteStatus, string> = {
  invitation_sent: "Invitation Sent",
  invitation_accepted: "Active",
  invitation_rejected: "Invitation Rejected",
  invitation_expired: "Invitation Expired",
};

const RoleBadge = ({ role }: { role: string }) => (
  <span className="px-2 py-1 bg-brand-primary-red-50 rounded-full outline outline-1 -outline-offset-1 outline-brand-primary-red-200 text-brand-primary-red-500 text-sm font-medium leading-5 whitespace-nowrap">
    {role}
  </span>
);

const StatusBadge = ({ status }: { status: InviteStatus }) => {
  const isAccepted = status === "invitation_accepted";
  const isRejectedOrExpired =
    status === "invitation_rejected" || status === "invitation_expired";

  return (
    <span
      className={
        "px-2.5 py-[3px] rounded-xl text-sm font-normal leading-5 " +
        (isAccepted
          ? "bg-green-600/10 text-green-600"
          : isRejectedOrExpired
            ? "bg-gray-500/10 text-neutral-500"
            : "bg-blue-600/10 text-Active-Blue-50")
      }
    >
      {statusLabels[status]}
    </span>
  );
};

const Avatar = ({ row }: { row: CompanyStaffItem }) => {
  if (row.profile_image_url) {
    return (
      <Image
        src={row.profile_image_url}
        alt={row.name}
        width={40}
        height={40}
        className="size-10 rounded-full object-cover shrink-0"
      />
    );
  }

  return (
    <div className="size-10 rounded-full bg-brand-Text-100 flex items-center justify-center shrink-0 text-brand-Text-600 text-sm font-semibold">
      {row.name[0]?.toUpperCase() ?? "?"}
    </div>
  );
};

const SkeletonRow = () => (
  <TableRow>
    {Array.from({ length: 6 }).map((_, i) => (
      <TableCell key={i}>
        <div className="h-4 bg-gray-100 rounded animate-pulse" />
      </TableCell>
    ))}
  </TableRow>
);

const StaffTable = () => {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const isUserLoading = useUserStore((s) => s.isLoading);
  const company = useUserStore((s) => s.company);
  const isMeLoading = useUserStore((s) => s.isMeLoading);
  const companyId = company?.id ?? company?.company_id ?? getCompanyIdFromUser(user);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [roleId, setRoleId] = useState<string>(ALL_VALUE);
  const [status, setStatus] = useState<InviteStatus | typeof ALL_VALUE>(
    ALL_VALUE
  );
  const [debouncedSearch] = useDebounce(search, 400);

  const staffParams = {
    companyId,
    limit: LIMIT,
    offset,
    search: debouncedSearch,
    status,
    roleId,
  };

  const { data: rolesData, isLoading: rolesLoading } = useQuery({
    queryKey: queryKeys.roles.all,
    queryFn: getRoles,
  });

  const {
    data: staffResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: queryKeys.staff.list(staffParams),
    queryFn: () =>
      listCompanyStaff({
        company_id: companyId!,
        limit: LIMIT,
        offset,
        search: debouncedSearch || null,
        status: status === ALL_VALUE ? null : status,
        role_id: roleId === ALL_VALUE ? null : roleId,
      }),
    enabled: Boolean(companyId),
  });

  const rows = staffResponse?.data ?? [];
  const pagination = staffResponse?.pagination;
  const total = pagination?.total ?? 0;
  const page = pagination?.page ?? Math.floor(offset / LIMIT) + 1;
  const totalPages = pagination?.total_pages ?? (Math.ceil(total / LIMIT) || 1);
  const isFiltered =
    debouncedSearch !== "" || roleId !== ALL_VALUE || status !== ALL_VALUE;
  const isInitialLoading = isUserLoading || isMeLoading || isLoading;

  const resetFilters = () => {
    setSearch("");
    setRoleId(ALL_VALUE);
    setStatus(ALL_VALUE);
    setOffset(0);
  };

  return (
    <div className="w-full bg-brand-base-white rounded-[20px] shadow-[0px_0px_0px_1px_rgba(220,223,228,1.00)] flex flex-col overflow-hidden">
      <div className="px-6 py-4 border-b border-Colors-Card-stroke2 flex items-center gap-4">
        <TextInput
          startIcon={<Search className="size-5 text-brand-Text-400" />}
          placeholder="Search..."
          value={search}
          setValue={(value) => {
            setSearch(value);
            setOffset(0);
          }}
          containerClassName="w-96"
        />
        <div className="flex items-center gap-4 ml-auto">
          <Select
            options={[
              { label: "All Roles", value: ALL_VALUE },
              ...((rolesData?.data ?? []).map((role) => ({
                label: role.name,
                value: role.id,
              })) ?? []),
            ]}
            value={roleId}
            onValueChange={(value) => {
              setRoleId(value);
              setOffset(0);
            }}
            disabled={rolesLoading}
            placeholder="All Roles"
            triggerClassName="whitespace-nowrap"
          />
          <Select
            options={[
              { label: "All Status", value: ALL_VALUE },
              { label: "Active", value: "invitation_accepted" },
              { label: "Invitation Sent", value: "invitation_sent" },
              // { label: "Invitation Rejected", value: "invitation_rejected" },
              // { label: "Invitation Expired", value: "invitation_expired" },
            ]}
            value={status}
            onValueChange={(value) => {
              setStatus(value as InviteStatus | typeof ALL_VALUE);
              setOffset(0);
            }}
            placeholder="All Status"
            triggerClassName="whitespace-nowrap"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-light-50">
            <TableHead className="w-80">Staff Name</TableHead>
            <TableHead className="w-64">Role</TableHead>
            <TableHead>Properties</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-20">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isInitialLoading &&
            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
          {!isInitialLoading && !companyId && (
            <TableRow>
              <TableCell colSpan={6} className="py-16 text-center">
                <div className="flex flex-col items-center gap-2">
                  <ShieldOff className="size-8 text-brand-Text-300" />
                  <p className="text-brand-Text-700 text-sm font-medium">
                    Company context is missing
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
          {!isInitialLoading && companyId && isError && (
            <TableRow>
              <TableCell colSpan={6} className="py-16 text-center">
                <p className="text-Error-Red-60 text-sm font-medium">
                  Unable to load staff.
                </p>
              </TableCell>
            </TableRow>
          )}
          {!isInitialLoading && companyId && !isError && rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="py-16 text-center">
                <div className="flex flex-col items-center gap-3">
                  <p className="text-brand-Text-700 text-sm font-medium">
                    {isFiltered ? "No staff match your filters" : "No staff found"}
                  </p>
                  {isFiltered && (
                    <Button variant="outline" size="sm" onClick={resetFilters}>
                      Reset filters
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )}
          {!isInitialLoading &&
            rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar row={row} />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-brand-Text-950-d text-sm font-medium leading-5">
                        {row.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-brand-Text-700 text-xs font-normal leading-4">
                          {row.designation ?? row.email}
                        </span>
                        {row.is_tenant && (
                          <>
                            <span className="size-1.5 bg-zinc-300 rounded-full" />
                            <span className="text-brand-primary-red-600-d text-xs font-normal leading-4">
                              Also Tenant
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <RoleBadge role={row.role_name ?? "Unassigned"} />
                </TableCell>
                <TableCell>
                  <span className="text-brand-Text-800 text-sm font-normal leading-5">
                    {row.property_count || "-"}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-brand-Text-800 text-sm font-normal leading-5">
                    {row.enabled_permissions}/{row.total_permissions}
                  </span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={row.status} />
                </TableCell>
                <TableCell>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => router.push(`/staff-and-roles/staff/${row.id}`)}
                  >
                    <Eye className="size-5 text-brand-Text-700" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div className="py-2 px-4 flex justify-end items-center gap-6">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Rows per page:</span>
          <span className="text-gray-800">{LIMIT}</span>
          <ChevronDown className="size-4 text-gray-500" />
        </div>
        <span className="text-xs text-gray-800">
          {total === 0 ? 0 : offset + 1}-{Math.min(offset + LIMIT, total)} of{" "}
          {total}
        </span>
        <div className="flex items-center">
          <button
            className="p-2 rounded-lg hover:bg-brand-Text-50 transition-colors disabled:opacity-40"
            disabled={!pagination?.has_prev && offset === 0}
            onClick={() => setOffset((current) => Math.max(0, current - LIMIT))}
          >
            <ChevronLeft className="size-4 text-gray-500" />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-brand-Text-50 transition-colors disabled:opacity-40"
            disabled={!pagination?.has_next && page >= totalPages}
            onClick={() => setOffset((current) => current + LIMIT)}
          >
            <ChevronRight className="size-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffTable;
