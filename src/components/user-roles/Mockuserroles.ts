import { RoleConfig, SystemUser, emptyPermissions } from "./Userroles";
import { COLORS } from "@/constants/colors";

export const MOCK_ROLES: RoleConfig[] = [
    {
        id: "super-admin",
        name: "Super Admin",
        description: "Full system access across every module. Reserved for hospital administrators.",
        color: COLORS.navy,
        userCount: 2,
        isSystemRole: true,
        modulePermissions: emptyPermissions("Full Access"),
    },
    {
        id: "doctor",
        name: "Doctor",
        description: "Clinical staff. Can view patient records and manage appointments only.",
        color: COLORS.blue,
        userCount: 142,
        isSystemRole: false,
        modulePermissions: {
            ...emptyPermissions("No Access"),
            dashboard: "View Only",
            patients: "Full Access",
            appointments: "Full Access",
        },
    },
    {
        id: "nurse",
        name: "Nurse",
        description: "Ward duties, patient monitoring, and internal coordination.",
        color: COLORS.teal,
        userCount: 124,
        isSystemRole: false,
        modulePermissions: {
            ...emptyPermissions("No Access"),
            dashboard: "View Only",
            patients: "View Only",
            nurse: "Full Access",
            appointments: "View Only",
        },
    },
    {
        id: "receptionist",
        name: "Receptionist",
        description: "Front-desk operations, patient check-in, and appointment scheduling.",
        color: "#7C3AED",
        userCount: 18,
        isSystemRole: false,
        modulePermissions: {
            ...emptyPermissions("No Access"),
            dashboard: "View Only",
            receptionist: "Full Access",
            patients: "View Only",
            appointments: "Full Access",
        },
    },
    {
        id: "pharmacy-staff",
        name: "Pharmacy Staff",
        description: "Medicine stock, supplier management, and dispensing.",
        color: COLORS.green,
        userCount: 42,
        isSystemRole: false,
        modulePermissions: {
            ...emptyPermissions("No Access"),
            dashboard: "View Only",
            pharmacy: "Full Access",
        },
    },
    {
        id: "accountant",
        name: "Accountant / Finance",
        description: "Billing, invoicing, and financial operations.",
        color: "#D97706",
        userCount: 14,
        isSystemRole: false,
        modulePermissions: {
            ...emptyPermissions("No Access"),
            dashboard: "View Only",
            accountants: "Full Access",
        },
    },
];

export function getRoleById(id: string): RoleConfig | undefined {
    return MOCK_ROLES.find((r) => r.id === id);
}

export const MOCK_USERS: SystemUser[] = [
    { id: "U-1", name: "Dr. A. Sharma", email: "a.sharma@shriram.com", avatarColor: COLORS.navy, roleId: "super-admin", status: "Active", lastLoginLabel: "Today, 09:15 AM" },
    { id: "U-2", name: "Dr. Sarah Wilson", email: "sarah.wilson@shriram.com", avatarColor: COLORS.blue, roleId: "doctor", status: "Active", lastLoginLabel: "Today, 08:40 AM" },
    { id: "U-3", name: "Sarah Jenkins", email: "sarah.j@shriramhospital.com", avatarColor: COLORS.teal, roleId: "nurse", status: "Active", lastLoginLabel: "2 hours ago" },
    { id: "U-4", name: "Priya Sharma", email: "priya.sharma@hospital.com", avatarColor: "#7C3AED", roleId: "receptionist", status: "Active", lastLoginLabel: "1 day ago" },
    { id: "U-5", name: "Rajesh Kumar", email: "rajesh.kumar@shriramhospital.com", avatarColor: COLORS.green, roleId: "pharmacy-staff", status: "Active", lastLoginLabel: "3 hours ago" },
    { id: "U-6", name: "Ramesh Gupta", email: "ramesh.g@shriramhospital.com", avatarColor: "#D97706", roleId: "accountant", status: "Inactive", lastLoginLabel: "2 weeks ago" },
];