"use client";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { cn } from "@/lib/utils";
import { getPropertiesList } from "@/features/property/services";
import type { PropertyListItem } from "@/features/property/types";
import { assignTenantProperty } from "../services/tenantService";
import { Building2, Loader2, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PropertyType } from "@/features/property/types/enums";

const LIMIT = 10;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenantId: string;
  onSuccess?: () => void;
};

const AssignPropertyModal = ({
  open,
  onOpenChange,
  tenantId,
  onSuccess
}: Props) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null);
  const [properties, setProperties] = useState<PropertyListItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchProperties = useCallback(
    async (
      reset: boolean,
      currentSearch: string,
      currentType: PropertyType | null,
      currentOffset: number
    ) => {
      setLoading(true);
      const { data } = await getPropertiesList({
        limit: LIMIT,
        offset: currentOffset,
        search: currentSearch || null,
        propertyType: currentType
      });
      if (data) {
        setProperties((prev) => (reset ? data.data : [...prev, ...data.data]));
        setTotal(data.pagination.total);
        setOffset(currentOffset + data.data.length);
      }
      setLoading(false);
    },
    []
  );

  // Reset and fetch when modal opens or filters change
  useEffect(() => {
    if (!open) return;
    setSelected(null);
    setProperties([]);
    setOffset(0);
    fetchProperties(true, search, propertyType, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, propertyType]);

  // Debounce search
  useEffect(() => {
    if (!open) return;
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setProperties([]);
      setOffset(0);
      fetchProperties(true, search, propertyType, 0);
    }, 400);
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const loadMore = () => {
    if (loading) return;
    fetchProperties(false, search, propertyType, offset);
  };

  const handleAssign = async () => {
    if (!selected) return;
    setSubmitting(true);
    const { error } = await assignTenantProperty(tenantId, selected);
    setSubmitting(false);
    if (error) return;
    onSuccess?.();
    onOpenChange(false);
  };

  const handleClose = (v: boolean) => {
    if (!v) {
      setSearch("");
      setPropertyType(null);
      setSelected(null);
    }
    onOpenChange(v);
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleClose}
      className="w-209 p-6 flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2.5 bg-brand-primary-red-50 rounded-full">
            <Building2 className="size-6 text-brand-primary-red-600-d" />
          </div>
          <h2 className="text-brand-Text-950-d text-2xl font-bold leading-8">
            Assign New Property
          </h2>
        </div>
      </div>

      {/* Property list card */}
      <div className="p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6">
        {/* Filters */}
        <div className="flex justify-between items-center">
          <TextInput
            startIcon={<Search className="size-5 text-brand-Text-400" />}
            placeholder="Search..."
            containerClassName="w-96"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            options={[
              { label: "All Properties", value: "all" },
              { label: "Residential", value: "residential" },
              { label: "Commercial", value: "commercial" }
            ]}
            placeholder="All Properties"
            triggerClassName="w-56"
            value={propertyType ?? "all"}
            onValueChange={(v) =>
              setPropertyType(v === "all" ? null : (v as PropertyType))
            }
          />
        </div>

        {/* Property list */}
        <div
          id="assign-property-scroll"
          className="max-h-80 overflow-y-auto custom-scrollbar pr-1"
        >
          <InfiniteScroll
            dataLength={properties.length}
            next={loadMore}
            hasMore={properties.length < total}
            loader={
              <div className="flex justify-center py-3">
                <Loader2 className="size-5 animate-spin text-brand-Text-400" />
              </div>
            }
            scrollableTarget="assign-property-scroll"
            className="flex flex-col gap-5"
          >
            {properties.map((prop) => {
              const isSelected = selected === prop.id;
              return (
                <button
                  key={prop.id}
                  onClick={() => setSelected(prop.id)}
                  className={cn(
                    "w-full p-3 rounded-lg outline-1 -outline-offset-1 flex items-center gap-4 text-left transition-colors",
                    isSelected
                      ? "bg-brand-primary-red-50 outline-brand-primary-red-200"
                      : "bg-brand-base-white outline-brand-Text-100"
                  )}
                >
                  {/* Checkbox */}
                  <div className="size-6 flex items-center justify-center shrink-0">
                    <div
                      className={cn(
                        "size-4 rounded border-2 transition-colors",
                        isSelected
                          ? "bg-brand-primary-red-600-d border-brand-primary-red-600-d"
                          : "border-gray-500"
                      )}
                    />
                  </div>

                  {/* Icon */}
                  <div
                    className={cn(
                      "p-2.5 rounded-full shrink-0",
                      isSelected
                        ? "bg-brand-primary-red-100"
                        : "bg-brand-Text-50"
                    )}
                  >
                    <Building2
                      className={cn(
                        "size-6",
                        isSelected
                          ? "text-brand-primary-red-500"
                          : "text-brand-Text-600"
                      )}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-1">
                    <span
                      className={cn(
                        "text-base font-semibold leading-5",
                        isSelected
                          ? "text-brand-primary-red-500"
                          : "text-brand-Text-950-d"
                      )}
                    >
                      {prop.property_name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-xs font-normal leading-4",
                          isSelected
                            ? "text-brand-primary-red-500"
                            : "text-brand-Text-500"
                        )}
                      >
                        {prop.property_address}
                      </span>
                      {isSelected && (
                        <>
                          <span className="size-1.25 bg-brand-primary-red-300 rounded-full" />
                          <span className="text-brand-primary-red-500 text-xs font-normal leading-4">
                            {prop.units} units
                          </span>
                        </>
                      )}
                      {!isSelected && (
                        <span className="text-brand-Text-500 text-xs font-normal leading-4">
                          • {prop.units} unit{prop.units !== 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}

            {!loading && properties.length === 0 && (
              <p className="text-center text-brand-Text-400 text-sm py-6">
                No properties found
              </p>
            )}
          </InfiniteScroll>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end items-center gap-6">
        <Button
          variant="outline-transparent"
          size="lg"
          onClick={() => handleClose(false)}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button
          size="lg"
          onClick={handleAssign}
          disabled={!selected || submitting}
        >
          {submitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Assign Property"
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default AssignPropertyModal;
