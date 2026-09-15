"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Plus, SlidersHorizontal, Download, ChevronLeft, ChevronRight } from "lucide-react";
import PharmacyStaffStatusBadge from "./Pharmacystaffstatusbadge";
import PharmacyShiftBadge from "./Pharmacyshiftbadge";
import PharmacyStatCards from "./Pharmacystatcards";
import Button from "@/components/receptionist/Button";
import { PharmacyStaff, PharmacyStaffStatus, PHARMACY_STATUS_FILTERS, PharmacyStatData } from "./Pharmacystaff";
import { COLORS } from "@/constants/colors";

const PAGE_SIZE = 5;

function initials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

export default function PharmacyStaffTable({
                                               staff,
                                               stats,
                                           }: {
    staff: PharmacyStaff[];
    stats: PharmacyStatData[];
}) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<PharmacyStaffStatus | "All Status">("All Status");
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        return staff.filter((s) => {
            const matchesSearch =
                search.trim() === "" ||
                s.name.toLowerCase().includes(search.toLowerCase()) ||
                s.employeeId.toLowerCase().includes(search.toLowerCase()) ||
                s.assignedUnit.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === "All Status" || s.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [staff, search, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between">
                <div>
                    <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                        <span>Home</span>
                        <span>/</span>
                        <span>Pharmacy</span>
                        <span>/</span>
                        <span style={{ color: COLORS.navy }}>Staff Management</span>
                    </nav>
                    <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                        Pharmacy Staff Management
                    </h1>
                    <p className="mt-1 max-w-xl text-sm" style={{ color: COLORS.gray }}>
                        Manage pharmacy staff, assign pharmacy units, control medicine access, and monitor
                        responsibilities.
                    </p>
                </div>
                <Link href="/pharmacy/staff/add">
                    <Button>
                        <Plus size={16} /> Add Pharmacy Staff
                    </Button>
                </Link>
            </div>

            <PharmacyStatCards stats={stats} />

            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                <div className="relative min-w-[240px] flex-1">
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
                        placeholder="Search by name, ID, or unit..."
                        className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D81a]"
                        style={{ color: COLORS.navy }}
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value as PharmacyStaffStatus | "All Status");
                        setPage(1);
                    }}
                    className="hidden rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#1565D8] sm:block"
                    style={{ color: COLORS.navy }}
                >
                    {PHARMACY_STATUS_FILTERS.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium"
                    style={{ color: COLORS.navy }}
                >
                    <SlidersHorizontal size={14} /> Filters
                </button>
                <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium"
                    style={{ color: COLORS.navy }}
                >
                    <Download size={14} /> Export
                </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                    <thead>
                    <tr className="border-b border-slate-100 text-xs uppercase" style={{ color: COLORS.gray }}>
                        <th className="px-4 py-3 font-medium">Staff Name</th>
                        <th className="px-4 py-3 font-medium">Employee ID</th>
                        <th className="px-4 py-3 font-medium">Role</th>
                        <th className="px-4 py-3 font-medium">Assigned Unit</th>
                        <th className="px-4 py-3 font-medium">Shift</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginated.map((s) => (
                        <tr key={s.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                            <td className="px-4 py-3">
                                <Link href={`/pharmacy/staff/${s.id}/edit`} className="flex items-center gap-2.5">
                                        <span
                                            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white"
                                            style={{ backgroundColor: s.avatarColor }}
                                        >
                                            {initials(s.name)}
                                        </span>
                                    <span className="flex flex-col">
                                            <span className="font-medium" style={{ color: COLORS.navy }}>
                                                {s.name}
                                            </span>
                                            <span className="text-xs" style={{ color: COLORS.gray }}>
                                                {s.email}
                                            </span>
                                        </span>
                                </Link>
                            </td>
                            <td className="px-4 py-3" style={{ color: COLORS.gray }}>
                                {s.employeeId}
                            </td>
                            <td className="px-4 py-3" style={{ color: COLORS.navy }}>
                                {s.role}
                            </td>
                            <td className="px-4 py-3" style={{ color: COLORS.navy }}>
                                {s.assignedUnit}
                            </td>
                            <td className="px-4 py-3">
                                <PharmacyShiftBadge shift={s.shift} />
                            </td>
                            <td className="px-4 py-3">
                                <PharmacyStaffStatusBadge status={s.status} />
                            </td>
                        </tr>
                    ))}
                    {paginated.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-4 py-10 text-center text-sm" style={{ color: COLORS.gray }}>
                                No staff match your filters.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between text-xs" style={{ color: COLORS.gray }}>
                <span>
                    Showing {paginated.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} to{" "}
                    {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} results
                </span>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="rounded-md border border-slate-200 p-1.5 hover:bg-slate-100 disabled:opacity-40"
                        style={{ color: COLORS.gray }}
                    >
                        <ChevronLeft size={14} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className="h-7 w-7 rounded-md border border-slate-200 text-xs font-medium"
                            style={
                                p === page
                                    ? { backgroundColor: COLORS.blue, color: "#FFFFFF", borderColor: COLORS.blue }
                                    : { color: COLORS.gray }
                            }
                        >
                            {p}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="rounded-md border border-slate-200 p-1.5 hover:bg-slate-100 disabled:opacity-40"
                        style={{ color: COLORS.gray }}
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}