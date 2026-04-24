"use client";

import SignLogo from "@/../public/assets/auth/set-password.png";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import { TypographyStyles } from "@/styles/common-typography";
import { ReactDispatch } from "@/types/common";
import Image from "next/image";
import { ForgotPasswordForm } from "../types/componentsTypes";
import { useFormik } from "formik";
import * as Yup from "yup";
import { resetPassword } from "../services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  setView: ReactDispatch<ForgotPasswordForm>;
  email: string;
  otp: string;
}

const validationSchema = Yup.object({
  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .required("Password is required"),
  confirm_password: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

const SetPasswordForm = ({ setView, email, otp }: Props) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { password: "", confirm_password: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const { error } = await resetPassword({
        email,
        otp,
        new_password: values.password.trim(),
      });
      setSubmitting(false);
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Password reset successfully");
      router.replace("/auth/sign-in");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-7">
      <div className="flex-col-4 items-center text-center">
        <Image src={SignLogo} alt="" height={104} width={104} />
        <h1 className={TypographyStyles.title}>Set New Password</h1>
        <p className={TypographyStyles.subTitle}>
          Create a new password for your account
        </p>
      </div>
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        id="password"
        {...formik.getFieldProps("password")}
        error={formik.touched.password ? formik.errors.password : undefined}
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Re-enter password"
        id="confirm_password"
        {...formik.getFieldProps("confirm_password")}
        error={
          formik.touched.confirm_password
            ? formik.errors.confirm_password
            : undefined
        }
      />
      <div className="flex-col-3 items-center">
        <Button type="submit" size="full" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Resetting..." : "Reset Password"}
        </Button>
        <Button
          type="button"
          variant="link"
          onClick={() => setView("otp-verification")}
        >
          Go Back
        </Button>
      </div>
    </form>
  );
};

export default SetPasswordForm;
