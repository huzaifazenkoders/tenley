"use client";
import { cn } from "@/lib/utils";
import { Building2, CreditCard, User } from "lucide-react";
import { useQueryState } from "nuqs";
import GeneralInfoTab from "../components/GeneralInfoTab";
import CompanyInfoTab from "../components/CompanyInfoTab";
import BillingTab from "../components/BillingTab";
import { useUserStore } from "@/store/userStore";

const tabs = [
  { id: "general", label: "General Info", icon: User },
  { id: "company", label: "Company Info", icon: Building2 },
  { id: "billing", label: "Billing", icon: CreditCard },
  // { id: "payment", label: "Payment Methods", icon: Wallet }
];

const SettingsView = () => {
  const [tab, setTab] = useQueryState("tab", { defaultValue: "general" });
  const me = useUserStore((s) => s.me);
  const isLoading = useUserStore((s) => s.isMeLoading);

  return (
    <div className="px-6 pt-10 pb-6 flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-brand-Text-950-d text-2xl font-bold leading-8">
          Company Settings
        </h1>
        <p className="text-brand-Text-500 text-base font-normal leading-5">
          Manage your company information and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="p-1 bg-[#F2F2F2] rounded-full inline-flex gap-0 w-fit">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "px-6 py-2 rounded-full flex items-center gap-2 text-xs font-medium leading-4 transition-all duration-200",
                isActive
                  ? "bg-white shadow-[3px_3px_8px_0px_rgba(0,0,0,0.06)] text-brand-Text-950-d font-medium"
                  : "text-brand-Text-600 font-normal",
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {tab === "general" && <GeneralInfoTab me={me} isLoading={isLoading} />}
      {tab === "company" && <CompanyInfoTab me={me} isLoading={isLoading} />}
      {tab === "billing" && <BillingTab />}
      {tab === "payment" && (
        <div className="text-brand-Text-500">Payment Methods — coming soon</div>
      )}
    </div>
  );
};

export default SettingsView;
