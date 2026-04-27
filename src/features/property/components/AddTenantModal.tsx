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
import { useFormik } from "formik";
import * as Yup from "yup";
import { bulkCreateTenants, updateTenant } from "../services";
import type { BulkCreateTenantPayload, Tenant } from "../types";
import { TenantType } from "../types/enums";

const roleBadge: Record<TenantType, { bg: string; text: string }> = {
  [TenantType.HeadOfHousehold]: { bg: "bg-indigo-500/10", text: "text-indigo-500" },
  [TenantType.FamilyMember]: { bg: "bg-red-500/10", text: "text-red-500" },
};

const roleLabel: Record<TenantType, string> = {
  [TenantType.HeadOfHousehold]: "Head of Household",
  [TenantType.FamilyMember]: "Family Member",
};

const InfoField = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-2">
    <div className="p-1.5 bg-brand-Text-50 rounded-full flex items-center justify-center">{icon}</div>
    <div className="flex flex-col">
      <span className="text-brand-Text-500 text-xs font-normal leading-4">{label}</span>
      <span className="text-brand-Text-800 text-xs font-medium leading-4">{value}</span>
    </div>
  </div>
);

const validationSchema = Yup.object({
  email: Yup.string().trim().isValidEmail("Invalid email address").required("Email is required"),
  tenant_type: Yup.string().oneOf(Object.values(TenantType), "Tenant type is required").required("Tenant type is required"),
  tenant_name: Yup.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be at most 100 characters").required("Tenant name is required"),
  phone: Yup.string().trim().isValidPhoneNumber("Enter a valid phone number").required("Phone number is required"),
});

const editValidationSchema = Yup.object({
  tenant_type: Yup.string().oneOf(Object.values(TenantType), "Tenant type is required").required("Tenant type is required"),
  tenant_name: Yup.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be at most 100 characters").required("Tenant name is required"),
  phone: Yup.string().trim().isValidPhoneNumber("Enter a valid phone number").required("Phone number is required"),
});

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

