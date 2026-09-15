import { PharmacyStaff, PharmacyStatData } from "./Pharmacystaff";
import { COLORS } from "@/constants/colors";

export const MOCK_PHARMACY_STAFF: PharmacyStaff[] = [
    {
        id: "PH-001",
        name: "Rajesh Kumar",
        email: "rajesh.k@shriram.com",
        employeeId: "PH-0042",
        role: "Head Pharmacist",
        assignedUnit: "Main OPD Unit",
        shift: "Morning",
        status: "Active",
        avatarColor: COLORS.blue,
        contactNumber: "9876500001",
    },
    {
        id: "PH-002",
        name: "Priya Sharma",
        email: "priya.s@shriram.com",
        employeeId: "PH-0056",
        role: "Pharmacist",
        assignedUnit: "Emergency Ward",
        shift: "Night",
        status: "Active",
        avatarColor: COLORS.teal,
        contactNumber: "9876500002",
    },
    {
        id: "PH-003",
        name: "Amit Verma",
        email: "amit.v@shriram.com",
        employeeId: "PH-0089",
        role: "Pharmacy Assistant",
        assignedUnit: "Inventory Storage",
        shift: "Morning",
        status: "On Leave",
        avatarColor: COLORS.blueDark,
        contactNumber: "9876500003",
    },
    {
        id: "PH-004",
        name: "Sneha Gupta",
        email: "sneha.g@shriram.com",
        employeeId: "PH-0102",
        role: "Pharmacist",
        assignedUnit: "ICU Pharmacy",
        shift: "Evening",
        status: "Active",
        avatarColor: COLORS.green,
        contactNumber: "9876500004",
    },
    {
        id: "PH-005",
        name: "Vikram Singh",
        email: "vikram.s@shriram.com",
        employeeId: "PH-0115",
        role: "Junior Pharmacist",
        assignedUnit: "General Ward",
        shift: "Morning",
        status: "Inactive",
        avatarColor: COLORS.gray,
        contactNumber: "9876500005",
    },
];

export function getPharmacyStaffById(id: string): PharmacyStaff | undefined {
    return MOCK_PHARMACY_STAFF.find((s) => s.id === id || s.employeeId === id);
}

export const MOCK_PHARMACY_STATS: PharmacyStatData[] = [
    {
        id: "total-staff",
        label: "Total Staff",
        value: "42",
        icon: "team",
        iconColor: COLORS.blue,
        iconBg: `${COLORS.blue}1a`,
    },
    {
        id: "active-now",
        label: "Active Now",
        value: "18",
        icon: "check",
        iconColor: COLORS.green,
        iconBg: `${COLORS.green}1a`,
    },
    {
        id: "head-pharmacists",
        label: "Head Pharmacists",
        value: "4",
        icon: "crown",
        iconColor: "#7C3AED",
        iconBg: "#EDE9FE",
    },
    {
        id: "pending-leaves",
        label: "Pending Leaves",
        value: "3",
        icon: "clipboard",
        iconColor: "#D97706",
        iconBg: "#FEF3C7",
    },
];