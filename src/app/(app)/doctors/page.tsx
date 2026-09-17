// src/app/(app)/doctors/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Clock,
  Plus,
  Sunrise,
  Users,
  Eye,
  Pencil
} from "lucide-react";
import Avatar from "@/components/common/Avatar";
import StatCardGrid from "@/components/common/StatCardGrid";
import StatusBadge from "@/components/common/StatusBadge";
import type { StatCardProps } from "@/components/common/StatCard";

interface DoctorItem {
  id: string;
  name: string;
  title: string;
  department: string;
  status: "Available" | "In Surgery" | "Off Duty";
  isActive: boolean;
}

const INITIAL_DOCTORS: DoctorItem[] = [
  {
    id: "DOC-1024",
    name: "Dr. Anjali Sharma",
    title: "Senior Consultant",
    department: "Cardiology",
    status: "Available",
    isActive: true,
  },
  {
    id: "DOC-1025",
    name: "Dr. Rajesh Gupta",
    title: "Surgeon",
    department: "Neurology",
    status: "In Surgery",
    isActive: true,
  },
  {
    id: "DOC-1089",
    name: "Dr. Emily Chen",
    title: "Pediatrician",
    department: "Pediatrics",
    status: "Off Duty",
    isActive: false,
  },
  {
    id: "DOC-1092",
    name: "Dr. Michael Ross",
    title: "General Physician",
    department: "General Medicine",
    status: "Available",
    isActive: true,
  },
];

const TOTAL_DOCTORS = 142;

const STATS: StatCardProps[] = [
  {
    label: "Total Doctors",
    value: TOTAL_DOCTORS,
    helper: "Updated just now",
    icon: Users,
    iconClassName: "bg-green-50 text-green-600",
    trend: "+5%",
  },
  {
    label: "Active Shifts",
    value: 38,
    helper: "Currently on duty",
    icon: Clock,
    iconClassName: "bg-blue-50 text-blue-600",
    trend: "+12%",
  },
  {
    label: "On Leave",
    value: 4,
    helper: "Approved leaves today",
    icon: Sunrise,
    iconClassName: "bg-orange-50 text-orange-500",
    trend: "Normal",
    trendDirection: "neutral",
  },
];

export default function AppDoctorsPage() {
  const [doctors, setDoctors] = useState<DoctorItem[]>(INITIAL_DOCTORS);

  const toggleStatus = (id: string) => {
    setDoctors((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, isActive: !doc.isActive } : doc
      )
    );
  };

  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Doctor Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage doctors, assign shifts, modify availability, and control access permissions.
          </p>
        </div>

        <Link
          href="/doctors/add"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-green-600/20 transition hover:bg-green-700 sm:self-auto"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          Add New Doctor
        </Link>
      </div>

      {/* Stat cards */}
      <StatCardGrid stats={STATS} />

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {/* Table Filter Top Bar */}
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:p-5">
          <h2 className="text-base font-bold text-slate-900">All Doctors</h2>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              All Departments
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              Any Status
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-y border-slate-100 bg-slate-50/75">
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Doctor
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  ID
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Department
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Availability
                </th>
                <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Active
                </th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {doctors.map((doctor) => (
                <tr
                  key={doctor.id}
                  className={`transition hover:bg-slate-50/60 ${!doctor.isActive ? "opacity-60" : ""
                    }`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={doctor.name} />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{doctor.name}</p>
                        <p className="text-xs text-slate-400">{doctor.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-500">
                    {doctor.id}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-600">
                    {doctor.department}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={doctor.status} />
                  </td>

                  {/* Active / Inactive Toggle Switch */}
                  <td className="px-5 py-4 text-center">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={doctor.isActive}
                      onClick={() => toggleStatus(doctor.id)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${doctor.isActive ? "bg-green-600" : "bg-slate-200"
                        }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${doctor.isActive ? "translate-x-4" : "translate-x-0"
                          }`}
                      />
                    </button>
                  </td>

                  {/* Actions: View & Edit Buttons */}
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/doctors/${doctor.id}/view`}
                        title="View Profile"
                        className="..."
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/doctors/${doctor.id}/edit`}
                        title="Edit Doctor"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 transition"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col gap-3 border-t border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-800">1-{doctors.length}</span> of{" "}
            <span className="font-semibold text-slate-800">{TOTAL_DOCTORS}</span> doctors
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled
              className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-400 disabled:cursor-not-allowed sm:flex-none"
            >
              Previous
            </button>
            <button
              type="button"
              className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 sm:flex-none"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}