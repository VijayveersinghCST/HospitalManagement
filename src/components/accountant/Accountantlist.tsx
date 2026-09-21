"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Plus, SlidersHorizontal, Download, MoreVertical } from "lucide-react";
import Button from "@/components/receptionist/Button";
import AccountantStatusBadge from "./Accountantstatusbadge";
import AccountantStatCards from "./Accountantstatcards";
import { Accountant, AccountantStatData } from "./Accountant";
import { COLORS } from "@/constants/colors";

const PAGE_SIZE = 5;

function initials(name: string) {
    return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export default function AccountantList({
                                           accountants,
                                           stats,
                                       }: {
    accountants: Accountant[];
    stats: AccountantStatData[];
}) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        return accountants.filter(
            (a) =>
                search.trim() === "" ||
                a.fullName.toLowerCase().includes(search.toLowerCase()) ||
                a.staffId.toLowerCase().includes(search.toLowerCase()) ||
                a.email.toLowerCase().includes(search.toLowerCase())
        );
    }, [accountants, search]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between">
                <div>
                    <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                        <span>Home</span>
                        <span>/</span>
                        <span>Staff Management</span>
                        <span>/</span>
                        <span style={{ color: COLORS.navy }}>Accountants</span>
                    </nav>
                    <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                        Accountant / Finance Staff Management
                    </h1>
                    <p className="mt-1 max-w-xl text-sm" style={{ color: COLORS.gray }}>
                        Manage hospital's financial staff, control billing access, and monitor financial operations.
                    </p>
                </div>
                <Link href="/accountants/add">
                    <Button>
                        <Plus size={16} /> Add Accountant
                    </Button>
                </Link>
            </div>

            <AccountantStatCards stats={stats} />

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
                        placeholder="Search by name, ID or email..."
                        className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D81a]"
                        style={{ color: COLORS.navy }}
                    />
                </div>
                <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium"
                    style={{ color: COLORS.navy }}
                >
                    <SlidersHorizontal size={14} /> Filter
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
                        <th className="w-10 px-4 py-3">
                            <input type="checkbox" className="h-4 w-4 rounded border-slate-300" style={{ accentColor: COLORS.blue }} />
                        </th>
                        <th className="px-4 py-3 font-medium">Staff Name</th>
                        <th className="px-4 py-3 font-medium">Staff ID</th>
                        <th className="px-4 py-3 font-medium">Contact Info</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Last Login</th>
                        <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginated.map((a) => (
                        <tr key={a.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                            <td className="px-4 py-3">
                                <input type="checkbox" className="h-4 w-4 rounded border-slate-300" style={{ accentColor: COLORS.blue }} />
                            </td>
                            <td className="px-4 py-3">
                                <Link href={`/accountants/${a.id}/edit`} className="flex items-center gap-2.5">
                                        <span
                                            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white"
                                            style={{ backgroundColor: a.avatarColor }}
                                        >
                                            {initials(a.fullName)}
                                        </span>
                                    <span className="flex flex-col">
                                            <span className="font-medium" style={{ color: COLORS.navy }}>
                                                {a.fullName}
                                            </span>
                                            <span className="text-xs" style={{ color: COLORS.gray }}>
                                                {a.designation}
                                            </span>
                                        </span>
                                </Link>
                            </td>
                            <td className="px-4 py-3" style={{ color: COLORS.gray }}>
                                {a.staffId}
                            </td>
                            <td className="px-4 py-3">
                                    <span className="flex flex-col">
                                        <span style={{ color: COLORS.blue }}>{a.email}</span>
                                        <span className="text-xs" style={{ color: COLORS.gray }}>
                                            {a.contactNumber}
                                        </span>
                                    </span>
                            </td>
                            <td className="px-4 py-3">
                                <AccountantStatusBadge status={a.status} />
                            </td>
                            <td className="px-4 py-3" style={{ color: a.status === "Active" ? COLORS.green : COLORS.gray }}>
                                {a.lastLoginLabel}
                            </td>
                            <td className="px-4 py-3">
                                <button style={{ color: COLORS.gray }}>
                                    <MoreVertical size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {paginated.length === 0 && (
                        <tr>
                            <td colSpan={7} className="px-4 py-10 text-center text-sm" style={{ color: COLORS.gray }}>
                                No accountants match your search.
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
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="rounded-md border border-slate-200 px-3 py-1.5 font-medium disabled:opacity-40"
                        style={{ color: COLORS.navy }}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="rounded-md border border-slate-200 px-3 py-1.5 font-medium disabled:opacity-40"
                        style={{ color: COLORS.navy }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}