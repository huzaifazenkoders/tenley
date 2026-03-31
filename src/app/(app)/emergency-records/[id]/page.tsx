import EmergencyRecordByIdView from "@/features/emergency-records/views/EmergencyRecordByIdView";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <EmergencyRecordByIdView id={id} />;
};

export default page;
