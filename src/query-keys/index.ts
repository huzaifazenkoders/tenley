export const queryKeys = {
  // auth
  auth: {
    me: ["auth", "me"] as const,
  },
  roles: {
    all: ["roles"] as const,
    details: (id: string) => ["roles", id] as const,
  },
  permissions: {
    all: ["permissions"] as const,
  },
  tenants: {
    list: (status: string, params: object) =>
      ["tenants", "list", status, params] as const,
  },
} as const;
