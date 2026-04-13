import Sidebar from "@/features/sidebar/components/Sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen p-2 gap-2.5 bg-[#fafafa]">
      <Sidebar />
      <main className="flex-1 container mx-auto">{children}</main>
    </div>
  );
};

export default layout;
