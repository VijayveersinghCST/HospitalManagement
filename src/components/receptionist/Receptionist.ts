export type Gender = "Male" | "Female" | "Other";

export type Shift = "Morning" | "Afternoon" | "Night";

export type ReceptionistStatus = "Active" | "Offline" | "On Leave";

export type DeskTone = "assigned" | "unassigned" | "priority";

export interface PersonalInfo {
    fullName: string;
    gender: Gender | "";
    dateOfBirth: string; // ISO yyyy-mm-dd
    contactNumber: string;
    email: string;
    streetAddress: string;
    city: string;
    state: string;
    pinCode: string;
}

export interface ProfessionalInfo {
    department: string;
    qualification: string;
    totalExperienceYears: string;
    languages: string[];
    keySkills: string[];
}

export interface WorkDetails {
    assignedDesk: string;
    shift: Shift | "";
    joiningDate: string; // ISO yyyy-mm-dd
    emergencyContact: string;
}

export interface ReceptionistFormData {
    personalInfo: PersonalInfo;
    professionalInfo: ProfessionalInfo;
    workDetails: WorkDetails;
}

export interface Receptionist {
    id: string;
    name: string;
    role: string;
    employeeId: string;
    allocatedDesk: string;
    deskTone: DeskTone;
    shiftTiming: string;
    status: ReceptionistStatus;
    avatarColor: string;
    email: string;
    contactNumber: string;
    emergencyContact: string;
    residentialAddress: string;
    department: string;
    languages: string[];
    specializedSkills: string[];
}

export interface ReceptionistStatData {
    id: string;
    label: string;
    value: string;
    icon: "team" | "check" | "calendar" | "alert";
    iconColor: string;
    iconBg: string;
    footnote?: string;
    footnoteColor?: string;
    progressPercent?: number;
}

export const DEPARTMENTS = [
    "General OPD",
    "Emergency",
    "Pediatrics",
    "Cardiology",
    "Outpatient Department (OPD)",
    "Radiology",
    "Orthopedics",
] as const;

export const QUALIFICATIONS = [
    "12th Pass",
    "Bachelor's Degree",
    "Diploma in Hospital Management",
    "Diploma in Front Office Management",
    "Master's Degree",
] as const;

export const KEY_SKILLS = [
    { id: "communication", label: "Communication", helper: "Verbal & Written" },
    { id: "computer-knowledge", label: "Computer Knowledge", helper: "Basic IT skills" },
    { id: "patient-handling", label: "Patient Handling", helper: "Crowd management" },
    { id: "billing-software", label: "Billing Software", helper: "Experience with HMS" },
    { id: "multitasking", label: "Multitasking", helper: "Handling calls & visitors" },
] as const;

export const LANGUAGE_OPTIONS = ["English", "Hindi", "Punjabi", "Spanish", "Bengali", "Tamil"] as const;

export const DESKS = ["Front Desk A", "Front Desk B", "ER Desk", "Wing A Desk", "Wing B Desk", "Main Reception - Desk A"] as const;

export const emptyReceptionistForm: ReceptionistFormData = {
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
    },
    professionalInfo: {
        department: "",
        qualification: "",
        totalExperienceYears: "",
        languages: [],
        keySkills: [],
    },
    workDetails: {
        assignedDesk: "",
        shift: "",
        joiningDate: "",
        emergencyContact: "",
    },
};