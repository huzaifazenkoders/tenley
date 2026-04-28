import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { UserMinus } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending?: boolean;
};

const UnassignStaffModal = ({
  open,
  onOpenChange,
  onConfirm,
  isPending,
}: Props) => (
  <Modal open={open} onOpenChange={onOpenChange} className="w-[586px] p-6 flex flex-col gap-5">
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="p-2.5 bg-brand-primary-red-50 rounded-full">
          <UserMinus className="size-6 text-Error-Red-60" />
        </div>
        <h2 className="text-brand-Text-950-d text-2xl font-bold leading-8">Unassign Staff?</h2>
      </div>
      <p className="text-brand-Text-500 text-base font-medium leading-5">
        Are you sure you want to unassign this staff?
      </p>
    </div>

    <div className="h-px bg-brand-Text-100" />

    <div className="flex justify-end items-center gap-6">
      <Button
        variant="outline-transparent"
        size="lg"
        onClick={() => onOpenChange(false)}
        disabled={isPending}
      >
        Cancel
      </Button>
      <Button size="lg" onClick={onConfirm} disabled={isPending}>
        {isPending ? "Unassigning..." : "Yes, Unassign"}
      </Button>
    </div>
  </Modal>
);

export default UnassignStaffModal;
