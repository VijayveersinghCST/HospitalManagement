"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Plus, ChevronLeft, ChevronRight, Sun, Moon, Sunset } from "lucide-react";
import StatusBadge from "./Statusbadge";
import Button from "./Button";
import { Receptionist, ReceptionistStatus, Shift } from "./Receptionist";

const PAGE_SIZE = 5;

const SHIFT_ICON: Record<Shift, React.ReactNode> = {
    Morning: <Sun size={12} />,
    Afternoon: <Sunset size={12} />,
    Night: <Moon size={12} />,
};

const STATUS_FILTERS: (ReceptionistStatus | "All Status")[] = [
    "All Status",
    "Active",
    "Inactive",
    "Suspended",
];

function initials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

export default function ReceptionistTable({ receptionists }: { receptionists: Receptionist[] }) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<ReceptionistStatus | "All Status">("All Status");
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        return receptionists.filter((r) => {
            const matchesSearch =
                search.trim() === "" ||
                r.fullName.toLowerCase().includes(search.toLowerCase()) ||
                r.id.toLowerCase().includes(search.toLowerCase()) ||
                r.department.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === "All Status" || r.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [receptionists, search, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const activeCount = receptionists.filter((r) => r.status === "Active").length;

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("All Status");
        setPage(1);
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between">
                <div>
                    <nav className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
                        <span>Dashboard</span>
                        <ChevronRight size={12} />
                        <span>Staff</span>
                        <ChevronRight size={12} />
                        <span className="text-slate-600">Receptionists</span>
                    </nav>
                    <h1 className="text-2xl font-bold text-slate-900">Receptionist List</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage all registered receptionists, shift timings, and assignments.
                    </p>
                </div>
                <div className="flex items-center gap-3">
          <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
            Total: {activeCount} active
          </span>
                    <Link href="/receptionists/add">
                        <Button>
                            <Plus size={16} /> Add New Receptionist
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 rounded-card border border-slate-200 bg-white p-3">
                <div className="relative flex-1 min-w-[220px]">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Search by name, ID or department..."
                        className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value as ReceptionistStatus | "All Status");
                        setPage(1);
                    }}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 outline-none focus:border-brand-500"
                >
                    {STATUS_FILTERS.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
                <button onClick={resetFilters} className="text-sm font-medium text-brand-600 hover:text-brand-700">
                    Reset
                </button>
            </div>

            <div className="overflow-x-auto rounded-card border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                    <thead>
                    <tr className="border-b border-slate-100 text-xs text-slate-400">
                        <th className="px-4 py-3 font-medium">ID</th>
                        <th className="px-4 py-3 font-medium">Receptionist</th>
                        <th className="px-4 py-3 font-medium">Department</th>
                        <th className="px-4 py-3 font-medium">Assigned Desk</th>
                        <th className="px-4 py-3 font-medium">Shift</th>
                        <th className="px-4 py-3 font-medium">Contact</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginated.map((r) => (
                        <tr key={r.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                            <td className="px-4 py-3 text-slate-500">{r.id}</td>
                            <td className="px-4 py-3">
                                <Link href={`/receptionists/${r.id}/edit`} className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
                      {initials(r.fullName)}
                    </span>
                                    <span className="flex flex-col">
                      <span className="font-medium text-slate-800">{r.fullName}</span>
                      <span className="text-xs text-slate-400">Joined {r.joinedYear}</span>
                    </span>
                                </Link>
                            </td>
                            <td className="px-4 py-3 text-slate-600">{r.department}</td>
                            <td className="px-4 py-3 text-slate-600">{r.assignedDesk}</td>
                            <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
                    {SHIFT_ICON[r.shift]} {r.shift}
                  </span>
                            </td>
                            <td className="px-4 py-3 text-slate-600">{r.contactNumber}</td>
                            <td className="px-4 py-3">
                                <StatusBadge status={r.status} />
                            </td>
                        </tr>
                    ))}
                    {paginated.length === 0 && (
                        <tr>
                            <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-400">
                                No receptionists match your filters.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing {paginated.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}-
            {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} receptionists
        </span>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-40"
                    >
                        <ChevronLeft size={14} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`h-7 w-7 rounded-md text-xs font-medium ${
                                p === page ? "bg-brand-600 text-white" : "text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-40"
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}