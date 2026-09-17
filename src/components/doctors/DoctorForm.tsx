// src/components/doctors/DoctorForm.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    User,
    Briefcase,
    CalendarClock,
    ChevronRight,
    Check,
    Save,
    ArrowLeft,
    ArrowRight,
    Phone,
    Mail
} from "lucide-react";

export interface DoctorFormData {
    // Step 1: Personal
    fullName: string;
    gender: string;
    dob: string;
    bloodGroup: string;
    phone: string;
    email: string;
    address: string;
    emergencyContact: string;

    // Step 2: Professional
    licenseNumber: string;
    qualification: string;
    department: string;
    specialization: string;
    experienceYears: string;
    previousHospital: string;

    // Step 3: Work Details
    opdRoomNo: string;
    consultationFee: string;
    shift: string;
    joiningDate: string;
    employmentType: string;
    availableDays: string[];
}

const INITIAL_DATA: DoctorFormData = {
    fullName: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    licenseNumber: "",
    qualification: "",
    department: "",
    specialization: "",
    experienceYears: "",
    previousHospital: "",
    opdRoomNo: "",
    consultationFee: "",
    shift: "Morning",
    joiningDate: "",
    employmentType: "Full-Time",
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
};

const STEPS = [
    { id: 1, title: "Personal Info", icon: User },
    { id: 2, title: "Professional Info", icon: Briefcase },
    { id: 3, title: "Work Details", icon: CalendarClock },
];

