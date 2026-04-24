"use client";

import SignLogo from "@/../public/assets/auth/SignLogo.png";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import TextInput from "@/components/ui/text-input";
import { TypographyStyles } from "@/styles/common-typography";
import { ReactDispatch } from "@/types/common";
import Image from "next/image";
import { SignUpForm } from "../types/componentsTypes";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signUp } from "../services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  setView: ReactDispatch<SignUpForm>;
  setEmail: ReactDispatch<string>;
}

const validationSchema = Yup.object({
  full_name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters")
    .required("Full name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .lowercase()
    .required("Email is required"),
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

const SignupForm = ({ setView, setEmail }: Props) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { full_name: "", email: "", password: "", confirm_password: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const { error } = await signUp({
        full_name: values.full_name.trim(),
        email: values.email.trim().toLowerCase(),
        password: values.password.trim(),
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
        <h1 className={TypographyStyles.title}>Welcome Back to Tenly</h1>
        <p className={TypographyStyles.subTitle}>
          Secure access to your company&apos;s emergency response and property
          operations.
        </p>
      </div>
      <div className="flex-col-4 items-end">
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          id="full_name"
          {...formik.getFieldProps("full_name")}
          error={formik.touched.full_name ? formik.errors.full_name : undefined}
        />
        <TextInput
          label="Email"
          placeholder="Enter your email"
          id="email"
          {...formik.getFieldProps("email")}
          error={formik.touched.email ? formik.errors.email : undefined}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          id="password"
          {...formik.getFieldProps("password")}
          error={formik.touched.password ? formik.errors.password : undefined}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Re-enter your password"
          id="confirm_password"
          {...formik.getFieldProps("confirm_password")}
          error={
            formik.touched.confirm_password
              ? formik.errors.confirm_password
              : undefined
          }
        />
      </div>
      <div className="flex-col-3 items-center">
        <Button type="submit" size="full" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Signing up..." : "Sign up"}
        </Button>
        <p>
          Already have an account?{" "}
          <span>
            <Button
              type="button"
              variant="link"
              className="px-0"
              onClick={() => router.push("/auth/sign-in")}
            >
              Sign in
            </Button>
          </span>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
