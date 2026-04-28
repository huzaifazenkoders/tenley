"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Accordion } from "radix-ui";
import { ChevronDown, Loader2, Mail, Phone, User, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import AssignPropertyModal from "./AssignPropertyModal";
import ReassignPropertyModal from "./ReassignPropertyModal";
import { Dialog } from "radix-ui";
import { getArchivedTenantDetails } from "../services/tenantService";
import type {
  ArchivedTenantDetails,
  ArchivedTenantHistoryItem
} from "../types";
import moment from "moment";

const InfoField = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-brand-Text-500 text-xs font-normal leading-4">
      {label}
    </span>
    <span className="text-brand-Text-950-d text-xs font-medium leading-4 capitalize">
      {value}
    </span>
  </div>
);

type ReassignTarget = { propertyId: string; unitId: string | null };

const PropertyAccordionItem = ({
  item,
  onReassignClick
}: {
  item: ArchivedTenantHistoryItem;
  onReassignClick: (target: ReassignTarget) => void;
}) => (
  <Accordion.Item
    value={item.tenancy_id}
    className="bg-brand-base-white rounded-lg outline-1 outline-brand-Text-100 overflow-hidden"
  >
    <Accordion.Header>
      <Accordion.Trigger className="w-full p-4 flex justify-between items-center group">
        <span className="text-brand-Text-950-d text-base font-semibold leading-5">
          {item.property_address}
        </span>
        <div className="flex items-center gap-4">
          {item.is_active ? (
            <span className="px-2.5 py-1 bg-green-600/10 rounded-xl text-green-600 text-xs font-medium leading-4">
              Active
            </span>
          ) : (
            <Button
              variant="outline"
              size="xs"
              className="text-brand-primary-red-500 border-brand-primary-red-300 hover:bg-brand-primary-red-50 text-xs font-medium"
              onClick={(e) => {
                e.stopPropagation();
                onReassignClick({
                  propertyId: item.property_id,
                  unitId: item.unit_id
                });
              }}
            >
              Re-assign Property
            </Button>
          )}
          <ChevronDown
            className={cn(
              "size-5 text-brand-Text-600 transition-transform duration-200",
              "group-data-[state=open]:rotate-180"
            )}
          />
        </div>
      </Accordion.Trigger>
    </Accordion.Header>

    <Accordion.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 overflow-hidden">
      <div className="px-4 pb-4 flex flex-col gap-3">
        <div className="h-px bg-brand-Text-100" />

        {item.end_tenancy_reason && (
          <div className="p-3 bg-Error-Red-50 rounded-lg flex flex-col gap-1">
            <span className="text-Error-Red-60 text-xs font-semibold leading-4">
              Comments
            </span>
            <span className="text-Error-Red-60 text-xs font-medium leading-4 opacity-80">
              {item.end_tenancy_reason}
            </span>
          </div>
        )}

        <div className="flex justify-between items-start">
          <InfoField label="Property Name" value={item.property_name} />
          <InfoField label="Property Type" value={item.property_type} />
          <InfoField label="Purpose" value={item.property_purpose} />
        </div>

        <div className="flex justify-between items-end">
          {item.unit_name && (
            <InfoField
              label="Unit"
              value={`${item.unit_name}${item.unit_number ? ` · ${item.unit_number}` : ""}`}
            />
          )}
          <InfoField
            label="Move In"
            value={moment(item.move_in_date).format("MM/DD/YYYY")}
          />
          <InfoField
            label="Move Out"
            value={
              item.tenancy_ended_at
                ? moment(item.tenancy_ended_at).format("MM/DD/YYYY")
                : "—"
            }
          />
        </div>
      </div>
    </Accordion.Content>
  </Accordion.Item>
);

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenantId: string | null;
};

