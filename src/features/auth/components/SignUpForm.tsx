import SignLogo from "@/../public/assets/auth/SignLogo.png";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import TextInput from "@/components/ui/text-input";
import { TypographyStyles } from "@/styles/common-typography";
import { ReactDispatch } from "@/types/common";
import Image from "next/image";
import { SignUpForm } from "../types/componentsTypes";

interface Props {
  setView: ReactDispatch<SignUpForm>;
}

const SignupForm = ({ setView }: Props) => {
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
        <TextInput label="Full Name" placeholder="Enter your full name" />
        <TextInput label="Email" placeholder="Enter your email" />
        <PasswordInput label="Password" placeholder="Enter your password" />
        <PasswordInput
          label="Confirm Password"
          placeholder="Re-enter your password"
        />
      </div>
      <div className="flex-col-3 items-center">
        <Button size={"full"} onClick={() => setView("otp-verification")}>
          Sign up
        </Button>
        <p>
          Already have an account?{" "}
          <span>
            <Button variant={"link"} className="px-0">
              Sign up
            </Button>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
