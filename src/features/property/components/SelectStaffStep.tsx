"use client";
import { Button } from "@/components/ui/button";
import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { cn } from "@/lib/utils";
import {
  getRoleDetails,
  getRoles,
  type Role,
  type RoleDetails
} from "@/features/staff-and-roles/services/role.service";
import { useFormik } from "formik";
import { CheckCircle2, ChevronLeft, Loader2, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { inviteManager } from "../services/staffService";
import StaffEmailSearch from "./StaffEmailSearch";

type Props = {
  propertyId: string | null;
  onBack?: () => void;
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
  designation: Yup.string().trim().required("Designation is required"),
  role_id: Yup.string().required("Role is required")
});

const Toggle = ({ checked }: { checked: boolean }) => (
  <div
    role="switch"
    aria-checked={checked}
    className={cn(
      "w-9 h-5 p-0.5 rounded-xl flex items-center cursor-not-allowed opacity-70",
      checked
        ? "bg-brand-primary-red-600-d justify-end"
        : "bg-Text-200 justify-start"
    )}
  >
    <div className="size-4 bg-white rounded-full shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)]" />
  </div>
);

const SelectStaffStep = ({ propertyId, onBack }: Props) => {
  const [invited, setInvited] = useState(false);
  const [invitedEmail, setInvitedEmail] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [roleDetails, setRoleDetails] = useState<RoleDetails | null>(null);
  const [roleDetailsLoading, setRoleDetailsLoading] = useState(false);

  useEffect(() => {
    getRoles().then(({ data }) => {
      if (data) setRoles(data);
    });
  }, []);

  const fetchRoleDetails = async (roleId: string) => {
    setRoleDetailsLoading(true);
    const { data } = await getRoleDetails(roleId);
    setRoleDetails(data ?? null);
    setRoleDetailsLoading(false);
  };

  const formik = useFormik({
    initialValues: { email: "", full_name: "", designation: "", role_id: "" },
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
      setInvitedEmail(values.email.trim().toLowerCase());
      resetForm();
      setRoleDetails(null);
      setInvited(true);
    }
  });

  const permissions = roleDetails?.permissions ?? [];
  const enabledCount = permissions.filter((p) => p.enabled).length;

  const handleInviteAnother = () => {
    setInvited(false);
    setInvitedEmail("");
  };

  return (
    <div className="p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6 min-w-sm md:min-w-xl">
      <div className="flex items-center gap-2">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="p-1 rounded-lg hover:bg-brand-Text-100 transition-colors text-brand-Text-600 hover:text-brand-Text-950-d"
          >
            <ChevronLeft className="size-5" />
          </button>
        )}
        <div className="p-2 bg-brand-primary-red-50 rounded-full">
          <UserPlus className="size-5 text-brand-primary-red-600-d" />
        </div>
        <h2 className="text-brand-Text-800 text-xl font-bold leading-6">
          Invite Staff Member
        </h2>
      </div>

      {invited ? (
        <div className="flex flex-col items-center gap-4 py-10">
          <CheckCircle2 className="size-14 text-green-500" />
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-brand-Text-950-d text-xl font-bold leading-6">
              Invitation Sent!
            </p>
            <p className="text-brand-Text-500 text-sm font-normal leading-5">
              An invite has been sent to{" "}
              <span className="font-medium text-brand-Text-700">{invitedEmail}</span>.
              They will receive an email to join your workspace.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleInviteAnother}>
            Invite Another
          </Button>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <StaffEmailSearch
              value={formik.values.email}
              onChange={(v) => formik.setFieldValue("email", v)}
              onBlur={() => formik.setFieldTouched("email", true)}
              onSelect={(item) => {
                formik.setFieldValue("email", item.email);
                formik.setFieldValue("full_name", item.full_name);
              }}
              error={formik.touched.email ? formik.errors.email : undefined}
              containerClassName="flex-1"
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
              error={formik.touched.role_id ? formik.errors.role_id : undefined}
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

          <Button type="submit" size="lg" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <UserPlus className="size-4" /> Send Invite
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
};

export default SelectStaffStep;
