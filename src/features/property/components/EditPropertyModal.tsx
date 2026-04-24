"use client";
import { Dialog } from "radix-ui";
import { Modal, ModalClose } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { useState, useEffect } from "react";
import type { Property } from "../types";
import { PropertyPurpose, PropertyType } from "../types/enums";
import { updateProperty } from "../services";
import PropertyImagesUploader from "./PropertyImagesUploader";
import { Loader2 } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property?: Property;
  onSuccess?: () => void;
};

const EditPropertyModal = ({
  open,
  onOpenChange,
  property,
  onSuccess
}: Props) => {
  const [propertyType, setPropertyType] = useState<PropertyType | "">("");
  const [propertyPurpose, setPropertyPurpose] = useState<PropertyPurpose | "">(
    ""
  );
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [idPrefix, setIdPrefix] = useState("");
  const [units, setUnits] = useState("");
  const [floors, setFloors] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [accessDetails, setAccessDetails] = useState("");
  const [propertyImages, setPropertyImages] = useState<string[]>([]);
  const [sameAsAddress, setSameAsAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!property) return;
    setIsSubmitting(true);
    const { error } = await updateProperty({
      id: property.id,
      property_name: name,
      property_address: address,
      property_type: propertyType as PropertyType,
      property_purpose: propertyPurpose as PropertyPurpose,
      property_images: propertyImages.length ? propertyImages : undefined,
      property_id_prefix: idPrefix || undefined,
      access_details: accessDetails || undefined,
      city: city || undefined,
      state: state || undefined,
      number_of_unit: parseInt(units) || undefined,
      number_of_floors: parseInt(floors) || undefined
    });
    setIsSubmitting(false);
    if (!error) {
      onOpenChange(false);
      onSuccess?.();
    }
  };

  useEffect(() => {
    if (open && property) {
      setPropertyType(property.property_type);
      setPropertyPurpose(property.property_purpose);
      setAddress(property.property_address);
      setName(property.property_name);
      setIdPrefix(property.property_id_prefix ?? "");
      setUnits(String(property.number_of_unit ?? ""));
      setFloors(String(property.number_of_floors ?? ""));
      setCity(property.city ?? "");
      setState(property.state ?? "");
      setAccessDetails(property.access_details ?? "");
      setPropertyImages(property.property_images ?? []);
      setSameAsAddress(property.property_name === property.property_address);
    }
  }, [open, property]);

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

        {/* Image upload */}
        <PropertyImagesUploader
          value={propertyImages}
          onChange={setPropertyImages}
        />

        {/* Property Type + Purpose */}
        <div className="flex items-start gap-6">
          <div className="w-1/2">
            <Select
              label="Property Type"
              value={propertyType}
              onValueChange={(v) => setPropertyType(v as PropertyType)}
              containerClassName="flex-1"
              options={[
                { label: "Bungalow", value: PropertyType.Bungalow },
                { label: "Mall", value: PropertyType.Mall },
                { label: "Office", value: PropertyType.Office },
                { label: "Apartment", value: PropertyType.Apartment }
              ]}
            />
          </div>
          <div className="w-1/2">
            <Select
              label="Property Purpose"
              value={propertyPurpose}
              onValueChange={(v) => setPropertyPurpose(v as PropertyPurpose)}
              containerClassName="flex-1"
              options={[
                { label: "Residential", value: PropertyPurpose.Residential },
                { label: "Commercial", value: PropertyPurpose.Commercial }
              ]}
            />
          </div>
        </div>

        {/* Property Address */}
        <TextInput
          label="Property Address"
          value={address}
          setValue={(v) => {
            setAddress(v);
            if (sameAsAddress) setName(v);
          }}
          containerClassName="w-full"
        />

        {/* Property Name + ID Prefix */}
        <div className="flex items-start gap-6">
          <div className="flex-1 flex flex-col gap-1">
            <TextInput label="Property Name" value={name} setValue={setName} />
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={sameAsAddress}
                onChange={(e) => {
                  setSameAsAddress(e.target.checked);
                  if (e.target.checked) setName(address);
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
              value={idPrefix}
              setValue={setIdPrefix}
            />
            <p className="text-brand-primary-blue-600 text-xs font-normal leading-5 tracking-wide">
              Shown at the start of every Emergency ID. Example: OAK000482
            </p>
          </div>
        </div>

        {/* Units + Floors */}
        <div className="flex items-start gap-6">
          <TextInput
            label="Number of Units"
            value={units}
            setValue={setUnits}
            type="number"
            containerClassName="flex-1"
          />
          <TextInput
            label="Number of Floors"
            value={floors}
            setValue={setFloors}
            type="number"
            containerClassName="flex-1"
          />
        </div>

        {/* Access Details + City + State */}
        <TextInput
          label="Access Details (Optional)"
          value={accessDetails}
          setValue={setAccessDetails}
          containerClassName="w-full"
        />
        <div className="flex items-start gap-6">
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
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Update Property Details"
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditPropertyModal;
