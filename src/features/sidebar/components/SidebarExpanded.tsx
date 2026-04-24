"use client";
import AuthLogo from "@/../public/assets/auth/auth-logo.svg";
import AvatarImage from "@/../public/assets/mock/person1.png";
import { cn } from "@/lib/utils";
import { LogOut, MoreVertical } from "lucide-react";
import Image from "next/image";
import { Fragment, useRef, useState } from "react";
import { navSections } from "../constants/SidebarItems";
import Link from "next/link";
import UpgradePlanModal from "./UpgradePlanModal";
import { useUserStore } from "@/store/userStore";
import { signOut } from "@/features/auth/services/authService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SidebarExpanded = ({ currentPathname }: { currentPathname: string }) => {
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const fullName = (user?.user_metadata?.full_name as string) ?? user?.email ?? "—";
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) { toast.error(error); return; }
    setUser(null);
    router.push("/auth/sign-in");
  };
  return (
    <Fragment>
      <div className="h-14 flex items-center overflow-hidden">
        <Image
          key={"AuthLogo"}
          src={AuthLogo}
          alt="Logo"
          width={128}
          height={56}
          priority
          className=""
        />
      </div>
      {/* Nav */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        {navSections.map((section) => (
          <div key={section.label} className="flex flex-col gap-3">
            <span
              className={cn(
                "text-brand-Text-300 text-xs font-medium leading-4 transition-all duration-300 overflow-hidden whitespace-nowrap truncate"
                // collapsed ? "opacity-0 w-0" : "opacity-100"
              )}
            >
              {section.label}
            </span>
            <div className="flex flex-col gap-2">
              {section.items.map(({ id, label, icon, badge, href }) => {
                const isActive =
                  currentPathname === href ||
                  (currentPathname.startsWith(href) && href !== "/");
                return (
                  <Link
                    key={id}
                    href={href}
                    className={cn(
                      "flex items-center gap-2.5 px-4 py-2 rounded-lg transition-all duration-200 overflow-hidden",
                      isActive
                        ? "bg-gradient-to-r from-brand-primary-red-600-d to-brand-primary-red-300"
                        : "hover:bg-brand-Text-50",
                      "w-full"
                    )}
                  >
                    {icon(isActive)}
                    <span
                      className={cn(
                        "flex-1 text-sm font-medium leading-5 text-left whitespace-nowrap transition-all duration-300 overflow-hidden",
                        isActive
                          ? "text-white"
                          : "text-brand-Text-600 font-normal",
                        "opacity-100"
                      )}
                    >
                      {label}
                    </span>
                    {badge && (
                      <span className="px-2 py-0.5 bg-brand-primary-red-500 rounded-full text-white text-[10px] font-medium leading-3">
                        {badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {/* Upgrade card */}
      <div className="px-2 py-3 bg-linear-234 from-brand-primary-red-200 via-brand-base-white via-[63%] to-brand-primary-red-200 rounded-lg outline outline-1 outline-offset-[-1px] outline-brand-primary-red-200 flex flex-col gap-3 transition-all duration-300">
        <div className="flex flex-col gap-1">
          <div className="text-base font-semibold leading-5">
            <span className="text-brand-base-black">Tenley</span>
            <span className="text-brand-primary-red-500 font-bold">Pro</span>
          </div>
          <div className="text-brand-primary-red-400 text-[10px] font-medium leading-3">
            52/100 properties
          </div>
          <div className="h-1.5 bg-brand-primary-red-200 rounded-full overflow-hidden mt-1">
            <div className="w-[52%] h-full bg-brand-primary-red-500 rounded-full" />
          </div>
        </div>
        <button
          onClick={() => setUpgradeOpen(true)}
          className="w-full px-4 py-1.5 bg-brand-primary-red-500 rounded-full text-white text-sm font-medium leading-5"
        >
          Upgrade Plan
        </button>
      </div>
      {/* User */}
      <div
        className={cn(
          "relative px-2 py-3 bg-brand-Text-50 rounded-lg flex items-center gap-2 transition-all duration-300"
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
        <>
          <div className="flex-1 flex flex-col overflow-hidden">
            <span className="text-brand-Text-950-d text-base font-semibold leading-5 whitespace-nowrap">
              {fullName}
            </span>
            <span className="text-brand-Text-400 text-xs font-medium leading-4">
              Company Admin
            </span>
          </div>
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-0.5 rounded-full hover:bg-brand-Text-100 transition-colors"
            >
              <MoreVertical className="size-5 text-brand-Text-600" />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute bottom-8 right-0 z-20 w-36 bg-white rounded-lg shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] outline outline-1 -outline-offset-1 outline-brand-Text-100 overflow-hidden">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2.5 flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      </div>
      <UpgradePlanModal open={upgradeOpen} onOpenChange={setUpgradeOpen} />
    </Fragment>
  );
};

export default SidebarExpanded;
