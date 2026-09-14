export type BadgeTone = "positive" | "neutral" | "info";

export interface StatCardData {
    id: string;
    label: string;
    value: string;
    badgeText: string;
    badgeTone: BadgeTone;
    footnote: string;
    footnoteHighlight?: string;
    iconBg: string;
    icon: "patients" | "doctors" | "nurses" | "revenue";
}

export interface SummaryCardData {
    id: string;
    title: string;
    value: string;
    valueHighlight?: string;
    subtitle: string;
    icon: "discharge" | "mortality";
    iconBg: string;
    iconColor: string;
}

export interface ExpenseItem {
    id: string;
    label: string;
    amount: string;
    icon: "fuel" | "electricity" | "maintenance";
    iconColor: string;
}

export interface WardProgress {
    id: string;
    label: string;
    current: number;
    total: number;
    barColor: string;
}

export interface BedType {
    id: string;
    label: string;
    available: number;
    status: "normal" | "critical" | "highlight";
}

export interface StaffMember {
    id: string;
    name: string;
    role: string;
    status: "On Duty" | "On Break" | "Off Shift";
    avatarColor: string;
}