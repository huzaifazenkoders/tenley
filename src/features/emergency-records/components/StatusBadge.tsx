import { cn } from "@/lib/utils";

type Status = "open" | "in-progress" | "completed";

const statusConfig: Record<Status, { label: string; className: string }> = {
  open: {
    label: "Open",
    className: "bg-brand-primary-red-50 text-brand-primary-red-500"
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-amber-500/10 text-yellow-600"
  },
  completed: {
    label: "Completed",
    className: "bg-green-600/10 text-green-600"
  }
};

const StatusBadge = ({ status }: { status: Status }) => {
  const { label, className } = statusConfig[status];
  return (
    <span className={cn("px-3 py-1 rounded-xl text-xs font-normal", className)}>
      {label}
    </span>
  );
};

export default StatusBadge;
