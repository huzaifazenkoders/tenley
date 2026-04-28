"use client";
import { Button } from "@/components/ui/button";
import { Modal, ModalClose } from "@/components/ui/modal";
import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { cn } from "@/lib/utils";
import { Dialog } from "radix-ui";
import { useEffect, useState } from "react";
import { Loader2, Users } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { inviteManager } from "../services/staffService";
import {
  getRoles,
  getRoleDetails,
  type Role,
  type RoleDetails
} from "@/features/staff-and-roles/services/role.service";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyId?: string | null;
  onSuccess?: () => void;
};


const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .isValidEmail("Enter a valid email address")
    .required("Email is required"),
  full_name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  designation: Yup.string().trim(),
  role_id: Yup.string()
});

const Toggle = ({ checked }: { checked: boolean }) => (
  <div
    role="switch"
    aria-checked={checked}
    className={cn(
      "w-9 h-5 p-0.5 rounded-xl flex items-center cursor-not-allowed opacity-70",
      checked ? "bg-brand-primary-red-600-d justify-end" : "bg-Text-200 justify-start"
    )}
  >
    <div className="size-4 bg-white rounded-full shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)]" />
  </div>
);

const InviteStaffModal = ({ open, onOpenChange, propertyId, onSuccess }: Props) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [roleDetails, setRoleDetails] = useState<RoleDetails | null>(null);
  const [roleDetailsLoading, setRoleDetailsLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    getRoles().then(({ data }) => {
      if (data) setRoles(data);
    });
  }, [open]);

  const fetchRoleDetails = async (roleId: string) => {
    setRoleDetailsLoading(true);
    const { data } = await getRoleDetails(roleId);
    setRoleDetails(data ?? null);
    setRoleDetailsLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      full_name: "",
      designation: "",
      role_id: ""
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const { error } = await inviteManager({
        email: values.email.trim().toLowerCase(),
        full_name: values.full_name.trim(),
        designation: values.designation.trim() || null,
        role_id: values.role_id || null,
        property_id: propertyId ?? null
      });
      setSubmitting(false);
      if (error) return;
      resetForm();
      setRoleDetails(null);
      onSuccess?.();
      onOpenChange(false);
    }
  });

  const permissions = roleDetails?.permissions ?? [];
  const enabledCount = permissions.filter((p) => p.enabled).length;

  const handleClose = (v: boolean) => {
    if (!v) {
      formik.resetForm();
      setRoleDetails(null);
    }
    onOpenChange(v);
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleClose}
      className="w-209 p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto custom-scrollbar"
    >
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-brand-primary-red-50 rounded-full">
              <Users className="size-6 text-brand-primary-red-600-d" />
            </div>
            <Dialog.Title className="text-brand-Text-950-d text-2xl font-bold leading-8">
              Invite Staff Member
            </Dialog.Title>
          </div>
          <ModalClose />
        </div>
        <Dialog.Description className="text-brand-Text-500 text-sm font-normal leading-5">
          Enter the employee&apos;s email address and assign their role.
          They&apos;ll receive an email invitation to join and manage assigned
          properties.
        </Dialog.Description>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="p-4 rounded-2xl flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="Email"
            id="email"
            {...formik.getFieldProps("email")}
            placeholder="alexander@example.com"
            type="email"
            containerClassName="flex-1"
            error={formik.touched.email ? formik.errors.email : undefined}
          />
          <TextInput
            label="Name"
            id="full_name"
            {...formik.getFieldProps("full_name")}
            placeholder="Alexander McGurk"
            containerClassName="flex-1"
            error={formik.touched.full_name ? formik.errors.full_name : undefined}
          />
          <TextInput
            label="Designation"
            id="designation"
            {...formik.getFieldProps("designation")}
            placeholder="Jr. Maintenance Supervisor"
            containerClassName="flex-1"
            error={formik.touched.designation ? formik.errors.designation : undefined}
          />
          <Select
            label="Role"
            value={formik.values.role_id}
            onValueChange={(v) => {
              formik.setFieldValue("role_id", v);
              fetchRoleDetails(v);
            }}
            placeholder="Select role"
            options={roles.map((r) => ({ label: r.name, value: r.id }))}
            containerClassName="flex-1"
          />
        </div>

        {/* Permissions — visible when role is selected */}
        {formik.values.role_id && (
          <div className="p-4 bg-brand-Text-50 rounded-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-brand-Text-950-d text-xl font-semibold leading-6">
                  Permissions
                </span>
                <span className="text-brand-Text-600 text-xs font-normal leading-4">
                  Access controls defined by the selected role
                </span>
              </div>
              {!roleDetailsLoading && permissions.length > 0 && (
                <span className="px-3 py-1.5 bg-brand-primary-red-50 rounded-full outline-1 -outline-offset-1 outline-brand-primary-red-200 text-brand-primary-red-600-d text-xs font-medium leading-4">
                  {enabledCount}/{permissions.length} Permissions
                </span>
              )}
            </div>

            {roleDetailsLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="size-5 animate-spin text-brand-Text-400" />
              </div>
            ) : (
              <div className="flex flex-col">
                {permissions.map((p, i) => (
                  <div
                    key={p.key}
                    className={cn(
                      "px-4 py-2 bg-brand-Text-50 flex items-center justify-between",
                      i < permissions.length - 1 && "border-b border-brand-Text-100"
                    )}
                  >
                    <span className="text-brand-Text-800 text-sm font-medium leading-5">
                      {p.module}
                    </span>
                    <Toggle checked={p.enabled} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <hr className="border-brand-Text-100" />
        <div className="flex justify-end items-center gap-6">
          <Button
            type="button"
            variant="outline-transparent"
            size="lg"
            onClick={() => handleClose(false)}
            disabled={formik.isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" size="lg" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Send Invite"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default InviteStaffModal;
