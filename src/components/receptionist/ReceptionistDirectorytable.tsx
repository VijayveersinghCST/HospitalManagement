// Receptionistdirectorytable.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import StatusBadge from "./Statusbadge";
import Button from "./Button";
import { Receptionist, ReceptionistStatus } from "./Receptionist";
import { COLORS } from "@/constants/colors";

const PAGE_SIZE = 5;

const STATUS_FILTERS: (ReceptionistStatus | "All Status")[] = [
    "All Status",
    "Active",
    "Offline",
    "On Leave",
];

function initials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

export default function ReceptionistDirectoryTable({
                                                       receptionists,
                                                   }: {
    receptionists: Receptionist[];
}) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<ReceptionistStatus | "All Status">("All Status");
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        return receptionists.filter((r) => {
            const matchesSearch =
                search.trim() === "" ||
                r.name.toLowerCase().includes(search.toLowerCase()) ||
                r.employeeId.toLowerCase().includes(search.toLowerCase()) ||
                r.role.toLowerCase().includes(search.toLowerCase());
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
                    <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                        <span>Dashboard</span>
                        <ChevronRight size={12} />
                        <span>Staff</span>
                        <ChevronRight size={12} />
                        <span style={{ color: COLORS.navy }}>Receptionists</span>
                    </nav>
                    <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                        Receptionist List
                    </h1>
                    <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                        Manage all registered receptionists, shift timings, and assignments.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span
                        className="rounded-lg px-3 py-2 text-xs font-medium"
                        style={{ backgroundColor: `${COLORS.green}1a`, color: COLORS.green }}
                    >
                        Total: {activeCount} active
                    </span>
                    <Link href="/receptionist/add">
                        <Button>
                            <Plus size={16} /> Add New Receptionist
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                <div className="relative min-w-[220px] flex-1">
                    <Search
                        size={16}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: COLORS.gray }}
                    />
                    <input
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Search by name, ID or role..."
                        className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D81a]"
                        style={{ color: COLORS.navy }}
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value as ReceptionistStatus | "All Status");
                        setPage(1);
                    }}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#1565D8]"
                    style={{ color: COLORS.navy }}
                >
                    {STATUS_FILTERS.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
                <button
                    onClick={resetFilters}
                    className="text-sm font-medium hover:opacity-80"
                    style={{ color: COLORS.blue }}
                >
                    Reset
                </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                    <thead>
                    <tr className="border-b border-slate-100 text-xs" style={{ color: COLORS.gray }}>
                        <th className="px-4 py-3 font-medium">Employee ID</th>
                        <th className="px-4 py-3 font-medium">Receptionist</th>
                        <th className="px-4 py-3 font-medium">Allocated Desk</th>
                        <th className="px-4 py-3 font-medium">Shift Timing</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginated.map((r) => (
                        <tr key={r.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                            <td className="px-4 py-3" style={{ color: COLORS.gray }}>
                                {r.employeeId}
                            </td>
                            <td className="px-4 py-3">
                                <Link href={`/receptionist/${r.id}/edit`} className="flex items-center gap-2.5">
                                    <span
                                        className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white"
                                        style={{ backgroundColor: r.avatarColor }}
                                    >
                                        {initials(r.name)}
                                    </span>
                                    <span className="flex flex-col">
                                        <span className="font-medium" style={{ color: COLORS.navy }}>
                                            {r.name}
                                        </span>
                                        <span className="text-xs" style={{ color: COLORS.gray }}>
                                            {r.role}
                                        </span>
                                    </span>
                                </Link>
                            </td>
                            <td className="px-4 py-3" style={{ color: COLORS.navy }}>
                                {r.allocatedDesk}
                            </td>
                            <td className="px-4 py-3" style={{ color: COLORS.navy }}>
                                {r.shiftTiming}
                            </td>
                            <td className="px-4 py-3">
                                <StatusBadge status={r.status} />
                            </td>
                        </tr>
                    ))}
                    {paginated.length === 0 && (
                        <tr>
                            <td colSpan={5} className="px-4 py-10 text-center text-sm" style={{ color: COLORS.gray }}>
                                No receptionists match your filters.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between text-xs" style={{ color: COLORS.gray }}>
                <span>
                    Showing {paginated.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}-
                    {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} receptionists
                </span>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="rounded-md p-1.5 hover:bg-slate-100 disabled:opacity-40"
                        style={{ color: COLORS.gray }}
                    >
                        <ChevronLeft size={14} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className="h-7 w-7 rounded-md text-xs font-medium"
                            style={
                                p === page
                                    ? { backgroundColor: COLORS.navy, color: "#FFFFFF" }
                                    : { color: COLORS.gray }
                            }
                        >
                            {p}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="rounded-md p-1.5 hover:bg-slate-100 disabled:opacity-40"
                        style={{ color: COLORS.gray }}
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}