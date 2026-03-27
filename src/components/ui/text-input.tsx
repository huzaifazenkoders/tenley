import { cn } from "@/lib/utils";
import { ReactDispatch } from "@/types/common";
import React from "react";
import LabelContainer from "./label-container";

const TextInput = ({
  label,
  error,
  value,
  setValue,
  startIcon,
  endIcon,
  containerClassName,
  labelClassName,
  ...rest
}: React.ComponentProps<"input"> & {
  label?: string;
  error?: string;
  value?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  setValue?: ReactDispatch<string>;
  containerClassName?: string;
  labelClassName?: string;
}) => {
  const hasStartIcon = Boolean(startIcon);
  const hasEndIcon = Boolean(endIcon);

  return (
    <LabelContainer
      error={error}
      htmlFor={rest.id}
      label={label}
      className={containerClassName}
      labelClassName={labelClassName}
      required={rest.required}
    >
      <div className={cn("relative", "flex", "items-center")}>
        {hasStartIcon && (
          <span className="pointer-events-auto absolute left-3 inline-flex items-center">
            {startIcon}
          </span>
        )}
        <input
          {...rest}
          type="text"
          className={cn(
            "h-11 w-full",
            "rounded-lg border border-border-primary",
            "bg-input",
            "px-3 py-2",
            "text-base text-text-primary",
            "placeholder:text-text-secondary",
            hasStartIcon && "pl-10",
            hasEndIcon && "pr-10",
            rest.className
          )}
          value={value}
          onChange={(e) => {
            setValue?.(e.target.value);
            rest.onChange?.(e);
          }}
        />
        {hasEndIcon && (
          <span className="pointer-events-auto absolute right-3 inline-flex items-center">
            {endIcon}
          </span>
        )}
      </div>
    </LabelContainer>
  );
};

export default TextInput;
