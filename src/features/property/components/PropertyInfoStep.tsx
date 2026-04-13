import { Button } from "@/components/ui/button";
import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { CloudUpload } from "lucide-react";

export type PropertyFormData = {
  propertyType: string;
  propertyPurpose: string;
  address: string;
  propertyName: string;
  sameAsAddress: boolean;
  idPrefix: string;
  units: string;
  floors: string;
  gateCode: string;
  city: string;
  state: string;
};

type Props = {
  data: PropertyFormData;
  onChange: (patch: Partial<PropertyFormData>) => void;
};

const PropertyInfoStep = ({ data, onChange }: Props) => (
  <div className="p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6">
    <h2 className="text-brand-Text-800 text-xl font-bold leading-6">
      Property Information
    </h2>

    {/* Image upload */}
    <div className="p-6 bg-brand-Text-50 rounded-xl outline outline-1 outline-brand-Text-200 flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="relative w-24 h-20 flex items-end justify-center">
          <div className="absolute size-16 top-0 left-4 bg-gray-200 rounded-full" />
          <div className="absolute w-20 h-11 left-3 top-2.5 bg-gray-50 rounded-lg shadow-[0px_5px_5px_-3px_rgba(16,24,40,0.03),0px_14px_16px_-3px_rgba(16,24,40,0.08)]" />
          <div className="absolute size-1.5 left-2.5 top-2.5 bg-gray-100 rounded-full" />
          <div className="absolute size-2.5 left-2 bottom-0 bg-gray-100 rounded-full" />
          <div className="absolute size-2.5 right-0 top-5 bg-gray-100 rounded-full" />
          <div className="absolute size-1.5 right-2 top-0.5 bg-gray-100 rounded-full" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 size-8 bg-slate-700/40 rounded-3xl backdrop-blur-sm flex items-center justify-center">
            <CloudUpload className="size-4 text-white" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 w-full text-center">
          <p className="text-base">
            <span className="text-Neutral-Grey-100 font-semibold leading-5">Upload Property Images </span>
            <span className="text-Neutral-Grey-70 font-semibold leading-5">(Optional)</span>
          </p>
          <span className="text-Neutral-Grey-60 text-base font-normal">
            Drag and drop your property images here, or click to browse
          </span>
        </div>
      </div>
      <Button variant="outline-transparent" size="sm">Browse Files</Button>
    </div>

    {/* Property Type + Purpose */}
    <div className="flex items-start gap-6">
      <Select
        label="Property Type"
        value={data.propertyType}
        onValueChange={(v) => onChange({ propertyType: v })}
        placeholder="Select type"
        options={[
          { label: "Bungalow", value: "bungalow" },
          { label: "Mall", value: "mall" },
          { label: "Office", value: "office" },
          { label: "Apartment", value: "apartment" },
        ]}
      />
      <Select
        label="Property Purpose"
        value={data.propertyPurpose}
        onValueChange={(v) => onChange({ propertyPurpose: v })}
        placeholder="Select purpose"
        options={[
          { label: "Residential", value: "residential" },
          { label: "Commercial", value: "commercial" },
        ]}
      />
    </div>

    {/* Property Address */}
    <TextInput
      label="Property Address"
      value={data.address}
      setValue={(v) => onChange({ address: v })}
      placeholder="123 Main Street"
    />

    {/* Property Name + ID Prefix */}
    <div className="flex items-start gap-6">
      <div className="flex-1 flex flex-col gap-1">
        <TextInput
          label="Property Name"
          value={data.propertyName}
          setValue={(v) => onChange({ propertyName: v })}
          placeholder="Enter property name"
        />
        <label className="flex items-center gap-1 cursor-pointer w-fit">
          <input
            type="checkbox"
            checked={data.sameAsAddress}
            onChange={(e) => onChange({ sameAsAddress: e.target.checked })}
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
          value={data.idPrefix}
          setValue={(v) => onChange({ idPrefix: v })}
          placeholder="e.g. OAK"
        />
        <p className="text-brand-primary-blue-600 text-xs font-normal leading-5 tracking-wide">
          Shown at the start of every Emergency ID. Example: OAK-000482
        </p>
      </div>
    </div>

    {/* Units + Floors */}
    <div className="flex items-start gap-6">
      <TextInput
        label="Number of Units"
        value={data.units}
        setValue={(v) => onChange({ units: v })}
        placeholder="e.g. 60"
        type="number"
        containerClassName="flex-1"
      />
      <TextInput
        label="Number of Floors (Optional)"
        value={data.floors}
        setValue={(v) => onChange({ floors: v })}
        placeholder="e.g. 10"
        type="number"
        containerClassName="flex-1"
      />
    </div>

    {/* Gate Code + City + State */}
    <div className="flex items-start gap-6">
      <TextInput
        label="Gate Code (Optional)"
        value={data.gateCode}
        setValue={(v) => onChange({ gateCode: v })}
        placeholder="e.g. G-153"
        containerClassName="flex-1"
      />
      <TextInput
        label="City"
        value={data.city}
        setValue={(v) => onChange({ city: v })}
        placeholder="e.g. Austin"
        containerClassName="flex-1"
      />
      <TextInput
        label="State"
        value={data.state}
        setValue={(v) => onChange({ state: v })}
        placeholder="e.g. TX"
        containerClassName="flex-1"
      />
    </div>
  </div>
);

export default PropertyInfoStep;
