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
import { cn } from "@/lib/utils";
import {
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Home,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { getPropertiesList } from "../services";
import type { PropertyListItem } from "../types";
import { PropertyStatus, PropertyType } from "../types/enums";

const LIMIT = 10;

const PropertyTypeBadge = ({ type }: { type: PropertyType }) => {
  const Icon = type === PropertyType.Apartment || type === PropertyType.Bungalow ? Home : Building2;
  const label = type.charAt(0).toUpperCase() + type.slice(1);
  return (
    <span className="px-2 py-1 bg-Neutral-Grey-0 rounded-full outline outline-1 -outline-offset-1 outline-Neutral-Grey-10 inline-flex items-center gap-1">
      <Icon className="size-4 text-brand-Text-700" />
      <span className="text-brand-Text-700 text-sm font-medium">{label}</span>
    </span>
  );
};

const StatusBadge = ({ status }: { status: PropertyStatus }) => (
  <span className={cn(
    "px-2.5 py-[3px] rounded-xl text-sm font-normal leading-5",
    status === PropertyStatus.Active
      ? "bg-green-600/10 text-green-600"
      : "bg-gray-500/10 text-neutral-500"
  )}>
    {status === PropertyStatus.Active ? "Active" : "Inactive"}
  </span>
);

const SkeletonRow = () => (
  <TableRow>
    {Array.from({ length: 6 }).map((_, i) => (
      <TableCell key={i}>
        <div className="h-4 bg-gray-100 rounded animate-pulse" />
      </TableCell>
    ))}
  </TableRow>
);

type Props = {
  onCountChange?: (count: number) => void;
  onFilteredChange?: (filtered: boolean) => void;
  onLoadingChange?: (loading: boolean) => void;
};

const PropertiesTable = ({ onCountChange, onFilteredChange, onLoadingChange }: Props) => {
  const router = useRouter();
  const [rows, setRows] = useState<PropertyListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState<PropertyType | "all">("all");
  const [status, setStatus] = useState<PropertyStatus | "all">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [debouncedSearch] = useDebounce(search, 400);

  const isFiltered = debouncedSearch !== "" || propertyType !== "all" || status !== "all";

  const resetFilters = () => {
    setSearch("");
    setPropertyType("all");
    setStatus("all");
    setOffset(0);
  };

  useEffect(() => {
    let cancelled = false;

    // Sync both filtered + loading to parent in one synchronous block so
    // React 18 batches them — prevents a render with isFiltered=false, isLoading=false
    onFilteredChange?.(isFiltered);
    onLoadingChange?.(true);
    setIsLoading(true);

    const doFetch = async () => {
      const { data } = await getPropertiesList({
        limit: LIMIT,
        offset,
        search: debouncedSearch || null,
        propertyType: propertyType === "all" ? null : propertyType,
        status: status === "all" ? null : status,
      });
      if (cancelled) return;
      if (!data) {
        setIsLoading(false);
        onLoadingChange?.(false);
        return;
      }
      setRows(data.data);
      setTotal(data.pagination.total ?? 0);
      onCountChange?.(data.data.length);
      setIsLoading(false);
      onLoadingChange?.(false);
    };

    doFetch();
    return () => { cancelled = true; };
  }, [debouncedSearch, propertyType, status, offset]);

  const page = Math.floor(offset / LIMIT) + 1;
  const totalPages = Math.ceil(total / LIMIT) || 1;

  return (
    <div className="w-full bg-brand-base-white rounded-[20px] shadow-[0px_0px_0px_1px_rgba(220,223,228,1.00)] flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="px-6 py-4 border-b border-Colors-Card-stroke2 flex items-center gap-4">
        <TextInput
          startIcon={<Search className="size-5 text-brand-Text-400" />}
          placeholder="Search..."
          value={search}
          setValue={setSearch}
          containerClassName="w-96"
        />
        <div className="flex items-center gap-4 ml-auto">
          <Select
            options={[
              { label: "All Property Type", value: "all" },
              { label: "Home", value: PropertyType.Bungalow },
              { label: "Shopping Mall", value: PropertyType.Mall },
              { label: "Office Space", value: PropertyType.Office },
              { label: "Apartment", value: PropertyType.Apartment },
            ]}
            value={propertyType}
            onValueChange={(v) => { setPropertyType(v as PropertyType | "all"); setOffset(0); }}
            placeholder="All Property Type"
            triggerClassName="whitespace-nowrap"
          />
          <Select
            options={[
              { label: "All Status", value: "all" },
              { label: "Active", value: PropertyStatus.Active },
              { label: "Inactive", value: PropertyStatus.Inactive },
            ]}
            value={status}
            onValueChange={(v) => { setStatus(v as PropertyStatus | "all"); setOffset(0); }}
            placeholder="All Status"
            triggerClassName="whitespace-nowrap"
          />
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-light-50">
            <TableHead>Property Name</TableHead>
            <TableHead>Property Type</TableHead>
            <TableHead>Units</TableHead>
            <TableHead>Staff Assigned</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
          {!isLoading && rows.length === 0 && isFiltered && (
            <TableRow>
              <TableCell colSpan={6} className="py-16 text-center">
                <div className="flex flex-col items-center gap-3">
                  <p className="text-brand-Text-700 text-sm font-medium">No properties match your filters</p>
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    Reset filters
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
          {!isLoading && rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <div className="flex flex-col gap-0.5">
                  <span className="text-brand-Text-950-d text-sm font-medium leading-5">{row.property_name}</span>
                  <span className="text-brand-Text-700 text-xs font-normal leading-4">{row.property_address}</span>
                </div>
              </TableCell>
              <TableCell>
                <PropertyTypeBadge type={row.property_type} />
              </TableCell>
              <TableCell>
                <span className="text-brand-Text-700 text-sm font-medium leading-5">{row.units}</span>
              </TableCell>
              <TableCell>
                <span className="text-brand-Text-700 text-sm font-medium leading-5">{row.staff_assigned}</span>
              </TableCell>
              <TableCell>
                <StatusBadge status={row.property_status} />
              </TableCell>
              <TableCell>
                <Button size="icon" variant="ghost" onClick={() => router.push(`/property/${row.id}`)}>
                  <Eye className="size-5 text-brand-Text-700" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="py-2 px-4 flex justify-end items-center gap-6">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Rows per page:</span>
          <span className="text-gray-800">{LIMIT}</span>
          <ChevronDown className="size-4 text-gray-500" />
        </div>
        <span className="text-xs text-gray-800">{offset + 1}–{Math.min(offset + LIMIT, total)} of {total}</span>
        <div className="flex items-center">
          <button
            className="p-2 rounded-lg hover:bg-brand-Text-50 transition-colors disabled:opacity-40"
            disabled={offset === 0}
            onClick={() => setOffset((o) => Math.max(0, o - LIMIT))}
          >
            <ChevronLeft className="size-4 text-gray-500" />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-brand-Text-50 transition-colors disabled:opacity-40"
            disabled={page >= totalPages}
            onClick={() => setOffset((o) => o + LIMIT)}
          >
            <ChevronRight className="size-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertiesTable;
