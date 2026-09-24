"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import Ambulancestatusbadge from "./Ambulancestatusbadge";
import Button from "./Button";
import { Ambulance, AmbulanceStatus, AMBULANCE_STATUSES } from "./Ambulances";

const PAGE_SIZE = 5;

const STATUS_FILTERS: (AmbulanceStatus | "All Status")[] = ["All Status", ...AMBULANCE_STATUSES];

export default function Ambulancedirectorytable({ ambulances }: { ambulances: Ambulance[] }) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<AmbulanceStatus | "All Status">("All Status");
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        return ambulances.filter((a) => {
            const matchesSearch =
                search.trim() === "" ||
                a.vehicleNumber.toLowerCase().includes(search.toLowerCase()) ||
                a.driverName.toLowerCase().includes(search.toLowerCase()) ||
                a.baseStation.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === "All Status" || a.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [ambulances, search, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const availableCount = ambulances.filter((a) => a.status === "Available").length;

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
                        <span className="text-slate-600">Ambulances</span>
                    </nav>
                    <h1 className="text-2xl font-bold text-slate-900">Ambulance Fleet</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Track vehicle status, drivers, and dispatches across the fleet.
                    </p>
                </div>
                <div className="flex items-center gap-3">
          <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
            {availableCount} available
          </span>
                    <Link href="/ambulance/add">
                        <Button>
                            <Plus size={16} /> Register Ambulance
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                <div className="relative min-w-[220px] flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Search by vehicle number, driver, or base station..."
                        className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value as AmbulanceStatus | "All Status");
                        setPage(1);
                    }}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 outline-none focus:border-blue-500"
                >
                    {STATUS_FILTERS.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
                <button onClick={resetFilters} className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    Reset
                </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                    <thead>
                    <tr className="border-b border-slate-100 text-xs text-slate-400">
                        <th className="px-4 py-3 font-medium">Vehicle Number</th>
                        <th className="px-4 py-3 font-medium">Type</th>
                        <th className="px-4 py-3 font-medium">Driver</th>
                        <th className="px-4 py-3 font-medium">Base Station</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginated.map((a) => (
                        <tr key={a.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                            <td className="px-4 py-3">
                                <Link href={`/ambulance/${a.id}/edit`} className="font-medium text-slate-800">
                                    {a.vehicleNumber}
                                </Link>
                            </td>
                            <td className="px-4 py-3 text-slate-600">{a.ambulanceType}</td>
                            <td className="px-4 py-3">
                  <span className="flex flex-col">
                    <span className="text-slate-700">{a.driverName}</span>
                    <span className="text-xs text-slate-400">{a.driverContact}</span>
                  </span>
                            </td>
                            <td className="px-4 py-3 text-slate-600">{a.baseStation}</td>
                            <td className="px-4 py-3">
                                <Ambulancestatusbadge status={a.status} />
                            </td>
                        </tr>
                    ))}
                    {paginated.length === 0 && (
                        <tr>
                            <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-400">
                                No ambulances match your filters.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing {paginated.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}-
            {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} ambulances
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
                                p === page ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
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