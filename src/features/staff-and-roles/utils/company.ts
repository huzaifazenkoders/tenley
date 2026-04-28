import type { User } from "@supabase/supabase-js";

type Metadata = Record<string, unknown>;

const getNestedCompanyId = (metadata: Metadata): string | null => {
  const direct = metadata.company_id;
  if (typeof direct === "string" && direct) return direct;

  const company = metadata.company;
  if (
    typeof company === "object" &&
    company !== null &&
    "id" in company &&
    typeof company.id === "string" &&
    company.id
  ) {
    return company.id;
  }

  return null;
};

export const getCompanyIdFromUser = (user: User | null): string | null => {
  if (!user) return null;

  return (
    getNestedCompanyId(user.app_metadata ?? {}) ??
    getNestedCompanyId(user.user_metadata ?? {})
  );
};
