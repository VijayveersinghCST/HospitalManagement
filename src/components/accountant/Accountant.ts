export type Gender = "Male" | "Female" | "Other";

export type AccountantStatus = "Active" | "On Leave" | "Pending" | "Inactive";

export type ShiftType = "General (9 AM - 6 PM)" | "Morning (7 AM - 3 PM)" | "Evening (2 PM - 10 PM)";

export interface Accountant {
    id: string;
    staffId: string;
    fullName: string;
    designation: string;
    email: string;
    contactNumber: string;
    emergencyContact: string;
    residentialAddress: string;
    status: AccountantStatus;
    avatarColor: string;
    lastLoginLabel: string;
    lastActiveLabel?: string;
    department: string;
    shiftType: ShiftType;
    availableOnCall: boolean;
    workingDays: string[];
    assignedResponsibilities: string[];
    licenseNumber?: string;
    certificateRenewalDate?: string;
    highestQualification?: string;
    experienceYears?: string;
    specializationAreas?: string[];
    registrationId?: string;
    certificateFileName?: string;
    certificateFileSize?: string;
}

export interface AccountantStatData {
    id: string;
    label: string;
    value: string;
    footnote?: string;
    footnoteColor?: string;
    icon: "team" | "check" | "alert" | "leave";
    iconColor: string;
    iconBg: string;
}

export const GENDERS: Gender[] = ["Male", "Female", "Other"];

export const ACCOUNTANT_STATUSES: AccountantStatus[] = ["Active", "On Leave", "Pending", "Inactive"];

export const DEPARTMENTS = ["Finance & Accounts", "Billing", "Payroll", "Auditing"];

export const DESIGNATIONS = ["Senior Accountant", "Junior Accountant", "Finance Manager", "Billing Executive", "Billing Clerk"];

export const SHIFT_TYPES: ShiftType[] = ["General (9 AM - 6 PM)", "Morning (7 AM - 3 PM)", "Evening (2 PM - 10 PM)"];

export const WEEK_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export const QUALIFICATIONS = ["B.Com", "M.Com", "CA (Chartered Accountant)", "MBA Finance", "CPA"] as const;

export const SPECIALIZATION_SUGGESTIONS = ["Auditing", "Insurance Claims", "Payroll", "Hospital Billing", "Taxation"];

export const RESPONSIBILITY_SUGGESTIONS = ["Payroll", "Tax Filing", "Billing", "Auditing", "Insurance Claims", "Reconciliation"];

export const COUNTRIES = ["United States", "India"];

export interface PersonalInfo {
    fullName: string;
    dateOfBirth: string;
    gender: Gender | "";
    contactNumber: string;
    email: string;
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
}

export interface ProfessionalInfo {
    highestQualification: string;
    experienceYears: string;
    specializationAreas: string[];
    registrationId: string;
    certificateFileName: string;
}

export interface AccountantFormData {
    personalInfo: PersonalInfo;
    professionalInfo: ProfessionalInfo;
}

export const emptyAccountantForm: AccountantFormData = {
    personalInfo: {
        fullName: "",
        dateOfBirth: "",
        gender: "",
        contactNumber: "",
        email: "",
        streetAddress: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    },
    professionalInfo: {
        highestQualification: "",
        experienceYears: "",
        specializationAreas: [],
        registrationId: "",
        certificateFileName: "",
    },
};

export function generateStaffId(existingCount: number): string {
    return `ACC-${String(existingCount + 1).padStart(3, "0")}`;
}