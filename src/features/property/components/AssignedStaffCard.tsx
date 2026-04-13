"use client";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";
import { MoreVertical, UserPlus, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import InviteStaffModal from "./InviteStaffModal";
import UnassignStaffModal from "./UnassignStaffModal";

type StaffMember = { id: string; name: string; role: string };

type Props = { staff: StaffMember[] };

const AssignedStaffCard = ({ staff }: Props) => {
  const hasStaff = staff.length > 0;
  const [modalOpen, setModalOpen] = useState(false);
  const [unassignOpen, setUnassignOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  return (
    <>
      <div className="flex-1 self-stretch p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6 overflow-hidden">
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
          {hasStaff && (
            <Button
              variant="outline-transparent"
              size="sm"
              onClick={() => setModalOpen(true)}
            >
              <UserPlus className="size-4" /> Assign Staff
            </Button>
          )}
        </div>

        {hasStaff ? (
          <div className="flex flex-col gap-4">
            {staff.map((member) => (
              <div
                key={member.id}
                className="p-3 bg-stone-50 rounded-lg outline outline-1 -outline-offset-1 outline-brand-Text-100 flex items-center justify-between w-full gap-2"
              >
                <div className="flex-1 flex items-center gap-2">
                  <Image
                    src="https://placehold.co/44x44"
                    alt={member.name}
                    width={44}
                    height={44}
                    className="size-11 rounded-full object-cover"
                    unoptimized
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-brand-Text-950-d text-base font-semibold leading-5">
                      {member.name}
                    </span>
                    <span className="text-brand-Text-600 text-xs font-normal leading-4">
                      {member.role}
                    </span>
                  </div>
                </div>
                <div className="">
                  <Dropdown
                    items={[
                      {
                        value: "resend",
                        label: "Re-Send Invitation",
                        onClick: () => {}
                      },
                      {
                        value: "unassign",
                        label: (
                          <span className="text-brand-primary-red-600-d">
                            Unassign
                          </span>
                        ),
                        onClick: () => {
                          setSelectedMemberId(member.id);
                          setUnassignOpen(true);
                        }
                      }
                    ]}
                    contentClassName="w-44"
                  >
                    <button className="size-6 flex items-center justify-center text-brand-Text-800 hover:text-brand-Text-950-d transition-colors">
                      <MoreVertical className="size-4" />
                    </button>
                  </Dropdown>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 py-10">
            <div className="p-4 bg-brand-Text-50 rounded-full">
              <Users className="size-10 text-brand-Text-400" />
            </div>
            <div className="flex flex-col items-center gap-1 text-center max-w-xs">
              <p className="text-brand-Text-950-d text-xl font-bold leading-6">
                No Staff Assigned
              </p>
              <p className="text-brand-Text-500 text-sm font-normal leading-5">
                This property doesn&apos;t have any staff assigned yet. Assign
                staff to manage operations and handle emergencies.
              </p>
            </div>
            <Button size="sm" onClick={() => setModalOpen(true)}>
              <UserPlus className="size-4" /> Assign Staff
            </Button>
          </div>
        )}
      </div>

      <InviteStaffModal open={modalOpen} onOpenChange={setModalOpen} />
      <UnassignStaffModal
        open={unassignOpen}
        onOpenChange={setUnassignOpen}
        onConfirm={() => setSelectedMemberId(null)}
      />
    </>
  );
};

export default AssignedStaffCard;
