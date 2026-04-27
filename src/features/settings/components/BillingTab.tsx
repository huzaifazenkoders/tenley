"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { TypographyStyles } from "@/styles/common-typography";
import InvoiceSheet from "./InvoiceSheet";

const plans = [
  {
    name: "Starter Plan",
    price: "$49",
    current: false,
    popular: false,
    features: [
      "Up to 20 units",
      "2 staff accounts",
      "Basic emergency response",
      "Email notifications"
    ],
    action: "Switch to Starter"
  },
  {
    name: "Professional Plan",
    price: "$149",
    current: true,
    popular: true,
    features: [
      "Up to 100 units",
      "10 staff accounts",
      "Full emergency response",
      "AI call handling (500 mins)"
    ],
    action: "Current Plan"
  },
  {
    name: "Enterprise Plan",
    price: "$399",
    current: false,
    popular: false,
    features: [
      "Unlimited units",
      "Unlimited staff accounts",
      "AI professional features",
      "AI call handling (unlimited mins)"
    ],
    action: "Switch to Enterprise"
  }
];

const billingHistory = [
  {
    id: "IN-101",
    plan: "Starter",
    amount: "$49",
    date: "Aug 03, 2025",
    status: "Paid"
  },
  {
    id: "IN-102",
    plan: "Professional",
    amount: "$149",
    date: "Sept 05, 2025",
    status: "Paid"
  },
  {
    id: "IN-103",
    plan: "Professional",
    amount: "$149",
    date: "Oct 03, 2025",
    status: "Paid"
  },
  {
    id: "IN-104",
    plan: "Professional",
    amount: "$149",
    date: "Nov 03, 2025",
    status: "Paid"
  }
];

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.99935 18.3332C14.5827 18.3332 18.3327 14.5832 18.3327 9.99984C18.3327 5.4165 14.5827 1.6665 9.99935 1.6665C5.41602 1.6665 1.66602 5.4165 1.66602 9.99984C1.66602 14.5832 5.41602 18.3332 9.99935 18.3332Z"
      stroke="var(--brand-primary-red-500, #ED5346)"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.45898 9.99993L8.81732 12.3583L13.5423 7.6416"
      stroke="var(--brand-primary-red-500, #ED5346)"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FeatureItem = ({ label }: { label: string }) => (
  <div className="flex-1 flex justify-start items-center gap-2">
    <CheckIcon />
    <div className="text-brand-Text-700 text-lg font-semibold leading-4">
      {label}
    </div>
  </div>
);

const addons = [
  {
    label: "Additional property",
    price: "$1.60",
    unit: "/ unit",
    description: "Applied for each unit above your plan's included limit."
  },
  {
    label: "Additional staff account",
    price: "$14.99",
    unit: "/ staff",
    description: "Applied for each extra staff member added to your workspace."
  },
  {
    label: "New role",
    price: "$9.99",
    unit: "/ role",
    description: "Applied when you create an additional custom role."
  }
];

const BillingTab = () => {
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full rounded-2xl flex flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <div className="text-brand-Text-950-d text-base font-medium leading-5">
            Unit costs
          </div>
          <div className={TypographyStyles.subTitle}>
            These rates are shown for reference so the user can review the extra
            charges before moving forward.
          </div>
        </div>
        <div className="flex gap-3">
          {addons.map((addon) => (
            <div
              key={addon.label}
              className="w-full rounded-xl border border-border-primary bg-white p-4 flex flex-col gap-3"
            >
              <FeatureItem label={addon.label} />
              <div className="pl-7 flex flex-col gap-1">
                <div>
                  <span className="text-primary text-base font-semibold leading-5">
                    {addon.price}
                  </span>
                  <span className="text-brand-Text-500 text-sm font-normal leading-5">
                    {addon.unit}
                  </span>
                </div>
                <p className="text-text-secondary text-xs font-normal leading-4">
                  {addon.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-brand-Text-950-d text-base font-medium leading-5">
            Billing History
          </span>
          <span className="text-brand-Text-400 text-sm font-normal leading-5">
            View your billing history
          </span>
        </div>
        <div className="w-full rounded-[20px] shadow-[0px_0px_0px_1px_rgba(220,223,228,1)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-brand-Text-50 border-b border-brand-Text-100">
                {[
                  "Invoice ID",
                  "Subscription Plan",
                  "Amount",
                  "Date",
                  "Status",
                  "Actions"
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-brand-Text-500 text-sm font-medium leading-4"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {billingHistory.map((row, i) => (
                <tr
                  key={row.id}
                  className={
                    i < billingHistory.length - 1
                      ? "border-b border-brand-Text-100"
                      : ""
                  }
                >
                  <td className="px-4 py-3.5 h-16 text-brand-Text-950-d text-sm font-medium leading-5">
                    {row.id}
                  </td>
                  <td className="px-4 py-3.5 h-16">
                    <span className="px-2 py-1 bg-brand-Text-50 rounded-full outline outline-1 outline-offset-[-1px] outline-brand-Text-100 text-brand-Text-700 text-sm font-medium leading-5">
                      {row.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 h-16 text-brand-Text-950-d text-sm font-medium leading-5">
                    {row.amount}
                  </td>
                  <td className="px-4 py-3.5 h-16 text-brand-Text-700 text-sm font-normal leading-5">
                    {row.date}
                  </td>
                  <td className="px-4 py-3.5 h-16">
                    <span className="px-2.5 py-[3px] bg-green-600/10 rounded-xl text-green-600 text-sm font-normal leading-5">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 h-16">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setInvoiceOpen(true)}
                    >
                      <Download className="size-5 text-brand-Text-600" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <InvoiceSheet open={invoiceOpen} onOpenChange={setInvoiceOpen} />
    </div>
  );
};

export default BillingTab;
