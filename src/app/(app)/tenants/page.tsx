import TenantsView from "@/features/tenants/views/TenantsView";
import { Suspense } from "react";

export default function TenantsPage() {
  return (
    <Suspense>
      <TenantsView />
    </Suspense>
  );
}
