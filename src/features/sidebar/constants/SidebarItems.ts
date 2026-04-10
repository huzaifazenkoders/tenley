import {
  AlertTriangle,
  Bell,
  Building2,
  LayoutDashboard,
  Settings,
  UserRound,
  Users
} from "lucide-react";

export const navSections = [
  {
    label: "Overview",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        badge: null,
        href: "/"
      }
    ]
  },
  {
    label: "Operations",
    items: [
      {
        id: "property",
        label: "Property Management",
        icon: Building2,
        badge: null,
        href: "/property-management"
      },
      {
        id: "staff",
        label: "Staff & Roles",
        icon: Users,
        badge: null,
        href: "/staff-and-roles"
      },
      {
        id: "tenants",
        label: "Tenants",
        icon: UserRound,
        badge: null,
        href: "/tenants"
      }
    ]
  },
  {
    label: "Activity & Insights",
    items: [
      {
        id: "emergencies",
        label: "Emergencies",
        icon: AlertTriangle,
        badge: "03",
        href: "/emergency-records"
      },
      {
        id: "notifications",
        label: "Notifications",
        icon: Bell,
        badge: "03",
        href: "/notifications"
      },
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
        badge: null,
        href: "/settings"
      }
    ]
  }
];
