import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const AssignStaffIllustration = () => (
  <svg width="200" height="140" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ground */}
    <rect x="10" y="128" width="180" height="3" rx="1.5" fill="#E5E5E5" />

    {/* Building left */}
    <rect x="15" y="60" width="40" height="68" rx="2" fill="#475569" />
    <rect x="15" y="60" width="40" height="5" rx="1" fill="#334155" />
    {[0,1].map(c => [0,1,2,3].map(r => (
      <rect key={`bl-${c}-${r}`} x={21 + c*16} y={70 + r*14} width="8" height="9" rx="1" fill="white" opacity="0.25" />
    )))}

    {/* Building center-left */}
    <rect x="65" y="40" width="35" height="88" rx="2" fill="#334155" />
    <rect x="65" y="40" width="35" height="5" rx="1" fill="#1E293B" />
    {[0,1].map(c => [0,1,2,3,4].map(r => (
      <rect key={`bc-${c}-${r}`} x={70 + c*14} y={50 + r*14} width="8" height="9" rx="1" fill="white" opacity="0.2" />
    )))}

    {/* Building right */}
    <rect x="145" y="55" width="42" height="73" rx="2" fill="#475569" />
    <rect x="145" y="55" width="42" height="5" rx="1" fill="#334155" />
    {[0,1].map(c => [0,1,2,3].map(r => (
      <rect key={`br-${c}-${r}`} x={151 + c*16} y={65 + r*14} width="8" height="9" rx="1" fill="white" opacity="0.25" />
    )))}

    {/* Person 1 */}
    <circle cx="100" cy="95" r="8" fill="#E5E7EB" />
    <rect x="88" y="105" width="24" height="23" rx="4" fill="#D1D5DB" />
    {/* Person 2 */}
    <circle cx="76" cy="98" r="7" fill="#E5E7EB" />
    <rect x="65" y="107" width="22" height="21" rx="4" fill="#D1D5DB" />
    {/* Person 3 */}
    <circle cx="124" cy="98" r="7" fill="#E5E7EB" />
    <rect x="113" y="107" width="22" height="21" rx="4" fill="#D1D5DB" />

    {/* Plus badge */}
    <circle cx="130" cy="88" r="9" fill="#DB3E31" />
    <rect x="129" y="83" width="2" height="10" rx="1" fill="white" />
    <rect x="125" y="87" width="10" height="2" rx="1" fill="white" />

    {/* Road */}
    <rect x="10" y="125" width="180" height="6" rx="1" fill="#D1D5DB" />
    <rect x="45" y="127" width="12" height="2" rx="1" fill="white" opacity="0.6" />
    <rect x="94" y="127" width="12" height="2" rx="1" fill="white" opacity="0.6" />
    <rect x="143" y="127" width="12" height="2" rx="1" fill="white" opacity="0.6" />
  </svg>
);

type Props = {
  onInviteStaff?: () => void;
};

const AssignStaffStep = ({ onInviteStaff }: Props) => (
  <div className="p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6">
    <h2 className="text-brand-Text-800 text-xl font-bold leading-6">
      <span>Assign Staff </span>
      <span className="text-brand-Text-500">(Optional)</span>
    </h2>

    <div className="flex flex-col items-center gap-4 py-10">
      <AssignStaffIllustration />
      <div className="flex flex-col items-center gap-1 text-center max-w-xs">
        <p className="text-brand-Text-950-d text-xl font-bold leading-6">
          No Staff Members Added Yet
        </p>
        <p className="text-brand-Text-500 text-sm font-normal leading-5">
          Add staff members to manage and oversee your properties.
        </p>
      </div>
      <Button size="sm" onClick={onInviteStaff}>
        <UserPlus className="size-4" /> Invite Staff
      </Button>
    </div>
  </div>
);

export default AssignStaffStep;
