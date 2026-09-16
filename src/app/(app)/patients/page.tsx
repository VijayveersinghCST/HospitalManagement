// src/app/(app)/patients/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UserPlus,
  Building2,
  Radio,
  LogOut,
  Calendar,
  BedDouble,
  Hourglass,
  Eye,
  Pencil,
  ArrowUpRight,
  Search,
  ChevronRight,
} from "lucide-react";
import Avatar from "@/components/common/Avatar";

interface PatientActivity {
  id: string;
  name: string;
  status: "Stable" | "Critical" | "Observation";
  ward: string;
  assignedDoctor: string;
  lastUpdate: string;
}

const RECENT_ACTIVITIES: PatientActivity[] = [
  {
    id: "#PT-2024-892",
    name: "Sarah Jenkins",
    status: "Stable",
    ward: "Gen. Ward A-12",
    assignedDoctor: "Dr. Rajesh Kumar",
    lastUpdate: "10 mins ago",
  },
  {
    id: "#PT-2024-891",
    name: "Michael Chen",
    status: "Critical",
    ward: "ICU Unit 4",
    assignedDoctor: "Dr. Anita Singh",
    lastUpdate: "25 mins ago",
  },
  {
    id: "#PT-2024-889",
    name: "Priya Sharma",
    status: "Observation",
    ward: "Emergency Bay 2",
    assignedDoctor: "Dr. Vikram Patel",
    lastUpdate: "1 hour ago",
  },
  {
    id: "#PT-2024-885",
    name: "Rohit Verma",
    status: "Stable",
    ward: "Cabin 104",
    assignedDoctor: "Dr. Anjali Sharma",
    lastUpdate: "2 hours ago",
  },
];

const STATUS_BADGE = {
  Stable: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Critical: "bg-rose-50 text-rose-700 border-rose-200",
  Observation: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function PatientManagementPage() {
  const [search, setSearch] = useState("");

  const filteredList = RECENT_ACTIVITIES.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.ward.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-5">
      {/* 1. Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Patient Management
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Monitor patient registration, admissions, discharges, medical history, and emergency cases.
        </p>
      </div>

      {/* 2. Stat Cards (Responsive Grid) */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
        <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Patients Today
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">142</span>
              <span className="text-xs font-semibold text-emerald-600">↗ +5%</span>
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Calendar className="h-5 w-5" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Currently Admitted
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">89</span>
              <span className="text-xs font-semibold text-emerald-600">↗ +2%</span>
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <BedDouble className="h-5 w-5" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pending Discharges
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">12</span>
              <span className="text-xs font-semibold text-rose-500">↘ -1%</span>
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Hourglass className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* 3. Quick Actions (4 Buttons after Stat Cards) */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Quick Actions
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Button 1: Register New Patient */}
          <Link
            href="/patients/register"
            className="group flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <UserPlus className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Register Patient
                </p>
                <p className="text-[11px] text-slate-400">New intake &amp; OPD</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-600" />
          </Link>

          {/* Button 2: View Admissions */}
          <Link
            href="/patients/admissions"
            className="group flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50/30 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  View Admissions
                </p>
                <p className="text-[11px] text-slate-400">Ward &amp; bed status</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-600" />
          </Link>

          {/* Button 3: Emergency Cases (with Live Pulse) */}
          <Link
            href="/patients/emergency"
            className="group relative flex items-center justify-between rounded-xl border border-rose-200 bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-400 hover:bg-rose-50/40 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600 transition group-hover:bg-rose-600 group-hover:text-white">
                <Radio className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-600" />
                </span>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                  Emergency Cases
                </p>
                <p className="text-[11px] text-slate-400">ER triage &amp; live units</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-rose-600" />
          </Link>

          {/* Button 4: Discharge Monitoring */}
          <Link
            href="/patients/discharge"
            className="group flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50/30 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
                <LogOut className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                  Discharge Desk
                </p>
                <p className="text-[11px] text-slate-400">Clearance &amp; release</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-violet-600" />
          </Link>
        </div>
      </div>

      {/* 4. Recent Patient Activity Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Patient Activity</h2>
            <p className="text-xs text-slate-400">Live feed of admitted, triage and observation cases</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search patient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50/70 py-1.5 pl-9 pr-3 text-xs font-medium text-slate-700 outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>
            <Link
              href="/patients/admissions"
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
            >
              <span>View All</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead>
              <tr className="border-y border-slate-100 bg-slate-50/75 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3.5">Patient ID</th>
                <th className="px-5 py-3.5">Patient Name</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Ward</th>
                <th className="px-5 py-3.5">Assigned Dr.</th>
                <th className="px-5 py-3.5">Last Update</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredList.map((patient) => (
                <tr key={patient.id} className="transition hover:bg-slate-50/60">
                  <td className="px-5 py-4 font-semibold text-slate-700">{patient.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={patient.name} />
                      <span className="font-semibold text-slate-900">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_BADGE[patient.status]}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{patient.ward}</td>
                  <td className="px-5 py-4 font-medium text-slate-800">{patient.assignedDoctor}</td>
                  <td className="px-5 py-4 text-xs text-slate-400">{patient.lastUpdate}</td>

                  {/* Actions: View & Edit Only */}
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/patients/${patient.id.replace("#", "")}/view`}
                        title="View Full Profile"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 shadow-sm"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/patients/${patient.id.replace("#", "")}/edit`}
                        title="Edit Patient Details"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 shadow-sm"
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
      </div>
    </div>
  );
}