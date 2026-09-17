// src/components/staff/StaffForm.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    User,
    Briefcase,
    FolderUp,
    GraduationCap,
    CreditCard,
    FileBadge,
    Save,
    ChevronRight,
    UploadCloud,
} from "lucide-react";

export interface StaffFormData {
    fullName: string;
    gender: string;
    dob: string;
    contactNumber: string;
    email: string;
    emergencyContact: string;
    address: string;
    roleDepartment: string;
    qualification: string;
    experienceYears: string;
    joiningDate: string;
    dutyType: "Full-time" | "Part-time" | "Contract";
    assignedShift: string;
}

const INITIAL_STAFF_DATA: StaffFormData = {
    fullName: "",
    gender: "",
    dob: "",
    contactNumber: "",
    email: "",
    emergencyContact: "",
    address: "",
    roleDepartment: "",
    qualification: "",
    experienceYears: "0",
    joiningDate: "",
    dutyType: "Full-time",
    assignedShift: "",
};

interface StaffFormProps {
    mode: "add" | "edit";
    staffId?: string;
    initialData?: Partial<StaffFormData>;
}

export default function StaffForm({ mode, staffId, initialData }: StaffFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<StaffFormData>({
        ...INITIAL_STAFF_DATA,
        ...initialData,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Saving Staff Member:", formData);
        router.push("/staff-management");
    };

    return (
        <div className="mx-auto max-w-7xl space-y-6 pb-20 p-5">
            

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {mode === "add" ? "Add & Onboard Staff" : "Edit Staff Profile"}
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Enter staff details to create a new profile and assign roles.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 space-y-8">

                    {/* 1. Personal Details */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-blue-600 border-b border-slate-100 pb-3">
                            <div className="rounded-lg bg-blue-50 p-1.5">
                                <User className="h-4 w-4" />
                            </div>
                            <h2 className="text-sm font-bold text-slate-900">Personal Details</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600">
                                    Full Name <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter full name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600">
                                    Gender <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 focus:bg-white"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600">
                                    Date of Birth <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    required
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600">
                                    Contact Number <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    placeholder="+91 XXXXX XXXXX"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    required
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600">
                                    Email Address <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600">
                                    Emergency Contact
                                </label>
                                <input
                                    type="text"
                                    name="emergencyContact"
                                    placeholder="Relative Name & Number"
                                    value={formData.emergencyContact}
                                    onChange={handleChange}
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 focus:bg-white"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-slate-600">
                                    Residential Address <span className="text-rose-500">*</span>
                                </label>
                                <textarea
                                    rows={2}
                                    name="address"
                                    placeholder="Enter full address including city and zip code"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm outline-none focus:border-blue-600 focus:bg-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 2. Professional & Work Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-blue-600 border-b border-slate-100 pb-3">
                            <div className="rounded-lg bg-blue-50 p-1.5">
                                <Briefcase className="h-4 w-4" />
                            </div>
                            <h2 className="text-sm font-bold text-slate-900">Professional &amp; Work Info</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600">
                                    Role / Department <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    name="roleDepartment"
                                    value={formData.roleDepartment}
                                    onChange={handleChange}
                                    required
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 focus:bg-white"
                                >
                                    <option value="">Select Role</option>
                                    <option value="Senior Nurse">Senior Nurse (Pediatrics)</option>
                                    <option value="Neurologist">Neurologist (Neurology)</option>
                                    <option value="Lab Technician">Lab Technician (Laboratory)</option>
                                    <option value="Pharmacist">Pharmacist (Pharmacy)</option>
                                    <option value="Receptionist">Receptionist (Front Desk)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600">
                                    Qualification <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="qualification"
                                    placeholder="e.g. MBBS, MD, B.Sc Nursing"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                    required
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600">
                                    Experience (Years)
                                </label>
                                <input
                                    type="number"
                                    name="experienceYears"
                                    placeholder="0"
                                    value={formData.experienceYears}
                                    onChange={handleChange}
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600">
                                    Joining Date <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="joiningDate"
                                    value={formData.joiningDate}
                                    onChange={handleChange}
                                    required
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-2">
                                    Duty Type <span className="text-rose-500">*</span>
                                </label>
                                <div className="flex items-center gap-4 pt-1">
                                    {(["Full-time", "Part-time", "Contract"] as const).map((type) => (
                                        <label key={type} className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="dutyType"
                                                value={type}
                                                checked={formData.dutyType === type}
                                                onChange={() => setFormData({ ...formData, dutyType: type })}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                            />
                                            {type}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600">
                                    Assigned Shift
                                </label>
                                <select
                                    name="assignedShift"
                                    value={formData.assignedShift}
                                    onChange={handleChange}
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 focus:bg-white"
                                >
                                    <option value="">Select Shift</option>
                                    <option value="Morning (08:00 AM - 04:00 PM)">Morning (08:00 AM - 04:00 PM)</option>
                                    <option value="Evening (04:00 PM - 12:00 AM)">Evening (04:00 PM - 12:00 AM)</option>
                                    <option value="Night (12:00 AM - 08:00 AM)">Night (12:00 AM - 08:00 AM)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 3. Document Uploads Cards */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-blue-600 border-b border-slate-100 pb-3">
                            <div className="rounded-lg bg-blue-50 p-1.5">
                                <FolderUp className="h-4 w-4" />
                            </div>
                            <h2 className="text-sm font-bold text-slate-900">Document Uploads</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 text-center hover:bg-slate-50 transition cursor-pointer">
                                <GraduationCap className="h-6 w-6 text-slate-400" />
                                <p className="mt-2 text-xs font-bold text-slate-800">Qualification Certificates</p>
                                <p className="text-[10px] text-slate-400">PDF or JPG (Max 5MB)</p>
                            </div>

                            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 text-center hover:bg-slate-50 transition cursor-pointer">
                                <CreditCard className="h-6 w-6 text-slate-400" />
                                <p className="mt-2 text-xs font-bold text-slate-800">ID Proof</p>
                                <p className="text-[10px] text-slate-400">Aadhaar / PAN</p>
                            </div>

                            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 text-center hover:bg-slate-50 transition cursor-pointer">
                                <FileBadge className="h-6 w-6 text-slate-400" />
                                <p className="mt-2 text-xs font-bold text-slate-800">Medical License</p>
                                <p className="text-[10px] text-slate-400">If applicable</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <Link
                        href="/staff-management"
                        className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition active:scale-[0.99]"
                    >
                        <Save className="h-4 w-4" />
                        <span>{mode === "add" ? "Save & Assign Role" : "Update Staff Details"}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}