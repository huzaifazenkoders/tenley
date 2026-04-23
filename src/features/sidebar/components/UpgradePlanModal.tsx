import { CheckCircle, CheckCircle2Icon, Monitor } from "lucide-react";
import { Dialog } from "radix-ui";
import { Modal, ModalClose } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter Plan",
    price: "$49",
    features: [
      "Up to 20 units",
      "2 staff accounts",
      "Basic emergency response",
      "Email notifications"
    ],
    popular: false,
    highlighted: false
  },
  {
    name: "Professional Plan",
    price: "$149",
    features: [
      "Up to 100 units",
      "10 staff accounts",
      "Full emergency response",
      "AI call handling (500 mins)"
    ],
    popular: true,
    highlighted: true
  },
  {
    name: "Enterprise Plan",
    price: "$399",
    features: [
      "Unlimited units",
      "Unlimited staff accounts",
      "AI professional features",
      "AI call handling (unlimited mins)"
    ],
    popular: false,
    highlighted: false
  }
];

const addOns = [
  { label: "Additional Property", price: "$1.60", unit: "/unit" },
  { label: "Additional Staff", price: "$14.99", unit: "/staff" },
  { label: "New Role", price: "$9.99", unit: "/role" }
];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const UpgradePlanModal = ({ open, onOpenChange }: Props) => (
  <Modal
    open={open}
    onOpenChange={onOpenChange}
    className="w-[836px] p-6 flex flex-col gap-5"
  >
    {/* Header */}
    <Dialog.Title className="flex flex-col gap-4">
      <div className="p-3 bg-brand-primary-red-50 rounded-full w-fit">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.487 22.1439H8.52032C8.03032 22.1439 7.48198 21.7589 7.31865 21.2922L2.48865 7.78224C1.80032 5.84557 2.60532 5.25057 4.26198 6.44057L8.81198 9.69557C9.57032 10.2206 10.4337 9.95224 10.7603 9.10057L12.8137 3.62891C13.467 1.87891 14.552 1.87891 15.2053 3.62891L17.2587 9.10057C17.5853 9.95224 18.4487 10.2206 19.1953 9.69557L23.4653 6.65057C25.2853 5.34391 26.1603 6.00891 25.4137 8.12057L20.7003 21.3156C20.5253 21.7589 19.977 22.1439 19.487 22.1439Z"
            stroke="#DB3E31"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.58594 25.668H20.4193"
            stroke="#DB3E31"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.0859 16.332H16.9193"
            stroke="#DB3E31"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-brand-base-black text-2xl font-bold leading-8">
          Choose your plan
        </span>
        <span className="text-brand-Text-500 text-sm font-normal leading-5">
          Pick a plan that suits your need the best.
        </span>
      </div>
    </Dialog.Title>

    {/* Plans */}
    <div className="flex flex-col gap-4">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`relative p-4 bg-brand-base-white rounded-2xl shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] flex flex-col gap-2.5 overflow-hidden ${
            plan.highlighted
              ? "outline outline-2 outline-offset-[-2px] outline-brand-primary-red-600-d"
              : "outline outline-1 outline-offset-[-1px] outline-brand-Text-100"
          }`}
        >
          {plan.popular && (
            <div className="absolute top-0 right-0 px-2 py-[5px] bg-brand-primary-red-600-d rounded-bl-lg rounded-br-lg">
              <span className="text-white text-sm font-semibold leading-5">
                Most Popular
              </span>
            </div>
          )}
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
            {[plan.features.slice(0, 2), plan.features.slice(2)].map(
              (row, i) => (
                <div key={i} className="flex gap-2">
                  {row.map((feat) => (
                    <div key={feat} className="flex-1 flex items-center gap-1">
                      <CheckCircle2Icon className="text-primary" />
                      <span className="text-brand-Text-700 text-xs font-normal leading-4">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      ))}

      <div className="self-stretch h-px bg-brand-Text-100" />

      {/* Add-ons */}
      <div className="p-4 bg-brand-base-white rounded-2xl shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 outline-offset-[-1px] outline-brand-Text-100 flex flex-col gap-2.5 overflow-hidden">
        <div className="flex flex-col gap-0.5">
          <span className="text-brand-Text-950-d text-base font-semibold leading-5">
            Expand your plan with add-ons
          </span>
          <span className="text-brand-Text-600 text-xs font-normal leading-4">
            Add more capacity and unlock advanced features without moving to a
            larger tier before you are ready.
          </span>
        </div>
        <div className="flex gap-2.5">
          {addOns.map((addon) => (
            <div
              key={addon.label}
              className="flex-1 p-3 rounded-lg outline outline-1 outline-offset-[-1px] outline-brand-Text-100 flex flex-col gap-1 overflow-hidden"
            >
              <span className="text-brand-primary-red-600-d text-xs font-medium leading-4">
                {addon.label}
              </span>
              <div>
                <span className="text-brand-Text-950-d text-xs font-bold leading-4">
                  {addon.price}
                </span>
                <span className="text-brand-Text-600 text-xs font-normal leading-4">
                  {addon.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Footer */}
    <Dialog.Description className="hidden" />
    <div className="self-stretch h-px bg-brand-Text-100" />
    <div className="flex justify-end items-center gap-6">
      <Button
        variant="outline-transparent"
        size="lg"
        onClick={() => onOpenChange(false)}
      >
        Cancel
      </Button>
      <Button size="lg">Select Plan</Button>
    </div>
  </Modal>
);

export default UpgradePlanModal;
