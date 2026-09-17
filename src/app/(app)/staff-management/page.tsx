// src/app/(app)/staff-management/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Plus,
    CalendarCheck,
    CalendarClock,
    Users,
    Stethoscope,
    Sunrise,
    Clock,
    Eye,
    Pencil,
    MoreVertical,
} from "lucide-react";
import Avatar from "@/components/common/Avatar";

interface StaffMember {
    id: string;
    name: string;
    role: string;
    department: string;
    dateJoined: string;
    status: "Active" | "Probation" | "On Leave";
}

const RECENT_STAFF: StaffMember[] = [
    {
        id: "SRH-892",
        name: "Sarah Jenkins",
        role: "Senior Nurse",
        department: "Pediatrics",
        dateJoined: "Oct 24, 2023",
        status: "Active",
    },
    {
        id: "SRH-893",
        name: "Dr. Amit Patel",
        role: "Neurologist",
        department: "Neurology",
        dateJoined: "Oct 22, 2023",
        status: "Probation",
    },
    {
        id: "SRH-894",
        name: "Mike Ross",
        role: "Lab Technician",
        department: "Laboratory",
        dateJoined: "Oct 20, 2023",
        status: "Active",
    },
];

export default function StaffManagementPage() {
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    return (
        <div className="space-y-6 p-5">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Staff Management
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Oversee staff recruitment, manage duty rosters, monitor performance, and approve leaves across all departments.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    <Link
                        href="/staff-management/add"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-cyan-500/20 hover:bg-cyan-600 transition"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Add New Staff</span>
                    </Link>
                    <Link
                        href="/staff-management/roster"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
                    >
                        <CalendarCheck className="h-4 w-4 text-slate-500" />
                        <span>View Staff Roster</span>
                    </Link>
                    <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
                    >
                        <CalendarClock className="h-4 w-4 text-slate-500" />
                        <span>Manage Leave Requests</span>
                    </button>
                </div>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Users className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400">Total Staff</p>
                        <p className="text-2xl font-black text-slate-900">450</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <Stethoscope className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400">On Duty</p>
                        <p className="text-2xl font-black text-slate-900">320</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                        <Sunrise className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400">On Leave</p>
                        <p className="text-2xl font-black text-slate-900">12</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                        <Clock className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400">Pending Requests</p>
                        <p className="text-2xl font-black text-slate-900">5</p>
                    </div>
                </div>
            </div>

            {/* Recent Staff Additions Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 p-5">
                    <h2 className="text-base font-bold text-slate-900">Recent Staff Additions</h2>
                    <button type="button" className="text-xs font-semibold text-cyan-600 hover:underline">
                        View All
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] border-collapse text-left">
                        <thead>
                            <tr className="bg-slate-50/60 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                                <th className="px-6 py-3.5">Employee</th>
                                <th className="px-6 py-3.5">Role</th>
                                <th className="px-6 py-3.5">Department</th>
                                <th className="px-6 py-3.5">Date Joined</th>
                                <th className="px-6 py-3.5">Status</th>
                                <th className="px-6 py-3.5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {RECENT_STAFF.map((staff) => (
                                <tr key={staff.id} className="hover:bg-slate-50/60 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar name={staff.name} />
                                            <div>
                                                <p className="font-semibold text-slate-900">{staff.name}</p>
                                                <p className="text-xs text-slate-400">ID: #{staff.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-700">{staff.role}</td>
                                    <td className="px-6 py-4 text-slate-500">{staff.department}</td>
                                    <td className="px-6 py-4 text-xs text-slate-500">{staff.dateJoined}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${staff.status === "Active"
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-amber-50 text-amber-700"
                                                }`}
                                        >
                                            {staff.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right relative">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                href={`/staff-management/${staff.id}/view`}
                                                title="View Profile"
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <Link
                                                href={`/staff-management/${staff.id}/edit`}
                                                title="Edit Staff"
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                            >
                                                <Pencil className="h-3.5 w-3.5" />
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setActiveMenuId(activeMenuId === staff.id ? null : staff.id)
                                                }
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                                            >
                                                <MoreVertical className="h-4 w-4" />
                                            </button>
                                        </div>

                                        {/* Quick Dropdown Menu */}
                                        {activeMenuId === staff.id && (
                                            <div className="absolute right-6 top-14 z-20 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg text-left text-xs">
                                                <Link
                                                    href={`/staff-management/${staff.id}/view`}
                                                    className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
                                                >
                                                    View Full Details
                                                </Link>
                                                <Link
                                                    href={`/staff-management/${staff.id}/edit`}
                                                    className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
                                                >
                                                    Edit Profile
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        alert(`Deactivated ${staff.name}`);
                                                        setActiveMenuId(null);
                                                    }}
                                                    className="w-full text-left rounded-lg px-3 py-2 text-rose-600 hover:bg-rose-50"
                                                >
                                                    Deactivate Staff
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}