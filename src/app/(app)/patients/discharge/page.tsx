// src/app/(app)/patients/discharge/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, FileCheck, Search, Eye } from "lucide-react";

interface DischargeRecord {
    id: string;
    name: string;
    ward: string;
    doctorClearance: boolean;
    pharmacyClearance: boolean;
    billingStatus: "Paid" | "Pending" | "Insurance Approved";
}

const DISCHARGES: DischargeRecord[] = [
    { id: "PT-2024-880", name: "Pooja Mehra", ward: "Ward B (Bed 05)", doctorClearance: true, pharmacyClearance: true, billingStatus: "Paid" },
    { id: "PT-2024-874", name: "Ramesh Sen", ward: "Cabin 202", doctorClearance: true, pharmacyClearance: false, billingStatus: "Insurance Approved" },
    { id: "PT-2024-862", name: "Deepak Joshi", ward: "General Ward A", doctorClearance: false, pharmacyClearance: false, billingStatus: "Pending" },
];

export default function DischargePage() {
    const [list, setList] = useState(DISCHARGES);

    return (
        <div className="space-y-6 p-5">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Discharge Clearance Desk</h1>
                <p className="mt-1 text-sm text-slate-500">Monitor multi-department approvals before issuing patient discharge summary.</p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left text-sm">
                        <thead className="bg-slate-50/75 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                            <tr>
                                <th className="px-5 py-3.5">Patient ID</th>
                                <th className="px-5 py-3.5">Patient Name</th>
                                <th className="px-5 py-3.5">Ward Location</th>
                                <th className="px-5 py-3.5">Doctor Clearance</th>
                                <th className="px-5 py-3.5">Pharmacy Clearance</th>
                                <th className="px-5 py-3.5">Billing Status</th>
                                <th className="px-5 py-3.5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {list.map((p) => {
                                const canDischarge = p.doctorClearance && p.pharmacyClearance && (p.billingStatus === "Paid" || p.billingStatus === "Insurance Approved");
                                return (
                                    <tr key={p.id} className="hover:bg-slate-50/60">
                                        <td className="px-5 py-4 font-semibold text-slate-700">#{p.id}</td>
                                        <td className="px-5 py-4 font-semibold text-slate-900">{p.name}</td>
                                        <td className="px-5 py-4 text-slate-600 text-xs">{p.ward}</td>
                                        <td className="px-5 py-4">
                                            {p.doctorClearance ? (
                                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                                                    <CheckCircle2 className="h-4 w-4" /> Approved
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500">
                                                    <Clock className="h-4 w-4" /> Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-5 py-4">
                                            {p.pharmacyClearance ? (
                                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                                                    <CheckCircle2 className="h-4 w-4" /> Meds Returned
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400">
                                                    <Clock className="h-4 w-4" /> Awaiting
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${p.billingStatus === "Paid"
                                                ? "bg-emerald-50 text-emerald-700"
                                                : p.billingStatus === "Insurance Approved"
                                                    ? "bg-blue-50 text-blue-700"
                                                    : "bg-amber-50 text-amber-700"
                                                }`}>
                                                {p.billingStatus}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <Link
                                                href={`/patients/discharge/${p.id}`}
                                                title="View Discharge Summary"
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm transition"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            {canDischarge ? (
                                                <button
                                                    type="button"
                                                    onClick={() => alert(`Discharged ${p.name}`)}
                                                    className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
                                                >
                                                    Complete Release
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    disabled
                                                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-400 cursor-not-allowed"
                                                >
                                                    Pending Signoffs
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}