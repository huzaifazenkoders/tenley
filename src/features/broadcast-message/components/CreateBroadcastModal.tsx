"use client";
import { useState } from "react";
import Image from "next/image";
import { Megaphone, Search, UsersRound } from "lucide-react";
import { Dialog } from "radix-ui";
import { Modal, ModalClose } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import Textarea from "@/components/ui/textarea";
import Checkbox from "@/components/ui/checkbox";

type AudienceOption =
  | "all-tenants"
  | "all-staff"
  | "all-technicians"
  | "all-managers"
  | "custom";

type Step1Data = { title: string; body: string };
type Step2Data = { audience: AudienceOption | null; selectedUsers: string[] };

const TOTAL_STEPS = 2;

const audienceOptions: {
  id: AudienceOption;
  label: string;
  description: string;
}[] = [
  {
    id: "all-tenants",
    label: "All Tenants",
    description: "Broadcast to all active tenant across all properties."
  },
  {
    id: "all-staff",
    label: "All Staff",
    description: "Broadcast to all staff across all properties."
  },
  {
    id: "all-technicians",
    label: "All Technicians",
    description: "Broadcast to all technicians across all properties."
  },
  {
    id: "all-managers",
    label: "All Managers & Supervisors",
    description: "Broadcast to all manager & supervisor across all properties."
  },
  {
    id: "custom",
    label: "Custom",
    description: "Broadcast to custom users across all properties."
  }
];

