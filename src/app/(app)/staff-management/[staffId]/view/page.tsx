// src/app/(app)/staff-management/[id]/view/page.tsx
"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Pencil,
    Ban,
    Building2,
    Clock,
    UserCheck,
    DoorOpen,
    CheckCircle2,
    ShieldCheck,
    ChevronRight,
} from "lucide-react";

interface StaffViewProps {
    params: Promise<{ id: string }>;
}

export default function StaffViewPage({ params }: StaffViewProps) {
    const resolvedParams = use(params);
    const staffId = resolvedParams.id || "EMP-2024-042";

    return (
        <div className="mx-auto max-w-7xl space-y-6 p-5">

            {/* Top Profile Card */}
            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-emerald-100">
                        <Image
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Staff Avatar"
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
                    </div>

                    <div className="space-y-1">
                        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                            Dr. Anjali Desai
                        </h1>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                            <span className="font-semibold text-slate-700">Senior Resident</span>
                            <span>•</span>
                            <span>ID: {staffId}</span>
                            <span>•</span>
                            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                                Active Status
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2.5 self-start sm:self-center">
                    <Link
                        href={`/staff-management/${staffId}/edit`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                        <span>Edit Details</span>
                    </Link>
                    <button
                        type="button"
                        onClick={() => alert("Staff Deactivated")}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50/60 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition"
                    >
                        <Ban className="h-3.5 w-3.5" />
                        <span>Deactivate</span>
                    </button>
                </div>
            </div>

            {/* 2-Column Responsive Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Card 1: Personal Information */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h2 className="text-sm font-bold text-slate-900">Personal Information</h2>
                        <Link href={`/staff-management/${staffId}/edit`} className="text-xs font-semibold text-blue-600 hover:underline">
                            Update
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Date of Birth</p>
                            <p className="mt-1 font-semibold text-slate-800">15 Aug 1985</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Gender</p>
                            <p className="mt-1 font-semibold text-slate-800">Female</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Blood Group</p>
                            <p className="mt-1 font-semibold text-slate-800">B+</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Contact Number</p>
                            <p className="mt-1 font-semibold text-slate-800">+91 98765 43210</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Emergency Contact</p>
                            <p className="mt-1 font-semibold text-slate-800">+91 98765 43211</p>
                            <p className="text-[10px] text-slate-400">Spouse</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</p>
                            <p className="mt-1 font-semibold text-slate-800 truncate">anjali.desai@shriramhospital.com</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Residential Address</p>
                            <p className="mt-1 font-medium text-slate-700 leading-relaxed">
                                Flat 402, Sunshine Apartments, Civil Lines, New Delhi - 110054
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 2: Work Details */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
                    <div className="border-b border-slate-100 pb-3">
                        <h2 className="text-sm font-bold text-slate-900">Work Details</h2>
                    </div>

                    <div className="space-y-4 text-xs">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <Building2 className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-[10px] font-semibold text-slate-400">Department</p>
                                <p className="font-bold text-slate-900">General Medicine</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                                <Clock className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-[10px] font-semibold text-slate-400">Shift Timing</p>
                                <p className="font-bold text-slate-900">09:00 AM - 05:00 PM</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                <UserCheck className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-[10px] font-semibold text-slate-400">Reporting Manager</p>
                                <p className="font-bold text-slate-900">Dr. Rajesh Kumar</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                                <DoorOpen className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-[10px] font-semibold text-slate-400">Cabin / Room No.</p>
                                <p className="font-bold text-slate-900">OPD-104, Block B</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3: Professional Information */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
                    <div className="border-b border-slate-100 pb-3">
                        <h2 className="text-sm font-bold text-slate-900">Professional Information</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Designation</p>
                            <p className="mt-1 font-semibold text-slate-800">Senior Resident</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Medical License No.</p>
                            <p className="mt-1 font-semibold text-slate-800">MCI-23482</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Qualifications</p>
                            <p className="mt-1 font-semibold text-slate-800">MBBS, MD (General Medicine)</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Year of Joining</p>
                            <p className="mt-1 font-semibold text-slate-800">2018</p>
                        </div>
                    </div>
                </div>

                {/* Card 4: Assigned Roles & Permissions */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
                    <div className="border-b border-slate-100 pb-3">
                        <h2 className="text-sm font-bold text-slate-900">Assigned Roles &amp; Permissions</h2>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">System Role</p>
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                                Doctor
                            </span>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Access Levels</p>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 font-medium">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                                    Patient Records (RW)
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 font-medium">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                                    Prescriptions (RW)
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-500 font-medium">
                                    Pharmacy Inv (RO)
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-500 font-medium">
                                    Staff Roster (RO)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}