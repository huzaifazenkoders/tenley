"use client";
import { cn } from "@/lib/utils";
import { AlertTriangle, ClipboardList, Zap } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

type RecordStatus = "open" | "in-progress" | "completed";
type RecordType = "Emergency" | "Work Order";

type EmergencyRecord = {
  id: number;
  summary: string;
  dateReported: string;
  status: RecordStatus;
  type: RecordType;
  staffAvatars: number;
};

const records: EmergencyRecord[] = [
  { id: 1, summary: "AC not working in unit A2", dateReported: "03/05/2025", status: "in-progress", type: "Emergency", staffAvatars: 2 },
  { id: 2, summary: "AC not working in unit A2", dateReported: "05/03/2025", status: "in-progress", type: "Emergency", staffAvatars: 2 },
];

const statusTabs = ["Open", "In Progress", "Completed"] as const;

const StatusBadge = ({ status }: { status: RecordStatus }) => {
  const map: Record<RecordStatus, { bg: string; text: string; label: string }> = {
    "open": { bg: "bg-blue-500/10", text: "text-blue-600", label: "Open" },
    "in-progress": { bg: "bg-amber-500/10", text: "text-yellow-600", label: "In Progress" },
    "completed": { bg: "bg-green-500/10", text: "text-green-600", label: "Completed" },
  };
  const s = map[status];
  return (
    <span className={`px-2.5 py-[3px] ${s.bg} rounded-xl text-sm font-normal leading-5 ${s.text}`}>
      {s.label}
    </span>
  );
};

const TypeBadge = ({ type }: { type: RecordType }) => (
  <span className="px-2 py-1 bg-Neutral-Grey-0 rounded-full outline outline-1 -outline-offset-1 outline-Neutral-Grey-10 text-brand-Text-700 text-sm font-medium leading-5">
    {type}
  </span>
);

const RecordCard = ({ record }: { record: EmergencyRecord }) => (
  <div className="p-4 bg-brand-base-white rounded-xl outline outline-1 outline-brand-Text-100 flex flex-col gap-3 overflow-hidden">
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <span className="text-brand-Text-600 text-sm font-normal leading-5">Issue Summary</span>
        <span className="text-brand-Text-950-d text-sm font-medium leading-5">{record.summary}</span>
      </div>
      <div className="flex flex-col gap-1 text-right">
        <span className="text-brand-Text-600 text-sm font-normal leading-5">Date Reported</span>
        <span className="text-brand-Text-950-d text-sm font-medium leading-5">{record.dateReported}</span>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <StatusBadge status={record.status} />
      <TypeBadge type={record.type} />
    </div>
    <div className="h-px bg-brand-Text-100" />
    <div className="flex justify-between items-center">
      <span className="text-brand-Text-600 text-sm font-normal leading-5">Assigned Staff</span>
      <div className="flex items-center">
        {Array.from({ length: record.staffAvatars }).map((_, i) => (
          <Image
            key={i}
            src="https://placehold.co/32x32"
            alt="staff"
            width={32}
            height={32}
            className="size-8 rounded-full border-2 border-white -ml-2 first:ml-0"
          />
        ))}
      </div>
    </div>
  </div>
);

const innerTabs = [
  { id: "emergency", label: "Emergency", icon: AlertTriangle },
  { id: "work-orders", label: "Work Orders", icon: ClipboardList },
];

const EmergenciesCard = () => {
  const [innerTab, setInnerTab] = useState("emergency");
  const [statusTab, setStatusTab] = useState("In Progress");

  return (
    <div className="flex-1 p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6 overflow-hidden">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-primary-red-50 rounded-lg">
            <Zap className="size-5 text-brand-primary-red-600-d" />
          </div>
          <span className="text-brand-Text-950-d text-xl font-semibold leading-6">Emergencies &amp; Work Orders</span>
        </div>

        <div className="flex flex-col gap-4">
          {/* Inner tab switcher */}
          <div className="p-1 bg-zinc-100 rounded-full inline-flex w-full">
            {innerTabs.map(({ id, label, icon: Icon }) => {
              const isActive = innerTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setInnerTab(id)}
                  className={cn(
                    "flex-1 px-6 py-2 rounded-full flex items-center justify-center gap-2 text-xs leading-4 transition-all duration-200",
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

          {/* Status sub-tabs */}
          <div className="flex border-b border-brand-Text-100">
            {statusTabs.map((t) => {
              const isActive = statusTab === t;
              return (
                <button
                  key={t}
                  onClick={() => setStatusTab(t)}
                  className={cn(
                    "flex-1 py-4 text-sm font-medium leading-5 transition-colors relative",
                    isActive ? "text-brand-primary-red-600-d" : "text-gray-500"
                  )}
                >
                  {t}
                  {isActive && <span className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary-red-600-d rounded-t" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {records.map((r) => (
          <RecordCard key={r.id} record={r} />
        ))}
      </div>
    </div>
  );
};

export default EmergenciesCard;
