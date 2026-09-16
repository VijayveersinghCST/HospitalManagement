"use client";

import { useState } from "react";
import { Briefcase, ShieldCheck, CheckCircle2, Eye, EyeOff } from "lucide-react";
import TextField from "@/components/receptionist/Textfield";
import SelectField from "@/components/receptionist/Selectfield";
import AssignedUnitGrid from "./Assignedunitgrid";
import CheckboxList from "./Checkboxlist";
import {
    WorkDetails,
    DutyType,
    PharmacyShift,
    DUTY_TYPES,
    ASSIGNED_UNIT_OPTIONS,
    RESPONSIBILITY_OPTIONS,
    DEFAULT_PERMISSIONS,
} from "./Pharmacystaff";
import { COLORS } from "@/constants/colors";

const SHIFT_OPTIONS: PharmacyShift[] = ["Morning", "Afternoon", "Evening", "Night"];

interface WorkDetailsStepProps {
    data: WorkDetails;
    onChange: (patch: Partial<WorkDetails>) => void;
    username: string;
    password: string;
}

export default function PharmacyWorkDetailsStep({ data, onChange, username, password }: WorkDetailsStepProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col gap-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
                    <Briefcase size={16} style={{ color: COLORS.blue }} />
                    Work Details
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextField
                        label="Joining Date"
                        required
                        type="date"
                        value={data.joiningDate}
                        onChange={(e) => onChange({ joiningDate: e.target.value })}
                    />
                    <SelectField
                        label="Duty Type"
                        required
                        placeholder="Select duty type"
                        options={DUTY_TYPES}
                        value={data.dutyType}
                        onChange={(e) => onChange({ dutyType: e.target.value as DutyType })}
                    />
                </div>
                <SelectField
                    label="Shift Timing"
                    required
                    placeholder="Select shift"
                    options={SHIFT_OPTIONS}
                    value={data.shift}
                    onChange={(e) => onChange({ shift: e.target.value as PharmacyShift })}
                />
                <AssignedUnitGrid
                    label="Assigned Unit"
                    options={ASSIGNED_UNIT_OPTIONS}
                    value={data.assignedUnit}
                    onChange={(assignedUnit) => onChange({ assignedUnit })}
                />
                <CheckboxList
                    label="Responsibilities"
                    options={RESPONSIBILITY_OPTIONS}
                    selectedIds={data.responsibilities}
                    onChange={(responsibilities) => onChange({ responsibilities })}
                />
            </div>

            <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
                    <ShieldCheck size={16} style={{ color: COLORS.blue }} />
                    System Access
                </h3>
                <div className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium" style={{ color: COLORS.navy }}>
                        Role
                    </span>
                    <div
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm"
                        style={{ color: COLORS.gray }}
                    >
                        Pharmacy Staff
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium" style={{ color: COLORS.navy }}>
                        Permissions Included
                    </span>
                    <ul className="flex flex-col gap-1.5">
                        {DEFAULT_PERMISSIONS.map((p) => (
                            <li key={p} className="flex items-center gap-2 text-sm" style={{ color: COLORS.navy }}>
                                <CheckCircle2 size={14} style={{ color: COLORS.green }} />
                                {p}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col gap-3 border-t border-slate-100 pt-4">
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: COLORS.gray }}>
                        Credentials
                    </span>
                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs" style={{ color: COLORS.gray }}>
                            Username (Auto)
                        </span>
                        <div
                            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-mono"
                            style={{ color: COLORS.navy }}
                        >
                            {username || "—"}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs" style={{ color: COLORS.gray }}>
                            Password (Auto)
                        </span>
                        <div
                            className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-mono"
                            style={{ color: COLORS.navy }}
                        >
                            <span>{showPassword ? password : "•".repeat(password.length || 12)}</span>
                            <button type="button" onClick={() => setShowPassword((v) => !v)} style={{ color: COLORS.gray }}>
                                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}