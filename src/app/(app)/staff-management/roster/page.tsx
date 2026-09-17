// src/app/(app)/staff-management/roster/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    CalendarClock,
    Upload,
    Plus,
    ChevronLeft,
    ChevronRight,
    AlertTriangle,
    X,
    CheckCircle2,
} from "lucide-react";
import Avatar from "@/components/common/Avatar";

interface ShiftCell {
    type: "Morning" | "Evening" | "Night" | "OFF" | "Overlap";
    time?: string;
}

interface StaffRosterRow {
    id: string;
    name: string;
    role: string;
    schedule: Record<string, ShiftCell>;
}

const ROSTER_DATA: StaffRosterRow[] = [
    {
        id: "1",
        name: "Dr. R. Sharma",
        role: "Cardiologist",
        schedule: {
            mon: { type: "Morning", time: "08:00 - 16:00" },
            tue: { type: "Morning", time: "08:00 - 16:00" },
            wed: { type: "OFF" },
            thu: { type: "Evening", time: "16:00 - 00:00" },
            fri: { type: "Night", time: "00:00 - 08:00" },
            sat: { type: "OFF" },
            sun: { type: "OFF" },
        },
    },
    {
        id: "2",
        name: "Dr. Anjali Desai",
        role: "Senior Resident",
        schedule: {
            mon: { type: "OFF" },
            tue: { type: "Morning", time: "08:00 - 16:00" },
            wed: { type: "Overlap", time: "Morn + Eve" },
            thu: { type: "Night", time: "00:00 - 08:00" },
            fri: { type: "OFF" },
            sat: { type: "OFF" },
            sun: { type: "OFF" },
        },
    },
    {
        id: "3",
        name: "Nurse Priya K.",
        role: "Head Nurse",
        schedule: {
            mon: { type: "Evening", time: "16:00 - 00:00" },
            tue: { type: "Evening", time: "16:00 - 00:00" },
            wed: { type: "Evening", time: "16:00 - 00:00" },
            thu: { type: "Evening", time: "16:00 - 00:00" },
            fri: { type: "Evening", time: "16:00 - 00:00" },
            sat: { type: "OFF" },
            sun: { type: "OFF" },
        },
    },
    {
        id: "4",
        name: "Vikram Singh",
        role: "Radiology Tech",
        schedule: {
            mon: { type: "Night", time: "00:00 - 08:00" },
            tue: { type: "Night", time: "00:00 - 08:00" },
            wed: { type: "Night", time: "00:00 - 08:00" },
            thu: { type: "Night", time: "00:00 - 08:00" },
            fri: { type: "OFF" },
            sat: { type: "OFF" },
            sun: { type: "OFF" },
        },
    },
];

