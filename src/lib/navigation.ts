import type { LucideIcon } from "lucide-react";
import {
  LayoutGrid,
  Users,
  Stethoscope,
  User,
  CalendarDays,
  Pill,
  Syringe,
  Phone,
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
    label: "Receptionist",
    icon: Phone,
    href: "/receptionist",
    children: [
      { label: "All Receptionists", href: "/receptionist" },
      { label: "Add Receptionist", href: "/receptionist/add" },
      { label: "Edit Receptionist", href: "/receptionist/edit" },
    ],
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
    children: [
      { label: "Staff Management", href: "/pharmacy/staff" },
      { label: "Add Pharmacy Staff", href: "/pharmacy/staff/add" },
      { label: "Edit Pharmacy Staff", href: "/pharmacy/staff/edit" },
    ],
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
      // Dynamic routes, e.g. /receptionist/123/edit or /pharmacy/staff/123/edit,
      // still belong to their "All ..." / "Staff Management" list child. Action
      // routes like .../add, .../edit or .../roles are excluded so they don't
      // get matched as a parent for some other nested path.
      const parent = item.children.find((c) => {
        const lastSegment = c.href.split("/").pop() ?? "";
        return !["add", "edit", "roles"].includes(lastSegment) && pathname.startsWith(c.href + "/");
      });
      if (parent) return { item, child: parent };
    }
  }
  return { item: null, child: null };
}