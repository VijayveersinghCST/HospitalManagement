"use client";

import { useState } from "react";
import { ChevronRight, Mail, Phone, AlertTriangle, User, Briefcase, Languages, ShieldCheck, Save, XCircle } from "lucide-react";
import TextField from "./Textfield";
import SelectField from "./Selectfield";
import TagInput from "./Taginput";
import Button from "./Button";
import {
    Receptionist,
    ReceptionistStatus,
    DEPARTMENTS,
    DESKS,
    LANGUAGE_OPTIONS,
} from "./Receptionist";
import { COLORS } from "@/constants/colors";

const STATUS_OPTIONS: ReceptionistStatus[] = ["Active", "Offline", "On Leave"];

const STATUS_DOT_COLOR: Record<ReceptionistStatus, string> = {
    Active: COLORS.green,
    Offline: COLORS.gray,
    "On Leave": COLORS.teal,
};

function SectionHeader({ icon: Icon, children }: { icon: typeof User; children: React.ReactNode }) {
    return (
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
            <Icon size={16} style={{ color: COLORS.blue }} />
            {children}
        </h3>
    );
}

export default function EditReceptionistForm({ receptionist }: { receptionist: Receptionist }) {
    const [form, setForm] = useState(receptionist);

    const update = (patch: Partial<Receptionist>) => setForm((prev) => ({ ...prev, ...patch }));

    const toggleLanguage = (lang: string) => {
        const has = form.languages.includes(lang);
        update({ languages: has ? form.languages.filter((l) => l !== lang) : [...form.languages, lang] });
    };

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                    <span>Dashboard</span>
                    <ChevronRight size={12} />
                    <span>Receptionists</span>
                    <ChevronRight size={12} />
                    <span style={{ color: COLORS.navy }}>Edit Profile</span>
                </nav>
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                        Edit Receptionist Details
                    </h1>
                    <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                        style={{ backgroundColor: `${STATUS_DOT_COLOR[form.status]}1a`, color: STATUS_DOT_COLOR[form.status] }}
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {form.status}
                    </span>
                </div>
                <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                    Update contact info, shift assignments, and account status for staff ID:{" "}
                    <span className="font-mono" style={{ color: COLORS.navy }}>{form.employeeId}</span>
                </p>
            </div>

            <section className="rounded-card border border-slate-200 bg-white p-6">
                <SectionHeader icon={User}>Personal &amp; Contact Info</SectionHeader>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextField
                        label="Full Name"
                        value={form.name}
                        onChange={(e) => update({ name: e.target.value })}
                    />
                    <TextField label="Staff ID" value={form.employeeId} readOnly disabled hint="Read Only" />
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
                        label="Emergency Contact"
                        value={form.emergencyContact}
                        onChange={(e) => update({ emergencyContact: e.target.value })}
                    />
                    <TextField
                        label="Residential Address"
                        value={form.residentialAddress}
                        onChange={(e) => update({ residentialAddress: e.target.value })}
                    />
                </div>
            </section>

            <section className="rounded-card border border-slate-200 bg-white p-6">
                <SectionHeader icon={Briefcase}>Professional Assignment</SectionHeader>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <SelectField
                        label="Department"
                        options={DEPARTMENTS}
                        value={form.department}
                        onChange={(e) => update({ department: e.target.value })}
                    />
                    <SelectField
                        label="Assigned Desk / Unit"
                        options={DESKS}
                        value={form.allocatedDesk}
                        onChange={(e) => update({ allocatedDesk: e.target.value })}
                    />
                    <TextField
                        label="Shift Schedule"
                        value={form.shiftTiming}
                        onChange={(e) => update({ shiftTiming: e.target.value })}
                    />
                </div>
            </section>

            <section className="rounded-card border border-slate-200 bg-white p-6">
                <SectionHeader icon={Languages}>Skills &amp; Languages</SectionHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium" style={{ color: COLORS.navy }}>
                            Languages Spoken
                        </span>
                        <div className="flex flex-wrap gap-x-5 gap-y-2">
                            {LANGUAGE_OPTIONS.map((lang) => (
                                <label key={lang} className="flex items-center gap-1.5 text-sm" style={{ color: COLORS.navy }}>
                                    <input
                                        type="checkbox"
                                        checked={form.languages.includes(lang)}
                                        onChange={() => toggleLanguage(lang)}
                                        className="h-4 w-4 rounded border-slate-300"
                                        style={{ accentColor: COLORS.blue }}
                                    />
                                    {lang}
                                </label>
                            ))}
                        </div>
                    </div>
                    <TagInput
                        label="Specialized Skills"
                        values={form.specializedSkills}
                        onChange={(specializedSkills) => update({ specializedSkills })}
                        placeholder="Add a skill..."
                    />
                </div>
            </section>

            <section className="rounded-card border border-slate-200 bg-white p-6">
                <SectionHeader icon={ShieldCheck}>Account Status &amp; Control</SectionHeader>
                <div className="flex flex-col gap-4">
                    <SelectField
                        label="Current Status"
                        options={STATUS_OPTIONS}
                        value={form.status}
                        onChange={(e) => update({ status: e.target.value as ReceptionistStatus })}
                    />
                    <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
                        <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-500" />
                        <p className="text-xs text-amber-700">
                            Deactivated receptionist accounts are not deleted. They are preserved indefinitely for
                            hospital audit and compliance purposes.
                        </p>
                    </div>
                    <div>
                        <Button variant="danger" onClick={() => update({ status: "Offline" })}>
                            Deactivate Account
                        </Button>
                    </div>
                </div>
            </section>

            <div className="flex justify-end gap-3">
                <Button variant="secondary">
                    <XCircle size={16} /> Cancel Changes
                </Button>
                <Button>
                    <Save size={16} /> Update Receptionist Details
                </Button>
            </div>
        </div>
    );
}