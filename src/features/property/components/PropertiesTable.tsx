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

type PropertyType = "Commercial" | "Residential";
type PropertyStatus = "Active" | "Inactive";

type Property = {
  id: number;
  name: string;
  address: string;
  type: PropertyType;
  units: number;
  staffAssigned: number;
  status: PropertyStatus;
};

const properties: Property[] = [
  { id: 1, name: "Sunset Gardens", address: "456 Ocean Drive, San Diego, CA 92101", type: "Commercial", units: 150, staffAssigned: 16, status: "Active" },
  { id: 2, name: "Harbor View Apartments", address: "456 Ocean Drive, San Diego, CA 92101", type: "Residential", units: 1, staffAssigned: 0, status: "Active" },
  { id: 3, name: "Lakeside Retreat", address: "789 Lakeview Road, Austin, TX 73301", type: "Residential", units: 1, staffAssigned: 24, status: "Inactive" },
  { id: 4, name: "Mountain Peak Lodge", address: "321 Summit Ave, Denver, CO 80202", type: "Commercial", units: 447, staffAssigned: 20, status: "Inactive" },
  { id: 5, name: "Seaside Villas", address: "100 Beachfront Blvd, Miami, FL 33139", type: "Residential", units: 1, staffAssigned: 16, status: "Active" },
  { id: 6, name: "Urban Oasis", address: "204 City Park Way, New York, NY 10001", type: "Commercial", units: 130, staffAssigned: 24, status: "Active" },
  { id: 7, name: "Riverside Bungalows", address: "567 Riverbend Drive, Portland, OR 97201", type: "Commercial", units: 274, staffAssigned: 0, status: "Inactive" },
  { id: 8, name: "Forest Grove Cabins", address: "902 Woodland Lane, Asheville, NC 28801", type: "Commercial", units: 1, staffAssigned: 24, status: "Active" },
  { id: 9, name: "Desert Springs Residences", address: "345 Sand Dune Road, Scottsdale, AZ 85251", type: "Residential", units: 1, staffAssigned: 16, status: "Inactive" },
  { id: 10, name: "Tropical Paradise Suites", address: "678 Palm Tree Ave, Honolulu, HI 96815", type: "Commercial", units: 453, staffAssigned: 20, status: "Active" },
];

const PropertyTypeBadge = ({ type }: { type: PropertyType }) => {
  const Icon = type === "Commercial" ? Building2 : Home;
  return (
    <span className="px-2 py-1 bg-Neutral-Grey-0 rounded-full outline outline-1 -outline-offset-1 outline-Neutral-Grey-10 inline-flex items-center gap-1">
      <Icon className="size-4 text-brand-Text-700" />
      <span className="text-brand-Text-700 text-sm font-medium">{type}</span>
    </span>
  );
};

const StatusBadge = ({ status }: { status: PropertyStatus }) => (
  <span className={cn(
    "px-2.5 py-[3px] rounded-xl text-sm font-normal leading-5",
    status === "Active"
      ? "bg-green-600/10 text-green-600"
      : "bg-gray-500/10 text-neutral-500"
  )}>
    {status}
  </span>
);

const PropertiesTable = () => {
  const router = useRouter();
  return (
  <div className="w-full bg-brand-base-white rounded-[20px] shadow-[0px_0px_0px_1px_rgba(220,223,228,1.00)] flex flex-col overflow-hidden">
    {/* Toolbar */}
    <div className="px-6 py-4 border-b border-Colors-Card-stroke2 flex items-center gap-4">
      <TextInput
        startIcon={<Search className="size-5 text-brand-Text-400" />}
        placeholder="Search..."
        containerClassName="w-96"
      />
      <div className="flex items-center gap-4 ml-auto">
        <Select
          options={[
            { label: "All Property Type", value: "all" },
            { label: "Commercial", value: "commercial" },
            { label: "Residential", value: "residential" },
          ]}
          placeholder="All Property Type"
          triggerClassName="whitespace-nowrap"
        />
        <Select
          options={[
            { label: "All Status", value: "all" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
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
        {properties.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <div className="flex flex-col gap-0.5">
                <span className="text-brand-Text-950-d text-sm font-medium leading-5">{row.name}</span>
                <span className="text-brand-Text-700 text-xs font-normal leading-4">{row.address}</span>
              </div>
            </TableCell>
            <TableCell>
              <PropertyTypeBadge type={row.type} />
            </TableCell>
            <TableCell>
              <span className="text-brand-Text-700 text-sm font-medium leading-5">{row.units}</span>
            </TableCell>
            <TableCell>
              <span className="text-brand-Text-700 text-sm font-medium leading-5">{row.staffAssigned}</span>
            </TableCell>
            <TableCell>
              <StatusBadge status={row.status} />
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
        <span className="text-gray-800">10</span>
        <ChevronDown className="size-4 text-gray-500" />
      </div>
      <span className="text-xs text-gray-800">1-10 of 10</span>
      <div className="flex items-center">
        <button className="p-2 rounded-lg hover:bg-brand-Text-50 transition-colors">
          <ChevronLeft className="size-4 text-gray-500" />
        </button>
        <button className="p-2 rounded-lg hover:bg-brand-Text-50 transition-colors">
          <ChevronRight className="size-4 text-gray-500" />
        </button>
      </div>
    </div>
  </div>
  );
};

export default PropertiesTable;
