"use client";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import PhoneInput from "@/components/ui/phone-input";
import TextInput from "@/components/ui/text-input";
import { queryKeys } from "@/query-keys";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Loader2, Pencil } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import {
  changePassword,
  getCurrentUser,
  type MeResponse,
  updateProfile,
  uploadAvatar
} from "../services/settingsService";
import type { User } from "@supabase/supabase-js";

const infoSchema = Yup.object({
  full_name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  phone: Yup.string().trim().isValidPhoneNumber("Phone number is invalid")
});

const passwordSchema = Yup.object({
  current_password: Yup.string().required("Current password is required"),
  new_password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "Passwords do not match")
    .required("Please confirm your new password")
});

const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={`animate-pulse bg-brand-Text-100 rounded-lg ${className ?? ""}`}
  />
);

const GeneralInfoTabSkeleton = () => (
  <div className="flex flex-col gap-6">
    <div className="p-4 bg-white rounded-xl shadow-[0px_2px_8px_0px_rgba(32,33,36,0.04)] outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="size-9 rounded-lg" />
      </div>
      <Skeleton className="size-24 rounded-full" />
      <div className="flex gap-6">
        <Skeleton className="flex-1 h-10" />
        <Skeleton className="flex-1 h-10" />
        <Skeleton className="flex-1 h-10" />
      </div>
    </div>
    <div className="p-4 bg-white rounded-xl shadow-[0px_2px_8px_0px_rgba(32,33,36,0.04)] outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="size-9 rounded-lg" />
      </div>
      <Skeleton className="h-10" />
      <Skeleton className="h-10" />
      <Skeleton className="h-10" />
    </div>
  </div>
);

interface InfoFormValues {
  full_name: string;
  phone: string;
}

