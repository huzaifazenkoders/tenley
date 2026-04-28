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
import type { StaffProperty } from "@/types/staff-details";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Building2, Eye, Home, Search, UserMinus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { unassignManager } from "../services/staff.service";
import UnassignStaffModal from "./UnassignStaffModal";

const ALL_VALUE = "all";

const formatLabel = (value: string | null) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1).replaceAll("_", " ") : "-";

const PropertyPurposeBadge = ({ purpose }: { purpose: string | null }) => {
  const Icon = purpose === "commercial" ? Building2 : Home;
  return (
    <span className="px-2 py-1 bg-Neutral-Grey-0 rounded-full outline outline-1 -outline-offset-1 outline-Neutral-Grey-10 inline-flex items-center gap-1">
      <Icon className="size-4 text-brand-Text-700" />
      <span className="text-brand-Text-700 text-sm font-medium">
        {formatLabel(purpose)}
      </span>
    </span>
  );
};

type Props = {
  companyId: string;
  managerId: string;
  properties: StaffProperty[];
};

const AssignedPropertiesTable = ({ companyId, managerId, properties }: Props) => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [purpose, setPurpose] = useState<string>(ALL_VALUE);
  const [selectedProperty, setSelectedProperty] = useState<StaffProperty | null>(
    null
  );

  const filteredProperties = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return properties.filter((property) => {
      const matchesPurpose =
        purpose === ALL_VALUE || property.property_purpose === purpose;
      const matchesSearch =
        !needle ||
        property.property_name.toLowerCase().includes(needle) ||
        (property.property_address ?? "").toLowerCase().includes(needle);
      return matchesPurpose && matchesSearch;
    });
  }, [properties, purpose, search]);

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      unassignManager({
        manager_id: managerId,
        company_id: companyId,
        property_id: selectedProperty?.property_id,
      }),
    onSuccess: () => {
      toast.success("Staff unassigned successfully");
      setSelectedProperty(null);
      queryClient.invalidateQueries({
        queryKey: queryKeys.staff.details(companyId, managerId),
      });
      queryClient.invalidateQueries({ queryKey: ["staff", "list"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Unable to unassign staff");
    },
  });

  return (
    <>
      <UnassignStaffModal
        open={Boolean(selectedProperty)}
        onOpenChange={(open) => !open && setSelectedProperty(null)}
        onConfirm={() => mutate()}
        isPending={isPending}
      />

      <div className="w-full bg-brand-base-white rounded-[20px] shadow-[0px_0px_0px_1px_rgba(220,223,228,1.00)] flex flex-col overflow-hidden">
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
                { label: "All Property Type", value: ALL_VALUE },
                { label: "Commercial", value: "commercial" },
                { label: "Residential", value: "residential" },
              ]}
              value={purpose}
              onValueChange={setPurpose}
              placeholder="All Property Type"
              triggerClassName="whitespace-nowrap"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-light-50">
              <TableHead className="w-80">Property Name</TableHead>
              <TableHead className="w-44">Property Type</TableHead>
              <TableHead>Units</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-16 text-center">
                  <span className="text-brand-Text-700 text-sm font-medium">
                    No assigned properties found
                  </span>
                </TableCell>
              </TableRow>
            ) : (
              filteredProperties.map((row) => (
                <TableRow key={row.property_id}>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-brand-Text-950-d text-sm font-medium leading-5">
                        {row.property_name}
                      </span>
                      <span className="text-brand-Text-700 text-xs font-normal leading-4">
                        {row.property_address ?? [row.city, row.state].filter(Boolean).join(", ")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <PropertyPurposeBadge purpose={row.property_purpose} />
                  </TableCell>
                  <TableCell>
                    <span className="text-brand-Text-700 text-sm font-medium leading-5">
                      {row.number_of_unit ?? "-"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-brand-Text-700 text-sm font-medium leading-5">
                      {formatLabel(row.property_type)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline-transparent"
                        size="sm"
                        className="text-Error-Red-60 border-Error-Red-20 hover:bg-Error-Red-50 gap-1.5"
                        onClick={() => setSelectedProperty(row)}
                      >
                        <UserMinus className="size-4" />
                        Unassign
                      </Button>
                      <Button
                        variant="outline-transparent"
                        size="sm"
                        className="gap-1.5"
                        link={`/property/${row.property_id}`}
                      >
                        <Eye className="size-4" />
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default AssignedPropertiesTable;
