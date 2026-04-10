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
  TableRow
} from "@/components/ui/table";
import TextInput from "@/components/ui/text-input";
import { handleRippleAnimation } from "@/lib/ui/handleRippleAnimation";
import {
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Home,
  Search
} from "lucide-react";
import React from "react";

type PropertyType = "Commercial" | "Residential";

const tenants = [
  { id: 1, name: "John Smith", email: "john@example.com", property: "Sunset Gardens", unit: "101-A", moveIn: "20-01-2021", type: "Commercial" as PropertyType },
  { id: 2, name: "Alex Warren", email: "alex@example.com", property: "Harbor View Apartments", unit: "", moveIn: "11-04-2022", type: "Residential" as PropertyType },
  { id: 3, name: "Emily Johnson", email: "emily@example.com", property: "Lakeside Retreat", unit: "", moveIn: "15-06-2022", type: "Residential" as PropertyType },
  { id: 4, name: "Michael Brown", email: "michael@example.com", property: "Mountain Peak Lodge", unit: "102-C", moveIn: "30-08-2022", type: "Commercial" as PropertyType },
  { id: 5, name: "Sarah Davis", email: "sarah@example.com", property: "Seaside Villas", unit: "", moveIn: "22-11-2022", type: "Residential" as PropertyType },
  { id: 6, name: "David Wilson", email: "david@example.com", property: "Urban Oasis", unit: "102-A", moveIn: "05-01-2023", type: "Commercial" as PropertyType },
  { id: 7, name: "Laura Garcia", email: "laura@example.com", property: "Riverside Bungalows", unit: "201-A", moveIn: "18-03-2023", type: "Commercial" as PropertyType },
  { id: 8, name: "James Martinez", email: "james@example.com", property: "Forest Grove Cabins", unit: "", moveIn: "09-07-2023", type: "Commercial" as PropertyType },
  { id: 9, name: "Linda Rodriguez", email: "linda@example.com", property: "Desert Springs Residences", unit: "", moveIn: "12-09-2023", type: "Residential" as PropertyType },
  { id: 10, name: "Robert Lee", email: "robert@example.com", property: "Tropical Paradise Suites", unit: "204-A", moveIn: "25-12-2023", type: "Commercial" as PropertyType },
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

const TenantsTable = () => {
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
          <DateSelector
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
                Date Range
                <ChevronDown className="size-4" />
              </Button>
            }
          />
          <Select
            options={[
              { label: "Commercial", value: "commercial" },
              { label: "Residential", value: "residential" },
            ]}
            placeholder="All Property Type"
            triggerClassName="whitespace-nowrap"
          />
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-light-50">
            <TableHead>Tenant Name</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Move-In Date</TableHead>
            <TableHead>Property Type</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenants.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <div className="flex flex-col gap-0.5">
                  <span className="text-brand-Text-950-d text-sm font-medium leading-5">{row.name}</span>
                  <span className="text-brand-Text-700 text-xs font-normal leading-4">{row.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-0.5">
                  <span className="text-brand-Text-950-d text-sm font-medium leading-5">{row.property}</span>
                  {row.unit && <span className="text-brand-Text-700 text-xs font-normal leading-4">{row.unit}</span>}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-brand-Text-950-d text-sm font-medium leading-5">{row.moveIn}</span>
              </TableCell>
              <TableCell>
                <PropertyTypeBadge type={row.type} />
              </TableCell>
              <TableCell>
                <Button size="icon" variant="ghost">
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

export default TenantsTable;
