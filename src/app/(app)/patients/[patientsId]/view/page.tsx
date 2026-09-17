// src/app/(app)/patients/[id]/view/page.tsx
import Link from "next/link";
import { ArrowLeft, Pencil, ShieldCheck, HeartPulse, UserCheck } from "lucide-react";
import Avatar from "@/components/common/Avatar";

interface ViewPatientProps {
    params: Promise<{ id: string }>;
}

export default async function PatientViewPage({ params }: ViewPatientProps) {
    const { id } = await params;

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex items-center justify-between">
                <Link
                    href="/patients"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Patients</span>
                </Link>
                <Link
                    href={`/patients/${id}/edit`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                >
                    <Pencil className="h-3.5 w-3.5" />
                    <span>Edit Profile</span>
                </Link>
            </div>

            {/* Patient Header Card */}
            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <Avatar name="Sarah Jenkins" />
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold text-slate-900">Sarah Jenkins</h1>
                            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                                Admitted
                            </span>
                        </div>
                        <p className="text-xs text-slate-500">ID: #{id} • 38 Yrs • Female • Blood: O+</p>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-right">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase">Assigned Location</p>
                    <p className="text-xs font-bold text-slate-800">Gen. Ward A-12 (Room 102 - Bed 04)</p>
                    <p className="text-[11px] text-blue-600 font-medium">Dr. Rajesh Kumar (Cardiology)</p>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <HeartPulse className="h-4 w-4 text-rose-500" />
                        <span>Clinical Information</span>
                    </div>
                    <div className="text-xs space-y-2 text-slate-600">
                        <p><strong className="text-slate-900">Chief Complaint:</strong> Acute chest tightness</p>
                        <p><strong className="text-slate-900">Allergies:</strong> Penicillin</p>
                        <p><strong className="text-slate-900">Vitals:</strong> BP 120/80 mmHg, SpO2 98%, Pulse 74 bpm</p>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                        <span>Insurance & Billing</span>
                    </div>
                    <div className="text-xs space-y-2 text-slate-600">
                        <p><strong className="text-slate-900">Provider:</strong> Star Health Insurance</p>
                        <p><strong className="text-slate-900">Policy No:</strong> POL-7729104</p>
                        <p><strong className="text-slate-900">Coverage Status:</strong> Verified Pre-Authorized</p>
                    </div>
                </div>
            </div>
        </div>
    );
}