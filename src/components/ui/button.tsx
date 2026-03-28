"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { handleRippleAnimation } from "@/lib/ui/handleRippleAnimation";
import { ButtonHTMLAttributes } from "react";
import NextLink from "next/link";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 relative",
    "whitespace-nowrap cursor-pointer rounded-md outline-none",
    "font-semibold transition-all duration-200 disabled:cursor-not-allowed data-[externaldisabled=true]:opacity/90",
    "[&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0",
    "relative overflow-hidden hover:shadow-lg"
  ),
  {
    variants: {
      variant: {
        default:
          "bg-[image:var(--gradient)] [&_.loader-container]:bg-[image:var(--gradient)] text-primary-foreground hover:opacity-90",
        outline: "",
        secondary: "",
        ghost: "",
        destructive: "",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-11 px-8 py-2",
        xs: "h-8 px-3",
        sm: "h-9 gap-1.5 px-4",
        lg: "h-12 px-10",
        icon: "size-9",
        xlg: "h-12 px-12",
        full: "h-12 w-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    component?: React.ElementType;
    link?: string;
    isLoading?: boolean;
  };

function Button({
  className,
  variant = "default",
  size = "default",
  component: ComponentOverride,
  link,
  children,
  isLoading,
  ...props
}: Props) {
  const Comp = ComponentOverride || "button";

  const Loading = () => {
    if (isLoading) {
      return (
        <span className="absolute flex center top-0 bottom-0 left-0 right-0 loader-container z-10">
          <LoaderCircle className={cn("animate-spin")} />
        </span>
      );
    }
    return <></>;
  };

  if (link) {
    return (
      <NextLink
        href={link}
        className={cn(buttonVariants({ variant, size, className }))}
        data-externaldisabled={`${props.disabled}`}
        onMouseDown={(e) => {
          handleRippleAnimation(
            e as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>
          );
          props.onMouseDown?.(
            e as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>
          );
        }}
      >
        {Loading()}
        {children}
      </NextLink>
    );
  }
  return (
    <Comp
      {...props}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      data-externaldisabled={`${props.disabled}`}
      onMouseDown={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleRippleAnimation(e);
        props.onMouseDown?.(e);
      }}
    >
      {Loading()}
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
