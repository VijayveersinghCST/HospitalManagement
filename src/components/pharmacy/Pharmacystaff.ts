export type Gender = "Male" | "Female" | "Other";

export type PharmacyRole =
    | "Head Pharmacist"
    | "Senior Pharmacist"
    | "Pharmacist"
    | "Pharmacy Assistant"
    | "Junior Pharmacist";

export type PharmacyStaffStatus = "Active" | "On Leave" | "Inactive";

export type PharmacyShift = "Morning" | "Afternoon" | "Evening" | "Night";

export type DutyType = "Full-Time" | "Part-Time" | "Contract";

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
    residentialAddress: string;
    qualification: string;
    keyResponsibilities: string;
    licenseFileName?: string;
    licenseFileSize?: string;
    licenseUploadedOn?: string;
    lastLoginLabel?: string;
}

export interface PharmacyStatData {
    id: string;
    label: string;
    value: string;
    icon: "team" | "check" | "crown" | "clipboard";
    iconColor: string;
    iconBg: string;
}

export const GENDERS: Gender[] = ["Male", "Female", "Other"];

export const DUTY_TYPES: DutyType[] = ["Full-Time", "Part-Time", "Contract"];

export const PHARMACY_STATUSES: PharmacyStaffStatus[] = ["Active", "On Leave", "Inactive"];

export const PHARMACY_STATUS_FILTERS: (PharmacyStaffStatus | "All Status")[] = [
    "All Status",
    ...PHARMACY_STATUSES,
];

export const SHIFT_TIMING_LABELS: Record<PharmacyShift, string> = {
    Morning: "Morning (08:00 AM - 04:00 PM)",
    Afternoon: "Afternoon (12:00 PM - 08:00 PM)",
    Evening: "Evening (04:00 PM - 12:00 AM)",
    Night: "Night (10:00 PM - 06:00 AM)",
};

export const QUALIFICATIONS = [
    "D.Pharm",
    "B.Pharm",
    "M.Pharm (Clinical Pharmacy)",
    "Pharm.D",
] as const;

export const INDIAN_STATES = ["Delhi", "Uttar Pradesh", "Maharashtra", "Karnataka", "West Bengal", "Punjab"];

export interface AssignedUnitOption {
    id: string;
    label: string;
    icon: "main" | "opd" | "ipd" | "emergency";
}

export const ASSIGNED_UNIT_OPTIONS: AssignedUnitOption[] = [
    { id: "main-pharmacy", label: "Main Pharmacy", icon: "main" },
    { id: "opd-pharmacy", label: "OPD Pharmacy", icon: "opd" },
    { id: "ipd-pharmacy", label: "IPD Pharmacy", icon: "ipd" },
    { id: "emergency-pharmacy", label: "Emergency Pharmacy", icon: "emergency" },
];

export interface ResponsibilityOption {
    id: string;
    label: string;
}

export const RESPONSIBILITY_OPTIONS: ResponsibilityOption[] = [
    { id: "stock-management", label: "Medicine stock management" },
    { id: "supplier-coordination", label: "Supplier coordination" },
    { id: "expiry-monitoring", label: "Expiry monitoring" },
    { id: "dispensing", label: "Dispensing medicines" },
];

export const DEFAULT_PERMISSIONS = [
    "Medicine stock entry & update",
    "Supplier management",
    "Expiry alerts",
    "Billing integration",
];

export interface PersonalInfo {
    fullName: string;
    gender: Gender | "";
    dateOfBirth: string;
    contactNumber: string;
    email: string;
    streetAddress: string;
    city: string;
    state: string;
    pinCode: string;
    emergencyContactName: string;
    emergencyPhoneNumber: string;
}

export interface ProfessionalInfo {
    qualification: string;
    experienceYears: string;
    registrationNumber: string;
    licenseFileName: string;
}

export interface WorkDetails {
    joiningDate: string;
    dutyType: DutyType | "";
    shift: PharmacyShift | "";
    assignedUnit: string;
    responsibilities: string[];
}

export interface PharmacyStaffFormData {
    personalInfo: PersonalInfo;
    professionalInfo: ProfessionalInfo;
    workDetails: WorkDetails;
}

export const emptyPharmacyStaffForm: PharmacyStaffFormData = {
    personalInfo: {
        fullName: "",
        gender: "",
        dateOfBirth: "",
        contactNumber: "",
        email: "",
        streetAddress: "",
        city: "",
        state: "",
        pinCode: "",
        emergencyContactName: "",
        emergencyPhoneNumber: "",
    },
    professionalInfo: { qualification: "", experienceYears: "", registrationNumber: "", licenseFileName: "" },
    workDetails: { joiningDate: "", dutyType: "", shift: "", assignedUnit: "", responsibilities: [] },
};

export function generateUsername(fullName: string, existingCount: number): string {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    const initials = parts.map((p) => p[0]).join("").toUpperCase();
    return `PHARM_${initials || "XX"}_${String(existingCount + 1).padStart(2, "0")}`;
}

export function generatePassword(): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$";
    let pwd = "";
    for (let i = 0; i < 12; i++) pwd += chars[Math.floor(Math.random() * chars.length)];
    return pwd;
}