// src/app/(app)/nurse/[nurseId]/view/page.tsx
"use client";

import { use } from "react";
import Link from "next/link";
import {
    ChevronRight,
    Pencil,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Clock,
    FileText,
    Eye,
} from "lucide-react";
import Avatar from "@/components/common/Avatar";
import Image from "next/image";

interface ViewNurseProps {
    params: Promise<{ nurseId: string }>;
}

const NURSE = {
    firstName: "Sarah",
    lastName: "Jenkins",
    role: "Senior Nurse",
    status: "Active" as const,
    email: "sarah.j@shriramhospital.com",
    phone: "+91 98765 43210",
    address: "42, Nehru Nagar, Main Road, New Delhi - 110065",
    department: "Emergency (ER)",
    ward: "Ward B - General",
    shift: "07:00 AM - 07:00 PM",
    responsibilities:
        "Head nurse for shift A. Responsible for medication inventory and junior staff supervision.",
    license: { name: "RN_License_2023.pdf", note: "Expires in 45 days • Verified" },
};

const STATUS_STYLES: Record<string, string> = {
    Active: "bg-green-50 text-green-700",
    Inactive: "bg-slate-100 text-slate-500",
    Suspended: "bg-red-50 text-red-600",
};

function InfoRow({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof Mail;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                <Icon className="h-4 w-4" />
            </div>
            <div>
                <p className="text-xs font-semibold text-slate-400">{label}</p>
                <p className="text-sm font-medium text-slate-800">{value}</p>
            </div>
        </div>
    );
}

export default function ViewNursePage({ params }: ViewNurseProps) {
    const { nurseId } = use(params);
    const fullName = `${NURSE.firstName} ${NURSE.lastName}`;

    return (
        <div className="mx-auto max-w-7xl space-y-6 p-5">
           

            {/* Profile banner */}
            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-slate-100 sm:h-20 sm:w-20">
                        <Image
                            src="/images/nurse-avatar.png"
                            alt={fullName}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src =
                                    "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=250&auto=format&fit=crop";
                            }}
                        />
                        <span
                            className={`absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-white ${NURSE.status === "Active" ? "bg-green-500" : "bg-slate-400"
                                }`}
                        />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                            {fullName}
                        </h1>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                            <span>#{nurseId}</span>
                            <span className="text-slate-300">•</span>
                            <span>{NURSE.role}</span>
                            <span
                                className={`ml-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[NURSE.status]}`}
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                {NURSE.status}
                            </span>
                        </div>
                    </div>
                </div>

                <Link
                    href={`/nurse/${nurseId}/edit`}
                    className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 sm:self-center"
                >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit Nurse
                </Link>
            </div>

            {/* Personal & Contact */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-sm font-bold tracking-wide text-slate-900">
                    Personal & Contact Information
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <InfoRow icon={Mail} label="Email Address" value={NURSE.email} />
                    <InfoRow icon={Phone} label="Phone Number" value={NURSE.phone} />
                    <InfoRow icon={MapPin} label="Residential Address" value={NURSE.address} />
                </div>
            </div>

            {/* Department & Shift */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-sm font-bold tracking-wide text-slate-900">
                    Department & Shift Assignment
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <InfoRow icon={Briefcase} label="Department" value={NURSE.department} />
                    <InfoRow icon={Briefcase} label="Assigned Ward" value={NURSE.ward} />
                    <InfoRow icon={Clock} label="Shift Timing" value={NURSE.shift} />
                </div>
                <div className="mt-5">
                    <p className="text-xs font-semibold text-slate-400">Key Responsibilities</p>
                    <p className="mt-1 text-sm text-slate-700">{NURSE.responsibilities}</p>
                </div>
            </div>

            {/* License & Compliance */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-sm font-bold tracking-wide text-slate-900">License & Compliance</h2>
                <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-3.5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
                            <FileText className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">{NURSE.license.name}</p>
                            <p className="text-xs text-slate-400">{NURSE.license.note}</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline"
                    >
                        <Eye className="h-4 w-4" />
                        View
                    </button>
                </div>
            </div>
        </div>
    );
}