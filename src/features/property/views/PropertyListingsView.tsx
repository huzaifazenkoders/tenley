"use client";
import { Button } from "@/components/ui/button";
import { FileUp, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImportPropertyCSVModal from "../components/ImportPropertyCSVModal";
import NoPropertiesEmptyState from "../components/NoPropertiesEmptyState";
import PropertiesTable from "../components/PropertiesTable";

const TableSkeleton = () => (
  <div className="w-full bg-brand-base-white rounded-[20px] shadow-[0px_0px_0px_1px_rgba(220,223,228,1.00)] overflow-hidden">
    <div className="px-6 py-4 border-b border-Colors-Card-stroke2">
      <div className="h-9 w-96 bg-gray-100 rounded-lg animate-pulse" />
    </div>
    <div className="divide-y divide-gray-100">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="px-6 py-4 flex items-center gap-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="h-3.5 w-40 bg-gray-100 rounded animate-pulse" />
            <div className="h-3 w-56 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="h-7 w-24 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-3.5 w-8 bg-gray-100 rounded animate-pulse" />
          <div className="h-3.5 w-8 bg-gray-100 rounded animate-pulse" />
          <div className="h-6 w-16 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-8 w-8 bg-gray-100 rounded-lg animate-pulse" />
        </div>
      ))}
    </div>
  </div>
);

const PropertyListingsView = () => {
  const router = useRouter();
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const showEmptyState = count === 0 && !isFiltered && !isLoading;

  return (
    <div className="px-6 pt-10 pb-6 flex flex-col gap-5 w-full">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-brand-Text-950-d text-2xl font-bold leading-8">
            Properties &amp; Units
          </h1>
          <p className="text-brand-Text-500 text-base font-normal leading-5">
            Manage all your property locations
          </p>
        </div>
        {!showEmptyState && (
          <div className="flex items-center gap-3">
            <Button
              variant="outline-transparent"
              size="sm"
              onClick={() => setCsvModalOpen(true)}
            >
              <FileUp className="size-4 text-brand-Text-500" /> Import CSV
            </Button>
            <Button
              size="sm"
              onClick={() => router.push("/property/add-property")}
            >
              <Plus className="size-4" /> Add Property
            </Button>
          </div>
        )}
      </div>

      {/* Initial load — table hasn't mounted yet */}
      {count === null && <TableSkeleton />}

      {/* No data, no filters */}
      {showEmptyState && (
        <NoPropertiesEmptyState
          onAddProperty={() => router.push("/property/add-property")}
        />
      )}

      {/* Table — keep mounted once we have a count so filter state is preserved */}
      <div className={count === null || showEmptyState ? "hidden" : ""}>
        <PropertiesTable
          onCountChange={setCount}
          onFilteredChange={setIsFiltered}
          onLoadingChange={setIsLoading}
        />
      </div>

      <ImportPropertyCSVModal
        open={csvModalOpen}
        onOpenChange={setCsvModalOpen}
      />
    </div>
  );
};

export default PropertyListingsView;
