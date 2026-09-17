// src/app/(app)/nurse/[nurseId]/edit/page.tsx
"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  CheckCircle2,
  Ban,
  PauseCircle,
  User,
  Mail,
  Phone,
  Briefcase,
  ShieldCheck,
  FileText,
  Eye,
  UploadCloud,
  Save,
} from "lucide-react";
import Avatar from "@/components/common/Avatar";
import Image from "next/image";

type EmploymentStatus = "Active" | "Inactive" | "Suspended";

interface EditNurseProps {
  params: Promise<{ nurseId: string }>;
}

export default function EditNursePage({ params }: EditNurseProps) {
  const router = useRouter();
  const { nurseId } = use(params);

  const [status, setStatus] = useState<EmploymentStatus>("Active");
  const [formData, setFormData] = useState({
    firstName: "Sarah",
    lastName: "Jenkins",
    email: "sarah.j@shriramhospital.com",
    phone: "+91 98765 43210",
    address: "42, Nehru Nagar, Main Road, New Delhi - 110065",
    department: "Emergency (ER)",
    ward: "Ward B - General",
    shiftStart: "07:00",
    shiftEnd: "19:00",
    responsibilities:
      "Head nurse for shift A. Responsible for medication inventory and junior staff supervision.",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call nurseService.update(nurseId, { ...formData, status })
    router.push(`/nurse/${nurseId}/view`);
  };

  const fullName = `${formData.firstName} ${formData.lastName}`;

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-28 p-5">
      
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Edit Nurse Details
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Update assignment, contact info, and status for{" "}
            <span className="font-semibold text-blue-600">{fullName}</span> (ID: {nurseId})
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2 pr-4 shadow-sm">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2 pr-4 shadow-sm">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-slate-100">
              <Image
                src="/images/nurse-avatar.png"
                alt={fullName}
                width={40}
                height={40}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=250&auto=format&fit=crop";
                }}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{fullName}</p>
              <p className="text-xs text-slate-400">Senior Nurse</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{fullName}</p>
            <p className="text-xs text-slate-400">Senior Nurse</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Employment Status */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Employment Status</h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Controls system access and shift visibility. Changes are logged immediately.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:flex">
            {(
              [
                { key: "Active", icon: CheckCircle2 },
                { key: "Inactive", icon: PauseCircle },
                { key: "Suspended", icon: Ban },
              ] as { key: EmploymentStatus; icon: typeof CheckCircle2 }[]
            ).map(({ key, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setStatus(key)}
                className={`flex items-center justify-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition sm:text-sm ${status === key
                  ? "border-blue-500 bg-blue-50 text-blue-600 ring-1 ring-blue-500"
                  : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                  }`}
              >
                <Icon className="h-4 w-4" />
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Personal & Contact Information */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-blue-600" />
              <h2 className="text-sm font-bold tracking-wide text-slate-900">
                Personal & Contact Information
              </h2>
            </div>
            <span className="text-xs text-slate-400">Last updated: 2 days ago</span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-600">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600">Email Address</label>
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
              <label className="block text-xs font-semibold text-slate-600">Phone Number</label>
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

        {/* Department & Shift Assignment */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <Briefcase className="h-4 w-4 text-blue-600" />
            <h2 className="text-sm font-bold tracking-wide text-slate-900">
              Department & Shift Assignment
            </h2>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-600">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              >
                <option>Emergency (ER)</option>
                <option>Pediatrics</option>
                <option>Orthopedics</option>
                <option>Neurology</option>
                <option>ICU</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600">Assigned Ward</label>
              <select
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              >
                <option>Ward B - General</option>
                <option>Ward A - ICU</option>
                <option>Ward C - General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600">Shift Start Time</label>
              <input
                type="time"
                name="shiftStart"
                value={formData.shiftStart}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600">Shift End Time</label>
              <input
                type="time"
                name="shiftEnd"
                value={formData.shiftEnd}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600">
                Key Responsibilities
              </label>
              <textarea
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                rows={3}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>
        </div>

        {/* License & Compliance */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            <h2 className="text-sm font-bold tracking-wide text-slate-900">
              License & Compliance
            </h2>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Current License: RN_License_2023.pdf
                </p>
                <p className="text-xs text-slate-400">Expires in 45 days • Verified</p>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline"
            >
              <Eye className="h-4 w-4" />
              View
            </button>
          </div>

          <div className="mt-4">
            <label className="block text-xs font-semibold text-slate-600">
              Upload License Renewal
            </label>
            <div className="mt-1.5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/30 px-4 py-8 text-center hover:border-blue-300 hover:bg-blue-50/20">
              <UploadCloud className="h-6 w-6 text-slate-400" />
              <p className="text-sm font-semibold text-slate-700">
                Click to upload <span className="font-normal text-slate-400">or drag and drop</span>
              </p>
              <p className="text-xs text-slate-400">PDF, JPG or PNG (MAX. 5MB)</p>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
            </div>
          </div>
        </div>

        {/* Sticky bottom bar */}
        <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between border-t border-slate-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:px-8">
          <button
            type="button"
            onClick={() => setStatus("Suspended")}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
          >
            <Ban className="h-4 w-4" />
            <span className="hidden sm:inline">Deactivate Nurse</span>
            <span className="sm:hidden">Deactivate</span>
          </button>

          <div className="flex items-center gap-3">
            <Link
              href="/nurse"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99]"
            >
              <Save className="h-4 w-4" />
              <span>Update Nurse Details</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}