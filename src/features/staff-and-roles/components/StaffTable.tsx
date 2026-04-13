"use client";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Search
} from "lucide-react";
import Image from "next/image";

type StaffStatus = "active" | "invitation-sent";

type StaffMember = {
  id: number;
  name: string;
  title: string;
  alsoTenant?: boolean;
  role: string;
  properties: string;
  permissions: string;
  status: StaffStatus;
};

const staff: StaffMember[] = [
  {
    id: 1,
    name: "Michael Wilson",
    title: "Jr. Maintenance Supervisor",
    role: "Maintenance Supervisor",
    properties: "4",
    permissions: "2/8",
    status: "active"
  },
  {
    id: 2,
    name: "Mitchel Sandars",
    title: "Sr. Property Manager",
    role: "Property Manager",
    properties: "-",
    permissions: "5/8",
    status: "invitation-sent"
  },
  {
    id: 3,
    name: "Sam Thomas",
    title: "Sr. Regional Manager",
    alsoTenant: true,
    role: "Regional Supervisor",
    properties: "6",
    permissions: "1/8",
    status: "active"
  },
  {
    id: 4,
    name: "Emily Johnson",
    title: "Mid. Maintenance Supervisor",
    role: "Maintenance Supervisor",
    properties: "8",
    permissions: "3/8",
    status: "active"
  },
  {
    id: 5,
    name: "David Brown",
    title: "Jr. Property Manager",
    role: "Property Manager",
    properties: "10",
    permissions: "4/8",
    status: "active"
  },
  {
    id: 6,
    name: "Jessica Davis",
    title: "Sr. Maintenance Technician",
    role: "Maintenance Technician",
    properties: "12",
    permissions: "6/8",
    status: "active"
  },
  {
    id: 7,
    name: "Daniel Garcia",
    title: "Jr. Regional Supervisor",
    role: "Regional Supervisor",
    properties: "14",
    permissions: "7/8",
    status: "active"
  },
  {
    id: 8,
    name: "Enzo Martinez",
    title: "Sr. Regional Manager",
    alsoTenant: true,
    role: "Property Manager",
    properties: "-",
    permissions: "8/8",
    status: "invitation-sent"
  },
  {
    id: 9,
    name: "James Anderson",
    title: "Manager Supervisor",
    role: "Manager Supervisor",
    properties: "18",
    permissions: "3/8",
    status: "active"
  },
  {
    id: 10,
    name: "Sophia Lee",
    title: "Sr. Maintenance Technician",
    role: "Maintenance Technician",
    properties: "20",
    permissions: "8/8",
    status: "active"
  }
];

const RoleBadge = ({ role }: { role: string }) => (
  <span className="px-2 py-1 bg-brand-primary-red-50 rounded-full outline outline-1 -outline-offset-1 outline-brand-primary-red-200 text-brand-primary-red-500 text-sm font-medium leading-5 whitespace-nowrap">
    {role}
  </span>
);

const StatusBadge = ({ status }: { status: StaffStatus }) => {
  const isActive = status === "active";
  return (
    <span
      className={cn(
        "px-2.5 py-[3px] rounded-xl text-sm font-normal leading-5",
        isActive
          ? "bg-green-600/10 text-green-600"
          : "bg-blue-600/10 text-Active-Blue-50"
      )}
    >
      {isActive ? "Active" : "Invitation Sent"}
    </span>
  );
};

const StaffTable = () => (
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
            { label: "Maintenance Supervisor", value: "ms" },
            { label: "Property Manager", value: "pm" }
          ]}
          placeholder="All Roles"
          triggerClassName="whitespace-nowrap"
        />
        <Select
          options={[
            { label: "Read", value: "read" },
            { label: "Write", value: "write" }
          ]}
          placeholder="All Permissions"
          triggerClassName="whitespace-nowrap"
        />
        <Select
          options={[
            { label: "Active", value: "active" },
            { label: "Invitation Sent", value: "invitation-sent" }
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
          <TableHead className="w-80">Staff Name</TableHead>
          <TableHead className="w-64">Role</TableHead>
          <TableHead>Properties</TableHead>
          <TableHead>Permissions</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-20">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {staff.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/mock/person1.png"
                  alt={row.name}
                  width={40}
                  height={40}
                  className="size-10 rounded-full shrink-0"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-brand-Text-950-d text-sm font-medium leading-5">
                    {row.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-Text-700 text-xs font-normal leading-4">
                      {row.title}
                    </span>
                    {row.alsoTenant && (
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
              <RoleBadge role={row.role} />
            </TableCell>
            <TableCell>
              <span className="text-brand-Text-800 text-sm font-normal leading-5">
                {row.properties}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-brand-Text-800 text-sm font-normal leading-5">
                {row.permissions}
              </span>
            </TableCell>
            <TableCell>
              <StatusBadge status={row.status} />
            </TableCell>
            <TableCell>
              <Button
                size="icon"
                variant="ghost"
                link="/staff-and-roles/staff/1"
              >
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
      <span className="text-xs text-gray-800">1-10 of 13</span>
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

export default StaffTable;
