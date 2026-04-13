"use client";
import { Dialog } from "radix-ui";
import { Modal, ModalClose } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";
import { useState } from "react";

type CsvError = { row: string; detail: string };

const MOCK_ERRORS: CsvError[] = [
  { row: "Row 3", detail: " (Email: T-EMP 003, Name: Olivia Patel) - Email: Invalid email format ('olivia.patel@company')." },
  { row: "Row 6", detail: " (Tenant ID: T-EMP 006, Name: Ethan Lee) - Phone Number: Invalid phone number format ('555-12345')." },
  { row: "Row 10", detail: " (Tenant ID: T-EMP 009, Name: Sarah Green) - Tenant Type: Invalid tenant type ('Resident')." },
  { row: "Row 15", detail: " (Tenant ID: T-EMP 014, Name: Mark Davis) - Tenant Name: Name is missing." },
];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ImportCsvModal = ({ open, onOpenChange }: Props) => {
  const [hasError, setHasError] = useState(false);

  return (
  <Modal open={open} onOpenChange={onOpenChange} className="w-[673px] p-6">
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <Dialog.Title className="text-brand-Text-950-d text-2xl font-bold leading-8">
            Import Tenants from CSV
          </Dialog.Title>
          <Dialog.Description className="text-brand-Text-500 text-base font-normal leading-5">
            Upload a CSV file to import tenants
          </Dialog.Description>
        </div>
        <ModalClose />
      </div>

      {/* Drop zone */}
      <div className="p-6 bg-brand-Text-50 rounded-xl outline outline-1 outline-brand-Text-200 flex flex-col items-center gap-4">
        {/* Cloud icon illustration */}
        <div className="w-36 h-28 relative shrink-0">
          <div className="size-24 left-[24px] top-0 absolute bg-gray-200 rounded-full" />
          <div className="w-28 h-16 left-[20px] top-[16px] absolute shadow-[0px_8px_8px_-4px_rgba(16,24,40,0.03),0px_20px_24px_-4px_rgba(16,24,40,0.08)]">
            <div className="w-28 h-16 left-0 top-0 absolute bg-gray-50" />
            <div className="size-12 left-0 top-[12.80px] absolute bg-gradient-to-br from-gray-300 to-transparent rounded-full" />
            <div className="size-16 left-[25.60px] top-0 absolute bg-gradient-to-br from-gray-300 to-transparent rounded-full" />
            <div className="size-11 left-[67.20px] top-[19.20px] absolute bg-gradient-to-br from-gray-300 to-transparent rounded-full" />
          </div>
          <div className="size-2.5 left-[16px] top-[14px] absolute bg-gray-100 rounded-full" />
          <div className="size-3.5 left-[11px] top-[102px] absolute bg-gray-100 rounded-full" />
          <div className="size-3.5 left-[138px] top-[28px] absolute bg-gray-100 rounded-full" />
          <div className="size-2 left-[130px] top-[4px] absolute bg-gray-100 rounded-full" />
          <div className="size-12 left-[52px] top-[62px] absolute bg-slate-700/40 rounded-[36px] backdrop-blur-xs flex items-center justify-center">
            <FileUp className="size-6 text-white" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-Neutral-Grey-100 text-base font-semibold leading-5">Upload Tenants CSV</p>
          <p className="text-Neutral-Grey-60 text-base font-normal">
            Drag and drop your tenant list CSV here, or click to browse
          </p>
        </div>

        <Button variant="outline-transparent" size="sm">
          Select CSV File
        </Button>
      </div>

      {/* File upload progress / error */}
      {hasError ? (
        <div className="p-4 bg-brand-primary-red-50 rounded-xl outline outline-1 -outline-offset-1 outline-brand-primary-red-500 flex flex-col gap-2.5">
          <div className="flex items-start gap-2">
            {/* CSV file icon */}
            <div className="size-10 relative shrink-0 overflow-hidden">
              <div className="w-8 h-10 left-[8.09px] top-0 absolute bg-emerald-800" />
              <div className="size-3 left-[26.71px] top-0 absolute bg-emerald-900" />
              <div className="w-7 h-3 left-[1.32px] top-[17.03px] absolute bg-emerald-900" />
              <div className="w-5 h-2 left-[6.78px] top-[19.09px] absolute bg-white" />
            </div>

            <div className="flex-1 flex flex-col gap-1.5">
              <div className="flex flex-col gap-1">
                <span className="text-brand-Text-950-d text-base font-semibold leading-5">Tenants_List.csv</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-brand-Text-500 text-xs font-normal leading-4">4.2MB</span>
                  <span className="text-brand-Text-500 text-xs leading-4">•</span>
                  <span className="text-Error-Red-60 text-xs font-normal leading-4">Upload Failed</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setHasError(false)}
              className="size-6 flex items-center justify-center shrink-0"
            >
              <span className="size-4 block outline outline-[1.5px] outline-brand-primary-red-600-d" />
            </button>
          </div>

          {/* Error details */}
          <div className="p-2.5 bg-brand-primary-red-100 rounded-lg">
            <p className="text-xs leading-4">
              {MOCK_ERRORS.map((err, i) => (
                <span key={i}>
                  <span className="text-Error-Red-60 font-medium">{err.row}</span>
                  <span className="text-Error-Red-60 font-normal">{err.detail}</span>
                  {i < MOCK_ERRORS.length - 1 && "    "}
                </span>
              ))}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-brand-base-white rounded-xl outline outline-1 outline-brand-Text-100 flex flex-col gap-2.5">
          <div className="flex items-start gap-2">
            {/* CSV file icon */}
            <div className="size-10 relative shrink-0 overflow-hidden">
              <div className="w-8 h-10 left-[8.09px] top-0 absolute bg-emerald-800" />
              <div className="size-3 left-[26.71px] top-0 absolute bg-emerald-900" />
              <div className="w-7 h-3 left-[1.32px] top-[17.03px] absolute bg-emerald-900" />
              <div className="w-5 h-2 left-[6.78px] top-[19.09px] absolute bg-white" />
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-brand-Text-950-d text-base font-semibold leading-5">Tenants_List.csv</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand-Text-500 text-xs font-normal leading-4">4.2MB</span>
                    <span className="text-brand-Text-500 text-xs leading-4">•</span>
                    <span className="text-brand-Text-500 text-xs font-normal leading-4">Uploading</span>
                  </div>
                </div>
                <button className="size-6 flex items-center justify-center text-brand-Text-500 hover:text-brand-Text-700 transition-colors">
                  <span className="size-3.5 bg-brand-Text-500 block" />
                </button>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-1">
                <div className="flex-1 h-1.5 bg-brand-primary-blue-100 rounded-full overflow-hidden">
                  <div className="w-28 h-1.5 bg-brand-primary-blue-600 rounded-full" />
                </div>
                <span className="text-brand-Text-600 text-xs font-normal leading-4">40%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer actions */}
      <div className="flex justify-end items-center gap-3">
        <Button variant="outline-transparent" size="sm" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          size="sm"
          className="bg-gradient-to-b from-brand-primary-red-500 to-brand-primary-red-700 outline outline-1 outline-brand-primary-red-700"
          onClick={() => setHasError(true)}
        >
          Submit CSV
        </Button>
      </div>
    </div>
  </Modal>
  );
};

export default ImportCsvModal;
