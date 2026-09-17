// src/app/(app)/nurse/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Users,
  ClipboardPlus,
  Sunrise,
  AlertTriangle,
  IdCard,
  MessageSquareText,
  Search,
  ChevronDown,
  Download,
  Moon,
  Sun,
  Sunset,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import Avatar from "@/components/common/Avatar";
import StatCardGrid from "@/components/common/StatCardGrid";
import type { StatCardProps } from "@/components/common/StatCard";

const TOTAL_NURSES = 124;

const STATS: StatCardProps[] = [
  {
    label: "Total Nurses",
    value: TOTAL_NURSES,
    helper: "Updated just now",
    icon: Users,
    iconClassName: "bg-blue-50 text-blue-600",
    trend: "+4%",
  },
  {
    label: "On Duty",
    value: 86,
    helper: "Currently on shift",
    icon: ClipboardPlus,
    iconClassName: "bg-green-50 text-green-600",
    trend: "Today",
    trendDirection: "neutral",
  },
  {
    label: "On Leave",
    value: 12,
    helper: "Approved leaves today",
    icon: Sunrise,
    iconClassName: "bg-orange-50 text-orange-500",
    trend: "Current",
    trendDirection: "neutral",
  },
  {
    label: "Pending Requests",
    value: 5,
    helper: "Awaiting approval",
    icon: AlertTriangle,
    iconClassName: "bg-red-50 text-red-500",
    trend: "Urgent",
    trendDirection: "neutral",
  },
];

type NurseStatus = "Active" | "Inactive" | "Suspended";
type ShiftType = "Day" | "Evening" | "Night";

interface NurseItem {
  id: string;
  name: string;
  role: string;
  department: string;
  ward: string;
  shiftType: ShiftType;
  shiftTime: string;
  dutyType: "Full Time" | "Contract";
  contact: string;
  status: NurseStatus;
  isActive: boolean;
}

const INITIAL_NURSES: NurseItem[] = [
  {
    id: "NUR-1042",
    name: "Sarah Jenkins",
    role: "Head Nurse",
    department: "Emergency",
    ward: "ICU-B",
    shiftType: "Night",
    shiftTime: "8PM - 6AM",
    dutyType: "Full Time",
    contact: "+1 (555) 012-3456",
    status: "Active",
    isActive: true,
  },
  {
    id: "NUR-1045",
    name: "Rajesh Kumar",
    role: "Senior Nurse",
    department: "Pediatrics",
    ward: "Gen-A",
    shiftType: "Day",
    shiftTime: "8AM - 4PM",
    dutyType: "Full Time",
    contact: "+91 98765 43210",
    status: "Active",
    isActive: true,
  },
  {
    id: "NUR-1088",
    name: "Emily Zhang",
    role: "Junior Nurse",
    department: "Orthopedics",
    ward: "Gen-C",
    shiftType: "Evening",
    shiftTime: "4PM - 12AM",
    dutyType: "Contract",
    contact: "+1 (555) 098-7654",
    status: "Inactive",
    isActive: false,
  },
  {
    id: "NUR-1099",
    name: "Michael O'Connor",
    role: "Nurse Practitioner",
    department: "Neurology",
    ward: "ICU-A",
    shiftType: "Day",
    shiftTime: "8AM - 4PM",
    dutyType: "Full Time",
    contact: "+1 (555) 777-8888",
    status: "Suspended",
    isActive: false,
  },
];

const SHIFT_ICON: Record<ShiftType, typeof Moon> = {
  Night: Moon,
  Day: Sun,
  Evening: Sunset,
};

const SHIFT_ICON_COLOR: Record<ShiftType, string> = {
  Night: "text-indigo-500",
  Day: "text-amber-500",
  Evening: "text-orange-500",
};

const STATUS_STYLES: Record<NurseStatus, string> = {
  Active: "bg-green-50 text-green-700",
  Inactive: "bg-slate-100 text-slate-500",
  Suspended: "bg-red-50 text-red-600",
};

type StaffingUpdate =
  | {
    id: string;
    type: "check-in";
    name: string;
    message: string;
    timestamp: string;
    status: "On Duty";
  }
  | {
    id: string;
    type: "leave-request";
    name: string;
    message: string;
    timestamp: string;
    decision: "pending" | "approved" | "denied";
  };

