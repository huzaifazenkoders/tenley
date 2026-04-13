"use client";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Dialog } from "radix-ui";
import { ClipboardList } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ReassignPropertyModal = ({ open, onOpenChange }: Props) => (
  <Modal open={open} onOpenChange={onOpenChange} className="w-[586px]">
    <div className="p-6 flex flex-col gap-5">
      {/* Header */}
      <Dialog.Title asChild>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-brand-primary-red-50 rounded-full">
              <ClipboardList className="size-6 text-brand-primary-red-600-d" />
            </div>
            <span className="text-brand-Text-950-d text-2xl font-bold leading-8">
              Reassign Property?
            </span>
          </div>
          <Dialog.Description asChild>
            <p className="text-brand-Text-500 text-base font-medium leading-5">
              This will assign the property to John Smith, Are you sure you want to continue?
            </p>
          </Dialog.Description>
        </div>
      </Dialog.Title>

      <hr className="border-brand-Text-100" />

      {/* Footer */}
      <div className="flex items-center justify-end gap-6">
        <Button variant="outline-transparent" size="lg" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button size="lg" onClick={() => onOpenChange(false)}>
          Yes, Re-assign
        </Button>
      </div>
    </div>
  </Modal>
);

export default ReassignPropertyModal;
