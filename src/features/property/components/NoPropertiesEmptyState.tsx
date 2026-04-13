import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NoPropertiesIllustration from "./NoPropertiesIllustration";

type Props = {
  onAddProperty?: () => void;
};

const NoPropertiesEmptyState = ({ onAddProperty }: Props) => (
  <div className="flex-1 flex flex-col items-center justify-center gap-6 py-20">
    <NoPropertiesIllustration />
    <div className="flex flex-col items-center gap-3 text-center max-w-md">
      <h2 className="text-brand-Text-950-d text-2xl font-bold leading-8">
        No Properties Added
      </h2>
      <p className="text-brand-Text-600 text-base font-normal leading-5">
        Your company doesn&apos;t have any properties set up. Add your first
        property to start assigning staff and handling emergencies.
      </p>
    </div>
    <Button size="lg" onClick={onAddProperty}>
      <Plus className="size-4" />
      Add Property
    </Button>
  </div>
);

export default NoPropertiesEmptyState;
