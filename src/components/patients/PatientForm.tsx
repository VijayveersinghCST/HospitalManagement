// src/components/patients/PatientForm.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    User,
    ShieldCheck,
    Bed,
    Phone,
    Mail,
    Search,
    Check,
    Lock,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    ChevronRight,
    Save,
} from "lucide-react";

export interface PatientFormData {
    // Step 1: Personal
    fullName: string;
    age: string;
    gender: "Male" | "Female" | "Other" | "";
    phone: string;
    email: string;
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;

    // Step 2: Medical & Insurance
    bloodGroup: string;
    allergies: string;
    medicalHistory: string;
    insuranceProvider: string;
    policyNumber: string;
    coverageType: string;

    // Step 3: Admission & Bed Allocation
    searchPatientKey: string;
    department: string;
    attendingDoctor: string;
    assignedWard: string;
    assignedRoom: string;
    assignedBed: string;
}

const INITIAL_DATA: PatientFormData = {
    fullName: "",
    age: "",
    gender: "Male",
    phone: "",
    email: "",
    streetAddress: "",
    city: "",
    state: "",
    country: "India",
    pinCode: "",
    bloodGroup: "",
    allergies: "",
    medicalHistory: "",
    insuranceProvider: "Care Health Insurance",
    policyNumber: "POL-987654321",
    coverageType: "Comprehensive Mediclaim",
    searchPatientKey: "",
    department: "Cardiology",
    attendingDoctor: "Dr. Rajesh Kumar",
    assignedWard: "Ward A (East Wing)",
    assignedRoom: "Room 104",
    assignedBed: "Bed 02",
};

interface PatientFormProps {
    mode: "add" | "edit";
    patientId?: string;
    initialData?: Partial<PatientFormData>;
}

