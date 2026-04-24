"use client";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import PhoneInput from "@/components/ui/phone-input";
import { Dialog } from "radix-ui";
import { Users, UserPlus, ChevronLeft, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { bulkCreateTenants, updateTenant } from "../services";
import type { BulkCreateTenantPayload, Tenant } from "../types";
import { TenantType } from "../types/enums";

const roleBadge: Record<TenantType, { bg: string; text: string }> = {
  [TenantType.HeadOfHousehold]: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-500"
  },
  [TenantType.FamilyMember]: { bg: "bg-red-500/10", text: "text-red-500" }
};

const roleLabel: Record<TenantType, string> = {
  [TenantType.HeadOfHousehold]: "Head of Household",
  [TenantType.FamilyMember]: "Family Member"
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

type CreateProps = {
  mode: "create";
  propertyId?: string;
  unitId?: string;
  tenants: Tenant[];
  onSuccess?: () => void;
};

type EditProps = {
  mode: "edit";
  tenant: Tenant;
  onSuccess?: () => void;
};

type Props = (CreateProps | EditProps) & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  role: "" as TenantType | ""
};

const AddTenantModal = (props: Props) => {
  const { open, onOpenChange } = props;
  const isEdit = props.mode === "edit";

  const [view, setView] = useState<"list" | "form">(isEdit ? "form" : "list");
  const [form, setForm] = useState(() =>
    isEdit
      ? {
          name: props.tenant.tenant_name,
          email: props.tenant.email,
          phone: props.tenant.phone,
          role: props.tenant.tenant_type as TenantType | ""
        }
      : emptyForm
  );
  const [pendingTenants, setPendingTenants] = useState<
    BulkCreateTenantPayload[]
  >([]);
  const [loading, setLoading] = useState(false);

  const patch = (p: Partial<typeof form>) =>
    setForm((prev) => ({ ...prev, ...p }));

  const handleClose = (o: boolean) => {
    if (!o) {
      setView(isEdit ? "form" : "list");
      setForm(emptyForm);
      setPendingTenants([]);
    }
    onOpenChange(o);
  };

  const handleInviteAndAssign = () => {
    if (!form.role) return;
    setPendingTenants((prev) => [
      ...prev,
      {
        tenant_name: form.name,
        email: form.email,
        phone: form.phone,
        tenant_type: form.role as TenantType
      }
    ]);
    setForm(emptyForm);
    setView("list");
  };

  const handleSubmit = async () => {
    if (isEdit) {
      if (!form.role) return;
      setLoading(true);
      const { error } = await updateTenant(props.tenant.id, {
        tenant_name: form.name,
        phone: form.phone,
        tenant_type: form.role as TenantType
      });
      setLoading(false);
      if (error) return;
      props.onSuccess?.();
      handleClose(false);
      return;
    }

    if (!pendingTenants.length) return;
    setLoading(true);
    const { error } = await bulkCreateTenants({
      tenants: pendingTenants,
      propertyId: (props as CreateProps).propertyId || undefined,
      unitId: (props as CreateProps).unitId || undefined
    });
    setLoading(false);
    if (error) return;
    props.onSuccess?.();
    handleClose(false);
  };

  const existingTenants = !isEdit ? (props as CreateProps).tenants : [];

  return (
    <Modal open={open} onOpenChange={handleClose} className="w-[836px]">
      {view === "list" ? (
        <div className="p-6 flex flex-col gap-5">
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

          <div className="flex flex-wrap gap-6">
            {existingTenants.map((t: Tenant, i: number) => {
              const badge = roleBadge[t.tenant_type];
              return (
                <div
                  key={t.id}
                  className="flex-1 min-w-[280px] p-4 bg-brand-base-white rounded-xl outline outline-1 outline-brand-Text-100 flex flex-col gap-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-brand-Text-950-d text-base font-semibold leading-5">
                      Tenant {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium leading-4",
                        badge.bg,
                        badge.text
                      )}
                    >
                      {roleLabel[t.tenant_type]}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <InfoField
                      icon={<User className="size-4 text-brand-Text-800" />}
                      label="Tenant Name"
                      value={t.tenant_name}
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
            {pendingTenants.map((t: BulkCreateTenantPayload, i: number) => {
              const badge = roleBadge[t.tenant_type];
              return (
                <div
                  key={`pending-${i}`}
                  className="flex-1 min-w-[280px] p-4 bg-brand-base-white rounded-xl outline outline-1 outline-brand-primary-red-200 flex flex-col gap-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-brand-Text-950-d text-base font-semibold leading-5">
                      Tenant{" "}
                      {String(existingTenants.length + i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium leading-4",
                        badge.bg,
                        badge.text
                      )}
                    >
                      {roleLabel[t.tenant_type]}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <InfoField
                      icon={<User className="size-4 text-brand-Text-800" />}
                      label="Tenant Name"
                      value={t.tenant_name}
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
          <div className="flex items-center gap-6 justify-end w-full">
            <Button
              variant="outline-transparent"
              size="lg"
              onClick={() => handleClose(false)}
            >
              Cancel
            </Button>
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={loading || !pendingTenants.length}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-6 flex flex-col gap-5">
          <Dialog.Title asChild>
            <div className="flex flex-col gap-2">
              {!isEdit && (
                <button
                  onClick={() => setView("list")}
                  className="flex items-center gap-1 text-brand-Text-500 hover:text-brand-Text-800 transition-colors w-fit"
                >
                  <ChevronLeft className="size-4" />
                  <span className="text-sm leading-5">Back</span>
                </button>
              )}
              <span className="text-brand-Text-950-d text-2xl font-bold leading-8">
                {isEdit ? "Edit Tenant" : "Add New Tenant"}
              </span>
            </div>
          </Dialog.Title>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <TextInput
              label="Email"
              placeholder="Enter email address"
              value={form.email}
              setValue={(v) => patch({ email: v })}
              type="email"
              disabled={isEdit}
            />
            <Select
              label="Tenant Type"
              placeholder="Select tenant type"
              value={form.role}
              onValueChange={(v) => patch({ role: v as TenantType })}
              options={[
                {
                  label: "Head of Household",
                  value: TenantType.HeadOfHousehold
                },
                { label: "Family Member", value: TenantType.FamilyMember }
              ]}
            />
            <TextInput
              label="Tenant Name"
              placeholder="Enter tenant name"
              value={form.name}
              setValue={(v) => patch({ name: v })}
            />
            <PhoneInput
              label="Phone Number"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={(p) => patch({ phone: p })}
              defaultCountry="us"
            />
          </div>

          <hr className="border-brand-Text-100" />
          <div className="flex items-center justify-end w-full gap-6">
            <Button
              variant="outline-transparent"
              size="lg"
              onClick={() => handleClose(false)}
            >
              Cancel
            </Button>
            <Button
              size="lg"
              onClick={isEdit ? handleSubmit : handleInviteAndAssign}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : isEdit
                  ? "Save Changes"
                  : "Invite & Assign"}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AddTenantModal;
