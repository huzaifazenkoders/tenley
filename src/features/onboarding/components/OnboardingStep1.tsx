"use client";

import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { TypographyStyles } from "@/styles/common-typography";
import { ChevronRight } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { upsertCompanyProfile } from "../services/onboardingService";
import { toast } from "sonner";
import LogoUploader from "./LogoUploader";

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
    .url("Must be a valid URL")
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
    .required("Address is required"),
});

const OnboardingStep1 = ({ setStep }: { setStep: (step: number) => void }) => {
  const formik = useFormik({
    initialValues: {
      logo_url: "",
      company_name: "",
      company_email: "",
      website_url: "",
      registration_number: "",
      phone_number: "",
      address: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const { error } = await upsertCompanyProfile({
        logo: values.logo_url || undefined,
        company_name: values.company_name.trim(),
        company_email: values.company_email.trim().toLowerCase(),
        website_url: values.website_url?.trim() || undefined,
        registration_number: values.registration_number.trim(),
        phone_number: values.phone_number.trim(),
        address: values.address.trim(),
      });
      setSubmitting(false);
      if (error) { toast.error(error); return; }
      setStep(2);
    },
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
            {...formik.getFieldProps("company_name")}
            error={formik.touched.company_name ? formik.errors.company_name : undefined}
          />
        </div>
        <TextInput
          label="Company Email"
          id="company_email"
          {...formik.getFieldProps("company_email")}
          error={formik.touched.company_email ? formik.errors.company_email : undefined}
        />
        <TextInput
          label="Website URL (Optional)"
          id="website_url"
          {...formik.getFieldProps("website_url")}
          error={formik.touched.website_url ? formik.errors.website_url : undefined}
        />
        <TextInput
          label="Registration No."
          id="registration_number"
          {...formik.getFieldProps("registration_number")}
          error={formik.touched.registration_number ? formik.errors.registration_number : undefined}
        />
        <TextInput
          label="Phone Number"
          id="phone_number"
          {...formik.getFieldProps("phone_number")}
          error={formik.touched.phone_number ? formik.errors.phone_number : undefined}
        />
        <div className="col-span-2">
          <TextInput
            label="Address"
            id="address"
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

export default OnboardingStep1;
