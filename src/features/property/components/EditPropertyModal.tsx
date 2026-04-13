"use client";
import { Dialog } from "radix-ui";
import { Modal, ModalClose } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { FileUp } from "lucide-react";
import { useState, useEffect } from "react";

type PropertyData = {
  address?: string;
  name?: string;
  city?: string;
  state?: string;
  units?: string;
  floors?: string;
  type?: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyData?: PropertyData;
};

const EditPropertyModal = ({ open, onOpenChange, propertyData }: Props) => {
  const [propertyType, setPropertyType] = useState("apartment");
  const [propertyPurpose, setPropertyPurpose] = useState("residential");
  const [address, setAddress] = useState("123 Main Street");
  const [name, setName] = useState("123 Main Street Boulevard");
  const [idPrefix, setIdPrefix] = useState("OAK");
  const [units, setUnits] = useState("60");
  const [floors, setFloors] = useState("10");
  const [gateCode, setGateCode] = useState("G-153");
  const [city, setCity] = useState("Austin");
  const [state, setState] = useState("TX");

  useEffect(() => {
    if (open && propertyData) {
      setAddress(propertyData.address || "");
      setName(propertyData.name || "");
      setCity(propertyData.city || "");
      setState(propertyData.state || "");
      setUnits(propertyData.units || "");
      setFloors(propertyData.floors || "");
      setPropertyType(propertyData.type?.toLowerCase() || "apartment");
    }
  }, [open, propertyData]);

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="w-[836px] p-6">
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

        {/* Image upload drop zone */}
        <div className="p-6 bg-brand-Text-50 rounded-xl outline outline-1 outline-brand-Text-200 flex flex-col items-center gap-2.5">
          <div className="flex flex-col items-center gap-4 h-36">
            {/* Cloud illustration */}
            <div className="w-24 h-20 relative shrink-0">
              <div className="size-16 left-[16px] top-0 absolute bg-gray-200 rounded-full" />
              <div className="w-20 h-11 left-[14px] top-[11px] absolute shadow-[0px_5px_5px_-3px_rgba(16,24,40,0.03),0px_14px_16px_-3px_rgba(16,24,40,0.08)]">
                <div className="w-20 h-11 left-0 top-0 absolute bg-gray-50" />
                <div className="size-9 left-0 top-[9px] absolute bg-gradient-to-br from-gray-300 to-transparent rounded-full" />
                <div className="size-11 left-[17px] top-0 absolute bg-gradient-to-br from-gray-300 to-transparent rounded-full" />
                <div className="size-8 left-[46px] top-[13px] absolute bg-gradient-to-br from-gray-300 to-transparent rounded-full" />
              </div>
              <div className="size-1.5 left-[11px] top-[9px] absolute bg-gray-100 rounded-full" />
              <div className="size-2.5 left-[7px] top-[69px] absolute bg-gray-100 rounded-full" />
              <div className="size-2.5 left-[94px] top-[19px] absolute bg-gray-100 rounded-full" />
              <div className="size-1.5 left-[88px] top-[3px] absolute bg-gray-100 rounded-full" />
              <div className="size-8 left-[35px] top-[42px] absolute bg-slate-700/40 rounded-3xl backdrop-blur-xs flex items-center justify-center">
                <FileUp className="size-4 text-white" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-Neutral-Grey-100 text-base font-semibold leading-5">
                Upload Property Images
              </p>
              <p className="text-Neutral-Grey-60 text-base font-normal">
                Drag and drop your property images here, or click to browse
              </p>
            </div>
          </div>

          <Button variant="outline-transparent" size="sm">
            Browse Files
          </Button>
        </div>

        {/* Image thumbnails */}
        <div className="flex items-center gap-5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="size-24 relative rounded-xl bg-brand-Text-50 outline outline-1 outline-brand-Text-200"
            />
          ))}
        </div>

        {/* Property Type + Purpose */}
        <div className="flex items-start gap-6">
          <Select
            label="Property Type"
            value={propertyType}
            onValueChange={setPropertyType}
            containerClassName="flex-1"
            options={[
              { value: "apartment", label: "Apartment" },
              { value: "house", label: "House" },
              { value: "commercial", label: "Commercial" }
            ]}
          />
          <Select
            label="Property Purpose"
            value={propertyPurpose}
            onValueChange={setPropertyPurpose}
            containerClassName="flex-1"
            options={[
              { value: "residential", label: "Residential" },
              { value: "commercial", label: "Commercial" }
            ]}
          />
        </div>

        {/* Property Address */}
        <TextInput
          label="Property Address"
          value={address}
          setValue={setAddress}
          containerClassName="w-full"
        />

        {/* Property Name + ID Prefix */}
        <div className="flex items-start gap-6">
          <div className="flex-1 flex flex-col gap-1">
            <TextInput label="Property Name" value={name} setValue={setName} />
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
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
              value={idPrefix}
              setValue={setIdPrefix}
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
            value={units}
            setValue={setUnits}
            containerClassName="flex-1"
          />
          <TextInput
            label="Number of Floors (Optional)"
            value={floors}
            setValue={setFloors}
            containerClassName="flex-1"
          />
        </div>

        {/* Gate Code + City + State */}
        <div className="flex items-start gap-6">
          <div className="flex-1 flex flex-col gap-[3px]">
            <span className="text-sm font-medium text-text-primary">
              Gate Code <span className="text-brand-Text-600">(Optional)</span>
            </span>
            <TextInput value={gateCode} setValue={setGateCode} />
          </div>
          <TextInput
            label="City"
            value={city}
            setValue={setCity}
            containerClassName="flex-1"
          />
          <TextInput
            label="State"
            value={state}
            setValue={setState}
            containerClassName="flex-1"
          />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-brand-Text-100" />

        {/* Footer */}
        <div className="flex justify-end items-center gap-6">
          <Button
            variant="outline-transparent"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Update Property Details
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditPropertyModal;
