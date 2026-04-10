"use client";
import { cn } from "@/lib/utils";
import { Users, Archive } from "lucide-react";
import { useQueryState } from "nuqs";
import ArchivedTenantsTable from "../components/ArchivedTenantsTable";
import TenantsTable from "../components/TenantsTable";

const tabs = [
  { id: "active", label: "Active Tenants", icon: Users },
  { id: "archived", label: "Archived Tenants", icon: Archive },
];

const TenantsView = () => {
  const [tab, setTab] = useQueryState("tab", { defaultValue: "active" });

  return (
    <div className="px-6 pt-10 pb-6 flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-brand-Text-950-d text-2xl font-bold leading-8">Tenants</h1>
        <p className="text-brand-Text-500 text-base font-normal leading-5">
          Manage all tenants across properties
        </p>
      </div>

      <div className="p-1 bg-zinc-100 rounded-full inline-flex w-fit">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "px-6 py-2 rounded-full flex items-center gap-2 text-xs leading-4 transition-all duration-200",
                isActive
                  ? "bg-Static-White shadow-[3px_3px_8px_0px_rgba(0,0,0,0.06)] text-brand-Text-950-d font-medium"
                  : "text-brand-Text-600 font-normal"
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          );
        })}
      </div>

      {tab === "active" ? (
        <TenantsTable />
      ) : (
        <ArchivedTenantsTable />
        // {/* <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
        //   <div className="flex flex-col gap-1 text-center">
        //     <p className="text-brand-Text-950-d text-2xl font-bold leading-8">No Archived Tenants</p>
        //     <p className="text-brand-Text-500 text-sm font-normal leading-5">
        //       Archived tenants will appear here.
        //     </p>
        //   </div>
        // </div> */}
      )}
    </div>
  );
};

export default TenantsView;
