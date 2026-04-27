"use client";
import { Button } from "@/components/ui/button";
import DateSelector from "@/components/ui/date-selector";
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
import { handleRippleAnimation } from "@/lib/ui/handleRippleAnimation";
import { queryKeys } from "@/query-keys";
import { useQuery } from "@tanstack/react-query";
import {
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Home,
  Search,
  Archive,
} from "lucide-react";
import moment from "moment";
import React, { useDeferredValue, useState } from "react";
import ArchivedTenantSheet from "./ArchivedTenantSheet";
import { getTenantList } from "../services/tenantService";
import type { TenantListItem } from "../types";

const PAGE_SIZE_OPTIONS = [
  { label: "10", value: "10" },
  { label: "25", value: "25" },
  { label: "50", value: "50" },
];

const PROPERTY_TYPE_OPTIONS = [
  { label: "Commercial", value: "commercial" },
  { label: "Residential", value: "residential" },
];

const PropertyTypeBadge = ({ type }: { type: string }) => {
  const isCommercial = type.toLowerCase() === "commercial";
  const Icon = isCommercial ? Building2 : Home;
  const label = isCommercial ? "Commercial" : "Residential";
  return (
    <span className="px-2 py-1 bg-Neutral-Grey-0 rounded-full outline outline-1 -outline-offset-1 outline-Neutral-Grey-10 inline-flex items-center gap-1">
      <Icon className="size-4 text-brand-Text-700" />
      <span className="text-brand-Text-700 text-sm font-medium">{label}</span>
    </span>
  );
};

