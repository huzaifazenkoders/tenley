import Image from "next/image";

type Props = {
  name: string;
  title: string;
  email: string;
  role: string;
  permissions: string;
  status: "active" | "invitation-sent";
};

const StaffProfileCard = ({ name, title, email, role, permissions, status }: Props) => (
  <div className="w-full p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-2.5 overflow-hidden">
    <div className="flex items-center gap-14">
      <div className="flex-1 flex flex-col gap-6">
        {/* Avatar + name + status */}
        <div className="flex items-center gap-3">
          <Image src="https://placehold.co/40x40" alt={name} width={40} height={40} className="size-10 rounded-full shrink-0" />
          <div className="flex-1 flex flex-col gap-0.5">
            <span className="text-brand-Text-950-d text-xl font-semibold leading-6">{name}</span>
            <span className="text-brand-Text-600 text-xs font-normal leading-4">{title}</span>
          </div>
          <span className={`px-2.5 py-[3px] rounded-xl text-sm font-normal leading-5 ${status === "active" ? "bg-green-600/10 text-green-600" : "bg-blue-600/10 text-Active-Blue-50"}`}>
            {status === "active" ? "Active" : "Invitation Sent"}
          </span>
        </div>

        {/* Info fields */}
        <div className="flex justify-between items-center">
          <div className="flex-1 flex flex-col justify-between gap-1">
            <span className="text-brand-Text-600 text-sm font-normal leading-5">Email</span>
            <span className="text-brand-Text-950-d text-sm font-normal leading-5">{email}</span>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <span className="text-brand-Text-600 text-sm font-normal leading-5">Role</span>
            <span className="px-3 py-1 bg-brand-primary-red-50 rounded-full outline outline-1 -outline-offset-1 outline-brand-primary-red-200 inline-flex w-fit text-brand-primary-red-500 text-sm font-medium leading-5">
              {role}
            </span>
          </div>
          <div className="flex-1 flex flex-col justify-between gap-1">
            <span className="text-brand-Text-600 text-sm font-normal leading-5">Permissions</span>
            <span className="text-brand-Text-950-d text-sm font-normal leading-5">{permissions}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default StaffProfileCard;
