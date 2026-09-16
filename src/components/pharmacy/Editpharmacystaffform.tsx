"use client";

import { useState } from "react";
import {
    ChevronRight,
    Mail,
    Phone,
    Pencil,
    Contact,
    Briefcase,
    ShieldCheck,
    ShieldAlert,
    AlertTriangle,
    Save,
    Clock,
    MapPin,
} from "lucide-react";
import TextField from "@/components/receptionist/Textfield";
import SelectField from "@/components/receptionist/Selectfield";
import Button from "@/components/receptionist/Button";
import FileUpload from "./Fileupload";
import {
    PharmacyStaff,
    PharmacyStaffStatus,
    PHARMACY_STATUSES,
    ASSIGNED_UNIT_OPTIONS,
    SHIFT_TIMING_LABELS,
    PharmacyShift,
    QUALIFICATIONS,
} from "./Pharmacystaff";
import { COLORS } from "@/constants/colors";

const STATUS_DOT_COLOR: Record<PharmacyStaffStatus, string> = {
    Active: COLORS.green,
    "On Leave": "#B45309",
    Inactive: COLORS.gray,
};

function initials(name: string) {
    return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

function SectionHeader({
                           icon: Icon,
                           children,
                           tint,
                       }: {
    icon: typeof Contact;
    children: React.ReactNode;
    tint?: string;
}) {
    return (
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
            <Icon size={16} style={{ color: tint ?? COLORS.blue }} />
            {children}
        </h3>
    );
}

export default function EditPharmacyStaffForm({ staff }: { staff: PharmacyStaff }) {
    const [form, setForm] = useState(staff);
    const [licenseFile, setLicenseFile] = useState<{ name: string; size?: string; uploadedOn?: string } | null>(
        staff.licenseFileName
            ? { name: staff.licenseFileName, size: staff.licenseFileSize, uploadedOn: staff.licenseUploadedOn }
            : null
    );

    const update = (patch: Partial<PharmacyStaff>) => setForm((prev) => ({ ...prev, ...patch }));

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                    <span>Dashboard</span>
                    <ChevronRight size={12} />
                    <span>Pharmacy Staff</span>
                    <ChevronRight size={12} />
                    <span style={{ color: COLORS.navy }}>Edit Staff Details</span>
                </nav>
                <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                    Edit Pharmacy Staff Details
                </h1>
                <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                    Updating profile for{" "}
                    <span className="font-medium" style={{ color: COLORS.navy }}>
                        {form.name}
                    </span>{" "}
                    — {form.employeeId}
                </p>
            </div>

            <section className="flex items-center gap-4 rounded-card border border-slate-200 bg-white p-5">
                <div className="relative">
                    <span
                        className="flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold text-white"
                        style={{ backgroundColor: form.avatarColor }}
                    >
                        {initials(form.name)}
                    </span>
                    <span
                        className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                        style={{ backgroundColor: COLORS.blue }}
                    >
                        <Pencil size={11} className="text-white" />
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <span className="text-base font-semibold" style={{ color: COLORS.navy }}>
                            {form.name}
                        </span>
                        <span
                            className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase"
                            style={{ backgroundColor: `${STATUS_DOT_COLOR[form.status]}1a`, color: STATUS_DOT_COLOR[form.status] }}
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {form.status}
                        </span>
                    </div>
                    <span className="text-sm" style={{ color: COLORS.gray }}>
                        {form.role}
                    </span>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs" style={{ color: COLORS.gray }}>
                        <span>ID: {form.employeeId}</span>
                        {form.lastLoginLabel && (
                            <span className="flex items-center gap-1">
                                <Clock size={11} /> Last login: {form.lastLoginLabel}
                            </span>
                        )}
                        <span>{form.assignedUnit}</span>
                    </div>
                </div>
            </section>

            <section className="rounded-card border border-slate-200 bg-white p-6">
                <SectionHeader icon={Contact}>Contact Information</SectionHeader>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextField
                        label="Email Address"
                        type="email"
                        icon={<Mail size={16} />}
                        value={form.email}
                        onChange={(e) => update({ email: e.target.value })}
                    />
                    <TextField
                        label="Phone Number"
                        icon={<Phone size={16} />}
                        value={form.contactNumber}
                        onChange={(e) => update({ contactNumber: e.target.value })}
                    />
                    <TextField
                        label="Residential Address"
                        className="sm:col-span-2"
                        icon={<MapPin size={16} />}
                        value={form.residentialAddress}
                        onChange={(e) => update({ residentialAddress: e.target.value })}
                    />
                </div>
            </section>

            <section className="rounded-card border border-slate-200 bg-white p-6">
                <SectionHeader icon={Briefcase} tint="#7C3AED">
                    Professional Details
                </SectionHeader>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <SelectField
                            label="Qualification"
                            options={QUALIFICATIONS}
                            value={form.qualification}
                            onChange={(e) => update({ qualification: e.target.value })}
                        />
                        <SelectField
                            label="Assigned Pharmacy Unit"
                            options={ASSIGNED_UNIT_OPTIONS.map((u) => u.label)}
                            value={form.assignedUnit}
                            onChange={(e) => update({ assignedUnit: e.target.value })}
                        />
                    </div>
                    <SelectField
                        label="Shift Timing"
                        options={Object.values(SHIFT_TIMING_LABELS)}
                        value={SHIFT_TIMING_LABELS[form.shift as PharmacyShift]}
                        onChange={(e) => {
                            const match = (Object.entries(SHIFT_TIMING_LABELS) as [PharmacyShift, string][]).find(
                                ([, label]) => label === e.target.value
                            );
                            if (match) update({ shift: match[0] });
                        }}
                    />
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium" style={{ color: COLORS.navy }}>
                            Key Responsibilities
                        </label>
                        <textarea
                            rows={3}
                            value={form.keyResponsibilities}
                            onChange={(e) => update({ keyResponsibilities: e.target.value })}
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D81a]"
                            style={{ color: COLORS.navy }}
                        />
                    </div>
                </div>
            </section>

            <section className="rounded-card border border-slate-200 bg-white p-6">
                <SectionHeader icon={ShieldCheck} tint="#EA580C">
                    License &amp; Compliance
                </SectionHeader>
                <FileUpload
                    label="Upload Renewed License / Certificate"
                    value={licenseFile}
                    onChange={(file) => {
                        setLicenseFile(file ? { name: file.name } : null);
                        update({ licenseFileName: file?.name ?? "" });
                    }}
                />
            </section>

            <section className="rounded-card border border-slate-200 bg-white p-6">
                <SectionHeader icon={ShieldAlert} tint="#DC2626">
                    Account Status &amp; Actions
                </SectionHeader>
                <div className="flex flex-col gap-4">
                    <SelectField
                        label="Current Status"
                        options={PHARMACY_STATUSES}
                        value={form.status}
                        onChange={(e) => update({ status: e.target.value as PharmacyStaffStatus })}
                    />
                    <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
                        <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-500" />
                        <p className="text-xs text-amber-700">
                            Deactivated pharmacy staff accounts are preserved for audit and compliance purposes. They
                            cannot access the system but their history remains available in reports.
                        </p>
                    </div>
                    <div className="flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
                        <Button variant="danger" onClick={() => update({ status: "Inactive" })}>
                            Deactivate Pharmacy Staff
                        </Button>
                        <div className="flex gap-3">
                            <Button variant="secondary">Cancel</Button>
                            <Button>
                                <Save size={16} /> Update Details
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}