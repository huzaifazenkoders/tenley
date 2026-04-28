"use client";
import { Button } from "@/components/ui/button";
import { queryKeys } from "@/query-keys";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { Building2, ChevronLeft, ShieldOff } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import AssignedPropertiesTable from "../components/AssignedPropertiesTable";
import StaffProfileCard from "../components/StaffProfileCard";
import { getStaffDetails } from "../services/staff.service";
import { getCompanyIdFromUser } from "../utils/company";

const StaffDetailsSkeleton = () => (
  <div className="flex flex-col gap-6">
    <div className="w-full h-40 bg-brand-base-white rounded-[20px] animate-pulse" />
    <div className="w-full h-80 bg-brand-base-white rounded-[20px] animate-pulse" />
  </div>
);

const StaffByIdView = () => {
  const router = useRouter();
  const { staffId } = useParams<{ staffId: string }>();
  const user = useUserStore((s) => s.user);
  const isUserLoading = useUserStore((s) => s.isLoading);
  const company = useUserStore((s) => s.company);
  const isMeLoading = useUserStore((s) => s.isMeLoading);
  const companyId = company?.id ?? company?.company_id ?? getCompanyIdFromUser(user);

  const {
    data: staff,
    isLoading,
    isError,
  } = useQuery({
    queryKey: queryKeys.staff.details(companyId ?? "", staffId),
    queryFn: () => getStaffDetails(companyId!, staffId),
    enabled: Boolean(companyId && staffId),
  });

  const isInitialLoading = isUserLoading || isMeLoading || isLoading;

  return (
    <div className="px-6 pt-10 pb-6 flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-8">
        <button
          className="flex items-center gap-2 w-fit"
          onClick={() => router.push("/staff-and-roles")}
        >
          <ChevronLeft className="size-5 text-brand-Text-950-d" />
          <span className="text-brand-Text-950-d text-base font-normal leading-5">
            Staff list
          </span>
        </button>

        {isInitialLoading ? (
          <StaffDetailsSkeleton />
        ) : !companyId ? (
          <div className="py-16 bg-brand-base-white rounded-[20px] flex flex-col items-center gap-3">
            <ShieldOff className="size-8 text-brand-Text-300" />
            <span className="text-brand-Text-700 text-sm font-medium">
              Company context is missing
            </span>
          </div>
        ) : isError || !staff ? (
          <div className="py-16 bg-brand-base-white rounded-[20px] flex flex-col items-center gap-4">
            <span className="text-Error-Red-60 text-sm font-medium">
              Unable to load staff details.
            </span>
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              Go back
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <StaffProfileCard
              name={staff.full_name}
              title={staff.designation ?? "-"}
              email={staff.email}
              role={staff.role?.name ?? "Unassigned"}
              permissions={`${staff.permissions.enabled}/${staff.permissions.total}`}
              status={staff.status}
              profileImageUrl={staff.profile_image_url}
            />

            <div className="p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6 overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-primary-red-50 rounded-lg">
                  <Building2 className="size-5 text-brand-primary-red-600-d" />
                </div>
                <span className="text-brand-Text-950-d text-xl font-semibold leading-6">
                  Assigned Properties
                </span>
              </div>
              <AssignedPropertiesTable
                companyId={companyId}
                managerId={staffId}
                properties={staff.properties}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffByIdView;
