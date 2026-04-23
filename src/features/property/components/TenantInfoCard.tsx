"use client";
import Dropdown from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Mail, MoreVertical, Phone, User, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import AddTenantModal from "./AddTenantModal";
import EndTenancyModal from "./EndTenancyModal";

type TenantRole = "Head of Household" | "Family Member";

type Tenant = {
  id: string;
  label: string;
  name: string;
  email: string;
  phone: string;
  role: TenantRole;
};

type Props = {
  tenants?: Tenant[];
};

const roleBadge: Record<TenantRole, { bg: string; text: string }> = {
  "Head of Household": { bg: "bg-indigo-500/10", text: "text-indigo-500" },
  "Family Member": { bg: "bg-red-500/10", text: "text-red-500" }
};

const InfoField = ({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-2">
    <div className="p-1.5 bg-brand-Text-50 rounded-full flex items-center justify-center">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-brand-Text-500 text-xs font-normal leading-4">
        {label}
      </span>
      <span className="text-brand-Text-800 text-xs font-medium leading-4">
        {value}
      </span>
    </div>
  </div>
);

const TenantRow = ({ tenant }: { tenant: Tenant }) => {
  const badge = roleBadge[tenant.role];
  const [editOpen, setEditOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  return (
    <>
      <div className="p-4 bg-brand-base-white rounded-xl outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-brand-Text-950-d text-base font-semibold leading-5">
              {tenant.label}
            </span>
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium leading-4",
                badge.bg,
                badge.text
              )}
            >
              {tenant.role}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Dropdown
              items={[
                {
                  value: "edit",
                  label: "Edit Tenant",
                  onClick: () => setEditOpen(true)
                },
                {
                  value: "remove",
                  label: (
                    <span className="text-brand-primary-red-600-d">
                      End Tenant
                    </span>
                  ),
                  onClick: () => setEndOpen(true)
                }
              ]}
              contentClassName="w-40"
            >
              <button className="size-6 flex items-center justify-center text-brand-Text-800 hover:text-brand-Text-950-d">
                <MoreVertical className="size-4" />
              </button>
            </Dropdown>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <InfoField
            icon={<User className="size-4 text-brand-Text-800" />}
            label="Tenant Name"
            value={tenant.name}
          />
          <div className="flex items-center justify-between">
            <InfoField
              icon={<Mail className="size-4 text-brand-Text-800" />}
              label="Email"
              value={tenant.email}
            />
            <div className="w-36">
              <InfoField
                icon={<Phone className="size-4 text-brand-Text-800" />}
                label="Phone Number"
                value={tenant.phone}
              />
            </div>
          </div>
        </div>
      </div>
      <AddTenantModal
        open={editOpen}
        onOpenChange={setEditOpen}
        tenants={[]}
        prefill={{
          name: tenant.name,
          email: tenant.email,
          phone: tenant.phone,
          role: tenant.role
        }}
        title="Edit Tenant"
      />
      <EndTenancyModal open={endOpen} onOpenChange={setEndOpen} />
    </>
  );
};

const MOCK_TENANTS: Tenant[] = [
  {
    id: "t1",
    label: "Tenant 01",
    name: "John Smith",
    email: "john@example.com",
    phone: "(555) 123-4567",
    role: "Head of Household"
  },
  {
    id: "t2",
    label: "Tenant 02",
    name: "Max William",
    email: "max@example.com",
    phone: "(555) 123-4567",
    role: "Family Member"
  },
  {
    id: "t3",
    label: "Tenant 03",
    name: "Alex Warren",
    email: "alex@example.com",
    phone: "(555) 123-4567",
    role: "Family Member"
  }
];

const TenantInfoCard = ({ tenants = MOCK_TENANTS }: Props) => {
  const hasTenants = tenants.length > 0;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="p-6 bg-brand-base-white rounded-[20px] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-primary-red-50 rounded-lg">
              <Users className="size-5 text-brand-primary-red-600-d" />
            </div>
            <span className="text-brand-Text-950-d text-xl font-semibold leading-6 shrink-0 w-fit">
              Tenant Information
            </span>
          </div>
          {hasTenants && (
            <div className="">
              <Dropdown
                items={[
                  {
                    value: "add",
                    label: "Add New Member",
                    onClick: () => setModalOpen(true)
                  },
                  {
                    value: "end",
                    label: (
                      <span className="text-brand-primary-red-600-d">
                        End Tenancy
                      </span>
                    ),
                    onClick: () => {}
                  }
                ]}
                contentClassName="w-44"
              >
                <button className="size-6 flex items-center justify-center text-brand-Text-800 hover:text-brand-Text-950-d">
                  <MoreVertical className="size-4" />
                </button>
              </Dropdown>
            </div>
          )}
        </div>

        {hasTenants ? (
          <div className="flex flex-col gap-4">
            {tenants.map((t) => (
              <TenantRow key={t.id} tenant={t} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="p-4 bg-brand-Text-50 rounded-full">
              <Users className="size-10 text-brand-Text-400" />
            </div>
            <div className="flex flex-col items-center gap-1 text-center max-w-xs">
              <p className="text-brand-Text-950-d text-xl font-bold leading-6">
                No Tenants Added Yet
              </p>
              <p className="text-brand-Text-500 text-sm font-normal leading-5">
                Start adding tenants to track move-ins, lease details, and unit
                occupancy across your properties.
              </p>
            </div>
            <Button size="sm" onClick={() => setModalOpen(true)}>
              <UserPlus className="size-4" /> Add Tenant
            </Button>
          </div>
        )}
      </div>
      <AddTenantModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        tenants={tenants}
      />
    </>
  );
};

export default TenantInfoCard;
