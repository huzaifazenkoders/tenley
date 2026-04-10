import EmergencyRecordListView from "@/features/emergency-records/views/EmergencyRecordListView";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <EmergencyRecordListView />
    </Suspense>
  );
};

export default page;
