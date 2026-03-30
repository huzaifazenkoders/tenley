import { cn } from "@/lib/utils";
import Image from "next/image";
import AuthLogo from "@/../public/assets/auth/auth-logo.svg";
import React from "react";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn("flex w-full", "container mx-auto")}>
      <div className="flex-col-4 justify-between items-center md:items-start min-h-dvh h-full py-6 px-10 w-full">
        <Image
          src={AuthLogo}
          alt=""
          height={77}
          width={177}
          className="hidden md:block"
        />
        {children}
        <div className="h-44.25"></div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
