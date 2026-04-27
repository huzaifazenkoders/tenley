"use client";
import { Dialog } from "radix-ui";
import { Modal, ModalClose } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUnit } from "../services";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unitId: string;
  unitName?: string;
  unitNumber?: string;
  onSuccess?: () => void;
};

const validationSchema = Yup.object({
  unit_name: Yup.string()
    .trim()
    .min(1, "Unit name is required")
    .max(50, "Unit name must be at most 50 characters")
    .required("Unit name is required"),
  unit_number: Yup.string()
    .trim()
    .min(1, "Unit number is required")
    .max(20, "Unit number must be at most 20 characters")
    .required("Unit number is required"),
});

const EditUnitModal = ({
  open,
  onOpenChange,
  unitId,
  unitName = "",
  unitNumber = "",
  onSuccess,
}: Props) => {
  const formik = useFormik({
    initialValues: {
      unit_name: unitName,
      unit_number: unitNumber,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const { error } = await updateUnit({
        unit_id: unitId,
        unit_name: values.unit_name.trim(),
        unit_number: values.unit_number.trim(),
      });
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
    <Modal open={open} onOpenChange={handleOpenChange} className="w-[586px] p-6">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-brand-Text-950-d text-2xl font-bold leading-8">
              Edit Unit
            </Dialog.Title>
            <ModalClose />
          </div>

          <div className="flex items-start gap-4">
            <TextInput
              label="Unit Name"
              id="unit_name"
              value={formik.values.unit_name}
              setValue={(v) => formik.setFieldValue("unit_name", v)}
              onBlur={formik.handleBlur}
              containerClassName="flex-1"
              error={formik.touched.unit_name ? formik.errors.unit_name : undefined}
            />
            <TextInput
              label="Unit Number"
              id="unit_number"
              value={formik.values.unit_number}
              setValue={(v) => formik.setFieldValue("unit_number", v)}
              onBlur={formik.handleBlur}
              containerClassName="w-36"
              error={formik.touched.unit_number ? formik.errors.unit_number : undefined}
            />
          </div>

          <div className="flex justify-end items-center gap-6">
            <Button type="button" variant="outline-transparent" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Saving..." : "Update Unit"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditUnitModal;
