"use client";
import { Button } from "@/components/ui/button";
import { Modal, ModalClose } from "@/components/ui/modal";
import { Dialog } from "radix-ui";
import { Users } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
};

const UnassignStaffModal = ({ open, onOpenChange, onConfirm }: Props) => (
  <Modal open={open} onOpenChange={onOpenChange} className="w-[586px] p-6 flex flex-col gap-5">
    {/* Header */}
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2.5 bg-brand-primary-red-50 rounded-full">
            <Users className="size-6 text-brand-primary-red-600-d" />
          </div>
          <Dialog.Title className="text-brand-Text-950-d text-2xl font-bold leading-8">
            Unassign Staff?
          </Dialog.Title>
        </div>
        <ModalClose />
      </div>
      <Dialog.Description className="text-brand-Text-500 text-base font-medium leading-5">
        Are you sure you want to unassign this staff?
      </Dialog.Description>
    </div>

    <hr className="border-brand-Text-100" />

    {/* Footer */}
    <Dialog.Close asChild>
      <div className="flex justify-end items-center gap-6">
        <Button variant="outline-transparent" size="lg" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button size="lg" onClick={() => { onConfirm?.(); onOpenChange(false); }}>
          Yes, Unassign
        </Button>
      </div>
    </Dialog.Close>
  </Modal>
);

export default UnassignStaffModal;
