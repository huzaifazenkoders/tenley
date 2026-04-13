"use client";
import { Dialog } from "radix-ui";
import { Modal, ModalClose } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { useState } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unitName?: string;
};

const EditUnitModal = ({ open, onOpenChange, unitName = "101-A" }: Props) => {
  const [name, setName] = useState(unitName);

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="w-[586px] p-6">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <Dialog.Title className="text-brand-Text-950-d text-2xl font-bold leading-8">
            Edit Unit Name
          </Dialog.Title>
          <ModalClose />
        </div>

        <TextInput
          label="Unit Name"
          value={name}
          setValue={setName}
          containerClassName="w-full"
        />

        <div className="flex justify-end items-center gap-6">
          <Button variant="outline-transparent" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Update Unit Name
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditUnitModal;
