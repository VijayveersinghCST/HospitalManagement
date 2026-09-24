export type AmbulanceStatus = "Available" | "On Duty" | "Under Maintenance" | "Out of Service";

export type AmbulanceType =
    | "Basic Life Support (BLS)"
    | "Advanced Life Support (ALS)"
    | "Patient Transport"
    | "Mortuary Van";

export interface Ambulance {
    id: string; // e.g. "1"
    vehicleNumber: string; // e.g. "UP32 AB 1234"
    ambulanceType: AmbulanceType;
    status: AmbulanceStatus;
    baseStation: string;
    driverName: string;
    driverContact: string;
    driverLicenseNumber: string;
    equipment: string[];
    lastServicedDate: string; // ISO yyyy-mm-dd
    // Populated only while status is "On Duty"
    currentPatientName?: string;
    currentDestination?: string;
    dispatchedAt?: string; // ISO yyyy-mm-dd
}

export const AMBULANCE_TYPES: AmbulanceType[] = [
    "Basic Life Support (BLS)",
    "Advanced Life Support (ALS)",
    "Patient Transport",
    "Mortuary Van",
];

export const AMBULANCE_STATUSES: AmbulanceStatus[] = [
    "Available",
    "On Duty",
    "Under Maintenance",
    "Out of Service",
];

export const BASE_STATIONS = [
    "Main Hospital - Bay 1",
    "Main Hospital - Bay 2",
    "Emergency Wing - Bay A",
    "Emergency Wing - Bay B",
    "Satellite Clinic - North",
] as const;

export const EQUIPMENT_OPTIONS = [
    { id: "oxygen-cylinder", label: "Oxygen Cylinder", helper: "Portable supply" },
    { id: "defibrillator", label: "Defibrillator", helper: "AED / manual" },
    { id: "stretcher", label: "Stretcher", helper: "Wheeled cot" },
    { id: "ecg-monitor", label: "ECG Monitor", helper: "Vitals tracking" },
    { id: "ventilator", label: "Ventilator", helper: "For ALS units" },
    { id: "first-aid-kit", label: "First Aid Kit", helper: "Basic supplies" },
] as const;

export interface AmbulanceFormData {
    vehicleNumber: string;
    ambulanceType: AmbulanceType | "";
    baseStation: string;
    driverName: string;
    driverContact: string;
    driverLicenseNumber: string;
    equipment: string[];
    lastServicedDate: string;
}

export const emptyAmbulanceForm: AmbulanceFormData = {
    vehicleNumber: "",
    ambulanceType: "",
    baseStation: "",
    driverName: "",
    driverContact: "",
    driverLicenseNumber: "",
    equipment: [],
    lastServicedDate: "",
};