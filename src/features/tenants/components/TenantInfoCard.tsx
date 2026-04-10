"use client";
import Dropdown from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import { Mail, MoreVertical, Pencil, Phone, Trash2, User, UserMinus, Users } from "lucide-react";
import { useState } from "react";
import EditTenantModal from "./EditTenantModal";
import RemoveTenantModal from "./RemoveTenantModal";

type TenantRole = "Head of Household" | "Family Member";

type TenantMember = {
  id: number;
  label: string;
  name: string;
  email: string;
  phone: string;
  role: TenantRole;
};

const members: TenantMember[] = [
  { id: 1, label: "Tenant 01", name: "John Smith", email: "john@example.com", phone: "(555) 123-4567", role: "Head of Household" },
  { id: 2, label: "Tenant 02", name: "Max William", email: "max@example.com", phone: "(555) 123-4567", role: "Family Member" },
  { id: 3, label: "Tenant 03", name: "Alex Warren", email: "alex@example.com", phone: "(555) 123-4567", role: "Family Member" },
];

const RoleBadge = ({ role }: { role: TenantRole }) => {
  const isHead = role === "Head of Household";
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium leading-4 ${isHead ? "bg-indigo-500/10 text-indigo-500" : "bg-red-500/10 text-red-500"}`}>
      {role}
    </span>
  );
};

const IconField = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div className="flex items-center gap-2">
    <div className="p-1.5 bg-brand-Text-50 rounded-full">
      <Icon className="size-4 text-brand-Text-800" />
    </div>
    <div className="flex flex-col">
      <span className="text-brand-Text-500 text-xs font-normal leading-4">{label}</span>
      <span className="text-brand-Text-800 text-xs font-medium leading-4">{value}</span>
    </div>
  </div>
);

const TenantMemberCard = ({
  member,
  onEdit,
  onRemove,
}: {
  member: TenantMember;
  onEdit: () => void;
  onRemove: () => void;
}) => (
  <div className="p-4 bg-brand-base-white rounded-xl outline outline-1 outline-brand-Text-100 flex flex-col gap-2.5 overflow-hidden">
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <span className="text-brand-Text-950-d text-base font-semibold leading-5">{member.label}</span>
        <div className="flex items-center gap-3">
          <RoleBadge role={member.role} />
          <Dropdown
            items={[
              {
                value: "edit",
                label: (
                  <span className="flex items-center gap-2 text-brand-Text-800">
                    <Pencil className="size-4" />
                    Edit Tenant
                  </span>
                ),
                onClick: () => onEdit(),
              },
              {
                value: "remove",
                label: (
                  <span className="flex items-center gap-2 text-Error-Red-60">
                    <UserMinus className="size-4" />
                    Remove Tenant
                  </span>
                ),
                onClick: () => onRemove(),
              },
            ]}
            contentClassName="min-w-40"
          >
            <Button size="icon" variant="ghost" className="size-6">
              <MoreVertical className="size-4 text-brand-Text-800" />
            </Button>
          </Dropdown>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <IconField icon={User} label="Tenant Name" value={member.name} />
        <div className="flex justify-between items-center">
          <IconField icon={Mail} label="Email" value={member.email} />
          <IconField icon={Phone} label="Phone Number" value={member.phone} />
        </div>
      </div>
    </div>
  </div>
);

const TenantInfoCard = () => {
  const [editMember, setEditMember] = useState<TenantMember | null>(null);
  const [removeMember, setRemoveMember] = useState<TenantMember | null>(null);

  return (
    <>
      <EditTenantModal
        open={!!editMember}
        onOpenChange={(o) => !o && setEditMember(null)}
        tenantName={editMember?.name}
      />
      <RemoveTenantModal
        open={!!removeMember}
        onOpenChange={(o) => !o && setRemoveMember(null)}
        tenantName={removeMember?.name}
      />

      <div className="p-6 bg-brand-base-white rounded-[20px] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-10 overflow-hidden">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-primary-red-50 rounded-lg">
              <Users className="size-5 text-brand-primary-red-600-d" />
            </div>
            <span className="text-brand-Text-950-d text-xl font-semibold leading-6">Tenant Information</span>
          </div>
          <Dropdown
            items={[
              { value: "add", label: <span className="flex items-center gap-2"><User className="size-4" />Add Tenant</span> },
              { value: "export", label: <span className="flex items-center gap-2"><Trash2 className="size-4" />Export</span> },
            ]}
            contentClassName="min-w-36"
          >
            <Button size="icon" variant="ghost" className="size-6">
              <MoreVertical className="size-4 text-brand-Text-800" />
            </Button>
          </Dropdown>
        </div>

        <div className="flex flex-col gap-4">
          {members.map((m) => (
            <TenantMemberCard
              key={m.id}
              member={m}
              onEdit={() => setEditMember(m)}
              onRemove={() => setRemoveMember(m)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TenantInfoCard;
