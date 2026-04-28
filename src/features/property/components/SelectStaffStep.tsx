"use client";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { CheckCircle2, Loader2, UserPlus } from "lucide-react";
import { useState } from "react";
import { inviteManager } from "../services/staffService";

type Props = {
  propertyId: string | null;
};

const SelectStaffStep = ({ propertyId }: Props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [invited, setInvited] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!fullName.trim()) e.fullName = "Full name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "Enter a valid email address";
    return e;
  };

  const handleInvite = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const { error } = await inviteManager({
      full_name: fullName.trim(),
      email: email.trim().toLowerCase(),
      designation: designation.trim() || null,
      property_id: propertyId ?? null
    });
    setSubmitting(false);
    if (error) return;
    setInvited(true);
  };

  const handleInviteAnother = () => {
    setFullName("");
    setEmail("");
    setDesignation("");
    setInvited(false);
  };

  return (
    <div className="p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6 min-w-sm md:min-w-xl">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-brand-primary-red-50 rounded-full">
          <UserPlus className="size-5 text-brand-primary-red-600-d" />
        </div>
        <h2 className="text-brand-Text-800 text-xl font-bold leading-6">
          Invite Staff Member
        </h2>
      </div>

      {invited ? (
        <div className="flex flex-col items-center gap-4 py-10">
          <CheckCircle2 className="size-14 text-green-500" />
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-brand-Text-950-d text-xl font-bold leading-6">
              Invitation Sent!
            </p>
            <p className="text-brand-Text-500 text-sm font-normal leading-5">
              An invite has been sent to <span className="font-medium text-brand-Text-700">{email}</span>.
              They will receive an email to join your workspace.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleInviteAnother}>
            Invite Another
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <TextInput
            label="Full Name"
            placeholder="e.g. John Smith"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
            }}
            error={errors.fullName}
          />
          <TextInput
            label="Email Address"
            placeholder="e.g. john@company.com"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            error={errors.email}
          />
          <TextInput
            label="Designation (Optional)"
            placeholder="e.g. Property Manager"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
          <Button size="lg" onClick={handleInvite} disabled={submitting}>
            {submitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <UserPlus className="size-4" /> Send Invite
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectStaffStep;
