export type AppointmentStatus =
| "Scheduled"
| "Confirmed"
| "Completed"
| "Cancelled"
| "No Show";

export type AppointmentType = "New Consultation" | "Follow-up" | "Emergency";

export type PatientType = "New Patient" | "Existing Patient";

export type Gender = "Male" | "Female" | "Other";

export interface Appointment {
    id: string; // e.g. "1"
    appointmentId: string; // e.g. "APT-2024-001"
    patientType: PatientType;
    patientName: string;
    patientId?: string; // populated when patientType is "Existing Patient"
    contactNumber: string;
    age: string;
    gender: Gender | "";
    department: string;
    doctorName: string;
    appointmentDate: string; // ISO yyyy-mm-dd
    appointmentTime: string; // e.g. "10:30 AM"
    appointmentType: AppointmentType;
    reasonForVisit: string;
    notes?: string;
    status: AppointmentStatus;
}

export const DEPARTMENTS = [
    "General OPD",
    "Cardiology",
    "Pediatrics",
    "Orthopedics",
    "Dermatology",
    "ENT",
    "Gynecology",
    "Emergency",
] as const;

export const DOCTORS_BY_DEPARTMENT: Record<string, string[]> = {
    "General OPD": ["Dr. Anjali Gupta", "Dr. Rakesh Nair"],
    Cardiology: ["Dr. Vivek Malhotra", "Dr. Sunita Rao"],
    Pediatrics: ["Dr. Meera Iyer", "Dr. Arjun Kapoor"],
    Orthopedics: ["Dr. Sandeep Joshi"],
    Dermatology: ["Dr. Kavita Menon"],
    ENT: ["Dr. Farhan Ali"],
    Gynecology: ["Dr. Priyanka Desai"],
    Emergency: ["Dr. On-Call Duty Doctor"],
};

export const TIME_SLOTS = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
] as const;

export const APPOINTMENT_TYPES: AppointmentType[] = ["New Consultation", "Follow-up", "Emergency"];

export const APPOINTMENT_STATUSES: AppointmentStatus[] = [
    "Scheduled",
    "Confirmed",
    "Completed",
    "Cancelled",
    "No Show",
];

export interface AppointmentFormData {
    patientType: PatientType;
    patientName: string;
    patientId: string;
    contactNumber: string;
    age: string;
    gender: Gender | "";
    department: string;
    doctorName: string;
    appointmentDate: string;
    appointmentTime: string;
    appointmentType: AppointmentType | "";
    reasonForVisit: string;
    notes: string;
}

export const emptyAppointmentForm: AppointmentFormData = {
    patientType: "New Patient",
    patientName: "",
    patientId: "",
    contactNumber: "",
    age: "",
    gender: "",
    department: "",
    doctorName: "",
    appointmentDate: "",
    appointmentTime: "",
    appointmentType: "",
    reasonForVisit: "",
    notes: "",
};