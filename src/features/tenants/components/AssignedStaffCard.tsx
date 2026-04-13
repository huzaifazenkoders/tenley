import Dropdown from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import { MoreVertical, UserPlus, User } from "lucide-react";

const staff = [
  {
    id: 1,
    name: "Alexander McGurk",
    role: "Maintenance Supervisor",
    status: "Invitation Sent"
  }
];

const AssignedStaffCard = () => (
  <div className="p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-brand-primary-red-50 rounded-lg">
          <User className="size-5 text-brand-primary-red-600-d" />
        </div>
        <span className="text-brand-Text-950-d text-xl font-semibold leading-6">
          Assigned Staff
        </span>
      </div>
      <Button variant="outline-transparent" size="sm" className="gap-2">
        <UserPlus className="size-4" />
        Assign Staff
      </Button>
    </div>

    <div className="flex flex-col gap-4">
      {staff.map((s) => (
        <div
          key={s.id}
          className="p-3 bg-stone-50 rounded-lg outline outline-1 -outline-offset-1 outline-brand-Text-100 flex items-center gap-2"
        >
          <div className="size-11 bg-zinc-200 rounded-full flex items-center justify-center shrink-0">
            <User className="size-5 text-gray-600" />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <span className="text-brand-Text-950-d text-base font-semibold leading-5">
              {s.name}
            </span>
            <span className="text-brand-Text-500 text-xs font-normal leading-4">
              {s.role}
            </span>
          </div>
          <span className="px-3 py-1 bg-brand-primary-blue-100 rounded-full outline outline-1 -outline-offset-1 outline-brand-primary-blue-100 text-brand-primary-blue-700 text-sm font-medium leading-5">
            {s.status}
          </span>
          <Dropdown
            items={[
              { value: "unassign", label: "Unassign" },
              { value: "view", label: "View Profile" }
            ]}
            contentClassName="min-w-36"
          >
            <Button size="icon" variant="ghost" className="size-6">
              <MoreVertical className="size-4 text-brand-Text-800" />
            </Button>
          </Dropdown>
        </div>
      ))}
    </div>
  </div>
);

export default AssignedStaffCard;
