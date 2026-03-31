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
        badge: null
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
        badge: null
      },
      { id: "staff", label: "Staff & Roles", icon: Users, badge: null },
      { id: "tenants", label: "Tenants", icon: UserRound, badge: null }
    ]
  },
  {
    label: "Activity & Insights",
    items: [
      {
        id: "emergencies",
        label: "Emergencies",
        icon: AlertTriangle,
        badge: "03"
      },
      { id: "notifications", label: "Notifications", icon: Bell, badge: "03" },
      { id: "settings", label: "Settings", icon: Settings, badge: null }
    ]
  }
];
