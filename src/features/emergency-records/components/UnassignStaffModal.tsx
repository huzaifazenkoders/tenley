import { UserMinus } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Dialog } from "radix-ui";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

const UnassignStaffModal = ({ open, onOpenChange, onConfirm }: Props) => (
  <Modal
    open={open}
    onOpenChange={onOpenChange}
    className="w-[586px] p-6 flex flex-col gap-5"
  >
    {/* Header */}
    <Dialog.Title className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="p-2.5 bg-brand-primary-red-50 rounded-full">
          <UserMinus className="size-6 text-Error-Red-60" />
        </div>
        <span className="text-brand-Text-950-d text-2xl font-bold leading-8">
          Unassign Staff?
        </span>
      </div>
      <p className="text-brand-Text-500 text-base font-medium leading-5">
        Are you sure you want to unassign this staff?
      </p>
    </Dialog.Title>

    <div className="self-stretch h-px bg-brand-Text-100" />

    {/* Footer */}
    <div className="flex justify-end items-center gap-3">
      <Button variant="outline-transparent" onClick={() => onOpenChange(false)}>
        Cancel
      </Button>
      <Button
        onClick={() => {
          onConfirm();
          onOpenChange(false);
        }}
      >
        Yes, Unassign
      </Button>
    </div>
  </Modal>
);

export default UnassignStaffModal;
