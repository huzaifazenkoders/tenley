"use client";

import SignLogo from "@/../public/assets/auth/forgot-password.png";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { TypographyStyles } from "@/styles/common-typography";
import { ReactDispatch } from "@/types/common";
import Image from "next/image";
import { ForgotPasswordForm } from "../types/componentsTypes";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgotPassword } from "../services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  setView: ReactDispatch<ForgotPasswordForm>;
  setEmail: ReactDispatch<string>;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .lowercase()
    .required("Email is required"),
});

const ForgotPassword = ({ setView, setEmail }: Props) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const { error } = await forgotPassword({
        email: values.email.trim().toLowerCase(),
      });
      setSubmitting(false);
      if (error) {
        toast.error(error);
        return;
      }
      setEmail(values.email.trim().toLowerCase());
      setView("otp-verification");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-7">
      <div className="flex-col-4 items-center text-center">
        <Image src={SignLogo} alt="" height={104} width={104} />
        <h1 className={TypographyStyles.title}>Forgot Password?</h1>
        <p className={TypographyStyles.subTitle}>
          No worries! Enter your email address and we&apos;ll send you an otp to
          reset your password
        </p>
      </div>
      <TextInput
        label="Email"
        placeholder="Enter your email"
        id="email"
        {...formik.getFieldProps("email")}
        error={formik.touched.email ? formik.errors.email : undefined}
      />
      <div className="flex-col-3 items-center">
        <Button type="submit" size="full" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Sending..." : "Send OTP"}
        </Button>
        <Button
          type="button"
          variant="link"
          onClick={() => router.push("/auth/sign-in")}
        >
          Go Back
        </Button>
      </div>
    </form>
  );
};

export default ForgotPassword;
