"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, AlertTriangle } from "lucide-react";
import Textfield from "./Textfield";
import Selectfield from "./Selectfield";
import Checkboxgrid from "./Checkboxgrid";
import Button from "./Button";
import Ambulancestatusbadge from "./Ambulancestatusbadge";
import {
    Ambulance,
    AmbulanceStatus,
    AmbulanceType,
    AMBULANCE_TYPES,
    AMBULANCE_STATUSES,
    BASE_STATIONS,
    EQUIPMENT_OPTIONS,
} from "./Ambulances";

export default function Editambulanceform({ ambulance }: { ambulance: Ambulance }) {
    const router = useRouter();
    const [form, setForm] = useState(ambulance);

    const update = (patch: Partial<Ambulance>) => setForm((prev) => ({ ...prev, ...patch }));

    const handleDispatch = () => {
        update({
            status: "On Duty",
            dispatchedAt: new Date().toISOString().slice(0, 10),
        });
    };

    const handleReturnToBase = () => {
        update({
            status: "Available",
            currentPatientName: undefined,
            currentDestination: undefined,
            dispatchedAt: undefined,
        });
    };

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
                    <span>Dashboard</span>
                    <ChevronRight size={12} />
                    <span>Ambulances</span>
                    <ChevronRight size={12} />
                    <span className="text-slate-600">Manage</span>
                </nav>
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-slate-900">Manage Ambulance</h1>
                    <Ambulancestatusbadge status={form.status} />
                </div>
                <p className="mt-1 text-sm text-slate-500">Vehicle: {form.vehicleNumber}</p>
            </div>

            <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-semibold text-slate-800">Vehicle Details</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Textfield
                        label="Vehicle Number"
                        value={form.vehicleNumber}
                        onChange={(e) => update({ vehicleNumber: e.target.value })}
                    />
                    <Selectfield
                        label="Ambulance Type"
                        options={AMBULANCE_TYPES}
                        value={form.ambulanceType}
                        onChange={(e) => update({ ambulanceType: e.target.value as AmbulanceType })}
                    />
                    <Selectfield
                        label="Base Station"
                        options={BASE_STATIONS}
                        value={form.baseStation}
                        onChange={(e) => update({ baseStation: e.target.value })}
                    />
                    <Textfield
                        label="Last Serviced Date"
                        type="date"
                        value={form.lastServicedDate}
                        onChange={(e) => update({ lastServicedDate: e.target.value })}
                    />
                </div>
            </section>

            <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-semibold text-slate-800">Driver Details</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Textfield
                        label="Driver Name"
                        value={form.driverName}
                        onChange={(e) => update({ driverName: e.target.value })}
                    />
                    <Textfield
                        label="Contact Number"
                        value={form.driverContact}
                        onChange={(e) => update({ driverContact: e.target.value })}
                    />
                    <Textfield
                        label="Driving License Number"
                        className="sm:col-span-2"
                        value={form.driverLicenseNumber}
                        onChange={(e) => update({ driverLicenseNumber: e.target.value })}
                    />
                </div>
            </section>

            <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-semibold text-slate-800">Onboard Equipment</h3>
                <Checkboxgrid
                    label="Select equipment carried on this vehicle"
                    options={EQUIPMENT_OPTIONS}
                    selectedIds={form.equipment}
                    onChange={(equipment) => update({ equipment })}
                />
            </section>

            <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-semibold text-slate-800">Status &amp; Dispatch</h3>
                <Selectfield
                    label="Vehicle Status"
                    options={AMBULANCE_STATUSES}
                    value={form.status}
                    onChange={(e) => update({ status: e.target.value as AmbulanceStatus })}
                />

                {form.status === "On Duty" && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Textfield
                            label="Patient Name"
                            value={form.currentPatientName ?? ""}
                            onChange={(e) => update({ currentPatientName: e.target.value })}
                        />
                        <Textfield
                            label="Destination"
                            value={form.currentDestination ?? ""}
                            onChange={(e) => update({ currentDestination: e.target.value })}
                        />
                    </div>
                )}

                {form.status === "Under Maintenance" && (
                    <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
                        <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-500" />
                        <p className="text-xs text-amber-700">
                            This vehicle will not appear as dispatchable until its status is changed back to Available.
                        </p>
                    </div>
                )}

                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        onClick={handleDispatch}
                        disabled={form.status !== "Available"}
                    >
                        Dispatch
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleReturnToBase}
                        disabled={form.status !== "On Duty"}
                    >
                        Return to Base
                    </Button>
                </div>
            </section>

            <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => router.push("/ambulance")}>
                    Back
                </Button>
                <Button
                    onClick={() => {
                        // TODO: replace with a real update call, e.g.
                        // await fetch(`/api/ambulances/${form.id}`, { method: "PATCH", body: JSON.stringify(form) })
                        console.log("Ambulance updated:", form);
                        router.push("/ambulance");
                    }}
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
}