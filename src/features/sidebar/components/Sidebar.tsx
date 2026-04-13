"use client";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import SidebarExpanded from "./SidebarExpanded";
import SidebarCollapsed from "./SidebarCollapsed";
import { useDebounce } from "use-debounce";

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedD] = useDebounce(collapsed, 200);

  return (
    <div
      className={cn(
        "sticky top-2 self-start px-4 py-6 bg-brand-base-white rounded-2xl outline -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6 transition-all duration-300 ease-in-out",
        collapsed ? "w-22" : "w-68"
      )}
      style={{ height: "calc(100vh - 1rem)" }}
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed((p) => !p)}
        className="absolute -right-3 top-26 z-10 size-6 bg-brand-base-white rounded-full outline -outline-offset-1 outline-brand-Text-100 flex items-center justify-center"
      >
        <ChevronLeft
          className={cn(
            "size-3.5 text-brand-Text-600 transition-transform duration-300",
            collapsed && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "flex flex-col gap-6 w-full h-full",
          "transition-all duration-150 ease-in-out",
          !collapsedD ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <SidebarExpanded currentPathname={pathname} />
      </div>
      <div
        className={cn(
          "flex flex-col gap-6 w-full h-full items-center",
          "px-4 py-6",
          "absolute top-0 bottom-0 left-0",
          "transition-all duration-150 ease-in-out",
          collapsedD ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <SidebarCollapsed currentPathname={pathname} />
      </div>
    </div>
  );
};

export default Sidebar;
