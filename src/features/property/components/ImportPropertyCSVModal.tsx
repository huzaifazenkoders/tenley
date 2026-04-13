"use client";
import { Button } from "@/components/ui/button";
import { Modal, ModalClose } from "@/components/ui/modal";
import { Dialog } from "radix-ui";
import { CloudUpload } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ImportPropertyCSVModal = ({ open, onOpenChange }: Props) => (
  <Modal open={open} onOpenChange={onOpenChange} className="w-[673px] p-6 flex flex-col gap-6">
    {/* Header */}
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1">
        <Dialog.Title className="text-brand-Text-950-d text-2xl font-bold leading-8">
          Import Property from CSV
        </Dialog.Title>
        <Dialog.Description className="text-brand-Text-500 text-base font-normal leading-5">
          Upload a CSV file to import property, units, and tenant information
        </Dialog.Description>
      </div>
      <ModalClose />
    </div>

    {/* Drop zone */}
    <div className="p-6 bg-brand-Text-50 rounded-xl outline outline-1 outline-brand-Text-200 flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Cloud upload illustration */}
        <div className="relative w-36 h-28 flex items-end justify-center">
          <div className="absolute size-24 top-0 left-6 bg-gray-200 rounded-full" />
          <div className="absolute w-28 h-16 left-5 top-4 bg-gray-50 rounded-lg shadow-[0px_8px_8px_-4px_rgba(16,24,40,0.03),0px_20px_24px_-4px_rgba(16,24,40,0.08)]" />
          <div className="absolute size-2.5 left-4 top-3.5 bg-gray-100 rounded-full" />
          <div className="absolute size-3.5 left-2.5 bottom-0 bg-gray-100 rounded-full" />
          <div className="absolute size-3.5 right-0 top-7 bg-gray-100 rounded-full" />
          <div className="absolute size-2 right-2.5 top-1 bg-gray-100 rounded-full" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 size-12 bg-slate-700/40 rounded-[36px] backdrop-blur-sm flex items-center justify-center">
            <CloudUpload className="size-6 text-white" />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2 w-full text-center">
          <span className="text-Neutral-Grey-100 text-base font-semibold leading-5">
            Upload Property CSV
          </span>
          <span className="text-Neutral-Grey-60 text-base font-normal">
            Drag and drop your resident contact list CSV here, or click to browse
          </span>
          <p className="text-base">
            <span className="text-brand-primary-red-600-d font-medium underline cursor-pointer">
              Click here
            </span>
            <span className="text-Neutral-Grey-60 font-normal">
              {" "}to download sample CSV
            </span>
          </p>
        </div>
      </div>

      <Button variant="outline-transparent" size="sm">
        Select CSV File
      </Button>
    </div>

    {/* Footer */}
    <Dialog.Close asChild>
      <div className="flex justify-end items-center gap-3">
        <Button variant="outline-transparent" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button>Submit CSV</Button>
      </div>
    </Dialog.Close>
  </Modal>
);

export default ImportPropertyCSVModal;
