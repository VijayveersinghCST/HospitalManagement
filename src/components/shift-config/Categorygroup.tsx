"use client";

import { useState } from "react";
import { ChevronDown, Pencil } from "lucide-react";
import ShiftBadge from "./Shiftbadge";
import ShiftEditPopover from "./Shifteditpopover";
import { StaffShiftEntry, ShiftLabel } from "./Shiftconfig";
import { COLORS } from "@/constants/colors";

function initials(name: string) {
    return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

const CATEGORY_ICON_TINT: Record<string, { bg: string; text: string }> = {
    Doctor: { bg: `${COLORS.blue}1a`, text: COLORS.blue },
    Nurse: { bg: `${COLORS.teal}1a`, text: COLORS.teal },
    Receptionist: { bg: "#EDE9FE", text: "#7C3AED" },
    "Pharmacy Staff": { bg: `${COLORS.green}1a`, text: COLORS.green },
    "Accountant / Finance": { bg: "#FEF3C7", text: "#B45309" },
};

export default function CategoryGroup({
                                          category,
                                          entries,
                                          onUpdateShift,
                                      }: {
    category: string;
    entries: StaffShiftEntry[];
    onUpdateShift: (id: string, shift: ShiftLabel, start: string, end: string, days: string[]) => void;
}) {
    const [expanded, setExpanded] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const tint = CATEGORY_ICON_TINT[category] ?? { bg: "#F1F5F9", text: COLORS.gray };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white">
            <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="flex w-full items-center justify-between px-5 py-4"
            >
                <span className="flex items-center gap-3">
                    <span
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold"
                        style={{ backgroundColor: tint.bg, color: tint.text }}
                    >
                        {category[0]}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: COLORS.navy }}>
                        {category}
                    </span>
                    <span
                        className="rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{ backgroundColor: "#F1F5F9", color: COLORS.gray }}
                    >
                        {entries.length}
                    </span>
                </span>
                <ChevronDown
                    size={16}
                    style={{ color: COLORS.gray, transform: expanded ? "rotate(180deg)" : "none" }}
                    className="transition-transform"
                />
            </button>

            {expanded && (
                <div className="overflow-x-auto border-t border-slate-100">
                    <table className="w-full text-left text-sm">
                        <thead>
                        <tr className="border-b border-slate-100 text-xs uppercase" style={{ color: COLORS.gray }}>
                            <th className="px-5 py-3 font-medium">Staff</th>
                            <th className="px-5 py-3 font-medium">Department</th>
                            <th className="px-5 py-3 font-medium">Current Shift</th>
                            <th className="px-5 py-3 font-medium">Timing</th>
                            <th className="px-5 py-3 font-medium">Working Days</th>
                            <th className="px-5 py-3 font-medium">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {entries.map((entry) => (
                            <tr key={entry.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                                <td className="px-5 py-3">
                                        <span className="flex items-center gap-2.5">
                                            <span
                                                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white"
                                                style={{ backgroundColor: entry.avatarColor }}
                                            >
                                                {initials(entry.name)}
                                            </span>
                                            <span className="flex flex-col">
                                                <span className="font-medium" style={{ color: COLORS.navy }}>
                                                    {entry.name}
                                                </span>
                                                <span className="text-xs" style={{ color: COLORS.gray }}>
                                                    {entry.role}
                                                </span>
                                            </span>
                                        </span>
                                </td>
                                <td className="px-5 py-3" style={{ color: COLORS.navy }}>
                                    {entry.department}
                                </td>
                                <td className="px-5 py-3">
                                    <ShiftBadge shift={entry.currentShift} />
                                </td>
                                <td className="px-5 py-3" style={{ color: COLORS.gray }}>
                                    {entry.shiftStartTime && entry.shiftEndTime
                                        ? `${entry.shiftStartTime} - ${entry.shiftEndTime}`
                                        : "—"}
                                </td>
                                <td className="px-5 py-3" style={{ color: COLORS.gray }}>
                                    {entry.workingDays.join(", ")}
                                </td>
                                <td className="relative px-5 py-3">
                                    <button
                                        onClick={() => setEditingId(editingId === entry.id ? null : entry.id)}
                                        className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium"
                                        style={{ color: COLORS.blue }}
                                    >
                                        <Pencil size={12} /> Edit
                                    </button>
                                    {editingId === entry.id && (
                                        <ShiftEditPopover
                                            currentShift={entry.currentShift}
                                            currentStart={entry.shiftStartTime}
                                            currentEnd={entry.shiftEndTime}
                                            currentDays={entry.workingDays}
                                            onSave={(shift, start, end, days) => {
                                                onUpdateShift(entry.id, shift, start, end, days);
                                                setEditingId(null);
                                            }}
                                            onClose={() => setEditingId(null)}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}