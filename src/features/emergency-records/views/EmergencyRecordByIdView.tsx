"use client";
import { useState } from "react";
import { ArrowLeft, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "../components/StatusBadge";
import EmergencyDetails from "../components/EmergencyDetails";
import AssignedStaff from "../components/AssignedStaff";
import EmergencyChat from "../components/EmergencyChat";
import TenantChatSheet from "../components/TenantChatSheet";

const EmergencyRecordByIdView = ({ id }: { id: string }) => {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <div className="px-6 py-10 flex flex-col gap-6 w-full">
      {/* Breadcrumb */}
      <div className="">
        <Button variant={"ghost"} className="font-normal px-2">
          <ArrowLeft className="size-4" />
          Emergency List
        </Button>
      </div>

      {/* Page header */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-brand-base-black text-2xl font-bold leading-8">
            Ticket {id}
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Calendar className="size-4 text-brand-Text-600" />
              <span className="text-brand-Text-600 text-sm font-normal leading-5">
                Feb 18, 2026 10:30 AM
              </span>
            </div>
            <div className="size-2 bg-zinc-300 rounded-full" />
            <StatusBadge status="in-progress" />
          </div>
        </div>
        <Button onClick={() => setChatOpen(true)}>
          <MessageCircle className="size-4" />
          Start Tenant Chat
        </Button>
      </div>

      {/* Content */}
      <div className="flex gap-6 items-start">
        {/* Left column */}
        <div className="w-[474px] shrink-0 flex flex-col gap-6">
          <EmergencyDetails />
          <AssignedStaff />
        </div>

        {/* Right column — chat */}
        <EmergencyChat />
      </div>
      <TenantChatSheet open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
};

export default EmergencyRecordByIdView;
