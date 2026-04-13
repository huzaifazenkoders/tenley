import StaffAndRolesListingsView from "@/features/staff-and-roles/views/StaffAndRolesListingsView";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <StaffAndRolesListingsView />
    </Suspense>
  );
};

export default page;
