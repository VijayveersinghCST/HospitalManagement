export type AccessLevel = "No Access" | "View Only" | "Full Access";

export interface SystemModule {
    id: string;
    label: string;
}

export const SYSTEM_MODULES: SystemModule[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "receptionist", label: "Receptionist" },
    { id: "doctors", label: "Doctor Management" },
    { id: "nurse", label: "Nurse Management" },
    { id: "staff-management", label: "Staff Management" },
    { id: "accountants", label: "Accountant / Finance" },
    { id: "pharmacy", label: "Pharmacy" },
    { id: "patients", label: "Patients" },
    { id: "appointments", label: "Appointments" },
    { id: "hospital-config", label: "Hospital Configuration" },
    { id: "shift-config", label: "Shift Configuration" },
    { id: "user-management", label: "User & Role Management" },
];

export type ModulePermissions = Record<string, AccessLevel>;

export interface RoleConfig {
    id: string;
    name: string;
    description: string;
    color: string;
    userCount: number;
    isSystemRole: boolean;
    modulePermissions: ModulePermissions;
}

export type UserAccountStatus = "Active" | "Inactive";

export interface SystemUser {
    id: string;
    name: string;
    email: string;
    avatarColor: string;
    roleId: string;
    status: UserAccountStatus;
    lastLoginLabel: string;
}

export function emptyPermissions(defaultLevel: AccessLevel = "No Access"): ModulePermissions {
    return SYSTEM_MODULES.reduce((acc, m) => {
        acc[m.id] = defaultLevel;
        return acc;
    }, {} as ModulePermissions);
}

export const ACCESS_LEVELS: AccessLevel[] = ["No Access", "View Only", "Full Access"];