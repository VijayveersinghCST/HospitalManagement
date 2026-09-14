import { Info } from "lucide-react";
import {COLORS} from "@/constants/colors";
import type { StaffMember } from "./Dashboard";

const staff: StaffMember[] = [
    { id: "1", name: "Dr. Sarah Wilson", role: "Cardiology", status: "On Duty", avatarColor: COLORS.blue },
    { id: "2", name: "Nurse Emily", role: "ICU Ward", status: "On Duty", avatarColor: COLORS.teal },
    { id: "3", name: "Dr. James Chen", role: "Neurology", status: "On Break", avatarColor: COLORS.blueLight },
    { id: "4", name: "Dr. Mike Ross", role: "Pediatrics", status: "Off Shift", avatarColor: COLORS.gray },
];

const statusStyles: Record<StaffMember["status"], { bg: string; text: string }> = {
    "On Duty": { bg: `${COLORS.green}1a`, text: COLORS.greenDark },
    "On Break": { bg: `${COLORS.teal}1a`, text: COLORS.teal },
    "Off Shift": { bg: "#F1F5F9", text: COLORS.gray },
};

function initials(name: string) {
    return name
        .replace("Dr. ", "")
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("");
}

export default function StaffDutyStatusCard() {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between">
                <p className="text-[0.9rem] font-semibold" style={{ color: COLORS.navy }}>
                    Staff Duty Status
                </p>
                <Info size={15} style={{ color: COLORS.gray }} />
            </div>

            <ul className="mt-4 flex flex-col gap-4">
                {staff.map((member) => {
                    const style = statusStyles[member.status];
                    return (
                        <li key={member.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[0.72rem] font-bold text-white"
                    style={{ backgroundColor: member.avatarColor }}
                >
                  {initials(member.name)}
                </span>
                                <div>
                                    <p className="text-[0.85rem] font-semibold" style={{ color: COLORS.navy }}>
                                        {member.name}
                                    </p>
                                    <p className="text-[0.74rem]" style={{ color: COLORS.gray }}>
                                        {member.role}
                                    </p>
                                </div>
                            </div>

                            <span
                                className="rounded-full px-2.5 py-1 text-[0.7rem] font-semibold"
                                style={{ backgroundColor: style.bg, color: style.text }}
                            >
                {member.status}
              </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}