import React from "react";
import SignLogo from "@/../public/assets/auth/SignLogo.png";
import Image from "next/image";
import { TypographyStyles } from "@/styes/common-typography";
import TextInput from "@/components/ui/text-input";
import PasswordInput from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";

const SigninForm = () => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex-col-4 items-center text-center">
        <Image src={SignLogo} alt="" height={104} width={104} />
        <h1 className={TypographyStyles.title}>Welcome Back to Tenly</h1>
        <p className={TypographyStyles.subTitle}>
          Secure access to your company’s emergency response and property
          operations.
        </p>
      </div>
      <div className="flex-col-4 items-end">
        <TextInput label="Email" placeholder="Enter your email" />
        <PasswordInput label="Password" placeholder="Enter your password" />
        <Button variant={"link"}>Forgot password?</Button>
      </div>
      <div className="flex-col-3 items-center">
        <Button size={"full"}>Login</Button>
        <p>
          Don’t have an account?{" "}
          <span>
            <Button variant={"link"} className="px-0">
              Signup
            </Button>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SigninForm;
