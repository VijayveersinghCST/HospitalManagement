import type { LucideIcon } from "lucide-react";
import {
  LayoutGrid,
  Users,
  Stethoscope,
  User,
  CalendarDays,
  Pill,
  Syringe,
} from "lucide-react";

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  children?: NavChild[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    icon: LayoutGrid,
    href: "/dashboard",
  },
  {
    label: "Doctor Management",
    icon: Stethoscope,
    href: "/doctors"
  },
  {
    label: "Nurse",
    icon: Syringe,
    href: "/doctors"
  },
  {
    label: "Patients",
    icon: User,
    href: "/patients",
  },
  {
    label: "Appointments",
    icon: CalendarDays,
    href: "/appointments",
  },
  {
    label: "Pharmacy",
    icon: Pill,
    href: "/pharmacy",
  },
  {
    label: "User & Role Management",
    icon: Users,
    href: "/user-management",
  },
];

/**
 * Finds the nav item (and, if applicable, the child) that matches the given
 * pathname, so the Sidebar can highlight the active link and the Topbar can
 * build a breadcrumb.
 */
export function findActiveNav(pathname: string): {
  item: NavItem | null;
  child: NavChild | null;
} {
  for (const item of NAV_ITEMS) {
    if (item.href && pathname === item.href) {
      return { item, child: null };
    }
    if (item.children) {
      const child = item.children.find((c) => pathname === c.href);
      if (child) return { item, child };
      // Dynamic routes, e.g. /doctors/123/edit, still belong to "Doctor List"
      const parent = item.children.find(
        (c) => c.href !== "/doctors/add" && c.href !== "/doctors/roles" && pathname.startsWith(c.href + "/")
      );
      if (parent) return { item, child: parent };
    }
  }
  return { item: null, child: null };
}
