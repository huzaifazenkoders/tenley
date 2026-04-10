import AuthLogoCollapsed from "@/../public/assets/auth/auth-logo-collapsed.svg";
import AvatarImage from "@/../public/assets/mock/person1.png";
import { cn } from "@/lib/utils";
import { ReactDispatch } from "@/types/common";
import Image from "next/image";
import { Fragment } from "react";
import { navSections } from "../constants/SidebarItems";
import Link from "next/link";

const SidebarCollapsed = ({
  active,
  setActive
}: {
  active: string;
  setActive: ReactDispatch<string>;
}) => {
  return (
    <Fragment>
      <div className="h-14 flex center overflow-hidden">
        <Image
          key={"AuthLogoCollapsed"}
          src={AuthLogoCollapsed}
          alt="Logo"
          width={34}
          height={56}
          className=""
        />
      </div>
      {/* Nav */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        {navSections.map((section) => (
          <div key={section.label} className="flex flex-col w-20 px-2 gap-3">
            <span
              className={cn(
                "text-brand-Text-300 text-xs max-w-full font-medium leading-4 text-center overflow-hidden whitespace-nowrap truncate"
              )}
            >
              {section.label}
            </span>
            <div className="flex flex-col gap-2">
              {section.items.map(({ id, icon: Icon, href }) => {
                const isActive = active === id;
                return (
                  <Link
                    key={id}
                    href={href}
                    onClick={() => setActive(id)}
                    className={cn(
                      "flex items-center gap-2.5 px-4 py-2 rounded-lg transition-all duration-200 overflow-hidden",
                      isActive
                        ? "bg-gradient-to-r from-brand-primary-red-600-d to-brand-primary-red-300"
                        : "hover:bg-brand-Text-50",
                      "w-full justify-center"
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-5 shrink-0",
                        isActive ? "text-white" : "text-brand-Text-600"
                      )}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div
        className={cn(
          "relative px-2 py-3 bg-brand-Text-50 rounded-lg flex items-center gap-2 transition-all duration-300",
          "justify-center"
        )}
      >
        <div className="relative shrink-0">
          <Image
            src={AvatarImage}
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="absolute bottom-0 right-0 size-2.5 bg-Primary-Green-50 rounded-full border-2 border-brand-Text-50" />
        </div>
      </div>
    </Fragment>
  );
};

export default SidebarCollapsed;
