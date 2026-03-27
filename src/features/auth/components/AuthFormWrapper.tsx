import React from "react";
import { formStyles } from "../styles/formStyles";
import AuthLogo from "@/../public/assets/auth/auth-logo.png";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TypographyStyles } from "@/styes/common-typography";

const AuthFormWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-col-4 justify-between items-center md:items-start h-full py-6 px-10">
      <Image
        src={AuthLogo}
        alt=""
        height={77}
        width={177}
        className="hidden md:block"
      />
      <div className="flex center w-full">
        <div className={formStyles}>{children}</div>
      </div>
      <p
        className={cn(
          TypographyStyles.subTitle,
          "text-base",
          "hidden md:block"
        )}
      >
        © 2026 Tenley{" "}
      </p>
    </div>
  );
};

export default AuthFormWrapper;