const INITIAL_UPDATES: StaffingUpdate[] = [
  {
    id: "upd-1",
    type: "check-in",
    name: "Sarah Jenkins",
    message: "checked in at ICU - Ward A",
    timestamp: "2 minutes ago",
    status: "On Duty",
  },
  {
    id: "upd-2",
    type: "leave-request",
    name: "Raj Patel",
    message: "requested leave for Oct 12 - Oct 14",
    timestamp: "1 hour ago",
    decision: "pending",
  },
];

export default function AppNursePage() {
  const [nurses, setNurses] = useState<NurseItem[]>(INITIAL_NURSES);
  const [updates, setUpdates] = useState<StaffingUpdate[]>(INITIAL_UPDATES);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedShift, setSelectedShift] = useState("All");
  const [selectedWard, setSelectedWard] = useState("All");

  // Dynamic Wards List from Data
  const availableWards = useMemo(() => {
    const set = new Set(nurses.map((n) => n.ward));
    return Array.from(set);
  }, [nurses]);

  // Real-time Filtering Logic
  const filteredNurses = useMemo(() => {
    return nurses.filter((nurse) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        nurse.name.toLowerCase().includes(q) ||
        nurse.id.toLowerCase().includes(q) ||
        nurse.department.toLowerCase().includes(q) ||
        nurse.ward.toLowerCase().includes(q) ||
        nurse.role.toLowerCase().includes(q);

      const matchesStatus =
        selectedStatus === "All" || nurse.status === selectedStatus;

      const matchesShift =
        selectedShift === "All" || nurse.shiftType === selectedShift;

      const matchesWard =
        selectedWard === "All" || nurse.ward === selectedWard;

      return matchesSearch && matchesStatus && matchesShift && matchesWard;
    });
  }, [nurses, searchQuery, selectedStatus, selectedShift, selectedWard]);

  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedStatus !== "All" ||
    selectedShift !== "All" ||
    selectedWard !== "All";

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedStatus("All");
    setSelectedShift("All");
    setSelectedWard("All");
  };

  const toggleActive = (id: string) => {
    setNurses((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const nextActive = !n.isActive;
          return {
            ...n,
            isActive: nextActive,
            status: nextActive ? "Active" : "Inactive",
          };
        }
        return n;
      })
    );
  };

  const decide = (id: string, decision: "approved" | "denied") => {
    setUpdates((prev) =>
      prev.map((u) =>
        u.id === id && u.type === "leave-request" ? { ...u, decision } : u
      )
    );
  };

  return (
    <div className="space-y-6 p-5">
      {/* Header with Quick Action Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Nurse Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage nursing staff, assign wards, control duties, and monitor availability.
          </p>
        </div>

        {/* Action Buttons: Assign Ward, Performance, Add Nurse */}
        <div className="flex flex-wrap items-center gap-2.5 sm:self-auto">
          <Link
            href="/nurse/assign-wards"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
          >
            <IdCard className="h-4 w-4 text-violet-600" />
            <span>Assign Ward</span>
          </Link>

          <Link
            href="/nurse/performance"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
          >
            <MessageSquareText className="h-4 w-4 text-rose-500" />
            <span>Performance</span>
          </Link>

          <Link
            href="/nurse/add"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-green-600/20 transition hover:bg-green-700"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            <span>Add Nurse</span>
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <StatCardGrid stats={STATS} columns={4} />

      {/* All Nurses Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">

        {/* Working Filter Bar */}
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:flex-wrap sm:items-center sm:p-5">
          {/* Real-time Search Input */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ward, dept, ID..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-3.5 text-xs font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-3.5 pr-8 text-xs font-semibold text-slate-700 outline-none transition hover:bg-slate-100 focus:border-green-600 focus:bg-white cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Shift Filter */}
          <div className="relative">
            <select
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              className="appearance-none rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-3.5 pr-8 text-xs font-semibold text-slate-700 outline-none transition hover:bg-slate-100 focus:border-green-600 focus:bg-white cursor-pointer"
            >
              <option value="All">All Shifts</option>
              <option value="Day">Day Shift</option>
              <option value="Evening">Evening Shift</option>
              <option value="Night">Night Shift</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Ward Filter */}
          <div className="relative">
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="appearance-none rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-3.5 pr-8 text-xs font-semibold text-slate-700 outline-none transition hover:bg-slate-100 focus:border-green-600 focus:bg-white cursor-pointer"
            >
              <option value="All">All Wards</option>
              {availableWards.map((w) => (
                <option key={w} value={w}>
                  Ward {w}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Reset Filters (Only appears if any filter is set) */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              title="Reset all filters"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}

          {/* Export Button */}
          <button
            type="button"
            title="Export CSV"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition shadow-sm"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left">
            <thead>
              <tr className="border-y border-slate-100 bg-slate-50/75">
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  ID
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Nurse Name
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Department
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Ward
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Shift
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Duty Type
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Contact
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
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
              {filteredNurses.length > 0 ? (
                filteredNurses.map((nurse) => {
                  const ShiftIcon = SHIFT_ICON[nurse.shiftType];
                  return (
                    <tr
                      key={nurse.id}
                      className={`transition hover:bg-slate-50/60 ${!nurse.isActive ? "opacity-60" : ""
                        }`}
                    >
                      <td className="px-5 py-4 text-sm font-medium text-slate-500">
                        #{nurse.id}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={nurse.name} />
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {nurse.name}
                            </p>
                            <p className="text-xs text-slate-400">{nurse.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-slate-600">
                        {nurse.department}
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-slate-600">
                        {nurse.ward}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                          <ShiftIcon
                            className={`h-3.5 w-3.5 ${SHIFT_ICON_COLOR[nurse.shiftType]
                              }`}
                          />
                          {nurse.shiftType}
                        </div>
                        <p className="mt-0.5 text-xs text-slate-400">
                          {nurse.shiftTime}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-slate-600">
                        {nurse.dutyType}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500">
                        {nurse.contact}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[nurse.status]
                            }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {nurse.status}
                        </span>
                      </td>

                      {/* Active Toggle Switch */}
                      <td className="px-5 py-4 text-center">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={nurse.isActive}
                          onClick={() => toggleActive(nurse.id)}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${nurse.isActive ? "bg-green-600" : "bg-slate-200"
                            }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${nurse.isActive ? "translate-x-4" : "translate-x-0"
                              }`}
                          />
                        </button>
                      </td>

                      {/* Actions: View + Edit */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/nurse/${nurse.id}/view`}
                            title="View Profile"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 transition"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/nurse/${nurse.id}/edit`}
                            title="Edit Nurse"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 transition"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="py-12 text-center text-sm text-slate-400"
                  >
                    No nurses found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col gap-3 border-t border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {filteredNurses.length > 0 ? "1" : "0"} to {filteredNurses.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-800">
              {filteredNurses.length}
            </span>{" "}
            filtered ({TOTAL_NURSES} total)
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-xs font-semibold text-white"
            >
              1
            </button>
            <button
              type="button"
              disabled
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-300 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Staffing Updates */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-5">
          <h2 className="text-base font-bold text-slate-900">
            Recent Staffing Updates
          </h2>
          <Link
            href="/nurse"
            className="text-sm font-semibold text-green-600 hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {updates.map((update) => (
            <div
              key={update.id}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >
              <div className="flex items-center gap-3">
                <Avatar name={update.name} />
                <div>
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">
                      {update.name}
                    </span>{" "}
                    {update.message}
                  </p>
                  <p className="text-xs text-slate-400">{update.timestamp}</p>
                </div>
              </div>

              {update.type === "check-in" ? (
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  {update.status}
                </span>
              ) : update.decision === "pending" ? (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => decide(update.id, "approved")}
                    className="rounded-lg border border-green-200 bg-green-50 px-3.5 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-100"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => decide(update.id, "denied")}
                    className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                  >
                    Deny
                  </button>
                </div>
              ) : (
                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${update.decision === "approved"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-600"
                    }`}
                >
                  {update.decision === "approved" ? "Approved" : "Denied"}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}