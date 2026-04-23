import { Download, FileText } from "lucide-react";
import { Dialog } from "radix-ui";
import { Sheet, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const InvoiceSheet = ({ open, onOpenChange }: Props) => (
  <Sheet open={open} onOpenChange={onOpenChange} className="w-[743px]">
    {/* Header */}
    <Dialog.Title className="px-6 pt-8 pb-4 flex items-center gap-3">
      <div className="flex-1 flex items-center gap-3">
        <div className="p-2 bg-brand-primary-red-50 rounded-lg">
          <FileText className="size-5 text-brand-primary-red-600-d" />
        </div>
        <span className="text-brand-Text-950-d text-xl font-semibold leading-6">
          Monthly Invoice
        </span>
        <div className="px-2 py-[3px] bg-green-600/10 rounded-xl">
          <span className="text-green-600 text-sm font-normal leading-5">Paid</span>
        </div>
      </div>
      <SheetClose />
    </Dialog.Title>

    {/* Content */}
    <div className="flex-1 p-6 flex flex-col items-end gap-6 overflow-y-auto custom-scrollbar">
      {/* Invoice Details */}
      <div className="w-full flex flex-col gap-4">
        <div className="p-3 bg-brand-base-white rounded-xl outline outline-1 outline-brand-Text-100 flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-brand-Text-500 text-xs font-normal leading-4">
                  Invoice Number
                </span>
                <span className="text-brand-primary-red-600-d text-xs font-semibold leading-4">
                  TNL-1690AF0-0032
                </span>
              </div>
              <div className="w-36 flex flex-col">
                <span className="text-brand-Text-500 text-xs font-normal leading-4">
                  Status
                </span>
                <span className="text-brand-Text-800 text-xs font-semibold leading-4">
                  Paid
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-brand-Text-500 text-xs font-normal leading-4">
                  Due Date
                </span>
                <span className="text-brand-Text-800 text-xs font-semibold leading-4">
                  March 1, 2025
                </span>
              </div>
              <div className="w-36 flex flex-col">
                <span className="text-brand-Text-500 text-xs font-normal leading-4">
                  Payment Method
                </span>
                <span className="text-brand-Text-800 text-xs font-semibold leading-4">
                  MASTERCARD 8599
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Costs */}
      <div className="w-full p-3 bg-brand-base-white rounded-xl outline outline-1 outline-brand-Text-100 flex flex-col gap-2.5">
        <div className="flex flex-col gap-1">
          <span className="text-brand-Text-950-d text-base font-semibold leading-5">
            Monthly Costs
          </span>
          <span className="text-brand-Text-500 text-xs font-normal leading-4">
            This covers your subscription for Tenley services from Feb 1, 2026, to Feb 28, 2026.
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-brand-Text-950-d text-xs font-semibold leading-4">1</span>
            <span className="text-brand-Text-500 text-xs font-normal leading-4"> x Standard Plan</span>
          </div>
          <span className="text-brand-Text-950-d text-sm font-semibold leading-5">$25.00</span>
        </div>
      </div>

      {/* Add-ons */}
      <div className="w-full p-3 bg-brand-base-white rounded-xl outline outline-1 outline-brand-Text-100 flex flex-col gap-2.5">
        <span className="text-brand-Text-950-d text-base font-semibold leading-5">Add-ons</span>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-brand-Text-950-d text-xs font-semibold leading-4">2</span>
            <span className="text-brand-Text-500 text-xs font-normal leading-4"> x Additional Property ($1.66)</span>
          </div>
          <span className="text-brand-Text-950-d text-sm font-semibold leading-5">$3.32</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-brand-Text-950-d text-xs font-semibold leading-4">2</span>
            <span className="text-brand-Text-500 text-xs font-normal leading-4"> x Extra Staff Member Access ($14.99)</span>
          </div>
          <span className="text-brand-Text-950-d text-sm font-semibold leading-5">$29.98</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-brand-Text-950-d text-xs font-semibold leading-4">3</span>
            <span className="text-brand-Text-500 text-xs font-normal leading-4"> x New Staff Role ($9.99)</span>
          </div>
          <span className="text-brand-Text-950-d text-sm font-semibold leading-5">$29.97</span>
        </div>
      </div>

      {/* Totals */}
      <div className="w-52 flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-brand-Text-600 text-sm font-normal leading-5">Subtotal</span>
            <span className="text-brand-Text-600 text-sm font-normal leading-5">$88.27</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-brand-Text-600 text-sm font-normal leading-5">Tax</span>
            <span className="text-brand-Text-600 text-sm font-normal leading-5">$0</span>
          </div>
        </div>
        <div className="h-px bg-brand-Text-100" />
        <div className="flex justify-between items-center">
          <span className="text-black text-base font-semibold leading-5">Total</span>
          <span className="text-black text-base font-semibold leading-5">$88.27</span>
        </div>
      </div>
    </div>

    {/* Footer */}
    <Dialog.Description className="hidden" />
    <div className="p-4 border-t border-brand-Text-100 flex justify-end">
      <Button size="lg" className="flex-1">
        <Download className="size-5" />
        Download PDF
      </Button>
    </div>
  </Sheet>
);

export default InvoiceSheet;
