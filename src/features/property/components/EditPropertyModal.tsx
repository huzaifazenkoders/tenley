"use client";
import { Dialog } from "radix-ui";
import { Modal, ModalClose } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import type { Property } from "../types";
import { PropertyPurpose, PropertyType } from "../types/enums";
import { updateProperty } from "../services";
import PropertyImagesUploader from "./PropertyImagesUploader";
import { Loader2 } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property?: Property;
  onSuccess?: () => void;
};

const validationSchema = Yup.object({
  propertyType: Yup.string()
    .oneOf(Object.values(PropertyType), "Property type is required")
    .required("Property type is required"),
  propertyPurpose: Yup.string()
    .oneOf(Object.values(PropertyPurpose), "Property purpose is required")
    .required("Property purpose is required"),
  address: Yup.string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(255, "Address must be at most 255 characters")
    .required("Property address is required"),
  name: Yup.string()
    .trim()
    .min(2, "Property name must be at least 2 characters")
    .max(100, "Property name must be at most 100 characters")
    .required("Property name is required"),
  idPrefix: Yup.string()
    .trim()
    .max(10, "ID prefix must be at most 10 characters")
    .matches(/^[A-Za-z0-9]*$/, "Only letters and numbers allowed"),
  units: Yup.string().test(
    "is-positive-int-or-empty",
    "Must be a positive whole number",
    (v) => {
      if (!v) return true;
      const n = Number(v);
      return Number.isInteger(n) && n > 0;
    }
  ),
  floors: Yup.string().test(
    "is-positive-int-or-empty",
    "Must be a positive whole number",
    (v) => {
      if (!v) return true;
      const n = Number(v);
      return Number.isInteger(n) && n > 0;
    }
  ),
  city: Yup.string().trim().max(100, "City must be at most 100 characters"),
  state: Yup.string().trim().max(100, "State must be at most 100 characters"),
  accessDetails: Yup.string()
    .trim()
    .max(500, "Access details must be at most 500 characters")
});

