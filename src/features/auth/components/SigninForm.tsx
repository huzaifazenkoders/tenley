"use client";

import SignLogo from "@/../public/assets/auth/SignLogo.png";
import Image from "next/image";
import { TypographyStyles } from "@/styles/common-typography";
import TextInput from "@/components/ui/text-input";
import PasswordInput from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "../services";
import { toast } from "sonner";

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .lowercase()
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters")
    .required("Password is required"),
});

const SigninForm = ({ onForgotPassword }: { onForgotPassword: () => void }) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const { error } = await signIn({
        email: values.email.trim().toLowerCase(),
        password: values.password.trim(),
      });
      setSubmitting(false);
      if (error) {
        toast.error(error);
        return;
      }
      router.replace("/");
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
        <Button type="button" variant="link" onClick={onForgotPassword}>
          Forgot password?
        </Button>
      </div>
      <div className="flex-col-3 items-center">
        <Button
          type="submit"
          size="full"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </Button>
        <p>
          Don&apos;t have an account?{" "}
          <span>
            <Button
              type="button"
              variant="link"
              className="px-0"
              onClick={() => router.push("/auth/sign-up")}
            >
              Signup
            </Button>
          </span>
        </p>
      </div>
    </form>
  );
};

export default SigninForm;
