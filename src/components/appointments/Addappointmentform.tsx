"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Textfield from "./Textfiled";
import Selectfield from "./Selectfield";
import Segmentedchoice from "./Segmentchoice";
import Textarea from "./Textarea";
import Button from "./Button";
import { useAppointmentForm } from "./Useappointmentform";
import {
    PatientType,
    Gender,
    DEPARTMENTS,
    TIME_SLOTS,
    APPOINTMENT_TYPES,
    AppointmentType,
} from "./Appointments";

const PATIENT_TYPES: PatientType[] = ["New Patient", "Existing Patient"];
const GENDER_OPTIONS: Gender[] = ["Male", "Female", "Other"];

export default function Addappointmentform() {
    const router = useRouter();
    const { formData, update, availableDoctors, isFormValid } = useAppointmentForm();

    const handleSubmit = () => {
        // TODO: replace with a real submission, e.g.
        // await fetch("/api/appointments", { method: "POST", body: JSON.stringify(formData) })
        console.log("New appointment booked:", formData);
        router.push("/appointments");
    };

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
                    <span>Dashboard</span>
                    <ChevronRight size={12} />
                    <span>Appointments</span>
                    <ChevronRight size={12} />
                    <span className="text-slate-600">Book New</span>
                </nav>
                <h1 className="text-2xl font-bold text-slate-900">Book New Appointment</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Enter patient and scheduling details to create a new appointment.
                </p>
            </div>

            <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="border-l-2 border-blue-500 pl-2 text-sm font-semibold text-slate-800">
                    Patient Information
                </h3>

                <Segmentedchoice
                    label="Patient Type"
                    required
                    options={PATIENT_TYPES}
                    value={formData.patientType}
                    onChange={(value) => update({ patientType: value as PatientType })}
                />

                {formData.patientType === "Existing Patient" && (
                    <Textfield
                        label="Patient ID"
                        required
                        placeholder="e.g. PT-1042"
                        hint="Look up the patient's existing record ID."
                        value={formData.patientId}
                        onChange={(e) => update({ patientId: e.target.value })}
                    />
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Textfield
                        label="Full Name"
                        required
                        placeholder="e.g. Ramesh Chandra"
                        value={formData.patientName}
                        onChange={(e) => update({ patientName: e.target.value })}
                    />
                    <Textfield
                        label="Contact Number"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.contactNumber}
                        onChange={(e) => update({ contactNumber: e.target.value })}
                    />
                    <Textfield
                        label="Age"
                        required
                        type="number"
                        min={0}
                        placeholder="e.g. 34"
                        value={formData.age}
                        onChange={(e) => update({ age: e.target.value })}
                    />
                    <Selectfield
                        label="Gender"
                        required
                        options={GENDER_OPTIONS}
                        value={formData.gender}
                        onChange={(e) => update({ gender: e.target.value as Gender })}
                    />
                </div>
            </section>

            <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="border-l-2 border-blue-500 pl-2 text-sm font-semibold text-slate-800">
                    Appointment Scheduling
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Selectfield
                        label="Department"
                        required
                        options={DEPARTMENTS}
                        value={formData.department}
                        onChange={(e) => update({ department: e.target.value })}
                    />
                    <Selectfield
                        label="Doctor"
                        required
                        options={availableDoctors}
                        placeholder={formData.department ? "Select a doctor" : "Select a department first"}
                        disabled={!formData.department}
                        value={formData.doctorName}
                        onChange={(e) => update({ doctorName: e.target.value })}
                    />
                    <Textfield
                        label="Appointment Date"
                        required
                        type="date"
                        value={formData.appointmentDate}
                        onChange={(e) => update({ appointmentDate: e.target.value })}
                    />
                    <Selectfield
                        label="Time Slot"
                        required
                        options={TIME_SLOTS}
                        value={formData.appointmentTime}
                        onChange={(e) => update({ appointmentTime: e.target.value })}
                    />
                    <Selectfield
                        label="Appointment Type"
                        required
                        options={APPOINTMENT_TYPES}
                        className="sm:col-span-2"
                        value={formData.appointmentType}
                        onChange={(e) => update({ appointmentType: e.target.value as AppointmentType })}
                    />
                </div>

                <Textarea
                    label="Reason for Visit"
                    required
                    placeholder="Briefly describe the patient's symptoms or reason for the visit"
                    value={formData.reasonForVisit}
                    onChange={(e) => update({ reasonForVisit: e.target.value })}
                />
                <Textarea
                    label="Additional Notes"
                    placeholder="Optional — any other information for the doctor or front desk"
                    value={formData.notes}
                    onChange={(e) => update({ notes: e.target.value })}
                />
            </section>

            <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => router.push("/appointments")}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={!isFormValid()}>
                    Book Appointment
                </Button>
            </div>
        </div>
    );
}