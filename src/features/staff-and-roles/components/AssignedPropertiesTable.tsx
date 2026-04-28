"use client";
import { Button } from "@/components/ui/button";
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
import { Eye, Search, UserMinus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { unassignManager } from "../services/staff.service";
import UnassignStaffModal from "./UnassignStaffModal";

const RoleBadge = ({ role }: { role: string }) => (
  <span className="px-3 py-1 bg-brand-primary-red-50 rounded-full outline outline-1 -outline-offset-1 outline-brand-primary-red-200 inline-flex w-fit text-brand-primary-red-500 text-sm font-medium leading-5">
    {role}
  </span>
);

const statusLabels: Record<string, string> = {
  invitation_sent: "Invitation Sent",
  invitation_accepted: "Active",
  invitation_rejected: "Invitation Rejected",
  invitation_expired: "Invitation Expired",
};

const InvitationStatusBadge = ({ status }: { status?: string | null }) => {
  const isAccepted = status === "invitation_accepted";
  const isInactive =
    status === "invitation_rejected" || status === "invitation_expired";

  return (
    <span
      className={
        "px-2.5 py-[3px] rounded-xl text-sm font-normal leading-5 " +
        (isAccepted
          ? "bg-green-600/10 text-green-600"
          : isInactive
            ? "bg-gray-500/10 text-neutral-500"
            : "bg-blue-600/10 text-Active-Blue-50")
      }
    >
      {status ? (statusLabels[status] ?? status) : "-"}
    </span>
  );
};

type Props = {
  companyId: string;
  managerId: string;
  properties: StaffProperty[];
};

const AssignedPropertiesTable = ({
  companyId,
  managerId,
  properties,
}: Props) => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<StaffProperty | null>(
    null,
  );

  const filteredProperties = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return properties;

    return properties.filter((property) => {
      return (
        property.property_name.toLowerCase().includes(needle) ||
        (property.role?.name ?? "").toLowerCase().includes(needle)
      );
    });
  }, [properties, search]);

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
      toast.error(
        error instanceof Error ? error.message : "Unable to unassign staff",
      );
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
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-light-50">
              <TableHead className="w-96">Property Name</TableHead>
              <TableHead className="w-64">Role</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Invitation Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
                      {row.property_address && (
                        <span className="text-brand-Text-700 text-xs font-normal leading-4">
                          {row.property_address}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <RoleBadge role={row.role?.name ?? "Unassigned"} />
                  </TableCell>
                  <TableCell>
                    <span className="text-brand-Text-950-d text-sm font-normal leading-5">
                      {row.permissions.enabled}/{row.permissions.total}
                    </span>
                  </TableCell>
                  <TableCell>
                    <InvitationStatusBadge status={row.property_manager_status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-3">
                      {row.property_manager_status === "invitation_accepted" && (
                        <Button
                          variant="outline-transparent"
                          size="sm"
                          className="text-Error-Red-60 border-Error-Red-20 hover:bg-Error-Red-50 gap-1.5"
                          onClick={() => setSelectedProperty(row)}
                        >
                          <UserMinus className="size-4" />
                          Unassign
                        </Button>
                      )}
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
