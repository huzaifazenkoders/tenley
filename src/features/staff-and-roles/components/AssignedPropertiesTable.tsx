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
import { Building2, Eye, Home, Search, UserMinus } from "lucide-react";
import { useState } from "react";
import UnassignStaffModal from "./UnassignStaffModal";

type PropertyType = "Commercial" | "Residential";

type AssignedProperty = {
  id: number;
  name: string;
  address: string;
  type: PropertyType;
  units: number;
  activeEmergencies: number;
};

const properties: AssignedProperty[] = [
  { id: 1, name: "Sunset Gardens", address: "456 Ocean Drive, San Diego, CA 92101", type: "Commercial", units: 64, activeEmergencies: 2 },
  { id: 2, name: "Harbor View Apartments", address: "456 Ocean Drive, San Diego, CA 92101", type: "Residential", units: 1, activeEmergencies: 0 },
  { id: 3, name: "Lakeside Retreat", address: "789 Lakeview Road, Austin, TX 73301", type: "Residential", units: 1, activeEmergencies: 4 },
  { id: 4, name: "Mountain Peak Lodge", address: "123 Summit Road, Denver, CO 80201", type: "Commercial", units: 24, activeEmergencies: 1 },
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

const AssignedPropertiesTable = () => {
  const [unassignOpen, setUnassignOpen] = useState(false);

  return (
    <>
      <UnassignStaffModal open={unassignOpen} onOpenChange={setUnassignOpen} />

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
              <TableHead className="w-80">Property Name</TableHead>
              <TableHead className="w-44">Property Type</TableHead>
              <TableHead>Units</TableHead>
              <TableHead>Active Emergencies</TableHead>
              <TableHead>Actions</TableHead>
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
                  <span className="text-brand-Text-700 text-sm font-medium leading-5">{row.activeEmergencies}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline-transparent"
                      size="sm"
                      className="text-Error-Red-60 border-Error-Red-20 hover:bg-Error-Red-50 gap-1.5"
                      onClick={() => setUnassignOpen(true)}
                    >
                      <UserMinus className="size-4" />
                      Unassign
                    </Button>
                    <Button variant="outline-transparent" size="sm" className="gap-1.5">
                      <Eye className="size-4" />
                      View
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default AssignedPropertiesTable;
