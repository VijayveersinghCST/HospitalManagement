import Link from "next/link";
import { ChevronDown, Clock, Plus, Sunrise, Users } from "lucide-react";
import Avatar from "@/components/common/Avatar";
import StatCardGrid from "@/components/common/StatCardGrid";
import StatusBadge from "@/components/common/StatusBadge";
import type { StatCardProps } from "@/components/common/StatCard";
import type { Doctor } from "@/types/doctor";

// TODO: replace with a live fetch via services/doctorService once the API is wired up
const DOCTORS: Doctor[] = [
  {
    id: "DOC-1024",
    name: "Dr. Anjali Sharma",
    title: "Senior Consultant",
    department: "Cardiology",
    status: "Available",
  },
  {
    id: "DOC-1025",
    name: "Dr. Rajesh Gupta",
    title: "Surgeon",
    department: "Neurology",
    status: "In Surgery",
  },
  {
    id: "DOC-1089",
    name: "Dr. Emily Chen",
    title: "Pediatrician",
    department: "Pediatrics",
    status: "Off Duty",
  },
  {
    id: "DOC-1092",
    name: "Dr. Michael Ross",
    title: "General Physician",
    department: "General Medicine",
    status: "Available",
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
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Doctor Management</h1>
          <p className="mt-1.5 max-w-xl text-sm text-slate-500">
            Manage doctors, assign roles, control permissions, and monitor availability
            across all departments.
          </p>
        </div>

        <Link
          href="/doctors/add"
          className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 sm:self-start"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          Add New Doctor
        </Link>
      </div>

      {/* Stat cards */}
      <div className="mt-6">
        <StatCardGrid stats={STATS} />
      </div>

      {/* Doctor table */}
      <div className="mt-6 rounded-2xl border border-slate-100 bg-white shadow-[0_2px_6px_rgba(15,23,42,0.06)]">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:p-5">
          <h2 className="text-lg font-bold text-slate-900">All Doctors</h2>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-slate-100 px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200"
            >
              All Departments
              <ChevronDown className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-slate-100 px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200"
            >
              Any Status
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-y border-slate-100 bg-slate-50/60">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-5">
                  Doctor Name
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-5">
                  ID
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-5">
                  Department
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-5">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-5">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {DOCTORS.map((doctor) => (
                <tr key={doctor.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-4 py-4 sm:px-5">
                    <div className="flex items-center gap-3">
                      <Avatar name={doctor.name} />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{doctor.name}</p>
                        <p className="text-xs text-slate-400">{doctor.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-500 sm:px-5">{doctor.id}</td>
                  <td className="px-4 py-4 text-sm text-slate-500 sm:px-5">{doctor.department}</td>
                  <td className="px-4 py-4 sm:px-5">
                    <StatusBadge status={doctor.status} />
                  </td>
                  <td className="px-4 py-4 text-right sm:px-5">
                    <Link
                      href={`/doctors/${doctor.id}`}
                      className="text-sm font-medium text-green-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">1-{DOCTORS.length}</span> of{" "}
            <span className="font-semibold text-slate-700">{TOTAL_DOCTORS}</span> doctors
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled
              className="flex-1 rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-400 disabled:cursor-not-allowed sm:flex-none"
            >
              Previous
            </button>
            <button
              type="button"
              className="flex-1 rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 sm:flex-none"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
