"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import LabelContainer from "./label-container";
import { ReactDispatch } from "@/types/common";

const InputOTPCell = cn(
  "rounded-lg border border-border-primary",
  "bg-input",
  "px-3 py-2",
  "text-base text-text-primary",
  "placeholder:text-text-secondary",
  "h-12 w-12",
  "rounded-lg border border-border-primary",
  "ms-3"
);

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "children"> & {
  label?: string;
  error?: string;
  value?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  setValue?: ReactDispatch<string>;
  containerClassName?: string;
  labelClassName?: string;
};

const OtpInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      setValue,
      containerClassName,
      maxLength,
      required,
      label,
      className,
      labelClassName,
      error,
      ...rest
    },
    ref
  ) => {
    return (
      <LabelContainer
        error={error}
        htmlFor={rest.id}
        label={label}
        className={containerClassName}
        labelClassName={labelClassName}
        required={required}
      >
        <div className="flex center gap-3">
          <InputOTP
            maxLength={6}
            ref={ref}
            value={value}
            onChange={(e) => setValue && setValue(e)}
            className="w-fit"
          >
            <InputOTPGroup className="">
              <InputOTPSlot index={0} className={cn(InputOTPCell, className)} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={1} className={cn(InputOTPCell, className)} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={2} className={cn(InputOTPCell, className)} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} className={cn(InputOTPCell, className)} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={4} className={cn(InputOTPCell, className)} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={5} className={cn(InputOTPCell, className)} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </LabelContainer>
    );
  }
);

OtpInput.displayName = "OtpInput";

export default OtpInput;
