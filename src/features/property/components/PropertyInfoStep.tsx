"use client";

import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import Textarea from "@/components/ui/textarea";
import { useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import * as Yup from "yup";
import { PropertyPurpose, PropertyType } from "../types/enums";
import PropertyImagesUploader from "./PropertyImagesUploader";

export type PropertyFormData = {
  propertyType: PropertyType | "";
  propertyPurpose: PropertyPurpose | "";
  address: string;
  propertyName: string;
  sameAsAddress: boolean;
  idPrefix: string;
  units: string;
  floors: string;
  gateCode: string;
  city: string;
  state: string;
  accessDetails: string;
  propertyImages: string[];
};

export type PropertyInfoStepHandle = {
  submitForm: () => void;
};

const BASE_INITIAL_VALUES: PropertyFormData = {
  propertyType: "",
  propertyPurpose: "",
  address: "",
  propertyName: "",
  sameAsAddress: true,
  idPrefix: "",
  units: "",
  floors: "",
  gateCode: "",
  city: "",
  state: "",
  accessDetails: "",
  propertyImages: []
};

type Props = {
  onValidSubmit: (values: PropertyFormData) => Promise<void>;
  defaultValues?: Partial<PropertyFormData>;
};

const positiveInt = (s: Yup.StringSchema) =>
  s.test("is-positive-int", "Must be a positive whole number", (v) => {
    if (!v) return true; // optional — required check handled separately
    const n = Number(v);
    return Number.isInteger(n) && n > 0;
  });

const validationSchema = Yup.object({
  propertyType: Yup.string().required("Property type is required"),
  propertyPurpose: Yup.string().required("Property purpose is required"),
  address: Yup.string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .required("Property address is required"),
  propertyName: Yup.string()
    .trim()
    .min(2, "Property name must be at least 2 characters")
    .required("Property name is required"),
  idPrefix: Yup.string()
    .trim()
    .max(10, "ID prefix must be at most 10 characters")
    .matches(/^[A-Za-z0-9]*$/, "Only letters and numbers allowed"),
  units: Yup.string().when("propertyType", {
    is: PropertyType.Bungalow,
    then: (s) => positiveInt(s.optional()),
    otherwise: (s) =>
      positiveInt(s.required("Units per floor is required"))
  }),
  floors: Yup.string().when("propertyType", {
    is: PropertyType.Bungalow,
    then: (s) => positiveInt(s.optional()),
    otherwise: (s) =>
      positiveInt(s.required("Number of floors is required"))
  }),
  city: Yup.string().trim().max(100, "City must be at most 100 characters"),
  state: Yup.string().trim().max(100, "State must be at most 100 characters"),
  accessDetails: Yup.string()
    .trim()
    .max(500, "Access details must be at most 500 characters")
});

const PropertyInfoStep = forwardRef<PropertyInfoStepHandle, Props>(
  ({ onValidSubmit, defaultValues }, ref) => {
    const formik = useFormik<PropertyFormData>({
      initialValues: { ...BASE_INITIAL_VALUES, ...defaultValues },
      enableReinitialize: true,
      validationSchema,
      onSubmit: async (values) => {
        await onValidSubmit(values);
      }
    });

    useImperativeHandle(ref, () => ({
      submitForm: () => {
        formik.handleSubmit();
      }
    }));

    const handleAddressChange = (v: string) => {
      formik.setFieldValue("address", v);
      if (formik.values.sameAsAddress) {
        formik.setFieldValue("propertyName", v);
      }
    };

    const handleSameAsAddressChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const checked = e.target.checked;
      formik.setFieldValue("sameAsAddress", checked);
      if (checked) {
        formik.setFieldValue("propertyName", formik.values.address);
        formik.setFieldTouched("propertyName", false);
      }
    };

    const isBungalow = formik.values.propertyType === PropertyType.Bungalow;

    const totalUnits =
      !isBungalow && formik.values.units && formik.values.floors
        ? (parseInt(formik.values.units) || 0) *
          (parseInt(formik.values.floors) || 0)
        : null;

    return (
      <div className="p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6">
        <h2 className="text-brand-Text-800 text-xl font-bold leading-6">
          Property Information
        </h2>

        {/* Image upload */}
        <PropertyImagesUploader
          value={formik.values.propertyImages}
          onChange={(urls) => formik.setFieldValue("propertyImages", urls)}
        />

        {/* Property Type + Purpose */}
        <div className="flex items-start gap-6">
          <div className="w-1/2">
            <Select
              label="Property Type"
              value={formik.values.propertyType}
              onValueChange={(v) => formik.setFieldValue("propertyType", v)}
              placeholder="Select type"
              options={[
                { label: "Home", value: PropertyType.Bungalow },
                { label: "Shopping Mall", value: PropertyType.Mall },
                { label: "Office Space", value: PropertyType.Office },
                { label: "Apartment", value: PropertyType.Apartment }
              ]}
              error={
                formik.touched.propertyType && formik.errors.propertyType
                  ? formik.errors.propertyType
                  : undefined
              }
            />
          </div>
          <div className="w-1/2">
            <Select
              label="Property Purpose"
              value={formik.values.propertyPurpose}
              onValueChange={(v) => formik.setFieldValue("propertyPurpose", v)}
              placeholder="Select purpose"
              options={[
                { label: "Residential", value: PropertyPurpose.Residential },
                { label: "Commercial", value: PropertyPurpose.Commercial }
              ]}
              error={
                formik.touched.propertyPurpose && formik.errors.propertyPurpose
                  ? formik.errors.propertyPurpose
                  : undefined
              }
            />
          </div>
        </div>

        {/* Property Address */}
        <TextInput
          id="address"
          label="Property Address"
          value={formik.values.address}
          setValue={handleAddressChange}
          onBlur={formik.handleBlur}
          placeholder="123 Main Street"
          error={
            formik.touched.address && formik.errors.address
              ? formik.errors.address
              : undefined
          }
        />

        {/* Property Name + ID Prefix */}
        <div className="flex items-start gap-6">
          <div className="flex-1 flex flex-col gap-1">
            <TextInput
              id="propertyName"
              label="Property Name"
              value={formik.values.propertyName}
              setValue={(v) => formik.setFieldValue("propertyName", v)}
              onBlur={formik.handleBlur}
              placeholder="Enter property name"
              disabled={formik.values.sameAsAddress}
              error={
                formik.touched.propertyName && formik.errors.propertyName
                  ? formik.errors.propertyName
                  : undefined
              }
            />
            <label className="flex items-center gap-1 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={formik.values.sameAsAddress}
                onChange={handleSameAsAddressChange}
                className="accent-brand-primary-red-600-d size-4"
              />
              <span className="text-brand-Text-950-d text-sm font-medium leading-5">
                Same as property address
              </span>
            </label>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <TextInput
              id="idPrefix"
              label="Property ID prefix"
              value={formik.values.idPrefix}
              setValue={(v) => formik.setFieldValue("idPrefix", v)}
              onBlur={formik.handleBlur}
              placeholder="e.g. OAK"
              error={
                formik.touched.idPrefix && formik.errors.idPrefix
                  ? formik.errors.idPrefix
                  : undefined
              }
            />
            <p className="text-brand-primary-blue-600 text-xs font-normal leading-5 tracking-wide">
              Shown at the start of every Emergency ID. Example: OAK000482
            </p>
          </div>
        </div>

        {/* Units per Floor + Number of Floors — hidden for bungalow */}
        {!isBungalow && (
          <div className="flex flex-col gap-1">
            <div className="flex items-start gap-6">
              <TextInput
                id="units"
                label="Units per Floor"
                value={formik.values.units}
                setValue={(v) => formik.setFieldValue("units", v)}
                onBlur={formik.handleBlur}
                placeholder="e.g. 6"
                type="number"
                containerClassName="flex-1"
                error={
                  formik.touched.units && formik.errors.units
                    ? formik.errors.units
                    : undefined
                }
              />
              <TextInput
                id="floors"
                label="Number of Floors"
                value={formik.values.floors}
                setValue={(v) => formik.setFieldValue("floors", v)}
                onBlur={formik.handleBlur}
                placeholder="e.g. 10"
                type="number"
                containerClassName="flex-1"
                error={
                  formik.touched.floors && formik.errors.floors
                    ? formik.errors.floors
                    : undefined
                }
              />
            </div>
            {totalUnits !== null && totalUnits > 0 && (
              <div className="h-10 flex items-center">
                <span className="text-brand-Text-500 text-sm font-normal">
                  Total units:{" "}
                  <span className="text-brand-Text-950-d font-semibold">
                    {totalUnits}
                  </span>
                </span>
              </div>
            )}
          </div>
        )}

        {/* Access Details */}
        <Textarea
          label="Access Details (Optional)"
          value={formik.values.accessDetails}
          onChange={(e) =>
            formik.setFieldValue("accessDetails", e.target.value)
          }
          onBlur={formik.handleBlur}
          placeholder="e.g. Gate code, key location, entry instructions..."
          error={
            formik.touched.accessDetails && formik.errors.accessDetails
              ? formik.errors.accessDetails
              : undefined
          }
        />

        {/* City + State */}
        <div className="flex items-start gap-6">
          <TextInput
            id="city"
            label="City"
            value={formik.values.city}
            setValue={(v) => formik.setFieldValue("city", v)}
            onBlur={formik.handleBlur}
            placeholder="e.g. Austin"
            containerClassName="flex-1"
            error={
              formik.touched.city && formik.errors.city
                ? formik.errors.city
                : undefined
            }
          />
          <TextInput
            id="state"
            label="State"
            value={formik.values.state}
            setValue={(v) => formik.setFieldValue("state", v)}
            onBlur={formik.handleBlur}
            placeholder="e.g. TX"
            containerClassName="flex-1"
            error={
              formik.touched.state && formik.errors.state
                ? formik.errors.state
                : undefined
            }
          />
        </div>
      </div>
    );
  }
);

PropertyInfoStep.displayName = "PropertyInfoStep";
export default PropertyInfoStep;
