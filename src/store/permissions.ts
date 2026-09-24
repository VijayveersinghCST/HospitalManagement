import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ALL_PERMISSION_KEYS, VIEW_ROWS_BY_NAV_KEY, grantAll, grantView } from "@/lib/permissions-catalog";

export interface Role {
    id: string;
    name: string;
    description: string;
    isSystem: boolean;
    permissions: string[]; // granted permission keys
}

const seedRoles: Role[] = [
    {
        id: "global-admin",
        name: "Global Admin",
        description: "Full data access across all modules.",
        isSystem: true,
        permissions: ALL_PERMISSION_KEYS,
    },
    {
        id: "doctor",
        name: "Doctor",
        description: "Clinical access to patients, appointments, and their own schedule.",
        isSystem: true,
        permissions: Array.from(
            new Set([...grantView(["Dashboard"]), ...grantAll(["PATIENTS"]), ...grantAll(["APPOINTMENTS"]), ...grantAll(["DOCTOR_MANAGEMENT"])])
        ),
    },
    {
        id: "nurse",
        name: "Nurse",
        description: "Ward-level access to patients and nursing schedules.",
        isSystem: true,
        permissions: Array.from(new Set([...grantView(["Dashboard"]), ...grantAll(["NURSE"]), ...grantAll(["PATIENTS"])])),
    },
    {
        id: "receptionist",
        name: "Receptionist",
        description: "Front-desk access to appointments and patient registration.",
        isSystem: true,
        permissions: Array.from(
            new Set([...grantView(["Dashboard"]), ...grantAll(["RECEPTIONIST"]), ...grantAll(["APPOINTMENTS"]), ...grantAll(["PATIENTS"])])
        ),
    },
    {
        id: "accountant",
        name: "Accountant / Finance",
        description: "Billing, invoicing, and payroll access.",
        isSystem: true,
        permissions: Array.from(new Set([...grantView(["Dashboard"]), ...grantAll(["ACCOUNTANT_FINANCE"])])),
    },
    {
        id: "pharmacist",
        name: "Pharmacist",
        description: "Pharmacy store, stock, and billing access.",
        isSystem: true,
        permissions: Array.from(new Set([...grantView(["Dashboard"]), ...grantAll(["PHARMACY"])])),
    },
];

interface PermissionsState {
    roles: Role[];
    addRole: (name: string, description: string) => string;
    renameRole: (roleId: string, name: string, description: string) => void;
    togglePermission: (roleId: string, permissionKey: string) => void;
    replacePermissions: (roleId: string, keys: string[]) => void;
}

export const usePermissionsStore = create<PermissionsState>()(
    persist(
        (set) => ({
            roles: seedRoles,

            addRole: (name, description) => {
                const id = `custom-${Math.random().toString(36).slice(2, 9)}`;
                set((state) => ({
                    roles: [...state.roles, { id, name, description, isSystem: false, permissions: [] }],
                }));
                return id;
            },

            renameRole: (roleId, name, description) =>
                set((state) => ({
                    roles: state.roles.map((r) => (r.id === roleId ? { ...r, name, description } : r)),
                })),

            togglePermission: (roleId, key) =>
                set((state) => ({
                    roles: state.roles.map((r) =>
                        r.id === roleId
                            ? {
                                ...r,
                                permissions: r.permissions.includes(key)
                                    ? r.permissions.filter((k) => k !== key)
                                    : [...r.permissions, key],
                            }
                            : r
                    ),
                })),

            replacePermissions: (roleId, keys) =>
                set((state) => ({
                    roles: state.roles.map((r) => (r.id === roleId ? { ...r, permissions: keys } : r)),
                })),
        }),
        { name: "hms-permissions" }
    )
);

/**
 * Returns a (navLabel, parentLabel?) => boolean function a Sidebar can use
 * to decide whether to render an item/child. Fails OPEN: a label with no
 * matching catalog entry, or an unknown roleId, stays visible — so this
 * never silently hides real nav items due to a label mismatch.
 */
export function useNavVisibility(roleId: string | undefined) {
    const roles = usePermissionsStore((s) => s.roles);
    const role = roles.find((r) => r.id === roleId);
    const granted = new Set(role?.permissions ?? []);

    return (navLabel: string, parentLabel?: string): boolean => {
        const lookupKey = parentLabel ? `${parentLabel}::${navLabel}` : navLabel;
        const row = VIEW_ROWS_BY_NAV_KEY.get(lookupKey);
        if (!row) return true;
        if (!role) return true;
        return granted.has(row.key);
    };
}