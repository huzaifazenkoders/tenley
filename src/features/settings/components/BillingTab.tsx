"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download } from "lucide-react";
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

const FeatureItem = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2">
    <CheckCircle2
      className="size-5 text-brand-primary-red-500 shrink-0"
      strokeWidth={1}
    />
    <span className="text-brand-Text-700 text-xs font-normal leading-4">
      {label}
    </span>
  </div>
);

const BillingTab = () => {
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      {/* Plan Cards */}
      <div className="flex gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex-1 p-4 relative bg-brand-base-white rounded-xl shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] flex flex-col gap-2.5 overflow-hidden outline outline-1 outline-offset-[-1px] ${
              plan.current
                ? "outline-brand-primary-red-600-d"
                : "outline-brand-Text-100"
            }`}
          >
            {plan.popular && (
              <div className="absolute right-0 top-0 px-2 py-[5px] bg-brand-primary-red-600-d rounded-bl-lg">
                <span className="text-white text-sm font-semibold leading-5">
                  Most Popular
                </span>
              </div>
            )}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-brand-Text-950-d text-base font-semibold leading-5">
                  {plan.name}
                </span>
                <div>
                  <span className="text-brand-primary-red-600-d text-2xl font-bold leading-8">
                    {plan.price}
                  </span>
                  <span className="text-brand-Text-500 text-sm font-normal leading-5">
                    /mo
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {plan.features.map((f) => (
                  <FeatureItem key={f} label={f} />
                ))}
              </div>
            </div>
            {plan.current ? (
              <Button
                size="full"
                variant={"outline-transparent"}
                disabled
                className="text-sm"
              >
                Current Plan
              </Button>
            ) : (
              <Button size="full" className="text-sm">
                {plan.action}
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Billing History */}
      <div className="w-full p-4 bg-white rounded-2xl shadow-[0px_2px_8px_0px_rgba(32,33,36,0.04)] outline outline-1 outline-offset-[-1px] outline-brand-Text-100 flex flex-col gap-6">
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
            <tbody>
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
