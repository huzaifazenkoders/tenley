"use client";
import { Button } from "@/components/ui/button";
import { Modal, ModalClose } from "@/components/ui/modal";
import { Dialog } from "radix-ui";
import { Loader2, Users } from "lucide-react";
import { useState } from "react";
import { unassignManager } from "../services/staffService";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  managerId: string | null;
  propertyId: string;
  onSuccess?: () => void;
};

const UnassignStaffModal = ({ open, onOpenChange, managerId, propertyId, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!managerId) return;
    setLoading(true);
    const { error } = await unassignManager({ manager_id: managerId, property_id: propertyId });
    setLoading(false);
    if (error) return;
    onSuccess?.();
    onOpenChange(false);
  };

  return (
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
      <div className="flex justify-end items-center gap-6">
        <Button
          variant="outline-transparent"
          size="lg"
          onClick={() => onOpenChange(false)}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button size="lg" onClick={handleConfirm} disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : "Yes, Unassign"}
        </Button>
      </div>
    </Modal>
  );
};

export default UnassignStaffModal;
