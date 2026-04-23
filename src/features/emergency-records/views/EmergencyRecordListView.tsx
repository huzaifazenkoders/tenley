"use client";
import { cn } from "@/lib/utils";
import { AlertTriangle, ClipboardList } from "lucide-react";
import { useQueryState } from "nuqs";
import EmergencyRecordTable from "../components/EmergencyRecordTable";

const tabs = [
  { id: "emergency", label: "Emergency", icon: AlertTriangle },
  { id: "work-orders", label: "Work Orders", icon: ClipboardList }
];

const EmergencyRecordListView = () => {
  const [tab, setTab] = useQueryState("tab", { defaultValue: "emergency" });

  return (
    <div className="px-6 pt-10 pb-6 flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-brand-Text-950-d text-2xl font-bold leading-8">
          Emergencies
        </h1>
        <p className="text-brand-Text-500 text-base font-normal leading-5">
          Monitor and manage emergency tickets
        </p>
      </div>

      {/* <div className="p-1 bg-[#F2F2F2] rounded-full inline-flex w-fit">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "px-6 py-2 rounded-full flex items-center gap-2 text-xs leading-4 transition-all duration-200",
                isActive
                  ? "bg-white shadow-[3px_3px_8px_0px_rgba(0,0,0,0.06)] text-brand-Text-950-d font-medium"
                  : "text-brand-Text-600 font-normal"
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          );
        })}
      </div> */}

      <EmergencyRecordTable />
    </div>
  );
};

export default EmergencyRecordListView;
