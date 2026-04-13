"use client";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import PhoneInput from "@/components/ui/phone-input";
import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { Users } from "lucide-react";
import { useState } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenantName?: string;
};

const EditTenantModal = ({ open, onOpenChange, tenantName = "" }: Props) => {
  const [firstName, setFirstName] = useState(tenantName.split(" ")[0] ?? "");
  const [lastName, setLastName] = useState(tenantName.split(" ")[1] ?? "");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="w-[560px]">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 flex items-center gap-3 border-b border-brand-Text-100">
        <div className="p-2 bg-brand-primary-red-50 rounded-lg">
          <Users className="size-5 text-brand-primary-red-600-d" />
        </div>
        <h2 className="text-brand-Text-950-d text-xl font-semibold leading-6">
          Edit Tenant
        </h2>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col gap-4">
        <div className="flex gap-4">
          <TextInput
            label="First Name"
            placeholder="Enter first name"
            value={firstName}
            setValue={setFirstName}
            containerClassName="flex-1"
          />
          <TextInput
            label="Last Name"
            placeholder="Enter last name"
            value={lastName}
            setValue={setLastName}
            containerClassName="flex-1"
          />
        </div>

        <TextInput
          label="Email Address"
          placeholder="Enter email address"
          value={email}
          setValue={setEmail}
          type="email"
        />

        <PhoneInput
          label="Phone Number"
          placeholder="Enter phone number"
          value={phone}
          onChange={(r) => setPhone(r)}
          defaultCountry="us"
        />

        <Select
          label="Role"
          placeholder="Select role"
          value={role}
          onValueChange={setRole}
          options={[
            { label: "Head of Household", value: "head" },
            { label: "Family Member", value: "family" }
          ]}
        />
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 flex justify-end items-center gap-4">
        <Button
          variant="outline-transparent"
          size="lg"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button size="lg">Save Changes</Button>
      </div>
    </Modal>
  );
};

export default EditTenantModal;
