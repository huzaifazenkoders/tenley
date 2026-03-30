"use client";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Users,
  UserRound,
  AlertTriangle,
  Bell,
  Settings,
  ChevronLeft,
  MoreVertical
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AuthLogo from "@/../public/assets/auth/auth-logo.svg";
import AuthLogoCollapsed from "@/../public/assets/auth/auth-logo-collapsed.svg";
import { useDebounce } from "use-debounce";

const navSections = [
  {
    label: "Overview",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        badge: null
      }
    ]
  },
  {
    label: "Operations",
    items: [
      {
        id: "property",
        label: "Property Management",
        icon: Building2,
        badge: null
      },
      { id: "staff", label: "Staff & Roles", icon: Users, badge: null },
      { id: "tenants", label: "Tenants", icon: UserRound, badge: null }
    ]
  },
  {
    label: "Activity & Insights",
    items: [
      {
        id: "emergencies",
        label: "Emergencies",
        icon: AlertTriangle,
        badge: "03"
      },
      { id: "notifications", label: "Notifications", icon: Bell, badge: "03" },
      { id: "settings", label: "Settings", icon: Settings, badge: null }
    ]
  }
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedD] = useDebounce(collapsed, 300);
  const [active, setActive] = useState("dashboard");

  return (
    <div
      className={cn(
        "relative self-stretch px-4 py-6 bg-brand-base-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-brand-Text-100 flex flex-col gap-6 transition-all duration-300 ease-in-out",
        collapsed ? "w-[88px]" : "w-[272px]"
      )}
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed((p) => !p)}
        className="absolute -right-3 top-[104px] z-10 size-6 bg-brand-base-white rounded-full outline outline-1 outline-offset-[-1px] outline-brand-Text-100 flex items-center justify-center"
      >
        <ChevronLeft
          className={cn(
            "size-3.5 text-brand-Text-600 transition-transform duration-300",
            collapsed && "rotate-180"
          )}
        />
      </button>

      {/* Logo */}
      {collapsedD ? (
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
      ) : (
        <div className="h-14 flex items-center overflow-hidden">
          <Image
            key={"AuthLogo"}
            src={AuthLogo}
            alt="Logo"
            width={128}
            height={56}
            className=""
          />
        </div>
      )}

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
              {section.items.map(({ id, label, icon: Icon, badge }) => {
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActive(id)}
                    className={cn(
                      "flex items-center gap-2.5 px-4 py-2 rounded-lg transition-all duration-200 overflow-hidden",
                      isActive
                        ? "bg-gradient-to-r from-brand-primary-red-600-d to-brand-primary-red-300"
                        : "hover:bg-brand-Text-50",
                      collapsed ? "w-12 justify-center" : "w-full"
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-5 shrink-0",
                        isActive ? "text-white" : "text-brand-Text-600"
                      )}
                    />
                    {!collapsedD ? (
                      <span
                        className={cn(
                          "flex-1 text-sm font-medium leading-5 text-left whitespace-nowrap transition-all duration-300 overflow-hidden",
                          isActive
                            ? "text-white"
                            : "text-brand-Text-600 font-normal",
                          collapsed ? "w-0 opacity-0" : "opacity-100"
                        )}
                      >
                        {label}
                      </span>
                    ) : null}
                    {badge && !collapsed && (
                      <span className="px-2 py-0.5 bg-brand-primary-red-500 rounded-full text-white text-[10px] font-medium leading-3">
                        {badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Upgrade card */}
      {!collapsed && (
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
          <button className="w-full px-4 py-1.5 bg-brand-primary-red-500 rounded-full text-white text-sm font-medium leading-5">
            Upgrade Plan
          </button>
        </div>
      )}

      {/* User */}
      <div
        className={cn(
          "relative px-2 py-3 bg-brand-Text-50 rounded-lg flex items-center gap-2 transition-all duration-300",
          collapsed && "justify-center"
        )}
      >
        <div className="relative shrink-0">
          <Image
            src="https://placehold.co/40x40"
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="absolute bottom-0 right-0 size-2.5 bg-Primary-Green-50 rounded-full border-2 border-brand-Text-50" />
        </div>
        {!collapsed && (
          <>
            <div className="flex-1 flex flex-col overflow-hidden">
              <span className="text-brand-Text-950-d text-base font-semibold leading-5 whitespace-nowrap">
                James Smith
              </span>
              <span className="text-brand-Text-400 text-xs font-medium leading-4">
                Company Admin
              </span>
            </div>
            <MoreVertical className="size-5 text-brand-Text-600 shrink-0" />
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
