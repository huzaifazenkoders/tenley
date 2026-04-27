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
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  // Eye,
  Search,
  FileX
} from "lucide-react";
// import AvatarStack from "./AvatarStack";
// import StatusBadge from "./StatusBadge";
import { useState } from "react";

const COLS = 8;

const TableSkeleton = ({ rows = 8 }: { rows?: number }) => (
  <>
    {Array.from({ length: rows }).map((_, i) => (
      <TableRow key={i}>
        {Array.from({ length: COLS }).map((_, j) => (
          <TableCell key={j}>
            <div className="h-4 bg-brand-Text-100 rounded animate-pulse w-3/4" />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);

// type Status = "open" | "in-progress" | "completed";

// const records = [
//   {
//     id: "V-001",
//     name: "John Smith",
//     unit: "Sunset Gardens - 101A",
//     category: "Plumbing",
//     description:
//       "Water leak in bathroom ceiling. Water dripping from light fixture.",
//     staffCount: 0,
//     date: "12-12-2025",
//     status: "open" as Status
//   },
//   {
//     id: "V-002",
//     name: "Mary Johnson",
//     unit: "Harbor View - 202B",
//     category: "Electrical",
//     description: "Install new electric board",
//     staffCount: 0,
//     date: "14-02-2026",
//     status: "open" as Status
//   },
//   {
//     id: "V-003",
//     name: "James Brown",
//     unit: "Maple Heights - 303C",
//     category: "Plumbing",
//     description: "Replace broken tiles in the kitchen.",
//     staffCount: 0,
//     date: "20-03-2026",
//     status: "open" as Status
//   },
//   {
//     id: "V-004",
//     name: "Emily Davis",
//     unit: "Pine Crest - 404D",
//     category: "General",
//     description: "Patch up cracks in the living room wall.",
//     staffCount: 4,
//     date: "04-07-2026",
//     status: "completed" as Status
//   },
//   {
//     id: "V-005",
//     name: "Michael Wilson",
//     unit: "Riverbank - 505E",
//     category: "Safety",
//     description: "Fix the leaking faucet in the guest bathroom.",
//     staffCount: 5,
//     date: "15-08-2026",
//     status: "in-progress" as Status
//   },
//   {
//     id: "V-006",
//     name: "Sarah Miller",
//     unit: "Oakwood - 606F",
//     category: "Non-Emergency",
//     description: "Repaint the front door with weather-resistant paint.",
//     staffCount: 5,
//     date: "22-09-2026",
//     status: "completed" as Status
//   },
//   {
//     id: "V-007",
//     name: "David Lee",
//     unit: "Cedar Point - 707G",
//     category: "Appliance",
//     description: "Upgrade the heating system to improve efficiency.",
//     staffCount: 5,
//     date: "30-10-2026",
//     status: "in-progress" as Status
//   },
//   {
//     id: "V-008",
//     name: "Laura Garcia",
//     unit: "Willow Creek - 808H",
//     category: "Non-Emergency",
//     description: "Install shelving in the garage for better storage.",
//     staffCount: 5,
//     date: "11-11-2026",
//     status: "in-progress" as Status
//   },
//   {
//     id: "V-009",
//     name: "Daniel Martinez",
//     unit: "Lakeside - 909I",
//     category: "Plumbing",
//     description: "Repair the garage door opener.",
//     staffCount: 5,
//     date: "01-12-2026",
//     status: "in-progress" as Status
//   },
//   {
//     id: "V-010",
//     name: "Sophia Rodriguez",
//     unit: "Mountain View - 1010J",
//     category: "Safety",
//     description: "Service the HVAC system for optimal performance.",
//     staffCount: 5,
//     date: "25-12-2026",
//     status: "in-progress" as Status
//   }
// ];
const EmergencyRecordTable = () => {
  const [isLoading] = useState(false);

  return (
    <div className="w-full bg-brand-base-white rounded-[20px] shadow-[0px_0px_0px_1px_rgba(220,223,228,1.00)] flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="px-6 py-4 border-b border-brand-Text-100 flex items-center gap-4">
        <TextInput
          startIcon={<Search className="size-5 text-brand-Text-400" />}
          placeholder="Search..."
          containerClassName="w-100"
        />
        <div className="flex items-center gap-4 ml-auto">
          <DateSelector
            trigger={
              <Button
                variant={"outline-transparent"}
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
              { label: "First Category", value: "first" },
              { label: "Second Category", value: "second" },
              { label: "Third Category", value: "third" }
            ]}
            placeholder="All Category"
            triggerClassName="whitespace-nowrap"
          />
          <Select
            options={[]}
            placeholder="All Status"
            triggerClassName="whitespace-nowrap"
          />
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-light-50 ">
            <TableHead className="w-24">Ticket ID</TableHead>
            <TableHead className="w-44">Tenant</TableHead>
            <TableHead className="w-36">Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-48">Staff Assigned</TableHead>
            <TableHead className="w-32">Date Reported</TableHead>
            <TableHead className="w-40">Status</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableSkeleton />
          ) : true ? (
            <TableRow>
              <TableCell colSpan={COLS}>
                <div className="flex flex-col items-center justify-center gap-3 py-16">
                  <div className="p-4 bg-brand-Text-50 rounded-full">
                    <FileX className="size-8 text-brand-Text-400" />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-brand-Text-950-d text-base font-medium leading-5">
                      No records found
                    </span>
                    <span className="text-brand-Text-400 text-sm font-normal leading-5">
                      Emergency records will appear here once created
                    </span>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : null}
          {/* {!isLoading &&
            records.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <span className="text-brand-Text-950-d text-sm font-medium">
                    {row.id}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-brand-Text-950-d text-sm font-medium">
                      {row.name}
                    </span>
                    <span className="text-brand-Text-700 text-xs font-normal">
                      {row.unit}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-brand-Text-50 rounded-full outline -outline-offset-1 outline-brand-Text-100 text-brand-Text-700 text-xs font-medium whitespace-nowrap">
                    {row.category}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-brand-Text-500 text-sm font-normal line-clamp-1">
                    {row.description}
                  </span>
                </TableCell>
                <TableCell>
                  <AvatarStack count={row.staffCount} />
                </TableCell>
                <TableCell>
                  <span className="text-brand-Text-500 text-sm font-normal">
                    {row.date}
                  </span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={row.status} />
                </TableCell>
                <TableCell>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    link="/emergency-records/1"
                  >
                    <Eye className="size-5 text-brand-Text-700" />
                  </Button>
                </TableCell>
              </TableRow>
            ))} */}
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

export default EmergencyRecordTable;
