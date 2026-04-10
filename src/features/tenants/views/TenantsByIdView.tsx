import { Button } from "@/components/ui/button";
import { ChevronLeft, FileText, Home, MapPin } from "lucide-react";
import AssignedStaffCard from "../components/AssignedStaffCard";
import EmergenciesCard from "../components/EmergenciesCard";
import PropertyInfoCard from "../components/PropertyInfoCard";
import TenantInfoCard from "../components/TenantInfoCard";

const TenantsByIdView = () => (
  <div className="px-6 pt-10 pb-6 flex flex-col gap-6 w-full overflow-hidden">
    {/* Header */}
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <ChevronLeft className="size-5 text-brand-Text-950-d" />
          <span className="text-brand-Text-950-d text-base font-normal leading-5">Property Details</span>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h1 className="text-brand-base-black text-3xl font-bold leading-9">Sunset Gardens</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="size-5 text-brand-Text-600" />
              <span className="text-brand-Text-600 text-base font-normal leading-5">123 Main Street, Los Angeles, CA 90001</span>
            </div>
            <div className="w-px h-5 bg-brand-Text-200" />
            <span className="px-2 py-1 bg-Neutral-Grey-0 rounded-full outline outline-1 -outline-offset-1 outline-Neutral-Grey-10 inline-flex items-center gap-1 text-brand-Text-700 text-sm font-medium leading-5">
              <Home className="size-4 text-brand-Text-700" />
              Residential
            </span>
          </div>
        </div>
        <Button className="gap-2">
          <FileText className="size-4" />
          View Property Contract
        </Button>
      </div>
    </div>

    {/* Content grid */}
    <div className="flex gap-6">
      {/* Left column */}
      <div className="flex-1 flex flex-col gap-6">
        <PropertyInfoCard />
        <TenantInfoCard />
      </div>

      {/* Right column */}
      <div className="flex-1 flex flex-col gap-6">
        <AssignedStaffCard />
        <EmergenciesCard />
      </div>
    </div>
  </div>
);

export default TenantsByIdView;
