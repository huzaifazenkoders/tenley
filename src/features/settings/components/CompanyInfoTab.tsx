"use client";
import TextInput from "@/components/ui/text-input";
import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  upsertCompanyProfile,
  type UpsertCompanyProfilePayload
} from "@/features/onboarding/services/onboardingService";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/query-keys";
import type { CompanyInfo, MeResponse } from "../services/settingsService";
import PhoneInput from "@/components/ui/phone-input";

const validationSchema = Yup.object({
  company_name: Yup.string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be at most 100 characters")
    .required("Company name is required"),
  company_email: Yup.string()
    .trim()
    .isValidEmail("Invalid email address")
    .required("Company email is required"),
  website_url: Yup.string()
    .trim()
    .isValidLink("Must be a valid URL")
    .max(255, "URL must be at most 255 characters"),
  registration_number: Yup.string()
    .trim()
    .min(3, "Registration number must be at least 3 characters")
    .max(50, "Registration number must be at most 50 characters")
    .required("Registration number is required"),
  phone_number: Yup.string()
    .trim()
    .isValidPhoneNumber("Enter a valid phone number")
    .required("Phone number is required"),
  address: Yup.string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(255, "Address must be at most 255 characters")
    .required("Address is required")
});

const getCompany = (me: MeResponse | null): CompanyInfo | null =>
  me?.company ?? me?.company_profile ?? me?.company_information ?? null;

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-brand-Text-100 ${className ?? ""}`} />
);

const CompanyInfoTabSkeleton = () => (
  <div className="w-full p-4 bg-white rounded-xl shadow-[0px_2px_8px_0px_rgba(32,33,36,0.04)] outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6">
    {/* Header */}
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-4 w-56" />
      </div>
      <Skeleton className="h-9 w-9 rounded-lg" />
    </div>
    {/* Fields */}
    <div className="flex flex-col gap-6">
      {/* Company Name */}
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full" />
      </div>
      {/* Email + Website */}
      <div className="flex gap-6">
        <div className="flex-1 flex flex-col gap-1.5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      {/* Registration + Phone */}
      <div className="flex gap-6">
        <div className="w-1/2 flex flex-col gap-1.5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="w-1/2 flex flex-col gap-1.5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      {/* Address */}
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  </div>
);

const CompanyInfoTab = ({
  me,
  isLoading
}: {
  me: MeResponse | null;
  isLoading?: boolean;
}) => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const company = getCompany(me);

  if (isLoading) return <CompanyInfoTabSkeleton />;

  const formik = useFormik({
    initialValues: {
      company_name: company?.company_name ?? "",
      company_email: company?.company_email ?? "",
      website_url: company?.website_url ?? "",
      registration_number: company?.registration_number ?? "",
      phone_number: company?.phone_number ?? "",
      address: company?.address ?? "",
      logo: company?.logo ?? ""
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const payload: UpsertCompanyProfilePayload = {
        company_name: values.company_name.trim(),
        company_email: values.company_email.trim().toLowerCase(),
        website_url: values.website_url.trim() || undefined,
        registration_number: values.registration_number.trim(),
        phone_number: values.phone_number.trim(),
        address: values.address.trim(),
        logo: values.logo || undefined
      };

      const { error } = await upsertCompanyProfile(payload);
      setSubmitting(false);
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Company information updated successfully");
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      setEditing(false);
    }
  });

  const handleCancel = () => {
    formik.resetForm();
    setEditing(false);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full p-4 bg-white rounded-xl shadow-[0px_2px_8px_0px_rgba(32,33,36,0.04)] outline outline-1 outline-offset-[-1px] outline-brand-Text-100 flex flex-col gap-6"
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <span className="text-brand-Text-950-d text-base font-medium leading-5">
            Company Information
          </span>
          <span className="text-brand-Text-400 text-sm font-normal leading-5">
            Update your company information
          </span>
        </div>
        {editing ? (
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline-transparent"
              onClick={handleCancel}
              disabled={formik.isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            size={"icon"}
            variant="outline-transparent"
            onClick={() => setEditing((p) => !p)}
          >
            <Pencil className="size-5 text-brand-Text-700" />
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <TextInput
          label="Company Name"
          id="company_name"
          value={formik.values.company_name}
          setValue={(v) => formik.setFieldValue("company_name", v)}
          onBlur={formik.handleBlur}
          disabled={!editing || isLoading}
          error={
            formik.touched.company_name ? formik.errors.company_name : undefined
          }
        />
        <div className="flex gap-6">
          <TextInput
            label="Company Email"
            id="company_email"
            value={formik.values.company_email}
            setValue={(v) => formik.setFieldValue("company_email", v)}
            onBlur={formik.handleBlur}
            disabled={!editing || isLoading}
            containerClassName="flex-1"
            error={
              formik.touched.company_email
                ? formik.errors.company_email
                : undefined
            }
          />
          <TextInput
            label="Website URL (Optional)"
            id="website_url"
            value={formik.values.website_url}
            setValue={(v) => formik.setFieldValue("website_url", v)}
            onBlur={formik.handleBlur}
            disabled={!editing || isLoading}
            containerClassName="flex-1"
            error={
              formik.touched.website_url ? formik.errors.website_url : undefined
            }
          />
        </div>
        <div className="flex gap-6">
          <div className="w-1/2">
            <TextInput
              label="Registration No."
              id="registration_number"
              value={formik.values.registration_number}
              setValue={(v) => formik.setFieldValue("registration_number", v)}
              onBlur={formik.handleBlur}
              disabled={!editing || isLoading}
              containerClassName="flex-1"
              error={
                formik.touched.registration_number
                  ? formik.errors.registration_number
                  : undefined
              }
            />
          </div>
          <div className="w-1/2">
            <PhoneInput
              label="Phone Number"
              disabled={!editing || isLoading}
              id="phone_number"
              value={formik.values.phone_number}
              onChange={(val) => {
                formik.setFieldValue("phone_number", val);
                formik.setFieldTouched("phone_number", true, false);
              }}
              error={
                formik.touched.phone_number
                  ? formik.errors.phone_number
                  : undefined
              }
            />
          </div>
        </div>
        <TextInput
          label="Address"
          id="address"
          value={formik.values.address}
          setValue={(v) => formik.setFieldValue("address", v)}
          onBlur={formik.handleBlur}
          disabled={!editing || isLoading}
          error={formik.touched.address ? formik.errors.address : undefined}
        />
      </div>
    </form>
  );
};

export default CompanyInfoTab;
