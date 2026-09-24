// src/lib/navigation.ts
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
  Settings2,
  UserCheck,
  BedDouble,

  Wallet,
  Clock,
  Ambulance,
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
    href: "/doctors",
  },
  {
    label: "Nurse",
    icon: Syringe,
    href: "/nurse",
  },
  {
    label: "Staff Management",
    icon: UserCheck,
    href: "/staff-management",
    children: [
      { label: "All Staff", href: "/staff-management" },
      { label: "Add Staff", href: "/staff-management/add" },
      { label: "Daily Roster", href: "/staff-management/roster" },
    ],
  },
  {
    label: "Accountant / Finance",
    icon: Wallet,
    href: "/accountants",
    children: [
      { label: "All Accountants", href: "/accountants" },
      { label: "Add Accountant", href: "/accountants/add" },
      { label: "Edit Accountant", href: "/accountants/edit" },
    ],
  },
  {
    label: "Shift Configuration",
    icon: Clock,
    href: "/shift-config",
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
    children: [
      { label: "All Appointments", href: "/appointments" },
      { label: "Book Appointment", href: "/appointments/add" },
      { label: "Edit Appointment", href: "/appointments/edit" },
    ],
  },
  {
    label: "Ambulances",
    icon: Ambulance,
    href: "/ambulance",
    children: [
      { label: "All Ambulances", href: "/ambulance" },
      { label: "Register Ambulance", href: "/ambulance/add" },
      { label: "Manage Ambulance", href: "/ambulance/edit" },
    ],
  },
  {
    label: "Pharmacy",
    icon: Pill,
    href: "/pharmacy",
    children: [
      { label: "Store Management", href: "/pharmacy/store-management" },
      { label: "Staff Management", href: "/pharmacy/staff" },
      { label: "Add Pharmacy Staff", href: "/pharmacy/staff/add" },
      { label: "Edit Pharmacy Staff", href: "/pharmacy/staff/edit" },
    ],
  },
  {
    label: "Wards, Rooms & Beds Management",
    icon: BedDouble,
    href: "/wardRomsAndBeds/ward-management",
    children: [
      { label: "Ward Management", href: "/wardRomsAndBeds/ward-management" },
      { label: "Rooms Management", href: "/wardRomsAndBeds/room-management" },
      { label: "Beds Management", href: "/wardRomsAndBeds/bed-management" },
    ],
  },
  {
    label: "Hospital Configuration",
    icon: Settings2,
    href: "/hospital-config",
    children: [
      { label: "Overview", href: "/hospital-config" },
      { label: "Departments", href: "/hospital-config/departments" },
      { label: "Wards & Rooms", href: "/hospital-config/wards/all" },
      { label: "Beds", href: "/hospital-config/beds" },
      { label: "Medical Equipment", href: "/hospital-config/equipment" },
    ],
  },
  {
    label: "User & Role Management",
    icon: Users,
    href: "/user-management",
    children: [
      { label: "Roles & Users", href: "/user-management" },
      { label: "Add Role", href: "/user-management/roles/new" },
      { label: "Permissions", href: "/permissions" },
    ],
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
    if (item.children) {
      const child = item.children.find((c) => pathname === c.href);
      if (child) return { item, child };

      // Dynamic/action routes, e.g. /receptionist/123/edit or
      // /accountants/123/edit, still belong to their list-style child.
      // Action segments are excluded so they don't get matched as a
      // parent for some other nested path.
      const parent = item.children.find((c) => {
        const lastSegment = c.href.split("/").pop() ?? "";
        return (
            !["add", "edit", "roles", "new"].includes(lastSegment) &&
            pathname.startsWith(c.href + "/")
        );
      });
      if (parent) return { item, child: parent };
    }

    if (item.href && pathname === item.href) {
      return { item, child: null };
    }
  }
  return { item: null, child: null };
}