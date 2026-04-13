import { cn } from "@/lib/utils";
import { ReactDispatch } from "@/types/common";
import React from "react";
import LabelContainer from "./label-container";
import { inputStyles } from "@/styles/ui/inputStyles";

const Textarea = ({
  label,
  error,
  value,
  setValue,
  containerClassName,
  labelClassName,
  ...rest
}: React.ComponentProps<"textarea"> & {
  label?: string;
  error?: string;
  value?: string;
  setValue?: ReactDispatch<string>;
  containerClassName?: string;
  labelClassName?: string;
}) => (
  <LabelContainer
    error={error}
    label={label}
    className={containerClassName}
    labelClassName={labelClassName}
    required={rest.required}
  >
    <textarea
      {...rest}
      className={cn(inputStyles, "h-auto min-h-24 resize-none py-2", rest.className)}
      value={value}
      onChange={(e) => {
        setValue?.(e.target.value);
        rest.onChange?.(e);
      }}
    />
  </LabelContainer>
);

export default Textarea;
