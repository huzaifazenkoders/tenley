"use client";
import { Dialog } from "radix-ui";
import { Modal, ModalClose } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unitName?: string;
};

const DeleteUnitModal = ({ open, onOpenChange, unitName = "101-A" }: Props) => (
  <Modal open={open} onOpenChange={onOpenChange} className="w-[440px] p-6">
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <ModalClose />
      </div>

      <div className="flex flex-col items-center gap-4 text-center -mt-4">
        <div className="p-3 bg-brand-primary-red-50 rounded-full">
          <TriangleAlert className="size-6 text-brand-primary-red-600-d" />
        </div>
        <div className="flex flex-col gap-1">
          <Dialog.Title className="text-brand-Text-950-d text-xl font-semibold leading-6">
            Delete Unit
          </Dialog.Title>
          <Dialog.Description className="text-brand-Text-500 text-sm font-normal leading-5">
            Are you sure you want to delete unit{" "}
            <span className="font-medium text-brand-Text-950-d">{unitName}</span>?
            This action cannot be undone.
          </Dialog.Description>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline-transparent" size="full" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          size="full"
          className="bg-brand-primary-red-600-d outline outline-1 outline-brand-primary-red-500"
          onClick={() => onOpenChange(false)}
        >
          Delete Unit
        </Button>
      </div>
    </div>
  </Modal>
);

export default DeleteUnitModal;
