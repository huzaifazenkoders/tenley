import Logo from "@/../public/assets/auth/otp-verification.png";
import { Button } from "@/components/ui/button";
import OtpInput from "@/components/ui/otp-input.component";
import { TypographyStyles } from "@/styes/common-typography";
import { ReactDispatch } from "@/types/common";
import Image from "next/image";
import { ForgotPasswordForm, SignUpForm } from "../types/componentsTypes";

interface PropsA {
  type: "forgot-password";
  setView: ReactDispatch<ForgotPasswordForm>;
}
interface PropsB {
  type: "sign-up";
  setView: ReactDispatch<SignUpForm>;
}

const OtpVerificationForm = ({ setView, type }: PropsA | PropsB) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex-col-4 items-center text-center">
        <Image src={Logo} alt="" height={104} width={104} />
        <h1 className={TypographyStyles.title}>OTP Verification</h1>
        <p className={TypographyStyles.subTitle}>
          We’ve sent a 6-digit code to <strong>alex@example.com</strong>. Enter
          it below to verify your email and continue.
        </p>
      </div>
      <OtpInput />
      <div className="flex-col-3 items-center">
        <Button
          size={"full"}
          onClick={() =>
            type === "forgot-password"
              ? setView("set-password")
              : setView("otp-verification")
          }
        >
          Verify OTP{" "}
        </Button>
        <Button
          variant={"link"}
          onClick={() =>
            type === "forgot-password"
              ? setView("forgot-password")
              : setView("sign-up")
          }
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default OtpVerificationForm;
