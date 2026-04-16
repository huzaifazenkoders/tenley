import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import BgImage from "@/../public/assets/auth/auth-bg.png";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn("flex w-full min-h-dvh")}>
      <div className="w-full md:w-1/2">{children}</div>
      <div className={cn("hidden md:flex p-2 center w-1/2")}>
        <div className="relative overflow-hidden rounded-lg w-full h-full">
          <Image
            src={BgImage}
            alt=""
            fill
            className="object-top object-cover right-0"
          />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-20 flex-col-2 center text-center">
            <h1 className="text-white text-3xl font-bold whitespace-nowrap">
              Every call, every task, every time.
            </h1>
            <p className="text-white text-lg font-medium">- Tenley</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
