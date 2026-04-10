import SignLogo from "@/../public/assets/auth/forgot-password.png";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { TypographyStyles } from "@/styles/common-typography";
import { ReactDispatch } from "@/types/common";
import Image from "next/image";
import { ForgotPasswordForm } from "../types/componentsTypes";

interface Props {
  setView: ReactDispatch<ForgotPasswordForm>;
}

const ForgotPassword = ({ setView }: Props) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex-col-4 items-center text-center">
        <Image src={SignLogo} alt="" height={104} width={104} />
        <h1 className={TypographyStyles.title}>Forgot Password?</h1>
        <p className={TypographyStyles.subTitle}>
          No worries! Enter your email address and we&apos;ll send you an otp to
          reset your password
        </p>
      </div>
      <TextInput label="Email" placeholder="Enter your email" />
      <div className="flex-col-3 items-center">
        <Button size={"full"} onClick={() => setView("otp-verification")}>
          Send OTP
        </Button>
        <Button variant={"link"}>Go Back</Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
