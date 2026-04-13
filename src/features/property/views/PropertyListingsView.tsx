"use client";
import { Button } from "@/components/ui/button";
import { FileUp, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import NoPropertiesEmptyState from "../components/NoPropertiesEmptyState";
import PropertiesTable from "../components/PropertiesTable";

const PropertyListingsView = () => {
  const router = useRouter();
  const properties = [1]; // replace with real data

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
        <div className="flex items-center gap-3">
          <Button variant="outline-transparent" size="sm">
            <FileUp className="size-4 text-brand-Text-500" /> Import CSV
          </Button>
          <Button
            size="sm"
            onClick={() => router.push("/property/add-property")}
          >
            <Plus className="size-4" /> Add Property
          </Button>
        </div>
      </div>

      {properties.length === 0 ? (
        <NoPropertiesEmptyState
          onAddProperty={() => router.push("/property/add-property")}
        />
      ) : (
        <PropertiesTable />
      )}
    </div>
  );
};

export default PropertyListingsView;
