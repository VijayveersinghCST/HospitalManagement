"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import Appointmentstatusbadge from "./Appointmentstatusbadge";
import { Appointment } from "./Appointments";

export default function Appointmentpicker({ appointments }: { appointments: Appointment[] }) {
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        if (search.trim() === "") return appointments;
        const query = search.toLowerCase();
        return appointments.filter(
            (a) =>
                a.patientName.toLowerCase().includes(query) ||
                a.appointmentId.toLowerCase().includes(query) ||
                a.contactNumber.toLowerCase().includes(query) ||
                (a.patientId ?? "").toLowerCase().includes(query)
        );
    }, [appointments, search]);

    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
                    <span>Dashboard</span>
                    <ChevronRight size={12} />
                    <span>Appointments</span>
                    <ChevronRight size={12} />
                    <span className="text-slate-600">Edit</span>
                </nav>
                <h1 className="text-2xl font-bold text-slate-900">Edit Appointment</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Search for a patient or appointment ID to open it for editing.
                </p>
            </div>

            <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by patient name, appointment ID, or contact number..."
                    className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
            </div>

            <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2">
                {filtered.length === 0 && (
                    <p className="px-3 py-8 text-center text-sm text-slate-400">
                        No appointments match &quot;{search}&quot;.
                    </p>
                )}
                {filtered.map((a) => (
                    <Link
                        key={a.id}
                        href={`/appointments/${a.id}/edit`}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 transition hover:bg-slate-50"
                    >
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-800">{a.patientName}</span>
                            <span className="text-xs text-slate-400">
                {a.appointmentId} · {a.department} · {a.appointmentDate} at {a.appointmentTime}
              </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Appointmentstatusbadge status={a.status} />
                            <ChevronRight size={16} className="text-slate-300" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}