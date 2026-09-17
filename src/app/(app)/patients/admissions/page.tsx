// src/app/(app)/patients/admissions/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Search, Building2, BedDouble, Users, Eye, Pencil } from "lucide-react";
import Avatar from "@/components/common/Avatar";

const ADMISSIONS_DATA = [
    { id: "ADM-902", patientName: "Rahul Kumar", ward: "ICU Unit 2", bed: "Bed 01", admittedDate: "2026-09-12", doctor: "Dr. Anita Singh" },
    { id: "ADM-903", patientName: "Sarah Jenkins", ward: "General Ward A", bed: "Bed 12", admittedDate: "2026-09-14", doctor: "Dr. Rajesh Kumar" },
    { id: "ADM-904", patientName: "Vikram Das", ward: "Trauma Ward B", bed: "Bed 04", admittedDate: "2026-09-15", doctor: "Dr. Emily Chen" },
];

export default function AdmissionsPage() {
    return (
        <div className="space-y-6 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">In-Patient Admissions</h1>
                    <p className="mt-1 text-sm text-slate-500">Live ward occupancy, bed assignments, and admitted patients.</p>
                </div>
                <Link
                    href="/patients/register"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" />
                    <span>New Admission</span>
                </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left text-sm">
                        <thead className="bg-slate-50/75 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                            <tr>
                                <th className="px-5 py-3.5">Admission ID</th>
                                <th className="px-5 py-3.5">Patient</th>
                                <th className="px-5 py-3.5">Ward & Bed</th>
                                <th className="px-5 py-3.5">Admission Date</th>
                                <th className="px-5 py-3.5">Doctor</th>
                                <th className="px-5 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {ADMISSIONS_DATA.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/60">
                                    <td className="px-5 py-4 font-semibold text-slate-700">#{item.id}</td>
                                    <td className="px-5 py-4 font-semibold text-slate-900">{item.patientName}</td>
                                    <td className="px-5 py-4 text-slate-600">{item.ward} - {item.bed}</td>
                                    <td className="px-5 py-4 text-slate-500 text-xs">{item.admittedDate}</td>
                                    <td className="px-5 py-4 text-slate-700 font-medium">{item.doctor}</td>
                                    <td className="px-5 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/patients/${item.id}/view`} className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600">
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <Link href={`/patients/${item.id}/edit`} className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600">
                                                <Pencil className="h-3.5 w-3.5" />
                                            </Link>
                                        </div>
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