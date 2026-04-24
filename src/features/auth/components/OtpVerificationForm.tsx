"use client";

import Logo from "@/../public/assets/auth/otp-verification.png";
import { Button } from "@/components/ui/button";
import OtpInput from "@/components/ui/otp-input";
import { TypographyStyles } from "@/styles/common-typography";
import { ReactDispatch } from "@/types/common";
import Image from "next/image";
import { ForgotPasswordForm, SignUpForm } from "../types/componentsTypes";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signupComplete, verifyOtp } from "../services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PropsA {
  type: "forgot-password";
  email: string;
  setView: ReactDispatch<ForgotPasswordForm>;
  onOtpVerified: (otp: string) => void;
}
interface PropsB {
  type: "sign-up";
  email: string;
  setView: ReactDispatch<SignUpForm>;
}

const validationSchema = Yup.object({
  otp: Yup.string()
    .trim()
    .length(6, "OTP must be exactly 6 digits")
    .matches(/^\d+$/, "OTP must contain only digits")
    .required("OTP is required")
});

const OtpVerificationForm = (props: PropsA | PropsB) => {
  const { setView, type, email } = props;
  const router = useRouter();

  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const trimmedOtp = values.otp.trim();

      if (type === "sign-up") {
        const { error } = await signupComplete({ email, otp: trimmedOtp });
        setSubmitting(false);
        if (error) {
          toast.error(error);
          return;
        }
        router.replace("/onboarding");
      } else {
        const { error } = await verifyOtp({ email, otp: trimmedOtp });
        setSubmitting(false);
        if (error) {
          toast.error(error);
          return;
        }
        (props as PropsA).onOtpVerified(trimmedOtp);
        (setView as ReactDispatch<ForgotPasswordForm>)("set-password");
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-7">
      <div className="flex-col-4 items-center text-center">
        <Image src={Logo} alt="" height={104} width={104} />
        <h1 className={TypographyStyles.title}>
          {type === "forgot-password" ? "OTP Verification" : "Verify you email"}
        </h1>
        <p className={TypographyStyles.subTitle}>
          We&apos;ve sent a 6-digit code to <strong>{email}</strong>. Enter it
          below to verify your email and continue.
        </p>
      </div>
      <OtpInput
        value={formik.values.otp}
        setValue={(val) => formik.setFieldValue("otp", val)}
        error={formik.touched.otp ? formik.errors.otp : undefined}
      />
      <div className="flex-col-3 items-center">
        <Button type="submit" size="full" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Verifying..." : "Verify OTP"}
        </Button>
        <Button
          type="button"
          variant="link"
          onClick={() =>
            type === "forgot-password"
              ? (setView as ReactDispatch<ForgotPasswordForm>)(
                  "forgot-password"
                )
              : (setView as ReactDispatch<SignUpForm>)("sign-up")
          }
        >
          Go Back
        </Button>
      </div>
    </form>
  );
};

export default OtpVerificationForm;
