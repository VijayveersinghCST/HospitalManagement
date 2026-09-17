"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Siren,
    Printer,
    CheckCircle2,
    Bell,
    MapPin,
    Clock,
    Bed,
    Plus,
    Users,
    ChevronRight,
    Wifi,
} from "lucide-react";
import Image from "next/image";

export default function EmergencyPatientIntakePage() {
    const [triage, setTriage] = useState<"CRITICAL" | "SEVERE" | "MODERATE">("CRITICAL");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        gender: "Male",
        emergencyContact: "",
        complaint: "",
    });

    return (
        <div className="mx-auto max-w-7xl space-y-6 p-5">
            {/* Top Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Emergency Patient Intake
                        </h1>
                        <span className="flex items-center gap-1.5 rounded-md bg-rose-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                            Live
                        </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                        Super Admin View <span className="text-slate-300">|</span> Protocol:{" "}
                        <span className="font-semibold text-blue-600">FAST-TRACK</span>
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                        <Wifi className="h-3.5 w-3.5" />
                        <span>Online</span>
                    </div>

                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-xl border border-rose-300 bg-rose-50/80 px-4 py-2.5 text-xs font-bold text-rose-700 shadow-sm transition hover:bg-rose-100 active:scale-95"
                    >
                        <Siren className="h-4 w-4" />
                        <span>ACTIVATE CODE BLUE</span>
                    </button>
                </div>
            </div>

            {/* Main Content: Left Intake Form + Right Real-time Monitor */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left Column (2 Cols): Patient Details Form */}
                <div className="space-y-6 lg:col-span-2">
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <span className="text-xs font-bold">::</span>
                                </div>
                                <h2 className="text-sm font-bold text-slate-900">Patient Details</h2>
                            </div>
                            <span className="font-mono text-xs text-slate-400">ID: AUTO-GEN-2993</span>
                        </div>

                        <div className="mt-5 space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">
                                        First Name <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter first name"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">
                                        Last Name <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter last name"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">Age</label>
                                    <input
                                        type="number"
                                        placeholder="YY"
                                        value={formData.age}
                                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">Gender</label>
                                    <select
                                        value={formData.gender}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">Emergency Contact</label>
                                    <input
                                        type="tel"
                                        placeholder="+91 XXXXX XXXXX"
                                        value={formData.emergencyContact}
                                        onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                                    />
                                </div>
                            </div>

                            {/* Triage Level Selector */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-600">
                                    Triage Level <span className="text-rose-500">*</span>
                                </label>
                                <div className="mt-2 grid grid-cols-3 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setTriage("CRITICAL")}
                                        className={`rounded-xl py-2.5 text-xs font-bold transition ${triage === "CRITICAL"
                                                ? "bg-rose-600 text-white shadow-md shadow-rose-600/20 ring-2 ring-rose-300"
                                                : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                                            }`}
                                    >
                                        CRITICAL (Red)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTriage("SEVERE")}
                                        className={`rounded-xl py-2.5 text-xs font-bold transition ${triage === "SEVERE"
                                                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20 ring-2 ring-amber-300"
                                                : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                                            }`}
                                    >
                                        SEVERE (Orange)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTriage("MODERATE")}
                                        className={`rounded-xl py-2.5 text-xs font-bold transition ${triage === "MODERATE"
                                                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-300"
                                                : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                                            }`}
                                    >
                                        MODERATE (Green)
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600">
                                    Brief Reason / Chief Complaint
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="e.g. Severe chest pain, difficulty breathing, trauma on left arm..."
                                    value={formData.complaint}
                                    onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                                />
                            </div>

                            {/* Confirm Admission & Print */}
                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="button"
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99]"
                                >
                                    <CheckCircle2 className="h-4 w-4" />
                                    <span>Confirm Admission</span>
                                </button>
                                <button
                                    type="button"
                                    title="Print Intake Form"
                                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                >
                                    <Printer className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column (1 Col): Live ER Telemetry & Feed */}
                <div className="space-y-5">
                    {/* Top Quick Cards: Bed & Doctor */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        {/* Auto-Assigned Bed */}
                        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between text-slate-400">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                    Auto-Assigned Bed
                                </span>
                                <Bed className="h-4 w-4" />
                            </div>
                            <div className="mt-2 flex items-baseline gap-2">
                                <p className="text-2xl font-black text-slate-900">ICU-04</p>
                                <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                                    RESERVED
                                </span>
                            </div>
                            <div className="mt-3 flex items-start gap-1.5 text-[11px] text-slate-500">
                                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                                <span>Wing A, Level 2 • Navigation sent to porter</span>
                            </div>
                        </div>

                        {/* Priority Doctor */}
                        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Priority Doctor
                            </span>
                            <div className="mt-2 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-slate-900">Dr. R. Sharma</p>
                                    <p className="text-[11px] text-slate-400">Cardiologist</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-semibold text-slate-400 uppercase">ETA</p>
                                    <p className="text-lg font-bold text-emerald-600">2 mins</p>
                                </div>
                            </div>
                            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                                <div className="h-full w-4/5 rounded-full bg-emerald-500" />
                            </div>
                        </div>
                    </div>

                    {/* Live Alert Feed */}
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2 text-amber-600">
                                <Bell className="h-4 w-4" />
                                <h3 className="text-xs font-bold text-slate-900">Live Alert Feed</h3>
                            </div>
                            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                        </div>

                        <div className="mt-4 space-y-3.5 text-xs">
                            <div className="border-l-2 border-blue-500 pl-3">
                                <div className="flex items-center justify-between font-semibold text-slate-800">
                                    <span>ICU Prep Team Notified</span>
                                    <span className="text-[10px] font-normal text-slate-400">Just now</span>
                                </div>
                                <p className="mt-0.5 text-[11px] text-slate-500">Automated alert sent to Station 4.</p>
                            </div>

                            <div className="border-l-2 border-emerald-500 pl-3">
                                <div className="flex items-center justify-between font-semibold text-slate-800">
                                    <span>Dr. Sharma Acknowledged</span>
                                    <span className="text-[10px] font-normal text-slate-400">12s ago</span>
                                </div>
                                <p className="mt-0.5 text-[11px] text-slate-500">Status changed to &quot;En Route&quot;.</p>
                            </div>

                            <div className="border-l-2 border-amber-500 pl-3">
                                <div className="flex items-center justify-between font-semibold text-slate-800">
                                    <span>Blood Bank Alert</span>
                                    <span className="text-[10px] font-normal text-slate-400">45s ago</span>
                                </div>
                                <p className="mt-0.5 text-[11px] text-slate-500">O- Negative reserve check initiated.</p>
                            </div>

                            <div className="border-l-2 border-slate-300 pl-3">
                                <div className="flex items-center justify-between font-semibold text-slate-800">
                                    <span>Registration Initiated</span>
                                    <span className="text-[10px] font-normal text-slate-400">1m ago</span>
                                </div>
                                <p className="mt-0.5 text-[11px] text-slate-500">User: SuperAdmin_01</p>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="mt-4 w-full text-center text-xs font-semibold text-blue-600 hover:underline"
                        >
                            View Full Log history
                        </button>
                    </div>

                    {/* Bottom Indicators */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                            <p className="text-xl font-black text-slate-900">04</p>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                Available Porters
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-3 text-center">
                            <span className="flex h-6 w-6 items-center justify-center rounded bg-emerald-100 text-emerald-700">
                                <Plus className="h-4 w-4 stroke-[3]" />
                            </span>
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                                ICU READY
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}