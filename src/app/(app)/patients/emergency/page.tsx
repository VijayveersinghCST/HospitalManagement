// src/app/(app)/patients/emergency/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Siren,
    Activity,
    Clock,
    UserCheck,
    AlertOctagon,
    Download,
    Flame,
    ChevronRight,
    Eye,
} from "lucide-react";
import Avatar from "@/components/common/Avatar";

interface EmergencyPatient {
    id: string;
    name: string;
    ageGender: string;
    triage: "Critical" | "Stable" | "Moderate";
    lifecycle: "TREATMENT" | "ADMITTED" | "REGISTERED" | "DISCHARGING";
    treatmentProgress: string;
    progressPercent: number;
    admittedTime: string;
    doctor: string;
    nurse: string;
}

const EMERGENCY_PATIENTS: EmergencyPatient[] = [
    {
        id: "#992",
        name: "Rahul Kumar",
        ageGender: "42y/M",
        triage: "Critical",
        lifecycle: "TREATMENT",
        treatmentProgress: "CT Scan",
        progressPercent: 40,
        admittedTime: "00:45:12",
        doctor: "Dr. Sharma",
        nurse: "Ns. Priya",
    },
    {
        id: "#994",
        name: "Amit Singh",
        ageGender: "28y/M",
        triage: "Stable",
        lifecycle: "ADMITTED",
        treatmentProgress: "Vitals Check",
        progressPercent: 10,
        admittedTime: "00:15:30",
        doctor: "Dr. Lee",
        nurse: "Ns. Sarah",
    },
    {
        id: "#991",
        name: "Sneha Gupta",
        ageGender: "55y/F",
        triage: "Moderate",
        lifecycle: "TREATMENT",
        treatmentProgress: "IV Administered",
        progressPercent: 75,
        admittedTime: "01:10:05",
        doctor: "Dr. Patel",
        nurse: "Ns. Rita",
    },
    {
        id: "#998",
        name: "Vikram Das",
        ageGender: "33y/M",
        triage: "Critical",
        lifecycle: "REGISTERED",
        treatmentProgress: "Triage Pending",
        progressPercent: 5,
        admittedTime: "00:05:00",
        doctor: "Assigning...",
        nurse: "Assigning...",
    },
];

export default function EmergencyCommandPage() {
    const [patients] = useState(EMERGENCY_PATIENTS);

    return (
        <div className="space-y-6 p-5">
            {/* Header Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Emergency Command Center
                        </h1>
                        <span className="flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-600 ring-1 ring-rose-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-ping" />
                            LIVE
                        </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                        Real-time critical patient monitoring, FAST-TRACK triage, and lifecycle tracking.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/patients/emergency/intake"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
                    >
                        <span>+ New Intake</span>
                    </Link>
                    <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                    >
                        <Download className="h-4 w-4" />
                        <span>Export Report</span>
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-rose-600/20 hover:bg-rose-700 active:scale-95 transition"
                    >
                        <Flame className="h-4 w-4" />
                        <span>ACTIVATE CODE BLUE</span>
                    </button>
                </div>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between text-slate-500">
                        <span className="text-xs font-semibold uppercase tracking-wider">Active Cases</span>
                        <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="mt-2 text-3xl font-bold text-slate-900">14</p>
                    <p className="mt-1 text-xs text-emerald-600 font-semibold">↗ +2 since last hour</p>
                </div>

                <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5 shadow-sm">
                    <div className="flex items-center justify-between text-rose-700">
                        <span className="text-xs font-semibold uppercase tracking-wider">Critical Status</span>
                        <AlertOctagon className="h-5 w-5 text-rose-600" />
                    </div>
                    <p className="mt-2 text-3xl font-bold text-rose-700">3</p>
                    <p className="mt-1 text-xs text-rose-600 font-medium">Requiring immediate ICU bed</p>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between text-slate-500">
                        <span className="text-xs font-semibold uppercase tracking-wider">Avg Wait Time</span>
                        <Clock className="h-5 w-5 text-amber-500" />
                    </div>
                    <p className="mt-2 text-3xl font-bold text-slate-900">12m 45s</p>
                    <p className="mt-1 text-xs text-emerald-600 font-semibold">↘ -2m vs yesterday</p>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between text-slate-500">
                        <span className="text-xs font-semibold uppercase tracking-wider">Doctors on Duty</span>
                        <UserCheck className="h-5 w-5 text-emerald-600" />
                    </div>
                    <p className="mt-2 text-3xl font-bold text-slate-900">8</p>
                    <p className="mt-1 text-xs text-slate-400">4 Nurses on floor</p>
                </div>
            </div>

            {/* Active Emergency Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-5">
                    <h2 className="text-base font-bold text-slate-900">Active Emergency Cases</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[950px] border-collapse text-left">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                <th className="px-5 py-3.5">Patient Details</th>
                                <th className="px-5 py-3.5">Triage</th>
                                <th className="px-5 py-3.5">Lifecycle</th>
                                <th className="px-5 py-3.5">Treatment Progress</th>
                                <th className="px-5 py-3.5">Admitted Time</th>
                                <th className="px-5 py-3.5">Assigned Staff</th>
                                <th className="px-5 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {patients.map((p) => (
                                <tr key={p.id} className="transition hover:bg-slate-50/60">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar name={p.name} />
                                            <div>
                                                <p className="font-semibold text-slate-900">{p.name}</p>
                                                <p className="text-xs text-slate-400">ID: {p.id} • {p.ageGender}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${p.triage === "Critical"
                                                ? "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
                                                : p.triage === "Stable"
                                                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                                                    : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                                                }`}
                                        >
                                            {p.triage}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className="text-xs font-bold tracking-wider text-blue-600">
                                            {p.lifecycle}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="w-36 space-y-1">
                                            <div className="flex justify-between text-xs font-semibold text-slate-700">
                                                <span>{p.treatmentProgress}</span>
                                                <span>{p.progressPercent}%</span>
                                            </div>
                                            <div className="h-1.5 w-full rounded-full bg-slate-100">
                                                <div
                                                    className="h-full rounded-full bg-blue-600"
                                                    style={{ width: `${p.progressPercent}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 font-mono text-xs font-semibold text-rose-600">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5" />
                                            <span>{p.admittedTime}</span>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-xs">
                                        <p className="font-semibold text-slate-800">{p.doctor}</p>
                                        <p className="text-slate-400">{p.nurse}</p>
                                    </td>

                                    <td className="px-5 py-4 text-right">
                                        <Link
                                            href={`/patients/${p.id.replace("#", "")}/view`}
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Link>
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