import Image from "next/image";
import { Dialog } from "radix-ui";
import { Sheet, SheetClose } from "@/components/ui/sheet";

const users = [
  { id: "1", name: "Bessie Cooper", role: "Maintenance Technician" },
  { id: "2", name: "Darlene Robertson", role: "Maintenance Technician" },
  { id: "3", name: "Cody Fisher", role: "Maintenance Technician" },
  { id: "4", name: "Eleanor Pena", role: "Maintenance Technician" },
  { id: "5", name: "Jane Cooper", role: "Maintenance Technician" },
  { id: "6", name: "Esther Howard", role: "Maintenance Technician" },
  { id: "7", name: "Cameron Williamson", role: "Maintenance Technician" },
  { id: "8", name: "Robert Fox", role: "Maintenance Technician" },
  { id: "9", name: "Ralph Edwards", role: "Maintenance Technician" },
  { id: "10", name: "Ronald Richards", role: "Maintenance Technician" }
];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
};

const UserItem = ({ name, role }: { name: string; role: string }) => (
  <div className="flex items-center gap-2">
    <Image
      src="/assets/mock/person1.png"
      alt={name}
      width={48}
      height={48}
      className="rounded-full"
      unoptimized
    />
    <div className="flex flex-col gap-0.5">
      <span className="text-brand-Text-950-d text-sm font-semibold leading-5">
        {name}
      </span>
      <span className="text-brand-Text-600 text-xs font-normal leading-4">
        {role}
      </span>
    </div>
  </div>
);

const BroadcastDetailSheet = ({ open, onOpenChange, title }: Props) => {
  const pairs = Array.from({ length: Math.ceil(users.length / 2) }, (_, i) =>
    users.slice(i * 2, i * 2 + 2)
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange} className="w-[743px]">
      {/* Header */}
      <Dialog.Title className="px-6 pt-8 pb-4 flex items-center gap-3">
        <span className="flex-1 text-brand-Text-950-d text-xl font-semibold leading-6">
          {title}
        </span>
        <SheetClose />
      </Dialog.Title>

      <Dialog.Description className="hidden" />

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
        <span className="text-brand-Text-950-d text-base font-semibold leading-5">
          All Users
        </span>
        <div className="p-4 rounded-lg outline outline-1 outline-offset-[-1px] outline-brand-Text-100 flex flex-col gap-3">
          {pairs.map((pair, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                {pair.map((user) => (
                  <UserItem key={user.id} name={user.name} role={user.role} />
                ))}
              </div>
              {i < pairs.length - 1 && (
                <div className="h-px bg-brand-Text-100" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Sheet>
  );
};

export default BroadcastDetailSheet;
