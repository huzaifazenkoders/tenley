import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Checkbox = ({
  checked,
  onCheckedChange,
  className
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  className?: string;
}) => (
  <CheckboxPrimitive.Root
    checked={checked}
    onCheckedChange={onCheckedChange}
    className={cn(
      "cursor-pointer",
      "size-6 rounded-md border-2 border-primary flex items-center justify-center transition-colors",
      checked && "bg-primary border-primary",
      className
    )}
  >
    <CheckboxPrimitive.Indicator>
      <Check className="size-4 text-white" strokeWidth={2.5} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);

export default Checkbox;
