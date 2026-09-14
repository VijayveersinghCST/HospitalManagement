export type ReceptionistStatus = "Active" | "Offline" | "On Leave";

export type DeskTone = "assigned" | "unassigned" | "priority";

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
}