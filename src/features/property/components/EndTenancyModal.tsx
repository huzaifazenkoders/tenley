"use client";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";
import { Dialog } from "radix-ui";
import { User } from "lucide-react";
import { useState } from "react";
import { endTenant } from "../services";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenantId: string;
  onSuccess?: () => void;
};

const EndTenancyModal = ({ open, onOpenChange, tenantId, onSuccess }: Props) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEnd = async () => {
    setLoading(true);
    const { error } = await endTenant(tenantId, reason);
    setLoading(false);
    if (error) return;
    onSuccess?.();
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="w-[836px]">
      <div className="p-6 flex flex-col gap-5">
        <Dialog.Title asChild>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2.5 bg-brand-primary-red-50 rounded-full">
                <User className="size-6 text-brand-primary-red-600-d" />
              </div>
              <span className="text-brand-Text-950-d text-2xl font-bold leading-8">End Tenancy</span>
            </div>
            <Dialog.Description asChild>
              <p className="text-brand-Text-500 text-base font-medium leading-5">
                This will end the tenant&apos;s lease and archive their record. The unit will be marked as vacant.
              </p>
            </Dialog.Description>
          </div>
        </Dialog.Title>

        <div className="p-4 rounded-2xl">
          <Textarea
            label="Reason (Optional)"
            placeholder="Enter reason for ending tenancy..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <hr className="border-brand-Text-100" />

        <div className="flex items-center justify-end gap-6">
          <Button variant="outline-transparent" size="lg" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            size="lg"
            className="bg-brand-primary-red-600-d outline outline-1 outline-brand-primary-red-500"
            onClick={handleEnd}
            disabled={loading}
          >
            {loading ? "Ending..." : "End Tenancy"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EndTenancyModal;
