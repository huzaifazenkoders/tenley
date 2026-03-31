"use client";
import { useState } from "react";
import Image from "next/image";
import { UserPlus, Users, UserMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AssignStaffModal from "./AssignStaffModal";
import UnassignStaffModal from "./UnassignStaffModal";
import UserImage from "@/../public/assets/mock/person1.png";

const staff = [
  { name: "Jane Cooper", role: "Maintenance Tech" },
  { name: "Arlene McCoy", role: "Maintenance Supervisor" },
  { name: "Arlene McCoy", role: "Maintenance Supervisor" }
];

const AssignedStaff = () => {
  const [open, setOpen] = useState(false);
  const [unassignTarget, setUnassignTarget] = useState<number | null>(null);

  return (
    <div className="w-full p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 outline-offset-[-1px] outline-brand-Text-100 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-primary-red-50 rounded-lg">
            <Users className="size-5 text-brand-primary-red-600-d" />
          </div>
          <span className="text-brand-Text-950-d text-xl font-semibold leading-6">
            Assigned Staff
          </span>
        </div>
        <Button
          variant="outline-transparent"
          size="sm"
          className="rounded-lg"
          onClick={() => setOpen(true)}
        >
          <UserPlus className="size-4" />
          Assign Staff
        </Button>
      </div>

      {/* Staff list */}
      <div className="flex flex-col gap-4">
        {staff.map((member, i) => (
          <div
            key={i}
            className="p-3 bg-stone-50 rounded-lg flex items-center gap-2"
          >
            <Image
              src={UserImage}
              alt={member.name}
              width={44}
              height={44}
              className="rounded-full"
              unoptimized
            />
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-brand-Text-950-d text-base font-semibold leading-5">
                {member.name}
              </span>
              <span className="text-brand-Text-600 text-xs font-normal leading-4">
                {member.role}
              </span>
            </div>
            <Button
              onClick={() => setUnassignTarget(i)}
              size={"xs"}
              className="rounded-xl"
              variant={"outline"}
            >
              <UserMinus className="size-3.5" />
              Unassign
            </Button>
          </div>
        ))}
      </div>
      <AssignStaffModal open={open} onOpenChange={setOpen} />
      <UnassignStaffModal
        open={unassignTarget !== null}
        onOpenChange={(v) => !v && setUnassignTarget(null)}
        onConfirm={() => setUnassignTarget(null)}
      />
    </div>
  );
};

export default AssignedStaff;
