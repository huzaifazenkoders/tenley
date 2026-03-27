import SignLogo from "@/../public/assets/auth/set-password.png";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import { TypographyStyles } from "@/styes/common-typography";
import { ReactDispatch } from "@/types/common";
import Image from "next/image";
import { ForgotPasswordForm } from "../types/componentsTypes";

interface Props {
  setView: ReactDispatch<ForgotPasswordForm>;
}

const SetPasswordForm = ({ setView }: Props) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex-col-4 items-center text-center">
        <Image src={SignLogo} alt="" height={104} width={104} />
        <h1 className={TypographyStyles.title}>Set New Password</h1>
        <p className={TypographyStyles.subTitle}>
          Create a new password for your account
        </p>
      </div>
      <PasswordInput label="Password" placeholder="Enter your password" />
      <PasswordInput label="Confirm Password" placeholder="Re-enter password" />
      <div className="flex-col-3 items-center">
        <Button size={"full"}>Reset Password</Button>
        <Button variant={"link"} onClick={() => setView("otp-verification")}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default SetPasswordForm;
