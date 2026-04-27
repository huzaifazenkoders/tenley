"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { PhoneCall } from "lucide-react";

type EmergencyStatus = "Open" | "In Progress" | "Completed";
type RecordType = "Emergency" | "Work Order";

type EmergencyRecord = {
  id: string;
  summary: string;
  dateReported: string;
  status: EmergencyStatus;
  type: RecordType;
  assignedStaff: string[];
};

const RECORDS: EmergencyRecord[] = [
  {
    id: "1",
    summary: "AC not working in unit A2",
    dateReported: "03/05/2025",
    status: "In Progress",
    type: "Emergency",
    assignedStaff: ["https://placehold.co/32x32", "https://placehold.co/32x32"]
  },
  {
    id: "2",
    summary: "AC not working in unit A2",
    dateReported: "05/03/2025",
    status: "In Progress",
    type: "Emergency",
    assignedStaff: ["https://placehold.co/32x32", "https://placehold.co/32x32"]
  }
];

const statusBadge: Record<EmergencyStatus, { bg: string; text: string }> = {
  Open: { bg: "bg-blue-500/10", text: "text-blue-600" },
  "In Progress": { bg: "bg-amber-500/10", text: "text-yellow-600" },
  Completed: { bg: "bg-green-600/10", text: "text-green-600" }
};

const EmergencyCard = ({ record }: { record: EmergencyRecord }) => {
  const badge = statusBadge[record.status];
  return (
    <div className="p-4 bg-brand-base-white rounded-xl outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-brand-Text-600 text-sm font-normal leading-5">
            Issue Summary
          </span>
          <span className="text-brand-Text-950-d text-sm font-medium leading-5">
            {record.summary}
          </span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="text-brand-Text-600 text-sm font-normal leading-5">
            Date Reported
          </span>
          <span className="text-brand-Text-950-d text-sm font-medium leading-5">
            {record.dateReported}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "px-2.5 py-[3px] rounded-xl text-sm font-normal leading-5",
            badge.bg,
            badge.text
          )}
        >
          {record.status}
        </span>
        <span className="px-2 py-1 bg-Neutral-Grey-0 rounded-full outline outline-1 -outline-offset-1 outline-Neutral-Grey-10 text-brand-Text-700 text-sm font-medium leading-5">
          {record.type}
        </span>
      </div>
      <hr className="border-brand-Text-100" />
      <div className="flex items-center justify-between">
        <span className="text-brand-Text-600 text-sm font-normal leading-5">
          Assigned Staff
        </span>
        <div className="flex items-center">
          {record.assignedStaff.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt="staff"
              width={32}
              height={32}
              className="size-8 rounded-full border-2 border-white -ml-2 first:ml-0 object-cover"
              unoptimized
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const STATUS_TABS: EmergencyStatus[] = ["Open", "In Progress", "Completed"];

const EmergenciesCard = () => {
  const [mode, setMode] = useState<"Emergency" | "Work Orders">("Emergency");
  const [activeStatus, setActiveStatus] =
    useState<EmergencyStatus>("In Progress");

  return (
    <div className="flex-1 self-stretch p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-brand-primary-red-50 rounded-lg">
          <PhoneCall className="size-5 text-brand-primary-red-600-d" />
        </div>
        <span className="text-brand-Text-950-d text-xl font-semibold leading-6">
          Emergencies &amp; Work Orders
        </span>
      </div>

      {/* Toggle + tabs */}
      <div className="flex flex-col gap-4">
        {/* Emergency / Work Orders toggle */}
        <div className="p-1 bg-zinc-100 rounded-full inline-flex w-full">
          {(["Emergency", "Work Orders"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "flex-1 px-6 py-2 center flex rounded-full text-xs font-medium leading-4 transition-all duration-200",
                mode === m
                  ? "bg-white shadow-[3px_3px_8px_0px_rgba(0,0,0,0.06)] text-brand-Text-950-d"
                  : "text-brand-Text-600 font-normal"
              )}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Status tabs */}
        <div className="flex items-center border-b border-brand-Text-100">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveStatus(tab)}
              className={cn(
                "center flex",
                "flex-1 py-4 text-sm font-medium leading-5 transition-colors relative",
                activeStatus === tab
                  ? "text-brand-primary-red-600-d"
                  : "text-gray-500"
              )}
            >
              {tab}
              {activeStatus === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary-red-600-d rounded-t" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Records */}
      <div className="flex flex-col gap-4">
        {/* {RECORDS.filter((r) => r.status === activeStatus).map((r) => (
          <EmergencyCard key={r.id} record={r} />
        ))} */}
        {/* {RECORDS.filter((r) => r.status === activeStatus).length === 0 && ( */}
        <p className="text-brand-Text-500 text-sm text-center py-8">
          No records found.
        </p>
        {/* )} */}
      </div>
    </div>
  );
};

export default EmergenciesCard;
