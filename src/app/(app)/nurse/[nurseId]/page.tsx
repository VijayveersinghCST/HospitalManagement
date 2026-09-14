// src/app/(app)/doctors/[doctorId]/view/page.tsx
"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Briefcase,
  CalendarClock,
  Mail,
  Phone,
  CreditCard,
  Ban,
  Save,
  ExternalLink,
  ShieldCheck,
  Stethoscope,
  IdCard,
} from "lucide-react";

interface DoctorViewProps {
  params: Promise<{ doctorId: string }>;
}

export default function DoctorViewPage({ params }: DoctorViewProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const doctorId = resolvedParams.doctorId || "SRH-402";

  // Form states matching screenshot
  const [status, setStatus] = useState<"active" | "inactive" | "suspended">("active");
  const [formData, setFormData] = useState({
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "dr.rajesh.k@shriramhospital.com",
    phone: "+91 98765 43210",
    address: "A-402, Palm Heights, Civil Lines, New Delhi - 110054",
    department: "Cardiology",
    specialization: "Interventional Cardiology",
    licenseNo: "MCI-2015-8892",
    experience: "12",
    opdCabin: "Cabin 204, Block B",
    shiftTiming: "08:00 AM - 02:00 PM (Morning)",
    consultationFee: "1500",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Doctor Details:", { ...formData, status });
    router.push("/doctors");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-28">
      {/* 1. Profile Banner Card */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-slate-100 sm:h-20 sm:w-20">
            <Image
              src="/images/doctor-avatar.png"
              alt="Doctor Profile"
              width={80}
              height={80}
              className="h-full w-full object-cover"
              onError={(e) => {
                // Fallback avatar if local image not found
                e.currentTarget.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=250&auto=format&fit=crop";
              }}
            />
            {/* Online Status Dot */}
            <span
              className={`absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-white ${
                status === "active"
                  ? "bg-emerald-500"
                  : status === "inactive"
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
            />
          </div>

          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Dr. {formData.firstName} {formData.lastName}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
              <span className="inline-flex items-center gap-1">
                <IdCard className="h-3.5 w-3.5 text-slate-400" />
                {doctorId}
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1">
                <Stethoscope className="h-3.5 w-3.5 text-slate-400" />
                {formData.specialization || "Cardiologist"}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => window.open("#", "_blank")}
          className="inline-flex items-center justify-center gap-1.5 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:self-center"
        >
          <span>View Public Profile</span>
          <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
        </button>
      </div>

      {/* Main 2-Column Responsive Form Layout */}
      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* LEFT 2 COLUMNS: Personal, Professional & Duty Details */}
          <div className="space-y-6 lg:col-span-2">
            
            {/* Card 1: Personal Information */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <User className="h-4 w-4 text-blue-600" />
                <h2 className="text-sm font-bold tracking-wide text-slate-900">
                  Personal Information
                </h2>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600">
                    Email Address
                  </label>
                  <div className="relative mt-1.5">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600">
                    Phone Number
                  </label>
                  <div className="relative mt-1.5">
                    <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600">
                    Residential Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Professional Profile */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <Briefcase className="h-4 w-4 text-blue-600" />
                <h2 className="text-sm font-bold tracking-wide text-slate-900">
                  Professional Profile
                </h2>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600">
                    Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="General Medicine">General Medicine</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600">
                    Specialization
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600">
                    Medical License No.
                  </label>
                  <input
                    type="text"
                    name="licenseNo"
                    value={formData.licenseNo}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600">
                    Experience (Years)
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Shift Timing & Duty */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <CalendarClock className="h-4 w-4 text-blue-600" />
                <h2 className="text-sm font-bold tracking-wide text-slate-900">
                  Shift Timing & Duty
                </h2>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600">
                    OPD Cabin / Room No.
                  </label>
                  <input
                    type="text"
                    name="opdCabin"
                    value={formData.opdCabin}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600">
                    Assigned Shift
                  </label>
                  <input
                    type="text"
                    name="shiftTiming"
                    value={formData.shiftTiming}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 1 COLUMN: Account Status & Consultation Fee */}
          <div className="space-y-6">
            
            {/* Card 4: Account Status Selection */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                <h2 className="text-sm font-bold tracking-wide text-slate-900">
                  Account Status
                </h2>
              </div>

              <div className="mt-5 space-y-3">
                {/* Active Option */}
                <div
                  onClick={() => setStatus("active")}
                  className={`flex cursor-pointer items-start gap-3.5 rounded-xl border p-3.5 transition-all ${
                    status === "active"
                      ? "border-blue-500 bg-blue-50/30 ring-1 ring-blue-500"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-slate-300">
                    {status === "active" && (
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-slate-900">Active</p>
                    <p className="mt-0.5 text-slate-500 leading-relaxed">
                      Doctor can access system and see patients.
                    </p>
                  </div>
                </div>

                {/* Inactive Option */}
                <div
                  onClick={() => setStatus("inactive")}
                  className={`flex cursor-pointer items-start gap-3.5 rounded-xl border p-3.5 transition-all ${
                    status === "inactive"
                      ? "border-blue-500 bg-blue-50/30 ring-1 ring-blue-500"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-slate-300">
                    {status === "inactive" && (
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-slate-900">Inactive</p>
                    <p className="mt-0.5 text-slate-500 leading-relaxed">
                      Temporarily disabled (e.g., Leave).
                    </p>
                  </div>
                </div>

                {/* Suspended Option */}
                <div
                  onClick={() => setStatus("suspended")}
                  className={`flex cursor-pointer items-start gap-3.5 rounded-xl border p-3.5 transition-all ${
                    status === "suspended"
                      ? "border-blue-500 bg-blue-50/30 ring-1 ring-blue-500"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-slate-300">
                    {status === "suspended" && (
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-slate-900">Suspended</p>
                    <p className="mt-0.5 text-slate-500 leading-relaxed">
                      Access revoked immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5: Consultation Fee */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <CreditCard className="h-4 w-4 text-blue-600" />
                <h2 className="text-sm font-bold tracking-wide text-slate-900">
                  Consultation Fee
                </h2>
              </div>

              <div className="mt-5">
                <label className="block text-xs font-semibold text-slate-600">
                  Fee Amount (INR)
                </label>
                <div className="relative mt-1.5">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-8 pr-14 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                    / visit
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  Standard OPD consultation rate.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Actions Bar */}
        <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between border-t border-slate-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:px-8">
          <button
            type="button"
            onClick={() => setStatus("suspended")}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
          >
            <Ban className="h-4 w-4" />
            <span className="hidden sm:inline">Deactivate Doctor</span>
            <span className="sm:hidden">Deactivate</span>
          </button>

          <div className="flex items-center gap-3">
            <Link
              href="/doctors"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99]"
            >
              <Save className="h-4 w-4" />
              <span>Update Doctor Details</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}