"use client";

import React, { use } from "react";
import Link from "next/link";
import {
    Printer,
    Download,
    Calendar,
    Phone,
    FileText,
    Clock,
    ShieldCheck,
    Paperclip,
    CheckCircle,
    FileDown,
    Lock,
    ArrowLeft,
} from "lucide-react";

interface DischargeSummaryProps {
    params: Promise<{ id: string }>;
}

export default function DischargeSummaryPage({ params }: DischargeSummaryProps) {
    const resolvedParams = use(params);
    const patientId = resolvedParams.id || "SRH-8821";

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="mx-auto max-w-7xl space-y-6 p-5">
            {/* Breadcrumb & Actions Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
                    <Link href="/dashboard" className="hover:text-slate-700">Dashboard</Link>
                    <span>&gt;</span>
                    <Link href="/patients" className="hover:text-slate-700">Patient Records</Link>
                    <span>&gt;</span>
                    <span className="text-slate-800 font-semibold">Discharge Summary</span>
                </nav>

                <div className="flex items-center gap-2.5">
                    <button
                        type="button"
                        onClick={handlePrint}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
                    >
                        <Printer className="h-3.5 w-3.5" />
                        <span>Print</span>
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition"
                    >
                        <Download className="h-3.5 w-3.5" />
                        <span>Export PDF</span>
                    </button>
                </div>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Discharge Summary &amp; History
            </h1>

            {/* Patient Header Banner */}
            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-lg font-bold text-slate-600">
                        RK
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                            <h2 className="text-lg font-bold text-slate-900">Rajesh Kumar</h2>
                            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                                Discharged
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                            <span>ID: <strong className="text-slate-700">{patientId}</strong></span>
                            <span>•</span>
                            <span>Age: <strong className="text-slate-700">45</strong></span>
                            <span>•</span>
                            <span>Gender: <strong className="text-slate-700">Male</strong></span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3 text-slate-400" />
                                +91 98765 43210
                            </span>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-left sm:text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Current Episode
                    </p>
                    <p className="font-mono text-sm font-bold text-blue-600">ADM-2023-902</p>
                    <p className="text-[11px] text-slate-500">
                        Admitted: 12 Oct 2023 | Discharged: 18 Oct 2023
                    </p>
                </div>
            </div>

            {/* 2-Column Split: Clinical Summary (Left) + Medical History / Archives (Right) */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left Column (2 Cols) */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Card 1: Clinical Summary */}
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-blue-600" />
                                <h3 className="text-sm font-bold text-slate-900">Clinical Summary</h3>
                            </div>
                        </div>

                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Final Diagnosis
                            </p>
                            <p className="mt-1 text-xs text-slate-700 leading-relaxed font-medium">
                                Acute Bronchitis with mild asthma exacerbation. Patient presented with shortness of breath and productive cough.
                            </p>
                        </div>

                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Treatment Given
                            </p>
                            <p className="mt-1 text-xs text-slate-700 leading-relaxed">
                                Nebulization with Budecort (q8h), IV Antibiotics (Ceftriaxone 1g BD for 5 days), Oxygen therapy 2L/min maintained for first 48 hours. Supportive care and physiotherapy.
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Prescriptions at Discharge */}
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                            <Paperclip className="h-4 w-4 text-blue-600" />
                            <h3 className="text-sm font-bold text-slate-900">Prescriptions at Discharge</h3>
                        </div>

                        <div className="mt-4 overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50/75 text-slate-500 font-semibold">
                                        <th className="py-2.5 px-3">Medicine Name</th>
                                        <th className="py-2.5 px-3">Dosage</th>
                                        <th className="py-2.5 px-3">Frequency</th>
                                        <th className="py-2.5 px-3">Duration</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                    <tr>
                                        <td className="py-3 px-3 font-semibold text-slate-900">Tab. Augmentin 625mg</td>
                                        <td className="py-3 px-3">1 Tablet</td>
                                        <td className="py-3 px-3">BID (Twice daily)</td>
                                        <td className="py-3 px-3">5 Days</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-3 font-semibold text-slate-900">Cap. Pantop 40mg</td>
                                        <td className="py-3 px-3">1 Capsule</td>
                                        <td className="py-3 px-3">OD (Before Breakfast)</td>
                                        <td className="py-3 px-3">7 Days</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-3 font-semibold text-slate-900">Inhaler Foracort 200</td>
                                        <td className="py-3 px-3">2 Puffs</td>
                                        <td className="py-3 px-3">SOS</td>
                                        <td className="py-3 px-3">As Needed</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Card 3: Follow-up Instructions */}
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm space-y-3">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                            <Calendar className="h-4 w-4 text-blue-600" />
                            <h3 className="text-sm font-bold text-slate-900">Follow-up Instructions</h3>
                        </div>

                        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-xs text-blue-900 leading-relaxed">
                            <p className="font-bold">
                                Next Appointment: <span className="text-blue-700">25 Oct 2023, 10:00 AM (OPD Room 4)</span>
                            </p>
                            <p className="mt-1 text-slate-600">
                                Review in OPD after 7 days. Continue inhaler as prescribed. If shortness of breath worsens, report to emergency immediately. Avoid cold beverages and dust exposure.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column (1 Col): History & Archived Reports */}
                <div className="space-y-6">
                    {/* Card 4: Past Medical History Timeline */}
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <h3 className="text-sm font-bold text-slate-900">Medical History</h3>
                        </div>

                        <div className="mt-4">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Past Admissions
                            </p>

                            <div className="relative mt-3 space-y-4 pl-4 before:absolute before:left-1 before:top-2 before:h-[80%] before:w-0.5 before:bg-slate-200">
                                <div className="relative">
                                    <span className="absolute -left-[19px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-blue-600" />
                                    <p className="text-[11px] text-slate-400">Sept 14, 2022</p>
                                    <p className="text-xs font-bold text-slate-800">Dengue Fever</p>
                                    <p className="text-[11px] text-slate-500">Dr. A. Sharma (General Medicine)</p>
                                </div>

                                <div className="relative">
                                    <span className="absolute -left-[19px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-slate-400" />
                                    <p className="text-[11px] text-slate-400">Jan 05, 2020</p>
                                    <p className="text-xs font-bold text-slate-800">Fracture (Right Arm)</p>
                                    <p className="text-[11px] text-slate-500">Dr. K. Patel (Orthopedics)</p>
                                </div>
                            </div>
                        </div>

                        {/* Archived Reports Section */}
                        <div className="mt-6 border-t border-slate-100 pt-4">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Archived Reports
                            </p>

                            <div className="mt-3 space-y-2.5">
                                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-2.5 text-xs hover:bg-slate-100 transition">
                                    <div>
                                        <p className="font-semibold text-slate-800">Discharge_Summary_2022.pdf</p>
                                        <p className="text-[10px] text-slate-400">1.2 MB • Added 20 Sep 2022</p>
                                    </div>
                                    <button type="button" className="text-slate-400 hover:text-slate-700">
                                        <FileDown className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-2.5 text-xs hover:bg-slate-100 transition">
                                    <div>
                                        <p className="font-semibold text-slate-800">Lab_Results_Oct23.pdf</p>
                                        <p className="text-[10px] text-slate-400">850 KB • Added 12 Oct 2023</p>
                                    </div>
                                    <button type="button" className="text-slate-400 hover:text-slate-700">
                                        <FileDown className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-2.5 text-xs hover:bg-slate-100 transition">
                                    <div>
                                        <p className="font-semibold text-slate-800">XRay_Chest_PA.jpg</p>
                                        <p className="text-[10px] text-slate-400">3.4 MB • Added 12 Oct 2023</p>
                                    </div>
                                    <button type="button" className="text-slate-400 hover:text-slate-700">
                                        <FileDown className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Permanent Audit Banner */}
                        <div className="mt-6 flex items-start gap-2 rounded-xl bg-amber-50/60 p-3 text-[11px] text-amber-800">
                            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
                            <span>Medical history is preserved permanently for audit and reference.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Official Footer */}
            <footer className="pt-6 text-center text-[11px] text-slate-400">
                Generated by Hospital Management System V2.1 • Confidential Patient Record • Not for public distribution
            </footer>
        </div>
    );
}   