"use client";
import { Button } from "@/components/ui/button";
import { Modal, ModalClose } from "@/components/ui/modal";
import { Dialog } from "radix-ui";
import Cloud from "@/../public/assets/property/import-csv-image.png";
import Image from "next/image";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ImportPropertyCSVModal = ({ open, onOpenChange }: Props) => (
  <Modal
    open={open}
    onOpenChange={onOpenChange}
    className="w-[673px] p-6 flex flex-col gap-6"
  >
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
        <Image src={Cloud} alt="" width={152} height={118} />

        {/* Text */}
        <div className="flex flex-col items-center gap-2 w-full text-center">
          <span className="text-Neutral-Grey-100 text-base font-semibold leading-5">
            Upload Property CSV
          </span>
          <span className="text-Neutral-Grey-60 text-base font-normal">
            Drag and drop your resident contact list CSV here, or click to
            browse
          </span>
          <p className="text-base">
            <span className="text-brand-primary-red-600-d font-medium underline cursor-pointer">
              Click here
            </span>
            <span className="text-Neutral-Grey-60 font-normal">
              {" "}
              to download sample CSV
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
        <Button
          variant="outline-transparent"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button>Submit CSV</Button>
      </div>
    </Dialog.Close>
  </Modal>
);

export default ImportPropertyCSVModal;
