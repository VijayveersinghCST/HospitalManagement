export type StaffCategory = "Doctor" | "Nurse" | "Receptionist" | "Pharmacy Staff" | "Accountant / Finance";

export type ShiftLabel = "Morning" | "Afternoon" | "Evening" | "Night" | "General" | "On Call";

export interface StaffShiftEntry {
    id: string;
    staffId: string;
    name: string;
    role: string;
    category: StaffCategory;
    department: string;
    avatarColor: string;
    currentShift: ShiftLabel;
    shiftStartTime: string;
    shiftEndTime: string;
    workingDays: string[];
    availableOnCall: boolean;
}

export const SHIFT_LABELS: ShiftLabel[] = ["Morning", "Afternoon", "Evening", "Night", "General", "On Call"];

export const SHIFT_TIME_PRESETS: Record<ShiftLabel, { start: string; end: string }> = {
    Morning: { start: "07:00", end: "15:00" },
    Afternoon: { start: "12:00", end: "20:00" },
    Evening: { start: "16:00", end: "00:00" },
    Night: { start: "22:00", end: "06:00" },
    General: { start: "09:00", end: "18:00" },
    "On Call": { start: "00:00", end: "23:59" },
};

export const SHIFT_BADGE_COLOR: Record<ShiftLabel, string> = {
    Morning: "#1565D8",
    Afternoon: "#0E9488",
    Evening: "#D97706",
    Night: "#7C3AED",
    General: "#3CB043",
    "On Call": "#DC2626",
};

export const WEEK_DAY_OPTIONS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const STAFF_CATEGORIES: StaffCategory[] = [
    "Doctor",
    "Nurse",
    "Receptionist",
    "Pharmacy Staff",
    "Accountant / Finance",
];

export const CATEGORY_FILTERS: (StaffCategory | "All Categories")[] = ["All Categories", ...STAFF_CATEGORIES];