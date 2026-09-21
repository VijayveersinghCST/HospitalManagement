"use client";

import { useState } from "react";
import { ChevronRight, User, Briefcase, ShieldCheck, GraduationCap, Save, AlertTriangle } from "lucide-react";
import TextField from "@/components/receptionist/Textfield";
import SelectField from "@/components/receptionist/Selectfield";
import Button from "@/components/receptionist/Button";
import TagInput from "@/components/receptionist/Taginput";
import FileUpload from "@/components/pharmacy/Fileupload";
import {
    Accountant,
    AccountantStatus,
    ACCOUNTANT_STATUSES,
    DEPARTMENTS,
    DESIGNATIONS,
    SHIFT_TYPES,
    WEEK_DAYS,
    RESPONSIBILITY_SUGGESTIONS,
} from "./Accountant";
import { COLORS } from "@/constants/colors";

const STATUS_DOT_COLOR: Record<AccountantStatus, string> = {
    Active: COLORS.green,
    "On Leave": COLORS.blue,
    Pending: "#B45309",
    Inactive: COLORS.gray,
};

function SectionHeader({ icon: Icon, children }: { icon: typeof User; children: React.ReactNode }) {
    return (
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
            <Icon size={16} style={{ color: COLORS.blue }} />
            {children}
        </h3>
    );
}

export default function EditAccountantForm({ accountant }: { accountant: Accountant }) {
    const [form, setForm] = useState(accountant);
    const [certFile, setCertFile] = useState<{ name: string } | null>(null);

    const update = (patch: Partial<Accountant>) => setForm((prev) => ({ ...prev, ...patch }));

    const toggleDay = (day: string, index: number) => {
        const key = `${day}-${index}`;
        const has = form.workingDays.includes(key) || form.workingDays.includes(day);
        // Toggle by index-based key to distinguish repeated day letters (e.g. two "T"s for Tue/Thu)
        if (form.workingDays.includes(key)) {
            update({ workingDays: form.workingDays.filter((d) => d !== key) });
        } else {
            update({ workingDays: [...form.workingDays, key] });
        }
    };

    return (
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="flex flex-col gap-6 lg:col-span-2">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                            <span>Dashboard</span>
                            <ChevronRight size={12} />
                            <span>Accountants</span>
                            <ChevronRight size={12} />
                            <span style={{ color: COLORS.navy }}>Edit Details</span>
                        </nav>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                                Edit Accountant Details
                            </h1>
                            <span className="text-xs font-mono" style={{ color: COLORS.gray }}>
                                ID: {form.staffId}
                            </span>
                        </div>
                        <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                            Updating profile for{" "}
                            <span className="font-medium" style={{ color: COLORS.navy }}>
                                {form.fullName}
                            </span>
                            . Last active: {form.lastActiveLabel ?? form.lastLoginLabel}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="secondary">Cancel</Button>
                        <Button>
                            <Save size={16} /> Save Changes
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <section className="rounded-card border border-slate-200 bg-white p-6">
                    <SectionHeader icon={User}>Personal Information</SectionHeader>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <TextField
                            label="Full Name"
                            value={form.fullName}
                            onChange={(e) => update({ fullName: e.target.value })}
                        />
                        <TextField
                            label="Email Address"
                            type="email"
                            value={form.email}
                            onChange={(e) => update({ email: e.target.value })}
                        />
                        <TextField
                            label="Phone Number"
                            value={form.contactNumber}
                            onChange={(e) => update({ contactNumber: e.target.value })}
                        />
                        <TextField
                            label="Emergency Contact"
                            value={form.emergencyContact}
                            onChange={(e) => update({ emergencyContact: e.target.value })}
                        />
                        <TextField
                            label="Residential Address"
                            className="sm:col-span-2"
                            value={form.residentialAddress}
                            onChange={(e) => update({ residentialAddress: e.target.value })}
                        />
                    </div>
                </section>

                <section className="rounded-card border border-slate-200 bg-white p-6">
                    <SectionHeader icon={Briefcase}>Department &amp; Shift</SectionHeader>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <SelectField
                            label="Department"
                            options={DEPARTMENTS}
                            value={form.department}
                            onChange={(e) => update({ department: e.target.value })}
                        />
                        <SelectField
                            label="Designation"
                            options={DESIGNATIONS}
                            value={form.designation}
                            onChange={(e) => update({ designation: e.target.value })}
                        />
                    </div>

                    <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wide" style={{ color: COLORS.gray }}>
                            Shift Configuration
                        </p>
                        <div className="mb-4 flex flex-wrap items-center gap-4">
                            <div className="min-w-[220px] flex-1">
                                <SelectField
                                    label="Shift Type"
                                    options={SHIFT_TYPES}
                                    value={form.shiftType}
                                    onChange={(e) => update({ shiftType: e.target.value as Accountant["shiftType"] })}
                                />
                            </div>
                            <label className="flex items-center gap-2 pt-6 text-sm" style={{ color: COLORS.navy }}>
                                <input
                                    type="checkbox"
                                    checked={form.availableOnCall}
                                    onChange={(e) => update({ availableOnCall: e.target.checked })}
                                    className="h-4 w-4 rounded border-slate-300"
                                    style={{ accentColor: COLORS.blue }}
                                />
                                Available On-Call
                            </label>
                        </div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: COLORS.gray }}>
                            Working Days
                        </p>
                        <div className="flex gap-2">
                            {WEEK_DAYS.map((day, index) => {
                                const key = `${day}-${index}`;
                                const selected = form.workingDays.includes(key);
                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => toggleDay(day, index)}
                                        className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
                                        style={
                                            selected
                                                ? { backgroundColor: COLORS.blue, color: "#FFFFFF" }
                                                : { backgroundColor: "#FFFFFF", color: COLORS.gray, border: "1px solid #E2E8F0" }
                                        }
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>

            <div className="flex flex-col gap-6">
                <section className="rounded-card border border-slate-200 bg-white p-5">
                    <SectionHeader icon={ShieldCheck}>Account Status</SectionHeader>
                    <p className="mb-3 text-xs" style={{ color: COLORS.gray }}>
                        Control access rights for this staff member.
                    </p>
                    <SelectField
                        label=""
                        options={ACCOUNTANT_STATUSES}
                        value={form.status}
                        onChange={(e) => update({ status: e.target.value as AccountantStatus })}
                    />
                    <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-700">
                        <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                        Deactivated staff accounts are preserved for audit purposes. History is retained.
                    </div>
                    <div className="mt-4">
                        <TagInput
                            label="Assigned Responsibilities"
                            values={form.assignedResponsibilities}
                            onChange={(assignedResponsibilities) => update({ assignedResponsibilities })}
                            suggestions={RESPONSIBILITY_SUGGESTIONS}
                            placeholder="Add..."
                        />
                    </div>
                </section>

                <section className="rounded-card border border-slate-200 bg-white p-5">
                    <SectionHeader icon={GraduationCap}>Qualifications</SectionHeader>
                    <div className="flex flex-col gap-4">
                        <TextField
                            label="CPA/CA License Number"
                            value={form.licenseNumber ?? ""}
                            onChange={(e) => update({ licenseNumber: e.target.value })}
                        />
                        <TextField
                            label="Certificate Renewal Date"
                            type="date"
                            value={form.certificateRenewalDate ?? ""}
                            onChange={(e) => update({ certificateRenewalDate: e.target.value })}
                        />
                        <FileUpload
                            label="Upload Certificate"
                            value={certFile}
                            onChange={(file) => setCertFile(file ? { name: file.name } : null)}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}