const ArchivedTenantSheet = ({ open, onOpenChange, tenantId }: Props) => {
  const [, setTab] = useQueryState("tab", { defaultValue: "active" });
  const [assignOpen, setAssignOpen] = useState(false);
  const [reassignTarget, setReassignTarget] = useState<ReassignTarget | null>(
    null
  );
  const [details, setDetails] = useState<ArchivedTenantDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDetails = async (id: string) => {
    setLoading(true);
    const { data } = await getArchivedTenantDetails(id);
    if (data) setDetails(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!open || !tenantId) return;
    setDetails(null);
    fetchDetails(tenantId);
  }, [open, tenantId]);

  return (
    <>
      {tenantId && (
        <AssignPropertyModal
          open={assignOpen}
          onOpenChange={setAssignOpen}
          tenantId={tenantId}
          onSuccess={() => {
            setAssignOpen(false);
            onOpenChange(false);
            setTab("active");
          }}
        />
      )}
      {reassignTarget && details && tenantId && (
        <ReassignPropertyModal
          open
          onOpenChange={(o) => {
            if (!o) setReassignTarget(null);
          }}
          tenantId={tenantId}
          tenantName={details.tenant.tenant_name}
          propertyId={reassignTarget.propertyId}
          unitId={reassignTarget.unitId}
          onSuccess={() => {
            setReassignTarget(null);
            onOpenChange(false);
            setTab("active");
          }}
        />
      )}
      <Sheet
        open={open}
        onOpenChange={onOpenChange}
        className="w-185.75 flex flex-col"
      >
        {/* Header */}
        <Dialog.DialogTitle className="px-6 pt-8 pb-4 flex items-center gap-3 border-b border-brand-Text-100">
          <div className="flex-1 flex items-center gap-3">
            <div className="p-2 bg-brand-primary-red-50 rounded-lg">
              <Users className="size-5 text-brand-primary-red-600-d" />
            </div>
            <span className="text-brand-Text-950-d text-xl font-semibold leading-6">
              Tenant Information
            </span>
          </div>
          <SheetClose />
        </Dialog.DialogTitle>

        {/* Body */}
        <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex-1 flex items-center justify-center py-20">
              <Loader2 className="size-8 text-brand-primary-red-600-d animate-spin" />
            </div>
          ) : details ? (
            <>
              {/* Tenant summary card */}
              <div className="p-3 bg-brand-base-white rounded-xl outline-1 outline-brand-Text-100 flex flex-col gap-2.5 overflow-hidden shrink-0 shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)]">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-brand-Text-50 rounded-full">
                        <User className="size-4 text-brand-Text-800" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-brand-Text-500 text-xs font-normal leading-4">
                          Tenant Name
                        </span>
                        <span className="text-brand-Text-800 text-xs font-medium leading-4">
                          {details.tenant.tenant_name}
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-indigo-500/10 rounded-full text-indigo-500 text-xs font-medium leading-4 capitalize">
                      {details.tenant.tenant_type.replace(/_/g, " ")}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-brand-Text-50 rounded-full">
                        <Mail className="size-4 text-brand-Text-800" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-brand-Text-500 text-xs font-normal leading-4">
                          Email
                        </span>
                        <span className="text-brand-Text-800 text-xs font-medium leading-4">
                          {details.tenant.email}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-brand-Text-50 rounded-full">
                        <Phone className="size-4 text-brand-Text-800" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-brand-Text-500 text-xs font-normal leading-4">
                          Phone Number
                        </span>
                        <span className="text-brand-Text-800 text-xs font-medium leading-4">
                          {details.tenant.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property history accordion */}
              <Accordion.Root
                type="multiple"
                defaultValue={details.history.map((h) => h.tenancy_id)}
                className="flex flex-col gap-4"
              >
                {details.history.map((item) => (
                  <PropertyAccordionItem
                    key={item.tenancy_id}
                    item={item}
                    onReassignClick={setReassignTarget}
                  />
                ))}
              </Accordion.Root>
            </>
          ) : null}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-brand-Text-100 flex justify-end items-center gap-6">
          <Button
            variant="outline-transparent"
            size="lg"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button size="lg" onClick={() => setAssignOpen(true)}>
            Assign New Property
          </Button>
        </div>
      </Sheet>
    </>
  );
};

export default ArchivedTenantSheet;
