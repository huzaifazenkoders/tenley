"use client";
import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import NoData from "@/../public/assets/broadcast/no-data.png";
import CreateBroadcastModal from "../components/CreateBroadcastModal";
import BroadcastDetailSheet from "../components/BroadcastDetailSheet";

type AudienceType = "all-staff" | "all-tenants" | "custom";

type Broadcast = {
  title: string;
  date: string;
  audience: AudienceType;
  message: string;
};

const broadcasts: Broadcast[] = [
  {
    title: "Water supply maintenance",
    date: "12/12/2025",
    audience: "all-staff",
    message:
      "Water supply will be unavailable from 2:00 PM to 5:00 PM today due to scheduled maintenance in Block A. Please store enough water in advance. We appreciate your patience."
  },
  {
    title: "Water supply maintenance",
    date: "12/12/2025",
    audience: "custom",
    message:
      "Water supply will be unavailable from 2:00 PM to 5:00 PM today due to scheduled maintenance in Block A. Please store enough water in advance. We appreciate your patience."
  }
];

const audienceBadge: Record<
  AudienceType,
  { label: string; className: string }
> = {
  "all-staff": {
    label: "All Staff",
    className: "bg-brand-primary-blue-100 text-brand-primary-blue-600"
  },
  "all-tenants": {
    label: "All Tenants",
    className: "bg-green-100 text-green-700"
  },
  custom: {
    label: "Custom",
    className: "bg-purple-50 text-violet-700"
  }
};

const BroadcastCard = ({
  broadcast,
  onClick
}: {
  broadcast: Broadcast;
  onClick: () => void;
}) => {
  const badge = audienceBadge[broadcast.audience];
  return (
    <div
      className="w-full p-4 bg-brand-base-white rounded-xl shadow-[0px_5px_22px_0px_rgba(0,0,0,0.04),0px_0px_0px_1px_rgba(0,0,0,0.06)] outline outline-1 outline-offset-[-1px] outline-brand-Text-100 flex flex-col gap-4 cursor-pointer hover:outline-brand-Text-200 transition-colors"
      onClick={onClick}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-1">
          <div className="flex-1 flex items-center gap-2">
            <span className="text-brand-Text-950-d text-xl font-semibold leading-6">
              {broadcast.title}
            </span>
            <span className="text-brand-Text-400 text-sm font-normal leading-5">
              {broadcast.date}
            </span>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-base font-medium leading-5 ${badge.className}`}
          >
            {badge.label}
          </span>
        </div>
        <p className="text-brand-Text-500 text-base font-normal leading-5">
          {broadcast.message}
        </p>
      </div>
    </div>
  );
};

const BroadCastMessageView = () => {
  const hasData = true;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBroadcast, setSelectedBroadcast] = useState<Broadcast | null>(
    null
  );

  return (
    <div className="px-6 pt-10 pb-6 flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-brand-Text-950-d text-2xl font-bold leading-8">
            Broadcast Message
          </h1>
          <p className="text-brand-Text-500 text-base font-normal leading-5">
            Send alerts or important updates across platform
          </p>
        </div>
        {hasData && (
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="size-4" />
            Create Broadcast
          </Button>
        )}
      </div>

      {/* Content */}
      {hasData ? (
        <div className="flex flex-col gap-4 py-6">
          {broadcasts.map((b, i) => (
            <BroadcastCard
              key={i}
              broadcast={b}
              onClick={() => setSelectedBroadcast(b)}
            />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center gap-8 py-20">
          <Image src={NoData} width={233} height={200} alt="" />
          <div className="flex flex-col items-center gap-6 max-w-lg text-center">
            <div className="flex flex-col gap-3">
              <h2 className="text-brand-Text-950-d text-2xl font-bold leading-8">
                No broadcasts created yet
              </h2>
              <p className="text-brand-Text-600 text-base font-normal leading-5">
                Send announcements, urgent alerts, and routine updates to
                tenants, staff, or selected properties. Start a new broadcast to
                reach the right audience in a few steps.
              </p>
            </div>
            <Button onClick={() => setModalOpen(true)}>
              <Plus className="size-4" />
              Create Broadcast
            </Button>
          </div>
        </div>
      )}
      <CreateBroadcastModal open={modalOpen} onOpenChange={setModalOpen} />
      <BroadcastDetailSheet
        open={selectedBroadcast !== null}
        onOpenChange={(v) => !v && setSelectedBroadcast(null)}
        title={selectedBroadcast?.title ?? ""}
      />
    </div>
  );
};

export default BroadCastMessageView;
