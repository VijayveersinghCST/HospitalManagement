export type WardCategory = "General" | "ICU" | "Emergency" | "Private" | "Maternity";

export type BedStatus = "Available" | "Occupied" | "Reserved" | "Maintenance";

export interface WardItem {
    id: string;
    name: string;
    location: string;
    category: WardCategory;
    totalRooms: number;
    totalBeds: number;
    availableBeds: number;
    occupancyPercent: number;
}

export interface RoomItem {
    id: string;
    roomNumber: string;
    roomType: string;
    wardId: string;
    wardName: string;
    totalBeds: number;
    availableBeds: number;
}

export interface BedItem {
    id: string;
    bedNumber: string;
    status: BedStatus;
    patientName?: string;
    roomId: string;
    roomNumber: string;
    wardId: string;
    wardName: string;
}

export const WARD_CATEGORY_STYLES: Record<WardCategory, { bg: string; text: string }> = {
    General: { bg: "#DCFCE7", text: "#15803D" },
    ICU: { bg: "#EDE9FE", text: "#7C3AED" },
    Emergency: { bg: "#FEE2E2", text: "#DC2626" },
    Private: { bg: "#FEF3C7", text: "#D97706" },
    Maternity: { bg: "#E0F2FE", text: "#0E9488" },
};

export const BED_STATUS_STYLES: Record<BedStatus, { bg: string; text: string }> = {
    Available: { bg: "#DCFCE7", text: "#15803D" },
    Occupied: { bg: "#FEE2E2", text: "#DC2626" },
    Reserved: { bg: "#FEF3C7", text: "#D97706" },
    Maintenance: { bg: "#E2E8F0", text: "#475569" },
};

export const WARD_CATEGORIES: WardCategory[] = ["General", "ICU", "Emergency", "Private", "Maternity"];

export const ROOM_TYPES = ["General Ward", "Semi-Private", "Single Private", "ICU Suite"] as const;

export const BED_STATUSES: BedStatus[] = ["Available", "Occupied", "Reserved", "Maintenance"];
