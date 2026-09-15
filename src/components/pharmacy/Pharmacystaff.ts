export type PharmacyRole =
    | "Head Pharmacist"
    | "Pharmacist"
    | "Pharmacy Assistant"
    | "Junior Pharmacist";

export type PharmacyStaffStatus = "Active" | "On Leave" | "Inactive";

export type PharmacyShift = "Morning" | "Afternoon" | "Evening" | "Night";

export interface PharmacyStaff {
    id: string;
    name: string;
    email: string;
    employeeId: string;
    role: PharmacyRole;
    assignedUnit: string;
    shift: PharmacyShift;
    status: PharmacyStaffStatus;
    avatarColor: string;
    contactNumber: string;
}

export interface PharmacyStatData {
    id: string;
    label: string;
    value: string;
    icon: "team" | "check" | "crown" | "clipboard";
    iconColor: string;
    iconBg: string;
}

export const PHARMACY_ROLES: PharmacyRole[] = [
    "Head Pharmacist",
    "Pharmacist",
    "Pharmacy Assistant",
    "Junior Pharmacist",
];

export const PHARMACY_UNITS = [
    "Main OPD Unit",
    "Emergency Ward",
    "Inventory Storage",
    "ICU Pharmacy",
    "General Ward",
] as const;

export const PHARMACY_SHIFTS: PharmacyShift[] = ["Morning", "Afternoon", "Evening", "Night"];

export const PHARMACY_STATUS_FILTERS: (PharmacyStaffStatus | "All Status")[] = [
    "All Status",
    "Active",
    "On Leave",
    "Inactive",
];