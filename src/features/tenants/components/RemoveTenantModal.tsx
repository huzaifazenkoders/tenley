"use client";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { TriangleAlert } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenantName?: string;
};

const RemoveTenantModal = ({ open, onOpenChange, tenantName = "this tenant" }: Props) => (
  <Modal open={open} onOpenChange={onOpenChange} className="w-[440px]">
    <div className="p-6 flex flex-col gap-6">
      {/* Icon + text */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="p-3 bg-Error-Red-50 rounded-full">
          <TriangleAlert className="size-6 text-Error-Red-60" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-brand-Text-950-d text-xl font-semibold leading-6">Remove Tenant</h2>
          <p className="text-brand-Text-500 text-sm font-normal leading-5">
            Are you sure you want to remove <span className="font-medium text-brand-Text-950-d">{tenantName}</span>? This action cannot be undone.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline-transparent" size="full" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          size="full"
          className="bg-Error-Red-60 hover:opacity-90 outline-none border-none"
          onClick={() => onOpenChange(false)}
        >
          Remove Tenant
        </Button>
      </div>
    </div>
  </Modal>
);

export default RemoveTenantModal;