const EditPropertyModal = ({
  open,
  onOpenChange,
  property,
  onSuccess
}: Props) => {
  const formik = useFormik({
    initialValues: {
      propertyType: (property?.property_type ?? "") as PropertyType | "",
      propertyPurpose: (property?.property_purpose ?? "") as
        | PropertyPurpose
        | "",
      address: property?.property_address ?? "",
      name: property?.property_name ?? "",
      sameAsAddress: property?.property_name === property?.property_address,
      idPrefix: property?.property_id_prefix ?? "",
      units: String(property?.number_of_unit ?? ""),
      floors: String(property?.number_of_floors ?? ""),
      city: property?.city ?? "",
      state: property?.state ?? "",
      accessDetails: property?.access_details ?? "",
      propertyImages: (property?.property_images ?? []) as string[]
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (!property) return;
      const { error } = await updateProperty({
        p_property_id: property.id,
        p_payload: {
          property_name: values.name.trim(),
          property_address: values.address.trim(),
          property_type: values.propertyType as PropertyType,
          property_purpose: values.propertyPurpose as PropertyPurpose,
          property_images: values.propertyImages.length
            ? values.propertyImages
            : undefined,
          property_id_prefix: values.idPrefix.trim() || undefined,
          access_details: values.accessDetails.trim() || undefined,
          city: values.city.trim() || undefined,
          state: values.state.trim() || undefined,
          number_of_unit: parseInt(values.units) || undefined,
          number_of_floors: parseInt(values.floors) || undefined
        }
      });
      setSubmitting(false);
      if (!error) {
        onOpenChange(false);
        onSuccess?.();
      }
    }
  });

  const handleOpenChange = (o: boolean) => {
    if (!o) formik.resetForm();
    onOpenChange(o);
  };

  const handleAddressChange = (v: string) => {
    formik.setFieldValue("address", v);
    if (formik.values.sameAsAddress) formik.setFieldValue("name", v);
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      className="w-[836px] p-6"
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2.5 bg-brand-primary-red-50 rounded-full">
                <div className="size-6 relative">
                  <div className="w-1.5 h-3.5 left-[2px] top-[8px] absolute bg-brand-primary-red-600-d" />
                  <div className="w-3 h-5 left-[10px] top-[2px] absolute bg-brand-primary-red-600-d" />
                </div>
              </div>
              <Dialog.Title className="text-brand-Text-950-d text-2xl font-bold leading-8">
                Edit Property Details
              </Dialog.Title>
            </div>
            <ModalClose />
          </div>

          <PropertyImagesUploader
            value={formik.values.propertyImages}
            onChange={(urls) => formik.setFieldValue("propertyImages", urls)}
          />

          <div className="flex items-start gap-6">
            <div className="w-1/2">
              <Select
                label="Property Type"
                value={formik.values.propertyType}
                onValueChange={(v) =>
                  formik.setFieldValue("propertyType", v as PropertyType)
                }
                containerClassName="flex-1"
                options={[
                  { label: "Home", value: PropertyType.Bungalow },
                  { label: "Shopping Mall", value: PropertyType.Mall },
                  { label: "Office Space", value: PropertyType.Office },
                  { label: "Apartment", value: PropertyType.Apartment }
                ]}
                error={
                  formik.touched.propertyType
                    ? formik.errors.propertyType
                    : undefined
                }
              />
            </div>
            <div className="w-1/2">
              <Select
                label="Property Purpose"
                value={formik.values.propertyPurpose}
                onValueChange={(v) =>
                  formik.setFieldValue("propertyPurpose", v as PropertyPurpose)
                }
                containerClassName="flex-1"
                options={[
                  { label: "Residential", value: PropertyPurpose.Residential },
                  { label: "Commercial", value: PropertyPurpose.Commercial }
                ]}
                error={
                  formik.touched.propertyPurpose
                    ? formik.errors.propertyPurpose
                    : undefined
                }
              />
            </div>
          </div>

          <TextInput
            label="Property Address"
            id="address"
            value={formik.values.address}
            setValue={handleAddressChange}
            onBlur={formik.handleBlur}
            containerClassName="w-full"
            error={formik.touched.address ? formik.errors.address : undefined}
          />

          <div className="flex items-start gap-6">
            <div className="flex-1 flex flex-col gap-1">
              <TextInput
                label="Property Name"
                id="name"
                value={formik.values.name}
                setValue={(v) => formik.setFieldValue("name", v)}
                onBlur={formik.handleBlur}
                disabled={formik.values.sameAsAddress}
                error={formik.touched.name ? formik.errors.name : undefined}
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formik.values.sameAsAddress}
                  onChange={(e) => {
                    formik.setFieldValue("sameAsAddress", e.target.checked);
                    if (e.target.checked)
                      formik.setFieldValue("name", formik.values.address);
                  }}
                  className="accent-brand-primary-red-600-d size-4"
                />
                <span className="text-brand-Text-950-d text-sm font-medium leading-5">
                  Same as property address
                </span>
              </label>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <TextInput
                label="Property ID prefix"
                id="idPrefix"
                value={formik.values.idPrefix}
                setValue={(v) => formik.setFieldValue("idPrefix", v)}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.idPrefix ? formik.errors.idPrefix : undefined
                }
              />
              <p className="text-brand-primary-blue-600 text-xs font-normal leading-5 tracking-wide">
                Shown at the start of every Emergency ID. Example: OAK000482
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <TextInput
              label="Number of Units"
              id="units"
              value={formik.values.units}
              setValue={(v) => formik.setFieldValue("units", v)}
              onBlur={formik.handleBlur}
              type="number"
              containerClassName="flex-1"
              error={formik.touched.units ? formik.errors.units : undefined}
            />
            <TextInput
              label="Number of Floors"
              id="floors"
              value={formik.values.floors}
              setValue={(v) => formik.setFieldValue("floors", v)}
              onBlur={formik.handleBlur}
              type="number"
              containerClassName="flex-1"
              error={formik.touched.floors ? formik.errors.floors : undefined}
            />
          </div>

          <TextInput
            label="Access Details (Optional)"
            id="accessDetails"
            value={formik.values.accessDetails}
            setValue={(v) => formik.setFieldValue("accessDetails", v)}
            onBlur={formik.handleBlur}
            containerClassName="w-full"
            error={
              formik.touched.accessDetails
                ? formik.errors.accessDetails
                : undefined
            }
          />
          <div className="flex items-start gap-6">
            <TextInput
              label="City"
              id="city"
              value={formik.values.city}
              setValue={(v) => formik.setFieldValue("city", v)}
              onBlur={formik.handleBlur}
              containerClassName="flex-1"
              error={formik.touched.city ? formik.errors.city : undefined}
            />
            <TextInput
              label="State"
              id="state"
              value={formik.values.state}
              setValue={(v) => formik.setFieldValue("state", v)}
              onBlur={formik.handleBlur}
              containerClassName="flex-1"
              error={formik.touched.state ? formik.errors.state : undefined}
            />
          </div>

          <div className="w-full h-px bg-brand-Text-100" />

          <div className="flex justify-end items-center gap-6">
            <Button
              type="button"
              variant="outline-transparent"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Update Property Details"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditPropertyModal;
