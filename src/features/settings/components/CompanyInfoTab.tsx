"use client";
import TextInput from "@/components/ui/text-input";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CompanyInfoTab = () => {
  const [editing, setEditing] = useState(false);

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-[0px_2px_8px_0px_rgba(32,33,36,0.04)] outline outline-1 outline-offset-[-1px] outline-brand-Text-100 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <span className="text-brand-Text-950-d text-base font-medium leading-5">
            Company Information
          </span>
          <span className="text-brand-Text-400 text-sm font-normal leading-5">
            Update your company information
          </span>
        </div>
        {editing ? (
          <div className="flex justify-end gap-3">
            <Button
              variant="outline-transparent"
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setEditing(false)}>Save Changes</Button>
          </div>
        ) : (
          <Button
            size={"icon"}
            variant="outline-transparent"
            onClick={() => setEditing((p) => !p)}
          >
            <Pencil className="size-5 text-brand-Text-700" />
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <TextInput
          label="Company Name"
          defaultValue="Acme Property Group"
          disabled={!editing}
        />
        <div className="flex gap-6">
          <TextInput
            label="Company Email"
            defaultValue="support@acmeproperty.com"
            disabled={!editing}
            className="flex-1"
          />
          <TextInput
            label="Website URL (Optional)"
            defaultValue="http://www.acmeproperty.com"
            disabled={!editing}
          />
        </div>
        <div className="flex gap-6">
          <TextInput
            label="Registration No."
            defaultValue="1245"
            disabled={!editing}
            className="flex-1"
          />
          <TextInput
            label="Phone Number"
            defaultValue="(252) 555-0126"
            disabled={!editing}
            className="flex-1"
          />
        </div>
        <TextInput
          label="Address"
          defaultValue="4517 Washington Ave. Manchester, Kentucky 39495"
          disabled={!editing}
        />
      </div>
    </div>
  );
};

export default CompanyInfoTab;
