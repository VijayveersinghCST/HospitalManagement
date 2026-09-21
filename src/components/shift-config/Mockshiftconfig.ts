import { StaffShiftEntry, ShiftLabel } from "./shiftconfig";
import { MOCK_NURSES } from "@/components/shift-config/MockNurse";
import { MOCK_RECEPTIONISTS } from "@/components/receptionist/Mockreceptionist";
import { MOCK_PHARMACY_STAFF } from "@/components/pharmacy/Mockpharmacystaff";
import { MOCK_ACCOUNTANTS } from "@/components/accountant/Mockaccountant";
import { COLORS } from "@/constants/colors";

function toShiftLabel(raw: string): ShiftLabel {
    const normalized = raw.toLowerCase();
    if (normalized.includes("morning")) return "Morning";
    if (normalized.includes("afternoon")) return "Afternoon";
    if (normalized.includes("evening")) return "Evening";
    if (normalized.includes("night")) return "Night";
    if (normalized.includes("call")) return "On Call";
    return "General";
}

const MOCK_DOCTOR_SHIFTS: StaffShiftEntry[] = [
    {
        id: "DOC-001",
        staffId: "DOC-1001",
        name: "Dr. Sarah Wilson",
        role: "Cardiologist",
        category: "Doctor",
        department: "Cardiology",
        avatarColor: COLORS.blue,
        currentShift: "General",
        shiftStartTime: "09:00",
        shiftEndTime: "17:00",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        availableOnCall: true,
    },
    {
        id: "DOC-002",
        staffId: "DOC-1014",
        name: "Dr. James Chen",
        role: "Neurologist",
        category: "Doctor",
        department: "Neurology",
        avatarColor: "#7C3AED",
        currentShift: "Evening",
        shiftStartTime: "16:00",
        shiftEndTime: "00:00",
        workingDays: ["Mon", "Wed", "Fri"],
        availableOnCall: false,
    },
    {
        id: "DOC-003",
        staffId: "DOC-1027",
        name: "Dr. Mike Ross",
        role: "Pediatrician",
        category: "Doctor",
        department: "Pediatrics",
        avatarColor: "#D97706",
        currentShift: "Morning",
        shiftStartTime: "07:00",
        shiftEndTime: "15:00",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        availableOnCall: false,
    },
];

const nurseShifts: StaffShiftEntry[] = MOCK_NURSES.map((n) => ({
    id: n.id,
    staffId: n.nurseId,
    name: n.name,
    role: n.role,
    category: "Nurse",
    department: n.department,
    avatarColor: n.avatarColor,
    currentShift: toShiftLabel(n.shift),
    shiftStartTime: n.shiftStartTime,
    shiftEndTime: n.shiftEndTime,
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    availableOnCall: false,
}));

const receptionistShifts: StaffShiftEntry[] = MOCK_RECEPTIONISTS.map((r) => ({
    id: r.id,
    staffId: r.employeeId,
    name: r.name,
    role: r.role,
    category: "Receptionist",
    department: r.department,
    avatarColor: r.avatarColor,
    currentShift: toShiftLabel(r.shiftTiming),
    shiftStartTime: "",
    shiftEndTime: "",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    availableOnCall: false,
}));

const pharmacyShifts: StaffShiftEntry[] = MOCK_PHARMACY_STAFF.map((p) => ({
    id: p.id,
    staffId: p.employeeId,
    name: p.name,
    role: p.role,
    category: "Pharmacy Staff",
    department: p.assignedUnit,
    avatarColor: p.avatarColor,
    currentShift: toShiftLabel(p.shift),
    shiftStartTime: "",
    shiftEndTime: "",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    availableOnCall: false,
}));

const accountantShifts: StaffShiftEntry[] = MOCK_ACCOUNTANTS.map((a) => ({
    id: a.id,
    staffId: a.staffId,
    name: a.fullName,
    role: a.designation,
    category: "Accountant / Finance",
    department: a.department,
    avatarColor: a.avatarColor,
    currentShift: toShiftLabel(a.shiftType),
    shiftStartTime: "",
    shiftEndTime: "",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    availableOnCall: a.availableOnCall,
}));

export const MOCK_ALL_STAFF_SHIFTS: StaffShiftEntry[] = [
    ...MOCK_DOCTOR_SHIFTS,
    ...nurseShifts,
    ...receptionistShifts,
    ...pharmacyShifts,
    ...accountantShifts,
];