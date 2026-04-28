import Image from "next/image";

type Props = {
  name: string;
  title?: string | null;
  email: string;
  status?: string | null;
  profileImageUrl?: string | null;
};

const getStatusLabel = (status: string) => {
  if (status === "invitation_accepted") return "Active";
  return status
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const StaffProfileCard = ({
  name,
  title,
  email,
  status,
  profileImageUrl,
}: Props) => (
  <div className="w-full p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-2.5 overflow-hidden">
    <div className="flex items-center gap-14">
      <div className="flex-1 flex flex-col gap-6">
        {/* Avatar + name + status */}
        <div className="flex items-center gap-3">
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              alt={name}
              width={40}
              height={40}
              className="size-10 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="size-10 rounded-full bg-brand-Text-100 flex items-center justify-center shrink-0 text-brand-Text-600 text-sm font-semibold">
              {name[0]?.toUpperCase() ?? "?"}
            </div>
          )}
          <div className="flex-1 flex flex-col gap-0.5">
            <span className="text-brand-Text-950-d text-xl font-semibold leading-6">
              {name}
            </span>
            {title && (
              <span className="text-brand-Text-600 text-xs font-normal leading-4">
                {title}
              </span>
            )}
          </div>
          {status && (
            <span
              className={`px-2.5 py-[3px] rounded-xl text-sm font-normal leading-5 ${status === "invitation_accepted" ? "bg-green-600/10 text-green-600" : "bg-blue-600/10 text-Active-Blue-50"}`}
            >
              {getStatusLabel(status)}
            </span>
          )}
        </div>

        {/* Info fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex-1 flex flex-col justify-between gap-1">
            <span className="text-brand-Text-600 text-sm font-normal leading-5">
              Email
            </span>
            <span className="text-brand-Text-950-d text-sm font-normal leading-5">
              {email}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default StaffProfileCard;
