"use client";
import DashboardEmptyState from "./DashboardEmptyState";
import DashboardDataView from "./DashboardDataView";

// Replace with real data check (e.g. from API/context)
const HAS_DATA = true;

const DashboardView = () => (
  <div className="px-6 pt-10 pb-6 flex flex-col gap-6 w-full min-h-full">
    {HAS_DATA ? <DashboardDataView /> : <DashboardEmptyState />}
  </div>
);

export default DashboardView;
