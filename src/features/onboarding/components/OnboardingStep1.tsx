"use client";

import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import PhoneInput from "@/components/ui/phone-input";
import { TypographyStyles } from "@/styles/common-typography";
import { ChevronRight } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { upsertCompanyProfile } from "../services/onboardingService";
import { toast } from "sonner";
import LogoUploader from "./LogoUploader";
import { getMe } from "@/features/settings/services/settingsService";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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

type Step1InitialValues = {
  logo_url: string;
  company_name: string;
  company_email: string;
  website_url: string;
  registration_number: string;
  phone_number: string;
  address: string;
};

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse rounded-lg bg-brand-Text-100", className)} />
);

const Step1Skeleton = () => (
  <div className="flex-col-10">
    <div className="flex-col-2">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-5 w-80" />
    </div>
    <div className="grid grid-cols-2 gap-5">
      {/* Logo uploader placeholder */}
      <div className="col-span-2">
        <Skeleton className="h-24 w-full" />
      </div>
      {/* Company name */}
      <div className="col-span-2 flex flex-col gap-1.5">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full" />
      </div>
      {/* Company email */}
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full" />
      </div>
      {/* Website */}
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full" />
      </div>
      {/* Registration */}
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full" />
      </div>
      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full" />
      </div>
      {/* Address */}
      <div className="col-span-2 flex flex-col gap-1.5">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full" />
      </div>
      {/* Button */}
      <div className="col-span-2">
        <Skeleton className="h-11 w-full" />
      </div>
    </div>
  </div>
);

type Step1FormProps = {
  initialValues: Step1InitialValues;
  setStep: (step: number) => void;
};

const Step1Form = ({ initialValues, setStep }: Step1FormProps) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const { error } = await upsertCompanyProfile({
        logo: values.logo_url || undefined,
        company_name: values.company_name.trim(),
        company_email: values.company_email.trim().toLowerCase(),
        website_url: values.website_url?.trim() || undefined,
        registration_number: values.registration_number.trim(),
        phone_number: values.phone_number.trim(),
        address: values.address.trim()
      });
      setSubmitting(false);
      if (error) {
        toast.error(error);
        return;
      }
      setStep(2);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex-col-10">
      <div className="flex-col-2">
        <h2 className={TypographyStyles.title}>Tell us about your company</h2>
        <p className={TypographyStyles.subTitle}>
          This information will be used to set up your Tenley workspace.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-2">
          <LogoUploader
            value={formik.values.logo_url}
            onChange={(url) => formik.setFieldValue("logo_url", url)}
          />
        </div>
        <div className="col-span-2">
          <TextInput
            label="Company Name"
            id="company_name"
            placeholder="e.g. Acme Properties Ltd."
            {...formik.getFieldProps("company_name")}
            error={formik.touched.company_name ? formik.errors.company_name : undefined}
          />
        </div>
        <TextInput
          label="Company Email"
          id="company_email"
          placeholder="e.g. contact@acme.com"
          {...formik.getFieldProps("company_email")}
          error={formik.touched.company_email ? formik.errors.company_email : undefined}
        />
        <TextInput
          label="Website URL (Optional)"
          id="website_url"
          placeholder="e.g. https://www.acme.com"
          {...formik.getFieldProps("website_url")}
          error={formik.touched.website_url ? formik.errors.website_url : undefined}
        />
        <TextInput
          label="Registration No."
          id="registration_number"
          placeholder="e.g. RC-123456"
          {...formik.getFieldProps("registration_number")}
          error={formik.touched.registration_number ? formik.errors.registration_number : undefined}
        />
        <PhoneInput
          label="Phone Number"
          id="phone_number"
          value={formik.values.phone_number}
          onChange={(val) => {
            formik.setFieldValue("phone_number", val);
            formik.setFieldTouched("phone_number", true, false);
          }}
          error={formik.touched.phone_number ? formik.errors.phone_number : undefined}
        />
        <div className="col-span-2">
          <TextInput
            label="Address"
            id="address"
            placeholder="e.g. 123 Main Street, Lagos, Nigeria"
            {...formik.getFieldProps("address")}
            error={formik.touched.address ? formik.errors.address : undefined}
          />
        </div>
        <div className="col-span-2">
          <Button type="submit" size="full" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Saving..." : <>Continue <ChevronRight /></>}
          </Button>
        </div>
      </div>
    </form>
  );
};

const OnboardingStep1 = ({ setStep }: { setStep: (step: number) => void }) => {
  const [initialValues, setInitialValues] = useState<Step1InitialValues | null>(null);

  useEffect(() => {
    getMe().then(({ data }) => {
      const c = data?.company ?? data?.company_profile ?? null;
      setInitialValues({
        logo_url: c?.logo ?? "",
        company_name: c?.company_name ?? "",
        company_email: c?.company_email ?? "",
        website_url: c?.website_url ?? "",
        registration_number: c?.registration_number ?? "",
        phone_number: c?.phone_number ?? "",
        address: c?.address ?? ""
      });
    });
  }, []);

  if (!initialValues) return <Step1Skeleton />;

  return <Step1Form initialValues={initialValues} setStep={setStep} />;
};

export default OnboardingStep1;