const DEPARTMENTS = [
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "General Medicine",
    "Gynecology",
    "Dermatology",
    "Oncology",
    "Emergency Medicine",
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface DoctorFormProps {
    mode: "add" | "edit";
    initialData?: Partial<DoctorFormData>;
    doctorId?: string;
}

export default function DoctorForm({ mode, initialData, doctorId }: DoctorFormProps) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<DoctorFormData>({
        ...INITIAL_DATA,
        ...initialData,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleDay = (day: string) => {
        setFormData((prev) => {
            const days = prev.availableDays.includes(day)
                ? prev.availableDays.filter((d) => d !== day)
                : [...prev.availableDays, day];
            return { ...prev, availableDays: days };
        });
    };

    const handleNext = () => {
        if (currentStep < 3) setCurrentStep((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep((prev) => prev - 1);
    };

    const handleStepClick = (stepId: number) => {
        // Edit mode me freely kisi bhi step pe ja sakte hain
        if (mode === "edit") {
            setCurrentStep(stepId);
        } else if (stepId < currentStep) {
            setCurrentStep(stepId);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === "add" && currentStep < 3) {
            handleNext();
            return;
        }

        // TODO: Wire up with real doctorService.save/update
        console.log("Submitting Doctor Data:", formData);
        router.push("/doctors");
    };

    return (
        <div className="mx-auto max-w-7xl space-y-6 p-5">
         
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {mode === "add" ? "Add New Doctor" : "Edit Doctor Profile"}
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    {mode === "add"
                        ? "Enter the details below to register a new medical professional."
                        : "Update the doctor's credentials, specialization, and OPD schedule."}
                </p>
            </div>

            {/* Step Wizard Bar */}
            <div className="flex border-b border-slate-200 pb-4">
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
                    {STEPS.map((step) => {
                        const isActive = currentStep === step.id;
                        const isCompleted = currentStep > step.id;
                        const isClickable = mode === "edit" || isCompleted;

                        return (
                            <button
                                key={step.id}
                                type="button"
                                onClick={() => isClickable && handleStepClick(step.id)}
                                disabled={!isClickable && !isActive}
                                className={`flex items-center gap-3 text-left transition-all ${isClickable ? "cursor-pointer" : "cursor-default"
                                    }`}
                            >
                                <span
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${isActive
                                            ? "bg-green-600 text-white ring-4 ring-green-100"
                                            : isCompleted
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-slate-100 text-slate-500"
                                        }`}
                                >
                                    {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : step.id}
                                </span>
                                <span
                                    className={`text-sm font-semibold ${isActive ? "text-slate-900" : "text-slate-400"
                                        }`}
                                >
                                    {step.title}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Form Card */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">

                    {/* STEP 1: Personal Info */}
                    {currentStep === 1 && (
                        <div className="space-y-6 animate-in fade-in duration-200">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                                <div className="rounded-lg bg-green-50 p-2 text-green-600">
                                    <User className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-slate-900">Personal Information</h2>
                                    <p className="text-xs text-slate-400">Basic identification and contact details</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="e.g. Dr. Ramesh Chandra"
                                        required
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Gender *
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        required
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Date of Birth *
                                    </label>
                                    <input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        required
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Contact Number *
                                    </label>
                                    <div className="relative mt-1.5">
                                        <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Email Address *
                                    </label>
                                    <div className="relative mt-1.5">
                                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="doctor@hospital.com"
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Blood Group
                                    </label>
                                    <select
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
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
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Emergency Contact (Name & Phone)
                                    </label>
                                    <input
                                        type="text"
                                        name="emergencyContact"
                                        value={formData.emergencyContact}
                                        onChange={handleChange}
                                        placeholder="e.g. S. Shukla (+91 99999 88888)"
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Permanent Address
                                    </label>
                                    <textarea
                                        name="address"
                                        rows={2}
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter full residential address"
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Professional Info */}
                    {currentStep === 2 && (
                        <div className="space-y-6 animate-in fade-in duration-200">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                                <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                                    <Briefcase className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-slate-900">Professional Qualifications</h2>
                                    <p className="text-xs text-slate-400">Medical registration, degree, and clinical background</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Medical Council / License Reg. No. *
                                    </label>
                                    <input
                                        type="text"
                                        name="licenseNumber"
                                        value={formData.licenseNumber}
                                        onChange={handleChange}
                                        placeholder="MCI-19482-A"
                                        required
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Qualification / Degrees *
                                    </label>
                                    <input
                                        type="text"
                                        name="qualification"
                                        value={formData.qualification}
                                        onChange={handleChange}
                                        placeholder="MBBS, MD, MS, FRCS"
                                        required
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Assigned Department *
                                    </label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        required
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                                    >
                                        <option value="">Select Department</option>
                                        {DEPARTMENTS.map((dept) => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Sub-Specialization
                                    </label>
                                    <input
                                        type="text"
                                        name="specialization"
                                        value={formData.specialization}
                                        onChange={handleChange}
                                        placeholder="Interventional Cardiology, Pediatric Surgery"
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Years of Clinical Experience
                                    </label>
                                    <input
                                        type="number"
                                        name="experienceYears"
                                        value={formData.experienceYears}
                                        onChange={handleChange}
                                        placeholder="e.g. 8"
                                        min="0"
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Previous Hospital / Institution
                                    </label>
                                    <input
                                        type="text"
                                        name="previousHospital"
                                        value={formData.previousHospital}
                                        onChange={handleChange}
                                        placeholder="AIIMS, Apollo, Fortis"
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Work Details */}
                    {currentStep === 3 && (
                        <div className="space-y-6 animate-in fade-in duration-200">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                                <div className="rounded-lg bg-orange-50 p-2 text-orange-600">
                                    <CalendarClock className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-slate-900">Hospital Duty & Consultation</h2>
                                    <p className="text-xs text-slate-400">OPD scheduling, cabin allocation, and charges</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        OPD Cabin / Room No. *
                                    </label>
                                    <input
                                        type="text"
                                        name="opdRoomNo"
                                        value={formData.opdRoomNo}
                                        onChange={handleChange}
                                        placeholder="Cabin 204, Block B"
                                        required
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Consultation Fee (INR ₹) *
                                    </label>
                                    <input
                                        type="number"
                                        name="consultationFee"
                                        value={formData.consultationFee}
                                        onChange={handleChange}
                                        placeholder="800"
                                        required
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Duty Shift *
                                    </label>
                                    <select
                                        name="shift"
                                        value={formData.shift}
                                        onChange={handleChange}
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                                    >
                                        <option value="Morning">Morning (08:00 AM - 02:00 PM)</option>
                                        <option value="Evening">Evening (02:00 PM - 08:00 PM)</option>
                                        <option value="Night">Night (08:00 PM - 08:00 AM)</option>
                                        <option value="Rotational">Rotational Shift</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Employment Type
                                    </label>
                                    <select
                                        name="employmentType"
                                        value={formData.employmentType}
                                        onChange={handleChange}
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                                    >
                                        <option value="Full-Time">Full-Time (Permanent)</option>
                                        <option value="Visiting">Visiting Consultant</option>
                                        <option value="Contractual">Contractual</option>
                                        <option value="On-Call">Emergency On-Call</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Date of Joining
                                    </label>
                                    <input
                                        type="date"
                                        name="joiningDate"
                                        value={formData.joiningDate}
                                        onChange={handleChange}
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                                        Available OPD Days
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {DAYS.map((day) => {
                                            const isSelected = formData.availableDays.includes(day);
                                            return (
                                                <button
                                                    key={day}
                                                    type="button"
                                                    onClick={() => toggleDay(day)}
                                                    className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${isSelected
                                                            ? "bg-green-600 text-white shadow-sm"
                                                            : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                                                        }`}
                                                >
                                                    {day}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between gap-3 pt-2">
                    {/* Back or Cancel */}
                    {mode === "add" && currentStep > 1 ? (
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </button>
                    ) : (
                        <Link
                            href="/doctors"
                            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                        >
                            Cancel
                        </Link>
                    )}

                    {/* Next vs Save */}
                    <div className="flex items-center gap-3">
                        {mode === "edit" ? (
                            <button
                                type="submit"
                                className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-600/20 hover:bg-green-700 transition"
                            >
                                <Save className="h-4 w-4" />
                                Save & Continue
                            </button>
                        ) : currentStep < 3 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-600/20 hover:bg-green-700 transition"
                            >
                                Next
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-600/20 hover:bg-green-700 transition"
                            >
                                <Save className="h-4 w-4" />
                                Save Doctor
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}