"use client";

import { useMemo, useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import CategoryGroup from "./Categorygroup";
import { StaffShiftEntry, ShiftLabel, STAFF_CATEGORIES, CATEGORY_FILTERS, StaffCategory } from "./shiftconfig";
import { COLORS } from "@/constants/colors";

export default function ShiftConfigPage({ staff }: { staff: StaffShiftEntry[] }) {
    const [entries, setEntries] = useState(staff);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<StaffCategory | "All Categories">("All Categories");

    const filtered = useMemo(() => {
        return entries.filter((e) => {
            const matchesSearch =
                search.trim() === "" ||
                e.name.toLowerCase().includes(search.toLowerCase()) ||
                e.department.toLowerCase().includes(search.toLowerCase()) ||
                e.staffId.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = categoryFilter === "All Categories" || e.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [entries, search, categoryFilter]);

    const groupedByCategory = useMemo(() => {
        const groups: Record<string, StaffShiftEntry[]> = {};
        for (const category of STAFF_CATEGORIES) {
            const items = filtered.filter((e) => e.category === category);
            if (items.length > 0) groups[category] = items;
        }
        return groups;
    }, [filtered]);

    const handleUpdateShift = (id: string, shift: ShiftLabel, start: string, end: string, days: string[]) => {
        setEntries((prev) =>
            prev.map((e) =>
                e.id === id ? { ...e, currentShift: shift, shiftStartTime: start, shiftEndTime: end, workingDays: days } : e
            )
        );
        // TODO: replace with a real submission, e.g.
        // await fetch(`/api/staff/${id}/shift`, { method: "PATCH", body: JSON.stringify({ shift, start, end, days }) })
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                    <span>Dashboard</span>
                    <ChevronRight size={12} />
                    <span style={{ color: COLORS.navy }}>Shift Timing Configuration</span>
                </nav>
                <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                    Shift Timing Configuration
                </h1>
                <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                    Configure and manage shift timings for all hospital staff, grouped by role.
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                <div className="relative min-w-[240px] flex-1">
                    <Search
                        size={16}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: COLORS.gray }}
                    />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, ID, or department..."
                        className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D81a]"
                        style={{ color: COLORS.navy }}
                    />
                </div>
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value as StaffCategory | "All Categories")}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#1565D8]"
                    style={{ color: COLORS.navy }}
                >
                    {CATEGORY_FILTERS.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-4">
                {Object.entries(groupedByCategory).map(([category, items]) => (
                    <CategoryGroup key={category} category={category} entries={items} onUpdateShift={handleUpdateShift} />
                ))}
                {Object.keys(groupedByCategory).length === 0 && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm" style={{ color: COLORS.gray }}>
                        No staff match your filters.
                    </div>
                )}
            </div>
        </div>
    );
}