const users = [
  { id: "1", name: "Jane Cooper", role: "Maintenance Technician" },
  { id: "2", name: "Savannah Nguyen", role: "Maintenance Technician" },
  { id: "3", name: "Jacob Jones", role: "Maintenance Technician" },
  { id: "4", name: "Darrell Steward", role: "Maintenance Technician" },
  { id: "5", name: "Jacob Jones", role: "Maintenance Technician" },
  { id: "6", name: "Darrell Steward", role: "Maintenance Technician" }
];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CreateBroadcastModal = ({ open, onOpenChange }: Props) => {
  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState<Step1Data>({ title: "", body: "" });
  const [step2, setStep2] = useState<Step2Data>({
    audience: null,
    selectedUsers: []
  });
  const [search, setSearch] = useState("");

  const handleClose = () => {
    onOpenChange(false);
    setStep(1);
    setStep1({ title: "", body: "" });
    setStep2({ audience: null, selectedUsers: [] });
    setSearch("");
  };

  const toggleUser = (id: string) =>
    setStep2((d) => ({
      ...d,
      selectedUsers: d.selectedUsers.includes(id)
        ? d.selectedUsers.filter((u) => u !== id)
        : [...d.selectedUsers, id]
    }));

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const step2Valid =
    step2.audience !== null &&
    (step2.audience !== "custom" || step2.selectedUsers.length > 0);

  // Split audience options: first 4 in 2x2 grid, last one (custom) alone
  const gridOptions = audienceOptions.slice(0, 4);
  const customOption = audienceOptions[4];

  return (
    <Modal
      open={open}
      onOpenChange={handleClose}
      className="w-[836px] p-6 flex flex-col gap-5"
    >
      {/* Header */}
      <Dialog.Title className="flex items-center gap-5">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-brand-primary-red-50 rounded-full">
              <Megaphone className="size-6 text-brand-primary-red-600-d" />
            </div>
            <span className="text-brand-Text-950-d text-2xl font-bold leading-8">
              Create Broadcast
            </span>
          </div>
          <p className="text-brand-Text-500 text-sm font-normal leading-5">
            Create a clear message that recipients can understand quickly. Keep
            it short, direct, and action-focused.
          </p>
        </div>

        {/* Step indicator */}
        <div className="relative size-14 shrink-0 flex items-center justify-center">
          <div className="absolute size-16 -inset-1 bg-brand-primary-red-100 rounded-full" />
          <div
            className="absolute size-16 -inset-1 rounded-full"
            style={{
              background: `conic-gradient(var(--brand-primary-red-600-d) ${(step / TOTAL_STEPS) * 100}%, transparent 0%)`
            }}
          />
          <div className="absolute size-12 bg-brand-base-white rounded-full" />
          <span className="relative text-brand-Text-950-d text-xl font-bold leading-6 z-10">
            {step}/{TOTAL_STEPS}
          </span>
        </div>
      </Dialog.Title>

      <Dialog.Description className="hidden" />

      {/* Step 1 */}
      {step === 1 && (
        <div className="flex flex-col gap-6 p-4">
          <TextInput
            label="Message Title"
            placeholder="e.g, Water supply maintenance"
            value={step1.title}
            setValue={(v) => setStep1((d) => ({ ...d, title: v }))}
          />
          <Textarea
            label="Message Body"
            placeholder={`e.g, Water supply will be unavailable from 2:00 PM to 5:00 PM today due to scheduled maintenance in Block A.\n\nPlease store enough water in advance. We appreciate your patience.`}
            value={step1.body}
            onChange={(e) => setStep1((d) => ({ ...d, body: e.target.value }))}
            className="h-52"
          />
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="flex flex-col gap-4">
          {/* Audience cards — 2x2 grid */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {gridOptions.map((opt) => (
                <AudienceCard
                  key={opt.id}
                  label={opt.label}
                  description={opt.description}
                  selected={step2.audience === opt.id}
                  onSelect={() =>
                    setStep2((d) => ({
                      ...d,
                      audience: opt.id,
                      selectedUsers: []
                    }))
                  }
                />
              ))}
            </div>
            {/* Custom — half width */}
            <div className="grid grid-cols-2 gap-4">
              <AudienceCard
                label={customOption.label}
                description={customOption.description}
                selected={step2.audience === "custom"}
                onSelect={() => setStep2((d) => ({ ...d, audience: "custom" }))}
              />
            </div>
          </div>

          {/* User search + list — only for custom */}
          {step2.audience === "custom" && (
            <div className="rounded-2xl outline outline-1 outline-offset-[-1px] outline-brand-Text-100 flex flex-col gap-4 overflow-hidden">
              <div className="p-4 flex flex-col gap-4">
                {/* Search */}
                <TextInput
                  startIcon={<Search className="size-5 text-brand-Text-500" />}
                  placeholder="Search staff, managers, tenants"
                  value={search}
                  setValue={setSearch}
                  containerClassName="bg-brand-Text-50 rounded-lg"
                  className="bg-brand-Text-50"
                />

                {/* User list */}
                <div className="flex flex-col gap-3 max-h-52 overflow-y-auto custom-scrollbar">
                  {[
                    filteredUsers.slice(0, 2),
                    filteredUsers.slice(2, 4),
                    filteredUsers.slice(4)
                  ].map((row, ri) => (
                    <div key={ri} className="flex gap-3">
                      {row.map((user) => (
                        <div
                          key={user.id}
                          className="flex-1 p-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-brand-Text-100 flex items-center gap-3 cursor-pointer"
                          onClick={() => toggleUser(user.id)}
                        >
                          <Checkbox
                            checked={step2.selectedUsers.includes(user.id)}
                            onCheckedChange={() => toggleUser(user.id)}
                          />
                          <div className="flex items-center gap-2">
                            <Image
                              src="/assets/mock/person1.png"
                              alt={user.name}
                              width={48}
                              height={48}
                              className="rounded-full"
                              unoptimized
                            />
                            <div className="flex flex-col gap-0.5">
                              <span className="text-brand-Text-950-d text-sm font-semibold leading-5">
                                {user.name}
                              </span>
                              <span className="text-brand-Text-600 text-xs font-normal leading-4">
                                {user.role}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="self-stretch h-px bg-brand-Text-100" />

      {/* Footer */}
      <div className="flex justify-end items-center gap-3">
        {step > 1 ? (
          <Button
            variant="outline-transparent"
            size="lg"
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </Button>
        ) : (
          <Button variant="outline-transparent" size="lg" onClick={handleClose}>
            Cancel
          </Button>
        )}
        {step < TOTAL_STEPS ? (
          <Button
            size="lg"
            onClick={() => setStep((s) => s + 1)}
            disabled={!step1.title.trim() || !step1.body.trim()}
          >
            Continue
          </Button>
        ) : (
          <Button size="lg" onClick={handleClose} disabled={!step2Valid}>
            Broadcast Message
          </Button>
        )}
      </div>
    </Modal>
  );
};

const AudienceCard = ({
  label,
  description,
  selected,
  onSelect
}: {
  label: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) => (
  <button
    onClick={onSelect}
    className={`p-2.5 bg-brand-base-white rounded-lg outline outline-1 outline-offset-[-1px] flex flex-col gap-2 text-left transition-colors ${
      selected ? "outline-brand-primary-red-600-d" : "outline-brand-Text-100"
    }`}
  >
    <div className="flex justify-between items-center w-full">
      <div className="p-1.5 bg-brand-primary-red-50 rounded-full">
        <UsersRound className="size-5 text-brand-primary-red-600-d" />
      </div>
      <Checkbox
        className="rounded-full"
        checked={selected}
        onCheckedChange={onSelect}
      />
    </div>
    <div className="flex flex-col gap-0.5">
      <span className="text-brand-Text-950-d text-sm font-semibold leading-5">
        {label}
      </span>
      <span className="text-brand-Text-600 text-xs font-normal leading-4">
        {description}
      </span>
    </div>
  </button>
);

export default CreateBroadcastModal;
