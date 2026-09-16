import { Department, Ward, InventoryItem, ConfigChangeLog, ConfigStatData } from "./Hospitalconfig";
import { COLORS } from "@/constants/colors";

export const MOCK_DEPARTMENTS: Department[] = [
    { id: "DEP-1", name: "Cardiology", code: "CARD-01", specialization: "Heart Health", headOfDepartment: "Dr. Anjali Sharma", hodAvatarColor: COLORS.blue },
    { id: "DEP-2", name: "Neurology", code: "NEURO-02", specialization: "Brain & Nervous System", headOfDepartment: "Dr. Rajesh Kumar", hodAvatarColor: "#7C3AED" },
    { id: "DEP-3", name: "Orthopedics", code: "ORTHO-03", specialization: "Bones & Joints", headOfDepartment: "Dr. Vikram Singh", hodAvatarColor: "#D97706" },
];

export const MOCK_WARDS: Ward[] = [
    { id: "W-1", name: "General Ward", location: "Block A, 2nd Floor", category: "General", totalRooms: 12, roomsLabel: "12", totalBeds: 48, availableBeds: 36, occupancyPercent: 75, occupancyColor: COLORS.green },
    { id: "W-2", name: "Emergency (ER)", location: "Ground Floor", category: "Emergency", totalRooms: 8, roomsLabel: "8", totalBeds: 24, availableBeds: 2, occupancyPercent: 90, occupancyColor: "#DC2626" },
    { id: "W-3", name: "ICU", location: "Floor 3, East Wing", category: "ICU", totalRooms: 10, roomsLabel: "10", totalBeds: 10, availableBeds: 6, occupancyPercent: 40, occupancyColor: "#7C3AED" },
    { id: "W-4", name: "General Ward - Male", location: "Block A, 2nd Floor", category: "General", totalRooms: 4, roomsLabel: "4 Rooms (Shared)", totalBeds: 40, availableBeds: 12, occupancyPercent: 70, occupancyColor: COLORS.green },
    { id: "W-5", name: "ICU - Main", location: "Block B, 1st Floor", category: "ICU", totalRooms: 1, roomsLabel: "1 Room (Open Plan)", totalBeds: 12, availableBeds: 2, occupancyPercent: 83, occupancyColor: "#DC2626" },
    { id: "W-6", name: "Private Wing A", location: "Block C, 3rd Floor", category: "Private", totalRooms: 10, roomsLabel: "10 Rooms (Private)", totalBeds: 10, availableBeds: 4, occupancyPercent: 60, occupancyColor: "#D97706" },
];

export const MOCK_INVENTORY: InventoryItem[] = [
    { id: "INV-1", name: "MRI Scanner", model: "Siemens Magnetom", type: "Equipment", quantityOrStatus: "Active", status: "Active", maintenanceOrExpiryLabel: "Next: Oct 15, 2024" },
    { id: "INV-2", name: "Surgical Gloves", model: "Latex", type: "Consumable", quantityOrStatus: "1,200 Boxes", maintenanceOrExpiryLabel: "Exp: Dec 12, 2025" },
    { id: "INV-3", name: "Defibrillator", model: "Zoll X", type: "Equipment", quantityOrStatus: "Maintenance", status: "Maintenance", maintenanceOrExpiryLabel: "Last: Aug 20, 2023" },
];

export const MOCK_CONFIG_CHANGES: ConfigChangeLog[] = [
    {
        id: "LOG-1",
        title: "New ICU Ward created",
        subtitle: "Added by Super Admin",
        timestamp: "2 hours ago",
        tag: "Active",
        icon: "plus",
        iconColor: COLORS.blue,
        iconBg: `${COLORS.blue}1a`,
    },
    {
        id: "LOG-2",
        title: "Updated Bed Capacity for General Ward",
        subtitle: "Modified by Dr. Sharma",
        timestamp: "5 hours ago",
        tag: "Updated",
        icon: "edit",
        iconColor: "#D97706",
        iconBg: "#FEF3C7",
    },
    {
        id: "LOG-3",
        title: "Added 5 Ventilators to Inventory",
        subtitle: "System Auto-log",
        timestamp: "1 day ago",
        tag: "Completed",
        icon: "check",
        iconColor: COLORS.green,
        iconBg: `${COLORS.green}1a`,
    },
];

export const MOCK_CONFIG_STATS: ConfigStatData[] = [
    {
        id: "departments",
        label: "Active Departments",
        value: "14",
        badge: "+2 New",
        icon: "building",
        iconColor: COLORS.blue,
        iconBg: `${COLORS.blue}1a`,
        linkLabel: "View Details",
        linkHref: "/hospital-config/departments",
        linkColor: COLORS.blue,
    },
    {
        id: "wards",
        label: "Wards · 45 Rooms",
        value: "8",
        icon: "layers",
        iconColor: "#7C3AED",
        iconBg: "#EDE9FE",
        linkLabel: "Manage Wards",
        linkHref: "/hospital-config/wards",
        linkColor: "#7C3AED",
    },
    {
        id: "beds",
        label: "Total Beds Capacity",
        value: "120",
        badge: "15 Available",
        icon: "bed",
        iconColor: "#D97706",
        iconBg: "#FEF3C7",
        linkLabel: "Check Availability",
        linkHref: "/hospital-config/wards",
        linkColor: "#D97706",
    },
    {
        id: "equipment",
        label: "Medical Equipment",
        value: "340",
        badge: "Synced",
        icon: "equipment",
        iconColor: COLORS.green,
        iconBg: `${COLORS.green}1a`,
        linkLabel: "Inventory Log",
        linkHref: "/hospital-config/equipment",
        linkColor: COLORS.green,
    },
];