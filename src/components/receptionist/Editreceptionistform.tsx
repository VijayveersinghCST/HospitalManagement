"use client";

import { useState } from "react";
import { ChevronRight, Mail, Phone, AlertTriangle } from "lucide-react";
import TextField from "./Textfield";
import SelectField from "./Selectfield";
import TagInput from "./Taginput";
import Button from "./Button";
import StatusBadge from "./Statusbadge";
import {
    Receptionist,
    ReceptionistStatus,
    DEPARTMENTS,
    DESKS,
    LANGUAGE_OPTIONS,
} from "./Receptionist";

const STATUS_OPTIONS: ReceptionistStatus[] = ["Active", "Inactive",  "Suspended"];

export default function EditReceptionistForm({ receptionist }: { receptionist: Receptionist }) {
    const [form, setForm] = useState(receptionist);

    const update = (patch: Partial<Receptionist>) => setForm((prev) => ({ ...prev, ...patch }));

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
                    <span>Dashboard</span>
                    <ChevronRight size={12} />
                    <span>Receptionists</span>
                    <ChevronRight size={12} />
                    <span className="text-slate-600">Edit Profile</span>
                </nav>
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-slate-900">Edit Receptionist Details</h1>
                    <StatusBadge status={form.status} />
                </div>
                <p className="mt-1 text-sm text-slate-500">
                    Update contact info, shift assignments, and account status for staff ID: {form.staffId}
                </p>
            </div>

            <section className="rounded-card border border-slate-200 bg-white p-6">
                <h3 className="mb-4 text-sm font-semibold text-slate-800">Personal &amp; Contact Info</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextField
                        label="Full Name"
                        value={form.fullName}
                        onChange={(e) => update({ fullName: e.target.value })}
                    />
                    <TextField label="Staff ID" value={form.staffId} readOnly disabled hint="Read Only" />
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
                        className="sm:col-span-1"
                        value={form.residentialAddress}
                        onChange={(e) => update({ residentialAddress: e.target.value })}
                    />
                </div>
            </section>

            <section className="rounded-card border border-slate-200 bg-white p-6">
                <h3 className="mb-4 text-sm font-semibold text-slate-800">Professional Assignment</h3>
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
                        value={form.assignedDesk}
                        onChange={(e) => update({ assignedDesk: e.target.value })}
                    />
                    <TextField
                        label="Shift Schedule"
                        value={form.shift}
                        onChange={(e) => update({ shift: e.target.value as Receptionist["shift"] })}
                    />
                </div>
            </section>

            <section className="rounded-card border border-slate-200 bg-white p-6">
                <h3 className="mb-4 text-sm font-semibold text-slate-800">Skills &amp; Languages</h3>
                <div className="flex flex-col gap-4">
                    <TagInput
                        label="Languages Spoken"
                        values={form.languages}
                        onChange={(languages) => update({ languages })}
                        suggestions={LANGUAGE_OPTIONS}
                    />
                    <TagInput
                        label="Specialized Skills"
                        values={form.specializedSkills}
                        onChange={(specializedSkills) => update({ specializedSkills })}
                        placeholder="Add a skill..."
                    />
                </div>
            </section>

            <section className="rounded-card border border-slate-200 bg-white p-6">
                <h3 className="mb-4 text-sm font-semibold text-slate-800">Account Status &amp; Control</h3>
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
                        <Button variant="danger" onClick={() => update({ status: "Inactive" })}>
                            Deactivate Account
                        </Button>
                    </div>
                </div>
            </section>

            <div className="flex justify-end gap-3">
                <Button variant="secondary">Cancel</Button>
                <Button>Save Changes</Button>
            </div>
        </div>
    );
}