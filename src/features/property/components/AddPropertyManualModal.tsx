"use client";
import { Button } from "@/components/ui/button";
import { Modal, ModalClose } from "@/components/ui/modal";
import { Dialog } from "radix-ui";
import {
  Building2,
  ChevronRight,
  PhoneCall,
  Smartphone,
  Users
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const featureCards = [
  {
    icon: <PhoneCall className="size-6 text-brand-primary-red-500" />,
    title: "24/7 Emergency Response",
    description:
      "Automated after-hours emergency handling with intelligent routing"
  },
  {
    icon: <Building2 className="size-6 text-brand-primary-red-500" />,
    title: "Property Management",
    description:
      "Manage units, occupancy status, and tenant access in one place."
  },
  {
    icon: <Smartphone className="size-6 text-brand-primary-red-500" />,
    title: "Smart Call Management",
    description: "Dedicated emergency lines for each property with call logging"
  },
  {
    icon: <Users className="size-6 text-brand-primary-red-500" />,
    title: "Staff Assignment",
    description:
      "Assign required on-site roles like technicians and property managers."
  }
];

const AddPropertyManualModal = ({ open, onOpenChange }: Props) => {
  const router = useRouter();

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      className="w-[694px] p-6 flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <Dialog.Title className="text-brand-Text-950-d text-xl font-bold leading-6">
            Create your first property
          </Dialog.Title>
          <Dialog.Description className="text-brand-Text-500 text-sm font-normal leading-5">
            This will be the central place where emergencies, staff, and units
            are managed.
          </Dialog.Description>
        </div>
        <ModalClose />
      </div>

      {/* Banner image */}
      <Image
        src="/assets/property/create-first-property.png"
        alt="Property banner"
        width={682}
        height={193}
        className="w-full h-48 rounded-xl object-cover"
        unoptimized
      />

      {/* Feature cards */}
      <div className="flex flex-col gap-5">
        {[featureCards.slice(0, 2), featureCards.slice(2, 4)].map((row, i) => (
          <div key={i} className="flex items-center gap-5">
            {row.map(({ icon, title, description }) => (
              <div
                key={title}
                className="w-80 p-3 bg-gradient-to-b from-brand-primary-red-50 to-brand-base-white rounded-lg shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-primary-red-100 flex items-start gap-2"
              >
                <div className="p-2 rounded-lg outline outline-1 -outline-offset-1 outline-brand-primary-red-100 flex items-center shrink-0">
                  {icon}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-brand-Text-950-d text-sm font-medium leading-5">
                    {title}
                  </span>
                  <span className="text-brand-Text-500 text-xs font-normal leading-4">
                    {description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-end items-center gap-3">
        <Button
          variant="outline-transparent"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onOpenChange(false);
            router.push("/property/add-property/manual-property");
          }}
        >
          Continue Setup <ChevronRight className="size-4" />
        </Button>
      </div>
    </Modal>
  );
};

export default AddPropertyManualModal;
