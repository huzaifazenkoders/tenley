"use client";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";
import { Dialog } from "radix-ui";
import { User } from "lucide-react";
import { useState } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const EndTenancyModal = ({ open, onOpenChange }: Props) => {
  const [comments, setComments] = useState("");

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="w-[836px]">
      <div className="p-6 flex flex-col gap-5">
        {/* Header */}
        <Dialog.Title asChild>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2.5 bg-brand-primary-red-50 rounded-full">
                <User className="size-6 text-brand-primary-red-600-d" />
              </div>
              <span className="text-brand-Text-950-d text-2xl font-bold leading-8">
                End Tenancy
              </span>
            </div>
            <Dialog.Description asChild>
              <p className="text-brand-Text-500 text-base font-medium leading-5">
                This will end the tenant&apos;s lease and archive their record.
                The unit will be marked as vacant.
              </p>
            </Dialog.Description>
          </div>
        </Dialog.Title>

        {/* Body */}
        <div className="p-4 rounded-2xl">
          <Textarea
            label="Comments (Optional)"
            placeholder="Enter comments..."
            value={comments}
            setValue={setComments}
          />
        </div>

        <hr className="border-brand-Text-100" />

        {/* Footer */}
        <div className="flex items-center justify-end gap-6">
          <Button
            variant="outline-transparent"
            size="lg"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button size="lg" onClick={() => onOpenChange(false)}>
            End Tenancy
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EndTenancyModal;
