"use client";
import { Button } from "@/components/ui/button";
import { Modal, ModalClose } from "@/components/ui/modal";
import { AlertTriangle, Upload } from "lucide-react";
import { Dialog } from "radix-ui";
import type { CsvRowError } from "../utils/csvParser";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  errors: CsvRowError[];
  onReupload: () => void;
};

const CSVErrorModal = ({ open, onOpenChange, errors, onReupload }: Props) => {
  const headerErrors = errors.filter((e) => e.row === 0);
  const rowErrors = errors.filter((e) => e.row > 0);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      className="w-[700px] p-6 flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-50 rounded-lg">
            <AlertTriangle className="size-5 text-red-500" />
          </div>
          <div className="flex flex-col gap-0.5">
            <Dialog.Title className="text-brand-Text-950-d text-xl font-bold leading-6">
              CSV Validation Errors
            </Dialog.Title>
            <Dialog.Description className="text-brand-Text-500 text-sm font-normal leading-5">
              {errors.length} issue{errors.length !== 1 ? "s" : ""} found —
              fix them in your file and re-upload
            </Dialog.Description>
          </div>
        </div>
        <ModalClose />
      </div>

      {/* Header / structural errors */}
      {headerErrors.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-brand-Text-700 text-xs font-semibold uppercase tracking-wide">
            File Structure Issues
          </span>
          <div className="flex flex-col gap-1.5">
            {headerErrors.map((e, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-red-50 rounded-lg outline outline-1 -outline-offset-1 outline-red-200"
              >
                <AlertTriangle className="size-4 text-red-500 mt-0.5 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  {e.column !== "—" && (
                    <span className="text-red-700 text-xs font-semibold">
                      Column: {e.column}
                    </span>
                  )}
                  <span className="text-red-600 text-sm">{e.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Row-level errors table */}
      {rowErrors.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-brand-Text-700 text-xs font-semibold uppercase tracking-wide">
            Row Errors ({rowErrors.length})
          </span>
          <div className="rounded-xl outline outline-1 -outline-offset-1 outline-brand-Text-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-Text-50 border-b border-brand-Text-100">
                  <th className="text-left px-4 py-2.5 text-brand-Text-600 font-semibold text-xs w-16">
                    Row
                  </th>
                  <th className="text-left px-4 py-2.5 text-brand-Text-600 font-semibold text-xs w-48">
                    Column
                  </th>
                  <th className="text-left px-4 py-2.5 text-brand-Text-600 font-semibold text-xs w-40">
                    Value
                  </th>
                  <th className="text-left px-4 py-2.5 text-brand-Text-600 font-semibold text-xs">
                    Error
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowErrors.map((e, i) => (
                  <tr
                    key={i}
                    className="border-b border-brand-Text-100 last:border-0 hover:bg-red-50/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-brand-Text-500 font-medium">
                      {e.row}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-1.5 py-0.5 bg-brand-Text-100 text-brand-Text-700 text-xs font-mono rounded">
                        {e.column}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-brand-Text-600 font-mono text-xs max-w-[160px] truncate">
                      {e.value || (
                        <span className="text-brand-Text-300 italic">
                          empty
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-red-600 text-xs">
                      {e.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-end items-center gap-3">
        <Button variant="outline-transparent" onClick={() => onOpenChange(false)}>
          Close
        </Button>
        <Button onClick={onReupload}>
          <Upload className="size-4" />
          Fix & Re-upload
        </Button>
      </div>
    </Modal>
  );
};

export default CSVErrorModal;
