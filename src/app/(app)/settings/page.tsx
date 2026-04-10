import SettingsView from "@/features/settings/views/SettingsView";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <SettingsView />
    </Suspense>
  );
};

export default page;
