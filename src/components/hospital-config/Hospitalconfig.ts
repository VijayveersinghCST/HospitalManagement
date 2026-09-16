export type DepartmentActionsLink = { label: string; href: string };

export interface Department {
    id: string;
    name: string;
    code: string;
    specialization: string;
    headOfDepartment: string;
    hodAvatarColor: string;
}

export type WardCategory = "General" | "ICU" | "Emergency" | "Private" | "Pediatric" | "Maternity";

export interface Ward {
    id: string;
    name: string;
    location: string;
    category: WardCategory;
    totalRooms: number;
    roomsLabel: string;
    totalBeds: number;
    availableBeds: number;
    occupancyPercent: number;
    occupancyColor: string;
}

export type EquipmentStatus = "Active" | "Maintenance" | "Retired";
export type InventoryType = "Equipment" | "Consumable";

export interface InventoryItem {
    id: string;
    name: string;
    model: string;
    type: InventoryType;
    quantityOrStatus: string;
    status?: EquipmentStatus;
    maintenanceOrExpiryLabel: string;
}

export interface ConfigChangeLog {
    id: string;
    title: string;
    subtitle: string;
    timestamp: string;
    tag: "Active" | "Updated" | "Completed";
    icon: "plus" | "edit" | "check";
    iconColor: string;
    iconBg: string;
}

export interface ConfigStatData {
    id: string;
    label: string;
    value: string;
    unitNote?: string;
    badge?: string;
    icon: "building" | "layers" | "bed" | "equipment";
    iconColor: string;
    iconBg: string;
    linkLabel: string;
    linkHref: string;
    linkColor: string;
}

export const WARD_CATEGORIES: WardCategory[] = ["General", "ICU", "Emergency", "Private", "Pediatric", "Maternity"];

export const ROOM_TYPES = ["General Ward", "Semi-Private", "Single Private", "ICU Suite"] as const;

export const BED_STATUSES = ["Available", "Occupied", "Reserved", "Maintenance"] as const;

export interface RoomDraft {
    id: string;
    roomNo: string;
    roomType: string;
    capacity: number;
}