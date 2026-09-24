"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { Accountant } from "./Accountant";
import { COLORS } from "@/constants/colors";

function initials(name: string) {
    return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export default function AccountantEditPicker({ accountants }: { accountants: Accountant[] }) {
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        if (!search.trim()) return accountants;
        return accountants.filter(
            (a) =>
                a.fullName.toLowerCase().includes(search.toLowerCase()) ||
                a.staffId.toLowerCase().includes(search.toLowerCase()) ||
                a.designation.toLowerCase().includes(search.toLowerCase())
        );
    }, [accountants, search]);

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                    <span>Dashboard</span>
                    <ChevronRight size={12} />
                    <span>Accountants</span>
                    <ChevronRight size={12} />
                    <span style={{ color: COLORS.navy }}>Edit</span>
                </nav>
                <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                    Edit Accountant
                </h1>
                <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                    Search for a staff member to update their details.
                </p>
            </div>

            <div className="relative">
                <Search
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: COLORS.gray }}
                />
                <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, ID, or designation..."
                    className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D81a]"
                    style={{ color: COLORS.navy }}
                />
            </div>

            <div className="flex flex-col divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
                {filtered.map((a) => (
                    <Link
                        key={a.id}
                        href={`/accountants/${a.id}/edit`}
                        className="flex items-center gap-3 px-4 py-3 transition hover:bg-slate-50"
                    >
                        <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                            style={{ backgroundColor: a.avatarColor }}
                        >
                            {initials(a.fullName)}
                        </span>
                        <span className="flex flex-1 flex-col">
                            <span className="text-sm font-medium" style={{ color: COLORS.navy }}>
                                {a.fullName}
                            </span>
                            <span className="text-xs" style={{ color: COLORS.gray }}>
                                {a.staffId} · {a.designation}
                            </span>
                        </span>
                        <ChevronRight size={16} style={{ color: COLORS.gray }} />
                    </Link>
                ))}
                {filtered.length === 0 && (
                    <p className="px-4 py-10 text-center text-sm" style={{ color: COLORS.gray }}>
                        No accountants match your search.
                    </p>
                )}
            </div>
        </div>
    );
}