interface PasswordFormValues {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

const getProfile = (me: MeResponse | null) =>
  me?.profile ?? me?.profile_information ?? me ?? null;

const GeneralInfoTab = ({
  me,
  isLoading
}: {
  me: MeResponse | null;
  isLoading?: boolean;
}) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [editingInfo, setEditingInfo] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [pendingAvatarUrl, setPendingAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getCurrentUser().then(({ data }) => {
      if (data) setUser(data);
      setLoadingUser(false);
    });
  }, []);

  const profile = getProfile(me);
  const savedAvatarUrl =
    profile?.profile_image_url ??
    user?.user_metadata?.profile_image_url ??
    user?.user_metadata?.avatar_url ??
    "";
  const displayAvatarUrl = pendingAvatarUrl ?? savedAvatarUrl;
  const email = profile?.email ?? me?.email ?? user?.email ?? "";

  const infoFormik = useFormik<InfoFormValues>({
    initialValues: {
      full_name: profile?.full_name ?? user?.user_metadata?.full_name ?? "",
      phone: profile?.phone ?? user?.user_metadata?.phone ?? ""
    },
    enableReinitialize: true,
    validationSchema: infoSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const newAvatarUrl = pendingAvatarUrl ?? savedAvatarUrl ?? "";
      const { error } = await updateProfile({
        full_name: values.full_name.trim(),
        phone: values.phone.trim(),
        profile_image_url: newAvatarUrl
      });
      setSubmitting(false);
      if (!error) {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
        setPendingAvatarUrl(null);
        setEditingInfo(false);
      }
    }
  });

  const passwordFormik = useFormik<PasswordFormValues>({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: ""
    },
    validationSchema: passwordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const { error } = await changePassword(
        user?.email ?? "",
        values.current_password,
        values.new_password
      );
      setSubmitting(false);
      if (!error) {
        resetForm();
        setEditingPassword(false);
      }
    }
  });

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setAvatarUploading(true);
    const { url, error } = await uploadAvatar(file, user.id);
    if (!error && url) {
      setPendingAvatarUrl(url);
    }
    setAvatarUploading(false);
    e.target.value = "";
  };

  const handleCancelInfo = () => {
    infoFormik.resetForm();
    setPendingAvatarUrl(null);
    setEditingInfo(false);
  };

  const handleCancelPassword = () => {
    passwordFormik.resetForm();
    setEditingPassword(false);
  };

  if (loadingUser || isLoading) return <GeneralInfoTabSkeleton />;

  return (
    <div className="flex flex-col gap-6">
      {/* Basic Information */}
      <form onSubmit={infoFormik.handleSubmit}>
        <div className="p-4 relative bg-white rounded-xl shadow-[0px_2px_8px_0px_rgba(32,33,36,0.04)] outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6">
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
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline-transparent"
                  onClick={handleCancelInfo}
                  disabled={infoFormik.isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={infoFormik.isSubmitting || avatarUploading}
                >
                  {infoFormik.isSubmitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                size="icon"
                variant="outline-transparent"
                onClick={() => setEditingInfo(true)}
              >
                <Pencil className="size-5 text-brand-Text-700" />
              </Button>
            )}
          </div>

          {/* Avatar */}
          <div className="relative size-24">
            {displayAvatarUrl ? (
              <Image
                src={displayAvatarUrl}
                alt="Avatar"
                width={96}
                height={96}
                className="rounded-full object-cover size-24"
              />
            ) : (
              <div className="size-24 rounded-full bg-brand-Text-100 flex items-center justify-center text-brand-Text-500 text-2xl font-semibold">
                {(infoFormik.values.full_name ||
                  user?.email ||
                  "?")[0].toUpperCase()}
              </div>
            )}
            {editingInfo && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={avatarUploading}
                className="absolute bottom-0 right-0 p-1.5 bg-brand-primary-red-600-d rounded-full disabled:opacity-60"
              >
                {avatarUploading ? (
                  <Loader2 className="size-3 text-white animate-spin" />
                ) : (
                  <Pencil className="size-3 text-white" />
                )}
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="flex gap-6">
            <TextInput
              label="Full Name"
              value={infoFormik.values.full_name}
              setValue={(v) => infoFormik.setFieldValue("full_name", v)}
              onBlur={infoFormik.handleBlur}
              name="full_name"
              disabled={!editingInfo || isLoading}
              containerClassName="flex-1"
              placeholder="Enter your full name"
              error={
                infoFormik.touched.full_name && infoFormik.errors.full_name
                  ? (infoFormik.errors.full_name as string)
                  : undefined
              }
            />
            <PhoneInput
              label="Contact Number"
              value={infoFormik.values.phone}
              onChange={(v) => infoFormik.setFieldValue("phone", v)}
              onBlur={infoFormik.handleBlur}
              disabled={!editingInfo || isLoading}
              containerClassName="flex-1"
              placeholder="Enter contact number"
              defaultCountry="us"
              error={
                infoFormik.touched.phone && infoFormik.errors.phone
                  ? (infoFormik.errors.phone as string)
                  : undefined
              }
            />
            <TextInput
              label="Email"
              value={email}
              disabled
              containerClassName="flex-1"
              placeholder="Email address"
            />
          </div>
        </div>
      </form>

      {/* Change Password */}
      <form onSubmit={passwordFormik.handleSubmit}>
        <div className="p-4 bg-white rounded-xl shadow-[0px_2px_8px_0px_rgba(32,33,36,0.04)] outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6">
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
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline-transparent"
                  onClick={handleCancelPassword}
                  disabled={passwordFormik.isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={passwordFormik.isSubmitting}>
                  {passwordFormik.isSubmitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                size="icon"
                variant="outline-transparent"
                onClick={() => setEditingPassword(true)}
              >
                <Pencil className="size-5 text-brand-Text-700" />
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <PasswordInput
              label="Current Password"
              value={passwordFormik.values.current_password}
              setValue={(v) =>
                passwordFormik.setFieldValue("current_password", v)
              }
              onBlur={passwordFormik.handleBlur}
              name="current_password"
              disabled={!editingPassword}
              placeholder="Enter current password"
              error={
                passwordFormik.touched.current_password &&
                passwordFormik.errors.current_password
                  ? passwordFormik.errors.current_password
                  : undefined
              }
            />
            <PasswordInput
              label="New Password"
              value={passwordFormik.values.new_password}
              setValue={(v) => passwordFormik.setFieldValue("new_password", v)}
              onBlur={passwordFormik.handleBlur}
              name="new_password"
              disabled={!editingPassword}
              placeholder="Enter new password"
              error={
                passwordFormik.touched.new_password &&
                passwordFormik.errors.new_password
                  ? passwordFormik.errors.new_password
                  : undefined
              }
            />
            <PasswordInput
              label="Confirm Password"
              value={passwordFormik.values.confirm_password}
              setValue={(v) =>
                passwordFormik.setFieldValue("confirm_password", v)
              }
              onBlur={passwordFormik.handleBlur}
              name="confirm_password"
              disabled={!editingPassword}
              placeholder="Confirm new password"
              error={
                passwordFormik.touched.confirm_password &&
                passwordFormik.errors.confirm_password
                  ? passwordFormik.errors.confirm_password
                  : undefined
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default GeneralInfoTab;
