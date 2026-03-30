"use client";
import UserImage from "@/../public/assets/mock/person1.png";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import TextInput from "@/components/ui/text-input";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const GeneralInfoTab = () => {
  const [editingInfo, setEditingInfo] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Basic Information */}
      <div className="p-4 relative bg-white rounded-xl shadow-[0px_2px_8px_0px_rgba(32,33,36,0.04)] outline outline-1 outline-offset-[-1px] outline-brand-Text-100 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="text-brand-Text-950-d text-base font-medium leading-5">
              Basic Information
            </span>
            <span className="text-brand-Text-400 text-sm font-normal leading-5">
              Update your personal information
            </span>
          </div>
          {editingInfo ? (
            <div className="flex justify-end gap-5">
              <Button
                variant="link"
                size="fit"
                onClick={() => setEditingInfo(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setEditingInfo(false)}>
                Save Changes
              </Button>
            </div>
          ) : (
            <button
              onClick={() => setEditingInfo((p) => !p)}
              className="p-2 bg-white rounded-lg cursor-pointer outline outline-1 outline-brand-Text-100 flex items-center gap-2"
            >
              <Pencil className="size-5 text-brand-Text-700" />
            </button>
          )}
        </div>

        <div className="relative size-24">
          <Image
            src={UserImage}
            alt="Avatar"
            width={96}
            height={96}
            className="rounded-full"
          />
          <button className="absolute bottom-0 right-0 p-1.5 bg-brand-primary-red-600-d rounded-full">
            <Pencil className="size-3 text-white" />
          </button>
        </div>

        <div className="flex gap-6">
          <TextInput
            label="Full Name"
            defaultValue="James Smith"
            disabled={!editingInfo}
            className="flex-1"
          />
          <TextInput
            label="Contact Number"
            defaultValue="555 123-4567890"
            disabled={!editingInfo}
            className="flex-1"
          />
          <TextInput
            label="Email"
            defaultValue="james14@example.com"
            disabled={!editingInfo}
            className="flex-1"
          />
        </div>
      </div>

      {/* Change Password */}
      <div className="p-4 bg-white rounded-xl shadow-[0px_2px_8px_0px_rgba(32,33,36,0.04)] outline outline-1 outline-offset-[-1px] outline-brand-Text-100 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="text-brand-Text-950-d text-base font-medium leading-5">
              Change Password
            </span>
            <span className="text-brand-Text-400 text-sm font-normal leading-5">
              Update your account password for better security
            </span>
          </div>
          {editingPassword ? (
            <div className="flex justify-end gap-5">
              <Button
                variant="link"
                size="fit"
                onClick={() => setEditingPassword(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setEditingPassword(false)}>
                Save Changes
              </Button>
            </div>
          ) : (
            <button
              onClick={() => setEditingPassword((p) => !p)}
              className="p-2 bg-white rounded-lg cursor-pointer outline outline-1 outline-brand-Text-100 flex items-center gap-2"
            >
              <Pencil className="size-5 text-brand-Text-700" />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <PasswordInput
            label="Current Password"
            defaultValue="placeholder"
            disabled={!editingPassword}
          />
          <PasswordInput
            label="New Password"
            defaultValue="placeholder"
            disabled={!editingPassword}
          />
          <PasswordInput
            label="Confirm Password"
            defaultValue="placeholder"
            disabled={!editingPassword}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoTab;