export default function StaffRosterPage() {
    const [viewType, setViewType] = useState<"Week" | "Month">("Week");
    const [showConflict, setShowConflict] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [publishSuccess, setPublishSuccess] = useState(false);

    const handlePublish = () => {
        setPublishSuccess(true);
        setTimeout(() => setPublishSuccess(false), 3500);
    };

    return (
        <div className="space-y-6 p-5">
            {/* Header & Actions */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Duty Rosters &amp; Shift Scheduling
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage schedules, assign shifts, and resolve conflicts efficiently.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    <button
                        type="button"
                        onClick={() => setIsCreateModalOpen(true)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
                    >
                        <CalendarClock className="h-4 w-4 text-slate-500" />
                        <span>Update Roster</span>
                    </button>

                    <button
                        type="button"
                        onClick={handlePublish}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-emerald-600/20 hover:bg-emerald-700 transition active:scale-95"
                    >
                        <Upload className="h-4 w-4" />
                        <span>Publish Roster</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsCreateModalOpen(true)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition active:scale-95"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Create Roster</span>
                    </button>
                </div>
            </div>

            {/* Publish Toast Alert */}
            {publishSuccess && (
                <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-800 animate-in fade-in">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Roster published successfully! Staff members have been notified via portal notification.</span>
                </div>
            )}

            {/* Filters Bar */}
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                    <select className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs font-semibold text-slate-700 outline-none">
                        <option>Cardiology</option>
                        <option>Neurology</option>
                        <option>Pediatrics</option>
                        <option>General Medicine</option>
                    </select>

                    <select className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs font-semibold text-slate-700 outline-none">
                        <option>All Roles</option>
                        <option>Doctors</option>
                        <option>Nurses</option>
                        <option>Technicians</option>
                    </select>

                    {/* Date Picker */}
                    <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/70 px-2 py-1 text-xs font-semibold text-slate-700">
                        <button type="button" className="p-1 hover:text-slate-900">
                            <ChevronLeft className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-2">Oct 16 - Oct 22, 2023</span>
                        <button type="button" className="p-1 hover:text-slate-900">
                            <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>

                {/* View Toggle */}
                <div className="flex items-center self-start rounded-xl border border-slate-200 bg-slate-100 p-1 text-xs sm:self-auto">
                    <button
                        type="button"
                        onClick={() => setViewType("Week")}
                        className={`rounded-lg px-3 py-1 font-semibold transition ${viewType === "Week" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                            }`}
                    >
                        Week
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewType("Month")}
                        className={`rounded-lg px-3 py-1 font-semibold transition ${viewType === "Month" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                            }`}
                    >
                        Month
                    </button>
                </div>
            </div>

            {/* Conflict Detected Alert */}
            {showConflict && (
                <div className="flex flex-col gap-2 rounded-2xl border border-rose-200 bg-rose-50/50 p-4 text-xs sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-rose-700">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        <span>
                            <strong>Conflict Detected:</strong> Dr. Anjali Desai has overlapping shifts on Wednesday, Oct 18. Please resolve before publishing.
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => alert("Redirecting to shift resolve dialog")}
                            className="font-bold text-rose-700 hover:underline"
                        >
                            Resolve
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowConflict(false)}
                            className="text-rose-400 hover:text-rose-700"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Roster Scheduling Matrix Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[950px] border-collapse text-left">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold text-slate-700">
                                <th className="p-4 w-60">Staff Member</th>
                                <th className="p-4 text-center">MON<br /><span className="text-slate-400 font-normal">16</span></th>
                                <th className="p-4 text-center">TUE<br /><span className="text-slate-400 font-normal">17</span></th>
                                <th className="p-4 text-center bg-blue-50/40 border-b-2 border-b-blue-600 text-blue-600">
                                    WED<br /><span className="font-bold">18</span>
                                </th>
                                <th className="p-4 text-center">THU<br /><span className="text-slate-400 font-normal">19</span></th>
                                <th className="p-4 text-center">FRI<br /><span className="text-slate-400 font-normal">20</span></th>
                                <th className="p-4 text-center">SAT<br /><span className="text-slate-400 font-normal">21</span></th>
                                <th className="p-4 text-center">SUN<br /><span className="text-slate-400 font-normal">22</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                            {ROSTER_DATA.map((staff) => (
                                <tr key={staff.id} className="hover:bg-slate-50/40 transition">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar name={staff.name} />
                                            <div>
                                                <p className="font-bold text-slate-900">{staff.name}</p>
                                                <p className="text-[11px] text-slate-400">{staff.role}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {(["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const).map((dayKey) => {
                                        const shift = staff.schedule[dayKey];
                                        return (
                                            <td key={dayKey} className="p-2.5 text-center align-middle">
                                                {shift?.type === "Morning" && (
                                                    <div className="rounded-xl bg-blue-50 p-2 text-blue-700">
                                                        <p className="font-bold">Morning</p>
                                                        <p className="text-[10px] text-blue-500 mt-0.5">{shift.time}</p>
                                                    </div>
                                                )}
                                                {shift?.type === "Evening" && (
                                                    <div className="rounded-xl bg-amber-50 p-2 text-amber-700">
                                                        <p className="font-bold">Evening</p>
                                                        <p className="text-[10px] text-amber-500 mt-0.5">{shift.time}</p>
                                                    </div>
                                                )}
                                                {shift?.type === "Night" && (
                                                    <div className="rounded-xl bg-indigo-50 p-2 text-indigo-700">
                                                        <p className="font-bold">Night</p>
                                                        <p className="text-[10px] text-indigo-500 mt-0.5">{shift.time}</p>
                                                    </div>
                                                )}
                                                {shift?.type === "Overlap" && (
                                                    <div className="rounded-xl border border-dashed border-rose-300 bg-rose-50 p-2 text-rose-700">
                                                        <div className="flex items-center justify-center gap-1 font-bold">
                                                            <span>Overlap!</span>
                                                            <AlertTriangle className="h-3 w-3" />
                                                        </div>
                                                        <p className="text-[10px] text-rose-500 mt-0.5">{shift.time}</p>
                                                    </div>
                                                )}
                                                {shift?.type === "OFF" && (
                                                    <span className="text-slate-400 font-semibold">OFF</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Legend Footer */}
            <div className="flex flex-wrap items-center gap-5 text-xs text-slate-600 pt-2">
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded bg-blue-100" />
                    <span>Morning (8am-4pm)</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded bg-amber-100" />
                    <span>Evening (4pm-12am)</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded bg-indigo-100" />
                    <span>Night (12am-8am)</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded border border-rose-300 bg-rose-100" />
                    <span>Conflict</span>
                </div>
            </div>

            {/* Create / Update Roster Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="text-base font-bold text-slate-900">Assign New Shift</h3>
                            <button
                                type="button"
                                onClick={() => setIsCreateModalOpen(false)}
                                className="text-slate-400 hover:text-slate-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-3 text-xs">
                            <div>
                                <label className="block font-semibold text-slate-600">Select Staff Member</label>
                                <select className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 outline-none">
                                    <option>Dr. R. Sharma (Cardiology)</option>
                                    <option>Dr. Anjali Desai (Senior Resident)</option>
                                    <option>Nurse Priya K. (Head Nurse)</option>
                                    <option>Vikram Singh (Radiology Tech)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-semibold text-slate-600">Select Date</label>
                                <input
                                    type="date"
                                    defaultValue="2023-10-18"
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-slate-600">Duty Shift</label>
                                <select className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 outline-none">
                                    <option value="Morning">Morning (08:00 AM - 04:00 PM)</option>
                                    <option value="Evening">Evening (04:00 PM - 12:00 AM)</option>
                                    <option value="Night">Night (12:00 AM - 08:00 AM)</option>
                                    <option value="OFF">Mark as OFF</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={() => setIsCreateModalOpen(false)}
                                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    alert("Shift successfully saved!");
                                    setIsCreateModalOpen(false);
                                }}
                                className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700"
                            >
                                Save Shift
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}