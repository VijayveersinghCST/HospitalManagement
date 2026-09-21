"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, AlertTriangle } from "lucide-react";
import Textfield from "./Textfiled";
import Selectfield from "./Selectfield";
import Textarea from "./Textarea";
import Button from "./Button";
import Appointmentstatusbadge from "./Appointmentstatusbadge";
import {
    Appointment,
    AppointmentStatus,
    DEPARTMENTS,
    TIME_SLOTS,
    DOCTORS_BY_DEPARTMENT,
    APPOINTMENT_STATUSES,
} from "./Appointments";

export default function Editappointmentform({ appointment }: { appointment: Appointment }) {
    const router = useRouter();
    const [form, setForm] = useState(appointment);

    const update = (patch: Partial<Appointment>) => setForm((prev) => ({ ...prev, ...patch }));
    const availableDoctors = form.department ? DOCTORS_BY_DEPARTMENT[form.department] ?? [] : [];

    const handleCancelAppointment = () => update({ status: "Cancelled" });

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
                    <span>Dashboard</span>
                    <ChevronRight size={12} />
                    <span>Appointments</span>
                    <ChevronRight size={12} />
                    <span className="text-slate-600">Manage</span>
                </nav>
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-slate-900">Manage Appointment</h1>
                    <Appointmentstatusbadge status={form.status} />
                </div>
                <p className="mt-1 text-sm text-slate-500">
                    Appointment ID: {form.appointmentId} — reschedule, update, or cancel this booking.
                </p>
            </div>

            <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-semibold text-slate-800">Patient Information</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Textfield
                        label="Full Name"
                        value={form.patientName}
                        onChange={(e) => update({ patientName: e.target.value })}
                    />
                    <Textfield label="Patient Type" value={form.patientType} readOnly disabled hint="Read Only" />
                    <Textfield
                        label="Contact Number"
                        value={form.contactNumber}
                        onChange={(e) => update({ contactNumber: e.target.value })}
                    />
                    <Textfield label="Age" value={form.age} onChange={(e) => update({ age: e.target.value })} />
                </div>
            </section>

            <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-semibold text-slate-800">Scheduling</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Selectfield
                        label="Department"
                        options={DEPARTMENTS}
                        value={form.department}
                        onChange={(e) => update({ department: e.target.value, doctorName: "" })}
                    />
                    <Selectfield
                        label="Doctor"
                        options={availableDoctors}
                        value={form.doctorName}
                        onChange={(e) => update({ doctorName: e.target.value })}
                    />
                    <Textfield
                        label="Appointment Date"
                        type="date"
                        value={form.appointmentDate}
                        onChange={(e) => update({ appointmentDate: e.target.value })}
                    />
                    <Selectfield
                        label="Time Slot"
                        options={TIME_SLOTS}
                        value={form.appointmentTime}
                        onChange={(e) => update({ appointmentTime: e.target.value })}
                    />
                </div>
                <Textarea
                    label="Reason for Visit"
                    value={form.reasonForVisit}
                    onChange={(e) => update({ reasonForVisit: e.target.value })}
                />
                <Textarea
                    label="Additional Notes"
                    value={form.notes ?? ""}
                    onChange={(e) => update({ notes: e.target.value })}
                />
            </section>

            <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-semibold text-slate-800">Status</h3>
                <Selectfield
                    label="Appointment Status"
                    options={APPOINTMENT_STATUSES}
                    value={form.status}
                    onChange={(e) => update({ status: e.target.value as AppointmentStatus })}
                />
                {form.status !== "Cancelled" && (
                    <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
                        <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-500" />
                        <p className="text-xs text-amber-700">
                            Cancelling notifies the patient and frees this time slot for other bookings.
                        </p>
                    </div>
                )}
                <div>
                    <Button variant="danger" onClick={handleCancelAppointment} disabled={form.status === "Cancelled"}>
                        Cancel Appointment
                    </Button>
                </div>
            </section>

            <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => router.push("/appointments")}>
                    Back
                </Button>
                <Button
                    onClick={() => {
                        // TODO: replace with a real update call, e.g.
                        // await fetch(`/api/appointments/${form.id}`, { method: "PATCH", body: JSON.stringify(form) })
                        console.log("Appointment updated:", form);
                        router.push("/appointments");
                    }}
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
}