export default function PatientForm({ mode, patientId, initialData }: PatientFormProps) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<PatientFormData>({
        ...INITIAL_DATA,
        ...initialData,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (step < 3) setStep((s) => s + 1);
    };

    const handlePrev = () => {
        if (step > 1) setStep((s) => s - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === "add" && step < 3) {
            handleNext();
            return;
        }
        console.log("Saved Patient:", formData);
        router.push("/patients");
    };

    const progressPercentage = step === 1 ? 33 : step === 2 ? 66 : 100;

    return (
        <div className="mx-auto max-w-7xl space-y-6 p-5">
            {/* Header & Progress Indicator */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {mode === "add" ? "New Patient Registration" : "Edit Patient Information"}
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Step {step} of 3: {step === 1 ? "Basic Personal Details" : step === 2 ? "Medical & Insurance Coverage" : "Bed Allocation & Admission"}
                </p>

                {/* Progress Bar */}
                <div className="mt-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
                        <span>
                            {step === 1 && "Basic Information"}
                            {step === 2 && "Medical & Insurance"}
                            {step === 3 && "Hospital Admission"}
                        </span>
                        <span className="text-blue-600">{progressPercentage}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                            className="h-full rounded-full bg-blue-600 transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Edit Mode Step Tabs (Clickable anywhere) */}
            {mode === "edit" && (
                <div className="flex border-b border-slate-200">
                    {["1. Personal Details", "2. Medical & Insurance", "3. Admission Details"].map((tab, idx) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setStep(idx + 1)}
                            className={`border-b-2 px-4 py-2 text-xs font-semibold transition ${step === idx + 1
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-slate-500 hover:text-slate-800"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            )}

            {/* Main Form Box */}
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* STEP 1: Personal Identity & Residential Address */}
                {step === 1 && (
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6 animate-in fade-in duration-200">
                        {/* Subsection: Personal Identity */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-blue-600">
                                <User className="h-5 w-5" />
                                <h2 className="text-base font-bold text-slate-900">Personal Identity</h2>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600">Full Name *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="e.g. Rajesh Kumar"
                                    required
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">Age *</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="e.g. 34"
                                        required
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-2">Gender *</label>
                                    <div className="flex items-center gap-5 pt-1">
                                        {["Male", "Female", "Other"].map((g) => (
                                            <label key={g} className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value={g}
                                                    checked={formData.gender === g}
                                                    onChange={handleChange}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                />
                                                {g}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">Contact Number *</label>
                                    <div className="relative mt-1.5">
                                        <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">Email Address (Optional)</label>
                                    <div className="relative mt-1.5">
                                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="patient@example.com"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="border-slate-100" />

                        {/* Subsection: Residential Address */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-900">Residential Address</h3>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600">Street Address</label>
                                <input
                                    type="text"
                                    name="streetAddress"
                                    value={formData.streetAddress}
                                    onChange={handleChange}
                                    placeholder="House No., Building Name, Street"
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="e.g. Lucknow"
                                        required
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">State *</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="e.g. Uttar Pradesh"
                                        required
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">Country *</label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
                                    >
                                        <option value="India">India</option>
                                        <option value="Nepal">Nepal</option>
                                        <option value="Bangladesh">Bangladesh</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">Pin Code *</label>
                                    <input
                                        type="text"
                                        name="pinCode"
                                        value={formData.pinCode}
                                        onChange={handleChange}
                                        placeholder="e.g. 226010"
                                        required
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 2: Medical & Insurance */}
                {step === 2 && (
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6 animate-in fade-in duration-200">
                        {/* Info Notice */}
                        <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-3.5 text-xs text-blue-700">
                            <ShieldCheck className="h-4 w-4 shrink-0 text-blue-600" />
                            <span>Medical history and insurance details are mandatory for IPD admission compliance.</span>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Left: Medical Details */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-900">Medical Details</h3>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">Blood Group *</label>
                                    <select
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        required
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
                                    >
                                        <option value="">Select Blood Group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">Allergies</label>
                                    <textarea
                                        name="allergies"
                                        rows={3}
                                        value={formData.allergies}
                                        onChange={handleChange}
                                        placeholder="List known allergies (e.g. Penicillin, Peanuts)..."
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">Past Medical History</label>
                                    <textarea
                                        name="medicalHistory"
                                        rows={3}
                                        value={formData.medicalHistory}
                                        onChange={handleChange}
                                        placeholder="Describe chronic conditions, past surgeries, or major illnesses..."
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
                                    />
                                </div>
                            </div>

                            {/* Right: Insurance Information */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-900">Insurance Information</h3>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">Insurance Provider *</label>
                                    <input
                                        type="text"
                                        name="insuranceProvider"
                                        value={formData.insuranceProvider}
                                        onChange={handleChange}
                                        placeholder="e.g. Care Health Insurance"
                                        required
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">Policy Number *</label>
                                    <input
                                        type="text"
                                        name="policyNumber"
                                        value={formData.policyNumber}
                                        onChange={handleChange}
                                        placeholder="e.g. POL-987654321"
                                        required
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">Coverage Type *</label>
                                    <select
                                        name="coverageType"
                                        value={formData.coverageType}
                                        onChange={handleChange}
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
                                    >
                                        <option value="Comprehensive Mediclaim">Comprehensive Mediclaim</option>
                                        <option value="Government Ayushman Card">Government Ayushman Card</option>
                                        <option value="Corporate Group Insurance">Corporate Group Insurance</option>
                                        <option value="Self Pay / Cash">Self Pay / Cash</option>
                                    </select>
                                </div>

                                {/* Dark preview card from screenshot */}
                                <div className="relative mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-4 text-white shadow-md">
                                    <div className="flex items-center justify-between text-xs text-slate-300">
                                        <ShieldCheck className="h-5 w-5 text-emerald-400" />
                                        <span className="rounded bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 uppercase">
                                            Verified
                                        </span>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-[11px] text-slate-400">Policy Holder Preview</p>
                                        <p className="font-mono text-sm tracking-widest text-slate-200">
                                            **** **** **** {formData.policyNumber.slice(-4) || "4291"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 3: Patient Admission & Automated Bed Allocation */}
                {step === 3 && (
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6 animate-in fade-in duration-200">
                        {/* Section 1: Patient Identification */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-slate-900">Patient Identification</h3>
                            <div className="relative flex">
                                <input
                                    type="text"
                                    name="searchPatientKey"
                                    value={formData.searchPatientKey}
                                    onChange={handleChange}
                                    placeholder="Search by name, ID, or phone number..."
                                    className="w-full rounded-l-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                                />
                                <button
                                    type="button"
                                    className="rounded-r-xl bg-blue-600 px-5 text-white hover:bg-blue-700 transition"
                                >
                                    <Search className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Section 2: Clinical Details */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-slate-900">Clinical Details</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">Department</label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                                    >
                                        <option value="Cardiology">Cardiology</option>
                                        <option value="Neurology">Neurology</option>
                                        <option value="Orthopedics">Orthopedics</option>
                                        <option value="General Medicine">General Medicine</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600">Attending Doctor</label>
                                    <input
                                        type="text"
                                        name="attendingDoctor"
                                        value={formData.attendingDoctor}
                                        onChange={handleChange}
                                        placeholder="Search physician..."
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Bed Allocation */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Bed className="h-4 w-4 text-blue-600" />
                                    <h3 className="text-sm font-bold text-slate-900">Bed Allocation</h3>
                                </div>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    Real-time Availability Confirmed
                                </span>
                            </div>

                            {/* Locked/Auto Allocated Fields */}
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                <div className="relative">
                                    <label className="block text-[11px] font-semibold uppercase text-slate-500">Ward</label>
                                    <div className="mt-1 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-100/70 px-3.5 py-2.5 text-xs font-semibold text-slate-800">
                                        <span>{formData.assignedWard}</span>
                                        <Lock className="h-3.5 w-3.5 text-slate-400" />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-[11px] font-semibold uppercase text-slate-500">Room</label>
                                    <div className="mt-1 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-100/70 px-3.5 py-2.5 text-xs font-semibold text-slate-800">
                                        <span>{formData.assignedRoom}</span>
                                        <Lock className="h-3.5 w-3.5 text-slate-400" />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-[11px] font-semibold uppercase text-slate-500">Bed Number</label>
                                    <div className="mt-1 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-100/70 px-3.5 py-2.5 text-xs font-semibold text-slate-800">
                                        <span>{formData.assignedBed}</span>
                                        <Lock className="h-3.5 w-3.5 text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            {/* System Optimization Banner */}
                            <div className="flex flex-col gap-2 rounded-xl border border-blue-100 bg-blue-50/50 p-3.5 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-start gap-2.5">
                                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                                    <div>
                                        <p className="text-xs font-bold text-slate-900">System Optimization Active</p>
                                        <p className="text-[11px] text-slate-500">
                                            Bed allocation is automatically optimized based on department load and patient gender to avoid conflicts.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="self-start text-xs font-semibold text-blue-600 hover:underline sm:self-auto"
                                >
                                    Manual Override
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Bottom Actions Bar */}
                <div className="flex items-center justify-between pt-2">
                    {step > 1 ? (
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>Back</span>
                        </button>
                    ) : (
                        <Link
                            href="/patients"
                            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                        >
                            Cancel
                        </Link>
                    )}

                    <div className="flex items-center gap-3">
                        {mode === "edit" ? (
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition"
                            >
                                <Save className="h-4 w-4" />
                                <span>Save & Continue</span>
                            </button>
                        ) : step < 3 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition"
                            >
                                <span>{step === 1 ? "Next: Medical Details" : "Next: Admission Details"}</span>
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition"
                            >
                                <Check className="h-4 w-4 stroke-[3]" />
                                <span>Admit Patient</span>
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}