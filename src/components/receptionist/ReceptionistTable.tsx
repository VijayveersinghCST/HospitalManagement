import { Pencil, Trash2 } from "lucide-react";
import { COLORS } from "@/constants/colors";
import type { Receptionist, DeskTone, ReceptionistStatus } from "./Receptionist";

const receptionists: Receptionist[] = [
    {
        id: "1",
        name: "Priya Sharma",
        role: "Senior Receptionist",
        employeeId: "REC-2023-001",
        allocatedDesk: "OPD Counter 1",
        deskTone: "assigned",
        shiftTiming: "08:00 AM - 04:00 PM",
        status: "Active",
        avatarColor: COLORS.blue,
    },
    {
        id: "2",
        name: "Rahul Verma",
        role: "Junior Associate",
        employeeId: "REC-2023-014",
        allocatedDesk: "IPD Admission",
        deskTone: "assigned",
        shiftTiming: "02:00 PM - 10:00 PM",
        status: "Offline",
        avatarColor: COLORS.teal,
    },
    {
        id: "3",
        name: "Anjali Gupta",
        role: "Help Desk Lead",
        employeeId: "REC-2022-089",
        allocatedDesk: "Unassigned",
        deskTone: "unassigned",
        shiftTiming: "-",
        status: "On Leave",
        avatarColor: COLORS.blueLight,
    },
    {
        id: "4",
        name: "Sameer Khan",
        role: "Trainee",
        employeeId: "REC-2023-042",
        allocatedDesk: "OPD Counter 2",
        deskTone: "assigned",
        shiftTiming: "08:00 AM - 04:00 PM",
        status: "Active",
        avatarColor: COLORS.greenDark,
    },
    {
        id: "5",
        name: "Sneha Patel",
        role: "Night Shift Manager",
        employeeId: "REC-2021-011",
        allocatedDesk: "Emergency Desk",
        deskTone: "priority",
        shiftTiming: "10:00 PM - 06:00 AM",
        status: "Offline",
        avatarColor: COLORS.navy,
    },
];

const deskStyles: Record<DeskTone, { bg: string; text: string }> = {
    assigned: { bg: `${COLORS.blue}14`, text: COLORS.blue },
    unassigned: { bg: "#F1F5F9", text: COLORS.gray },
    priority: { bg: `${COLORS.blueDark}14`, text: COLORS.blueDark },
};

const statusStyles: Record<ReceptionistStatus, { bg: string; text: string }> = {
    Active: { bg: `${COLORS.green}1a`, text: COLORS.greenDark },
    Offline: { bg: "#F1F5F9", text: COLORS.gray },
    "On Leave": { bg: `${COLORS.teal}1a`, text: COLORS.teal },
};

function initials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("");
}

export default function ReceptionistTable() {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <table className="w-full text-left">
                <thead>
                <tr className="border-b border-slate-100">
                    {["Receptionist Name", "Employee ID", "Allocated Desk", "Shift Timing", "Status", "Actions"].map(
                        (heading) => (
                            <th
                                key={heading}
                                className="px-5 py-3 text-[0.7rem] font-bold uppercase tracking-[0.08em]"
                                style={{ color: COLORS.gray }}
                            >
                                {heading}
                            </th>
                        )
                    )}
                </tr>
                </thead>
                <tbody>
                {receptionists.map((person) => {
                    const desk = deskStyles[person.deskTone];
                    const status = statusStyles[person.status];
                    return (
                        <tr key={person.id} className="border-b border-slate-50 last:border-0">
                            <td className="px-5 py-3.5">
                                <div className="flex items-center gap-3">
                    <span
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[0.72rem] font-bold text-white"
                        style={{ backgroundColor: person.avatarColor }}
                    >
                      {initials(person.name)}
                    </span>
                                    <div>
                                        <p className="text-[0.86rem] font-semibold" style={{ color: COLORS.navy }}>
                                            {person.name}
                                        </p>
                                        <p className="text-[0.74rem]" style={{ color: COLORS.gray }}>
                                            {person.role}
                                        </p>
                                    </div>
                                </div>
                            </td>

                            <td className="px-5 py-3.5 text-[0.82rem]" style={{ color: COLORS.gray }}>
                                {person.employeeId}
                            </td>

                            <td className="px-5 py-3.5">
                  <span
                      className="rounded-full px-2.5 py-1 text-[0.74rem] font-semibold"
                      style={{ backgroundColor: desk.bg, color: desk.text }}
                  >
                    {person.allocatedDesk}
                  </span>
                            </td>

                            <td className="px-5 py-3.5 text-[0.82rem]" style={{ color: COLORS.navy }}>
                                {person.shiftTiming}
                            </td>

                            <td className="px-5 py-3.5">
                  <span
                      className="rounded-full px-2.5 py-1 text-[0.74rem] font-semibold"
                      style={{ backgroundColor: status.bg, color: status.text }}
                  >
                    {person.status}
                  </span>
                            </td>

                            <td className="px-5 py-3.5">
                                <div className="flex items-center gap-3">
                                    <button type="button" aria-label={`Edit ${person.name}`} style={{ color: COLORS.blue }}>
                                        <Pencil size={15} />
                                    </button>
                                    <button type="button" aria-label={`Remove ${person.name}`} style={{ color: COLORS.gray }}>
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}