const TableSkeleton = ({ rows = 8 }: { rows?: number }) => (
  <>
    {Array.from({ length: rows }).map((_, i) => (
      <TableRow key={i}>
        {Array.from({ length: 7 }).map((_, j) => (
          <TableCell key={j}>
            <div className="h-4 bg-brand-Text-100 rounded animate-pulse w-3/4" />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);

const ArchivedTenantsTable = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<TenantListItem | null>(
    null
  );
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const deferredSearch = useDeferredValue(search);

  const queryParams = {
    search: deferredSearch || null,
    propertyType: propertyType || null,
    dateFrom: dateFrom ? moment(dateFrom).format("YYYY-MM-DD") : null,
    dateTo: dateTo ? moment(dateTo).format("YYYY-MM-DD") : null,
    page,
    pageSize,
  };

  const { data: response, isLoading } = useQuery({
    queryKey: queryKeys.tenants.list("archived", queryParams),
    queryFn: () => getTenantList({ status: "archived", ...queryParams }),
  });

  const tenants: TenantListItem[] = response?.data?.data ?? [];
  const pagination = response?.data?.pagination;

  const totalPages = pagination?.total_pages ?? 1;
  const totalCount = pagination?.total_count ?? 0;
  const rangeStart = (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalCount);

  const openSheet = (tenant: TenantListItem) => {
    setSelectedTenant(tenant);
    setSheetOpen(true);
  };

  return (
    <>
      <ArchivedTenantSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        tenantId={selectedTenant?.tenant_id ?? null}
      />
      <div className="w-full bg-brand-base-white rounded-[20px] shadow-[0px_0px_0px_1px_rgba(220,223,228,1.00)] flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-Colors-Card-stroke2 flex items-center gap-4">
          <TextInput
            startIcon={<Search className="size-5 text-brand-Text-400" />}
            placeholder="Search..."
            containerClassName="w-96"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <div className="flex items-center gap-4 ml-auto">
            {/* From Date */}
            <DateSelector
              value={dateFrom ?? undefined}
              setValue={(d) => {
                setDateFrom(d);
                setPage(1);
              }}
              trigger={
                <Button
                  variant="outline-transparent"
                  className="text-text-secondary font-normal justify-between px-3"
                  onPointerDown={(e) => {
                    handleRippleAnimation(
                      e as unknown as React.MouseEvent<HTMLButtonElement>,
                      "bg-black/50"
                    );
                  }}
                >
                  {dateFrom
                    ? moment(dateFrom).format("DD MMM YY")
                    : "From Date"}
                  <ChevronDown className="size-4" />
                </Button>
              }
            />

            {/* To Date */}
            <DateSelector
              value={dateTo ?? undefined}
              minDate={dateFrom ?? undefined}
              setValue={(d) => {
                setDateTo(d);
                setPage(1);
              }}
              trigger={
                <Button
                  variant="outline-transparent"
                  className="text-text-secondary font-normal justify-between px-3"
                  onPointerDown={(e) => {
                    handleRippleAnimation(
                      e as unknown as React.MouseEvent<HTMLButtonElement>,
                      "bg-black/50"
                    );
                  }}
                >
                  {dateTo ? moment(dateTo).format("DD MMM YY") : "To Date"}
                  <ChevronDown className="size-4" />
                </Button>
              }
            />

            {(dateFrom || dateTo) && (
              <button
                className="text-brand-Text-400 text-xs underline hover:text-brand-Text-700 transition-colors"
                onClick={() => {
                  setDateFrom(null);
                  setDateTo(null);
                  setPage(1);
                }}
              >
                Clear dates
              </button>
            )}

            <Select
              options={PROPERTY_TYPE_OPTIONS}
              placeholder="All Property Type"
              triggerClassName="whitespace-nowrap"
              value={propertyType}
              onValueChange={(v) => {
                setPropertyType(v);
                setPage(1);
              }}
            />

            {propertyType && (
              <button
                className="text-brand-Text-400 text-xs underline hover:text-brand-Text-700 transition-colors"
                onClick={() => {
                  setPropertyType("");
                  setPage(1);
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-light-50">
              <TableHead>Tenant Name</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Property Type</TableHead>
              <TableHead>Move-In Date</TableHead>
              <TableHead>Move-Out Date</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton />
            ) : tenants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="flex flex-col items-center justify-center gap-2 py-14 text-center">
                    <Archive className="size-8 text-brand-Text-300" />
                    <span className="text-brand-Text-600 text-sm font-medium">
                      No archived tenants found
                    </span>
                    <span className="text-brand-Text-400 text-xs">
                      {search || propertyType || dateFrom || dateTo
                        ? "Try adjusting your filters"
                        : "Archived tenants will appear here"}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              tenants.map((row) => (
                <TableRow key={row.tenant_id}>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-brand-Text-950-d text-sm font-medium leading-5">
                        {row.tenant_name}
                      </span>
                      <span className="text-brand-Text-700 text-xs font-normal leading-4">
                        {row.tenant_email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-brand-Text-950-d text-sm font-medium leading-5">
                        {row.property_name}
                      </span>
                      {row.unit_number && (
                        <span className="text-brand-Text-700 text-xs font-normal leading-4">
                          {row.unit_name ? `${row.unit_name} · ` : ""}
                          {row.unit_number}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <PropertyTypeBadge type={row.property_type} />
                  </TableCell>
                  <TableCell>
                    <span className="text-brand-Text-950-d text-sm font-medium leading-5">
                      {moment(row.move_in_date).format("DD MMM YYYY")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-brand-Text-950-d text-sm font-medium leading-5">
                      {row.tenancy_ended_at
                        ? moment(row.tenancy_ended_at).format("DD MMM YYYY")
                        : "—"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-brand-Text-950-d text-sm font-medium leading-5 line-clamp-1">
                      {row.end_tenancy_reason ?? "—"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openSheet(row)}
                    >
                      <Eye className="size-5 text-brand-Text-700" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="py-2 px-4 flex justify-end items-center gap-6">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Rows per page:</span>
            <Select
              options={PAGE_SIZE_OPTIONS}
              value={String(pageSize)}
              onValueChange={(v) => {
                setPageSize(Number(v));
                setPage(1);
              }}
              triggerClassName="h-7 px-2 text-xs border-0 shadow-none"
            />
          </div>
          <span className="text-xs text-gray-800">
            {totalCount === 0 ? "0" : `${rangeStart}–${rangeEnd}`} of{" "}
            {totalCount}
          </span>
          <div className="flex items-center">
            <button
              className="p-2 rounded-lg hover:bg-brand-Text-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              <ChevronLeft className="size-4 text-gray-500" />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-brand-Text-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              <ChevronRight className="size-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArchivedTenantsTable;
