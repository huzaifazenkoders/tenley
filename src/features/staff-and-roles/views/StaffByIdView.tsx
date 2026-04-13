import { ChevronLeft, Building2 } from "lucide-react";
import AssignedPropertiesTable from "../components/AssignedPropertiesTable";
import StaffProfileCard from "../components/StaffProfileCard";

const StaffByIdView = () => (
  <div className="px-6 pt-10 pb-6 flex flex-col gap-6 w-full">
    <div className="flex flex-col gap-8">
      {/* Back nav */}
      <div className="flex items-center gap-2">
        <ChevronLeft className="size-5 text-brand-Text-950-d" />
        <span className="text-brand-Text-950-d text-base font-normal leading-5">
          Staff list
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {/* Profile card */}
        <StaffProfileCard
          name="Michael Wilson"
          title="Jr. Maintenance Supervisor"
          email="michael@example.com"
          role="Maintenance Supervisor"
          permissions="2/8"
          status="active"
        />

        {/* Assigned properties section */}
        <div className="p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6 overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-primary-red-50 rounded-lg">
              <Building2 className="size-5 text-brand-primary-red-600-d" />
            </div>
            <span className="text-brand-Text-950-d text-xl font-semibold leading-6">
              Assigned Properties
            </span>
          </div>
          <AssignedPropertiesTable />
        </div>
      </div>
    </div>
  </div>
);

export default StaffByIdView;
