"use client";
import { Button } from "@/components/ui/button";
import { Modal, ModalClose } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import { CheckCircle2, FileSpreadsheet, Upload, XCircle } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Dialog } from "radix-ui";
import { toast } from "sonner";
import Cloud from "@/../public/assets/property/import-csv-image.png";
import { bulkUpsertProperties } from "../services/propertyService";
import {
  generateSampleCSV,
  parsePropertyCSV,
  type CsvRowError,
} from "../utils/csvParser";
import type { UpsertPropertyPayload } from "../types";
import CSVErrorModal from "./CSVErrorModal";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const REQUIRED_COLS = [
  "property_name",
  "property_address",
  "property_type",
  "property_purpose",
];
const OPTIONAL_COLS = [
  "property_images",
  "property_id_prefix",
  "access_details",
  "city",
  "state",
  "number_of_unit",
  "number_of_floors",
];

const ImportPropertyCSVModal = ({ open, onOpenChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [parsedRows, setParsedRows] = useState<UpsertPropertyPayload[]>([]);
  const [errors, setErrors] = useState<CsvRowError[]>([]);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reset = useCallback(() => {
    setFile(null);
    setParsedRows([]);
    setErrors([]);
    setErrorModalOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const processFile = useCallback(
    (f: File) => {
      if (!f.name.toLowerCase().endsWith(".csv")) {
        toast.error("Only .csv files are supported");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const result = parsePropertyCSV(text);
        setFile(f);
        setParsedRows(result.rows);
        setErrors(result.errors);
        if (result.errors.length > 0) setErrorModalOpen(true);
      };
      reader.readAsText(f);
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) processFile(f);
    },
    [processFile]
  );

  const handleSubmit = async () => {
    if (!parsedRows.length) return;
    setIsSubmitting(true);
    const { error } = await bulkUpsertProperties(parsedRows);
    setIsSubmitting(false);
    if (!error) {
      toast.success(
        `${parsedRows.length} ${parsedRows.length === 1 ? "property" : "properties"} imported successfully`
      );
      reset();
      onOpenChange(false);
    }
  };

  const downloadSample = (e: React.MouseEvent) => {
    e.stopPropagation();
    const blob = new Blob([generateSampleCSV()], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "property_import_sample.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasErrors = errors.length > 0;
  const isReady = !!file && parsedRows.length > 0 && !hasErrors;

  return (
    <>
      <Modal
        open={open}
        onOpenChange={(v) => {
          if (!v) reset();
          onOpenChange(v);
        }}
        className="w-160 p-6 flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <Dialog.Title className="text-brand-Text-950-d text-2xl font-bold leading-8">
              Import Properties from CSV
            </Dialog.Title>
            <Dialog.Description className="text-brand-Text-500 text-base font-normal leading-5">
              Upload a CSV file to import multiple properties at once
            </Dialog.Description>
          </div>
          <ModalClose />
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !file && fileInputRef.current?.click()}
          className={cn(
            "p-6 rounded-xl outline outline-1 flex flex-col items-center gap-4 transition-colors",
            !file && "cursor-pointer",
            isDragging
              ? "bg-brand-primary-red-50 outline-brand-primary-red-400"
              : file
                ? hasErrors
                  ? "bg-red-50 outline-red-300"
                  : "bg-green-50 outline-green-300"
                : "bg-brand-Text-50 outline-brand-Text-200 hover:outline-brand-Text-400"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) processFile(f);
            }}
          />

          {file ? (
            <div className="flex flex-col items-center gap-3 w-full text-center">
              <div
                className={cn(
                  "p-3 rounded-full",
                  hasErrors ? "bg-red-100" : "bg-green-100"
                )}
              >
                {hasErrors ? (
                  <XCircle className="size-7 text-red-500" />
                ) : (
                  <CheckCircle2 className="size-7 text-green-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="size-4 text-brand-Text-500" />
                <span className="text-brand-Text-950-d text-sm font-semibold">
                  {file.name}
                </span>
              </div>
              {hasErrors ? (
                <span className="text-red-500 text-sm">
                  {errors.length} validation error
                  {errors.length !== 1 ? "s" : ""} found
                </span>
              ) : (
                <span className="text-green-600 text-sm font-medium">
                  {parsedRows.length} row
                  {parsedRows.length !== 1 ? "s" : ""} ready to import
                </span>
              )}
              <div className="flex items-center gap-3">
                {hasErrors && (
                  <Button
                    size="sm"
                    variant="outline-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      setErrorModalOpen(true);
                    }}
                  >
                    View Errors
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline-transparent"
                  onClick={(e) => {
                    e.stopPropagation();
                    reset();
                  }}
                >
                  Remove File
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 w-full">
              <Image src={Cloud} alt="" width={140} height={109} />
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="text-Neutral-Grey-100 text-base font-semibold leading-5">
                  {isDragging ? "Drop it here!" : "Upload Property CSV"}
                </span>
                <span className="text-Neutral-Grey-60 text-sm font-normal">
                  Drag and drop your CSV file here, or click to browse
                </span>
                <p className="text-sm">
                  <button
                    type="button"
                    onClick={downloadSample}
                    className="text-brand-primary-red-600-d font-medium underline"
                  >
                    Download sample CSV
                  </button>
                  <span className="text-Neutral-Grey-60">
                    {" "}
                    to see the required format
                  </span>
                </p>
              </div>
              <Button
                variant="outline-transparent"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                <Upload className="size-4" />
                Select CSV File
              </Button>
            </div>
          )}
        </div>

        {/* Column reference */}
        <div className="p-4 bg-brand-Text-50 rounded-xl flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <span className="text-brand-Text-700 text-xs font-semibold uppercase tracking-wide">
              Required columns
            </span>
            <div className="flex flex-wrap gap-1.5">
              {REQUIRED_COLS.map((col) => (
                <span
                  key={col}
                  className="px-2 py-0.5 bg-brand-primary-red-50 text-brand-primary-red-600-d text-xs font-medium font-mono rounded-md outline outline-1 -outline-offset-1 outline-brand-primary-red-100"
                >
                  {col}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-brand-Text-700 text-xs font-semibold uppercase tracking-wide">
              Optional columns
            </span>
            <div className="flex flex-wrap gap-1.5">
              {OPTIONAL_COLS.map((col) => (
                <span
                  key={col}
                  className="px-2 py-0.5 bg-brand-Text-100 text-brand-Text-600 text-xs font-medium font-mono rounded-md"
                >
                  {col}
                </span>
              ))}
            </div>
          </div>
          <p className="text-brand-Text-400 text-xs">
            For <span className="font-mono">property_type</span>: apartment,
            bungalow, mall, office &nbsp;·&nbsp; For{" "}
            <span className="font-mono">property_purpose</span>: residential,
            commercial &nbsp;·&nbsp; Separate multiple{" "}
            <span className="font-mono">property_images</span> with{" "}
            <span className="font-mono">|</span>
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3">
          <Button
            variant="outline-transparent"
            onClick={() => {
              reset();
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          {hasErrors ? (
            <Button onClick={() => setErrorModalOpen(true)}>
              View {errors.length} Error{errors.length !== 1 ? "s" : ""}
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isReady || isSubmitting}
              isLoading={isSubmitting}
            >
              Import{parsedRows.length > 0 ? ` ${parsedRows.length}` : ""}{" "}
              {parsedRows.length === 1 ? "Property" : "Properties"}
            </Button>
          )}
        </div>
      </Modal>

      <CSVErrorModal
        open={errorModalOpen}
        onOpenChange={setErrorModalOpen}
        errors={errors}
        onReupload={() => {
          setErrorModalOpen(false);
          reset();
          setTimeout(() => fileInputRef.current?.click(), 100);
        }}
      />
    </>
  );
};

export default ImportPropertyCSVModal;
