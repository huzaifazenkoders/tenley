"use client";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";
import { Dialog } from "radix-ui";
import { User } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { endTenant } from "../services";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenantId: string;
  onSuccess?: () => void;
};

const validationSchema = Yup.object({
  reason: Yup.string()
    .trim()
    .max(500, "Reason must be at most 500 characters"),
});

const EndTenancyModal = ({ open, onOpenChange, tenantId, onSuccess }: Props) => {
  const formik = useFormik({
    initialValues: { reason: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const { error } = await endTenant(tenantId, values.reason.trim());
      setSubmitting(false);
      if (error) return;
      onSuccess?.();
      onOpenChange(false);
    },
  });

  const handleOpenChange = (o: boolean) => {
    if (!o) formik.resetForm();
    onOpenChange(o);
  };

  return (
    <Modal open={open} onOpenChange={handleOpenChange} className="w-[836px]">
      <form onSubmit={formik.handleSubmit}>
        <div className="p-6 flex flex-col gap-5">
          <Dialog.Title asChild>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="p-2.5 bg-brand-primary-red-50 rounded-full">
                  <User className="size-6 text-brand-primary-red-600-d" />
                </div>
                <span className="text-brand-Text-950-d text-2xl font-bold leading-8">End Tenancy</span>
              </div>
              <Dialog.Description asChild>
                <p className="text-brand-Text-500 text-base font-medium leading-5">
                  This will end the tenant&apos;s lease and archive their record. The unit will be marked as vacant.
                </p>
              </Dialog.Description>
            </div>
          </Dialog.Title>

          <div className="p-4 rounded-2xl">
            <Textarea
              label="Reason (Optional)"
              placeholder="Enter reason for ending tenancy..."
              value={formik.values.reason}
              onChange={(e) => formik.setFieldValue("reason", e.target.value)}
              onBlur={formik.handleBlur}
              error={formik.touched.reason ? formik.errors.reason : undefined}
            />
          </div>

          <hr className="border-brand-Text-100" />

          <div className="flex items-center justify-end gap-6">
            <Button type="button" variant="outline-transparent" size="lg" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              className="bg-brand-primary-red-600-d outline outline-1 outline-brand-primary-red-500"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Ending..." : "End Tenancy"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EndTenancyModal;
