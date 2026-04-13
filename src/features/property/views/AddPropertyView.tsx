"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileText, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImportPropertyCSVModal from "../components/ImportPropertyCSVModal";
import AddPropertyManualModal from "../components/AddPropertyManualModal";

type Method = "csv" | "manual";

const methods: {
  id: Method;
  icon: React.ReactNode;
  title: string;
  description: string;
}[] = [
  {
    id: "csv",
    icon: <Upload className="size-8 text-brand-primary-red-600-d" />,
    title: "Upload Property via CSV",
    description:
      "Upload a CSV file to add multiple properties at once. Perfect for bulk imports.",
  },
  {
    id: "manual",
    icon: <FileText className="size-8 text-brand-Text-950-d" />,
    title: "Enter Property Details Manually",
    description:
      "Add one property at a time by filling out a guided form. Best for single or complex properties.",
  },
];

const AddPropertyView = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<Method>("csv");
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [manualModalOpen, setManualModalOpen] = useState(false);

  return (
    <div className="px-6 pt-10 pb-6 flex flex-col gap-10 w-full">
      {/* Header */}
      <div className="flex items-end justify-between gap-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-brand-Text-950-d text-2xl font-bold leading-8">
            Add a Property
          </h1>
          <p className="text-brand-Text-600 text-base font-normal leading-5">
            Choose how you&apos;d like to add property details. You can enter
            them manually or upload a CSV for bulk setup.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline-transparent"
            size="lg"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            size="lg"
            onClick={() => {
              if (selected === "csv") setCsvModalOpen(true);
              else setManualModalOpen(true);
            }}
          >
            Continue
          </Button>
        </div>
      </div>

      {/* Method cards */}
      <div className="flex items-center gap-10">
        {methods.map(({ id, icon, title, description }) => {
          const isActive = selected === id;
          return (
            <button
              key={id}
              onClick={() => setSelected(id)}
              className={cn(
                "w-96 p-4 rounded-xl outline outline-1 -outline-offset-1 flex flex-col gap-6 text-left transition-colors",
                isActive
                  ? "bg-brand-primary-red-50/25 outline-brand-primary-red-500"
                  : "bg-white outline-brand-Text-200"
              )}
            >
              <div
                className={cn(
                  "p-3 rounded-full inline-flex",
                  isActive ? "bg-brand-primary-red-50" : "bg-brand-Text-50"
                )}
              >
                {icon}
              </div>
              <div className="flex flex-col gap-1">
                <span
                  className={cn(
                    "text-base font-bold leading-5",
                    isActive
                      ? "text-brand-primary-red-600-d"
                      : "text-brand-Text-950-d"
                  )}
                >
                  {title}
                </span>
                <span
                  className={cn(
                    "text-sm font-normal leading-5",
                    isActive
                      ? "text-brand-primary-red-500"
                      : "text-brand-Text-600"
                  )}
                >
                  {description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <ImportPropertyCSVModal open={csvModalOpen} onOpenChange={setCsvModalOpen} />
      <AddPropertyManualModal open={manualModalOpen} onOpenChange={setManualModalOpen} />
    </div>
  );
};

export default AddPropertyView;