const AddTenantModal = (props: Props) => {
  const { open, onOpenChange } = props;
  const isEdit = props.mode === "edit";

  const [view, setView] = useState<"list" | "form">(isEdit ? "form" : "list");
  const [pendingTenants, setPendingTenants] = useState<BulkCreateTenantPayload[]>([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: isEdit ? props.tenant.email : "",
      tenant_type: isEdit ? props.tenant.tenant_type : ("" as TenantType | ""),
      tenant_name: isEdit ? props.tenant.tenant_name : "",
      phone: isEdit ? props.tenant.phone : "",
    },
    validationSchema: isEdit ? editValidationSchema : validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (isEdit) {
        setSubmitting(true);
        const { error } = await updateTenant(props.tenant.id, {
          tenant_name: values.tenant_name.trim(),
          phone: values.phone.trim(),
          tenant_type: values.tenant_type as TenantType,
        });
        setSubmitting(false);
        if (error) return;
        props.onSuccess?.();
        handleClose(false);
        return;
      }

      // create mode — add to pending list and go back to list view
      setPendingTenants((prev) => [
        ...prev,
        {
          tenant_name: values.tenant_name.trim(),
          email: values.email.trim().toLowerCase(),
          phone: values.phone.trim(),
          tenant_type: values.tenant_type as TenantType,
        },
      ]);
      resetForm();
      setView("list");
    },
  });

  const handleClose = (o: boolean) => {
    if (!o) {
      formik.resetForm();
      setPendingTenants([]);
      setView(isEdit ? "form" : "list");
    }
    onOpenChange(o);
  };

  const handleSaveAll = async () => {
    if (!pendingTenants.length) return;
    setSubmitLoading(true);
    const { error } = await bulkCreateTenants({
      tenants: pendingTenants,
      propertyId: (props as CreateProps).propertyId,
      unitId: (props as CreateProps).unitId,
    });
    setSubmitLoading(false);
    if (error) return;
    props.onSuccess?.();
    handleClose(false);
  };

  const existingTenants = !isEdit ? (props as CreateProps).tenants : [];

  const TenantCard = ({ t, index, isPending }: { t: Tenant | BulkCreateTenantPayload; index: number; isPending?: boolean }) => {
    const tenantType = "tenant_type" in t ? t.tenant_type : (t as Tenant).tenant_type;
    const tenantName = "tenant_name" in t ? t.tenant_name : "";
    const badge = roleBadge[tenantType];
    return (
      <div className={cn("flex-1 min-w-[280px] p-4 bg-brand-base-white rounded-xl outline outline-1 flex flex-col gap-5", isPending ? "outline-brand-primary-red-200" : "outline-brand-Text-100")}>
        <div className="flex items-center justify-between">
          <span className="text-brand-Text-950-d text-base font-semibold leading-5">
            Tenant {String(index + 1).padStart(2, "0")}
          </span>
          <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium leading-4", badge.bg, badge.text)}>
            {roleLabel[tenantType]}
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <InfoField icon={<User className="size-4 text-brand-Text-800" />} label="Tenant Name" value={tenantName} />
          <div className="flex items-center justify-between">
            <InfoField icon={<Mail className="size-4 text-brand-Text-800" />} label="Email" value={t.email} />
            <div className="w-36">
              <InfoField icon={<Phone className="size-4 text-brand-Text-800" />} label="Phone Number" value={t.phone} />
            </div>
          </div>
        </div>
      </div>
    );
  };

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
                <span className="text-brand-Text-950-d text-2xl font-bold leading-8">Add New Tenant</span>
              </div>
              <Dialog.Description asChild>
                <p className="text-brand-Text-500 text-sm font-normal leading-5">
                  Start adding tenants to track move-ins, lease details, and unit occupancy across your properties.
                </p>
              </Dialog.Description>
            </div>
          </Dialog.Title>

          <div className="flex flex-wrap gap-6">
            {existingTenants.map((t, i) => (
              <TenantCard key={t.id} t={t} index={i} />
            ))}
            {pendingTenants.map((t, i) => (
              <TenantCard key={`pending-${i}`} t={t as unknown as Tenant} index={existingTenants.length + i} isPending />
            ))}
            <button
              onClick={() => setView("form")}
              className="flex-1 min-w-[280px] p-4 bg-brand-primary-red-50 rounded-xl outline outline-1 outline-brand-primary-red-400 flex flex-col items-center justify-center gap-3 hover:opacity-90 transition-opacity"
            >
              <div className="p-2 bg-brand-primary-red-200 rounded-full">
                <UserPlus className="size-6 text-brand-primary-red-600-d" />
              </div>
              <span className="text-brand-Text-950-d text-sm font-medium leading-5">Add New Tenant</span>
            </button>
          </div>

          <hr className="border-brand-Text-100" />
          <div className="flex items-center gap-6 justify-end w-full">
            <Button variant="outline-transparent" size="lg" onClick={() => handleClose(false)}>Cancel</Button>
            <Button size="lg" onClick={handleSaveAll} disabled={submitLoading || !pendingTenants.length}>
              {submitLoading ? "Saving..." : "Save Tenants"}
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="p-6 flex flex-col gap-5">
            <Dialog.Title asChild>
              <div className="flex flex-col gap-2">
                {!isEdit && (
                  <button
                    type="button"
                    onClick={() => { formik.resetForm(); setView("list"); }}
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
                type="email"
                disabled={isEdit}
                {...formik.getFieldProps("email")}
                error={formik.touched.email ? formik.errors.email : undefined}
              />
              <Select
                label="Tenant Type"
                placeholder="Select tenant type"
                value={formik.values.tenant_type}
                onValueChange={(v) => formik.setFieldValue("tenant_type", v)}
                options={[
                  { label: "Head of Household", value: TenantType.HeadOfHousehold },
                  { label: "Family Member", value: TenantType.FamilyMember },
                ]}
                error={formik.touched.tenant_type ? formik.errors.tenant_type : undefined}
              />
              <TextInput
                label="Tenant Name"
                placeholder="Enter tenant name"
                {...formik.getFieldProps("tenant_name")}
                error={formik.touched.tenant_name ? formik.errors.tenant_name : undefined}
              />
              <PhoneInput
                label="Phone Number"
                placeholder="Enter phone number"
                value={formik.values.phone}
                onChange={(v) => formik.setFieldValue("phone", v)}
                defaultCountry="us"
                error={formik.touched.phone ? formik.errors.phone : undefined}
              />
            </div>

            <hr className="border-brand-Text-100" />
            <div className="flex items-center justify-end w-full gap-6">
              <Button type="button" variant="outline-transparent" size="lg" onClick={() => handleClose(false)}>
                Cancel
              </Button>
              <Button type="submit" size="lg" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Saving..." : isEdit ? "Save Changes" : "Invite & Assign"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default AddTenantModal;
