"use client";
import { Dialog } from "radix-ui";
import { Modal, ModalClose } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { useState } from "react";
import { updateUnit } from "../services";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unitId: string;
  unitName?: string;
  unitNumber?: string;
  onSuccess?: () => void;
};

const EditUnitModal = ({
  open,
  onOpenChange,
  unitId,
  unitName = "",
  unitNumber = "",
  onSuccess,
}: Props) => {
  const [name, setName] = useState(unitName);
  const [number, setNumber] = useState(unitNumber);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const { error } = await updateUnit({
      unit_id: unitId,
      unit_name: name || undefined,
      unit_number: number || undefined,
    });
    setLoading(false);
    if (error) return;
    onSuccess?.();
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="w-[586px] p-6">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <Dialog.Title className="text-brand-Text-950-d text-2xl font-bold leading-8">
            Edit Unit
          </Dialog.Title>
          <ModalClose />
        </div>

        <div className="flex items-start gap-4">
          <TextInput
            label="Unit Name"
            value={name}
            setValue={setName}
            containerClassName="flex-1"
          />
          <TextInput
            label="Unit Number"
            value={number}
            setValue={setNumber}
            containerClassName="w-36"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <Button variant="outline-transparent" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Saving..." : "Update Unit"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditUnitModal;
