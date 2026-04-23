"use client";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import PhoneInput from "@/components/ui/phone-input";
import { Dialog } from "radix-ui";
import { Users, UserPlus, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Mail, Phone, User } from "lucide-react";

type TenantRole = "Head of Household" | "Family Member";

type Tenant = {
  id: string;
  label: string;
  name: string;
  email: string;
  phone: string;
  role: TenantRole;
};

const roleBadge: Record<TenantRole, { bg: string; text: string }> = {
  "Head of Household": { bg: "bg-indigo-500/10", text: "text-indigo-500" },
  "Family Member": { bg: "bg-red-500/10", text: "text-red-500" }
};

const InfoField = ({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-2">
    <div className="p-1.5 bg-brand-Text-50 rounded-full flex items-center justify-center">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-brand-Text-500 text-xs font-normal leading-4">
        {label}
      </span>
      <span className="text-brand-Text-800 text-xs font-medium leading-4">
        {value}
      </span>
    </div>
  </div>
);

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenants: Tenant[];
  prefill?: Pick<Tenant, "name" | "email" | "phone" | "role">;
  title?: string;
};

const AddTenantModal = ({
  open,
  onOpenChange,
  tenants,
  prefill,
  title
}: Props) => {
  const [view, setView] = useState<"list" | "form">(prefill ? "form" : "list");
  const [name, setName] = useState(prefill?.name ?? "");
  const [email, setEmail] = useState(prefill?.email ?? "");
  const [phone, setPhone] = useState(prefill?.phone ?? "");
  const [role, setRole] = useState(prefill?.role ?? "");

  const handleClose = (o: boolean) => {
    if (!o) setView(prefill ? "form" : "list");
    onOpenChange(o);
  };

  return (
    <Modal open={open} onOpenChange={handleClose} className="w-[836px]">
      {view === "list" ? (
        <div className="p-6 flex flex-col gap-5">
          {/* Header */}
          <Dialog.Title asChild>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="p-2.5 bg-brand-primary-red-50 rounded-full">
                  <Users className="size-6 text-brand-primary-red-600-d" />
                </div>
                <span className="text-brand-Text-950-d text-2xl font-bold leading-8">
                  Add New Tenant
                </span>
              </div>
              <Dialog.Description asChild>
                <p className="text-brand-Text-500 text-sm font-normal leading-5">
                  Start adding tenants to track move-ins, lease details, and
                  unit occupancy across your properties.
                </p>
              </Dialog.Description>
            </div>
          </Dialog.Title>

          {/* Tenant cards + Add new card */}
          <div className="flex flex-wrap gap-6">
            {tenants.map((t) => {
              const badge = roleBadge[t.role];
              return (
                <div
                  key={t.id}
                  className="flex-1 min-w-[280px] p-4 bg-brand-base-white rounded-xl outline outline-1 outline-brand-Text-100 flex flex-col gap-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-brand-Text-950-d text-base font-semibold leading-5">
                      {t.label}
                    </span>
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium leading-4",
                        badge.bg,
                        badge.text
                      )}
                    >
                      {t.role}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <InfoField
                      icon={<User className="size-4 text-brand-Text-800" />}
                      label="Tenant Name"
                      value={t.name}
                    />
                    <div className="flex items-center justify-between">
                      <InfoField
                        icon={<Mail className="size-4 text-brand-Text-800" />}
                        label="Email"
                        value={t.email}
                      />
                      <div className="w-36">
                        <InfoField
                          icon={
                            <Phone className="size-4 text-brand-Text-800" />
                          }
                          label="Phone Number"
                          value={t.phone}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Add New Tenant card */}
            <button
              onClick={() => setView("form")}
              className="flex-1 min-w-[280px] p-4 bg-brand-primary-red-50 rounded-xl outline outline-1 outline-brand-primary-red-400 flex flex-col items-center justify-center gap-3 hover:opacity-90 transition-opacity"
            >
              <div className="p-2 bg-brand-primary-red-200 rounded-full">
                <UserPlus className="size-6 text-brand-primary-red-600-d" />
              </div>
              <span className="text-brand-Text-950-d text-sm font-medium leading-5">
                Add New Tenant
              </span>
            </button>
          </div>

          <hr className="border-brand-Text-100" />

          {/* Footer */}
          <div className="flex items-center gap-6 justify-end w-full">
            <Button
              variant="outline-transparent"
              size="lg"
              onClick={() => handleClose(false)}
            >
              Cancel
            </Button>
            <Button size="lg">Add Tenants</Button>
          </div>
        </div>
      ) : (
        <div className="p-6 flex flex-col gap-5">
          {/* Header */}
          <Dialog.Title asChild>
            <div className="flex flex-col gap-2">
              {!prefill && (
                <button
                  onClick={() => setView("list")}
                  className="flex items-center gap-1 text-brand-Text-500 hover:text-brand-Text-800 transition-colors w-fit"
                >
                  <ChevronLeft className="size-4" />
                  <span className="text-sm leading-5">Back</span>
                </button>
              )}
              <span className="text-brand-Text-950-d text-2xl font-bold leading-8">
                {title ?? "Add New Details"}
              </span>
            </div>
          </Dialog.Title>

          {/* Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <TextInput
              label="Email"
              placeholder="Enter email address"
              value={email}
              setValue={setEmail}
              type="email"
              disabled={!!prefill}
            />
            <Select
              label="Tenant Type"
              placeholder="Select tenant type"
              value={role}
              onValueChange={setRole}
              options={[
                { label: "Head of Household", value: "head" },
                { label: "Family Member", value: "family" }
              ]}
            />
            <TextInput
              label="Tenant Name"
              placeholder="Enter tenant name"
              value={name}
              setValue={setName}
            />
            <PhoneInput
              label="Phone Number"
              placeholder="Enter phone number"
              value={phone}
              onChange={(p) => setPhone(p)}
              defaultCountry="us"
            />
          </div>

          <hr className="border-brand-Text-100" />

          {/* Footer */}
          <div className="flex items-center justify-end w-full gap-6">
            <Button
              variant="outline-transparent"
              size="lg"
              onClick={() => handleClose(false)}
            >
              Cancel
            </Button>
            <Button size="lg">Invite & Assign</Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AddTenantModal;
