"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Textfield from "./Textfield";
import Selectfield from "./Selectfield";
import Checkboxgrid from "./Checkboxgrid";
import Button from "./Button";
import { useAmbulanceForm } from "./Useambulanceform";
import { AmbulanceType, AMBULANCE_TYPES, BASE_STATIONS, EQUIPMENT_OPTIONS } from "./Ambulances";

export default function Addambulanceform() {
    const router = useRouter();
    const { formData, update, isFormValid } = useAmbulanceForm();

    const handleSubmit = () => {
        // TODO: replace with a real submission, e.g.
        // await fetch("/api/ambulances", { method: "POST", body: JSON.stringify(formData) })
        console.log("New ambulance registered:", formData);
        router.push("/ambulance");
    };

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
                    <span>Dashboard</span>
                    <ChevronRight size={12} />
                    <span>Ambulances</span>
                    <ChevronRight size={12} />
                    <span className="text-slate-600">Register New</span>
                </nav>
                <h1 className="text-2xl font-bold text-slate-900">Register New Ambulance</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Add a vehicle to the fleet along with its driver and onboard equipment.
                </p>
            </div>

            <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="border-l-2 border-blue-500 pl-2 text-sm font-semibold text-slate-800">
                    Vehicle Details
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Textfield
                        label="Vehicle Number"
                        required
                        placeholder="e.g. UP32 AB 1234"
                        value={formData.vehicleNumber}
                        onChange={(e) => update({ vehicleNumber: e.target.value })}
                    />
                    <Selectfield
                        label="Ambulance Type"
                        required
                        options={AMBULANCE_TYPES}
                        value={formData.ambulanceType}
                        onChange={(e) => update({ ambulanceType: e.target.value as AmbulanceType })}
                    />
                    <Selectfield
                        label="Base Station"
                        required
                        hint="Where this vehicle is stationed when not on duty."
                        options={BASE_STATIONS}
                        value={formData.baseStation}
                        onChange={(e) => update({ baseStation: e.target.value })}
                    />
                    <Textfield
                        label="Last Serviced Date"
                        type="date"
                        value={formData.lastServicedDate}
                        onChange={(e) => update({ lastServicedDate: e.target.value })}
                    />
                </div>
            </section>

            <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="border-l-2 border-blue-500 pl-2 text-sm font-semibold text-slate-800">
                    Driver Details
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Textfield
                        label="Driver Name"
                        required
                        placeholder="e.g. Ramesh Yadav"
                        value={formData.driverName}
                        onChange={(e) => update({ driverName: e.target.value })}
                    />
                    <Textfield
                        label="Contact Number"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.driverContact}
                        onChange={(e) => update({ driverContact: e.target.value })}
                    />
                    <Textfield
                        label="Driving License Number"
                        required
                        placeholder="e.g. UP32 20210004521"
                        className="sm:col-span-2"
                        value={formData.driverLicenseNumber}
                        onChange={(e) => update({ driverLicenseNumber: e.target.value })}
                    />
                </div>
            </section>

            <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="border-l-2 border-blue-500 pl-2 text-sm font-semibold text-slate-800">
                    Onboard Equipment
                </h3>
                <Checkboxgrid
                    label="Select equipment carried on this vehicle"
                    options={EQUIPMENT_OPTIONS}
                    selectedIds={formData.equipment}
                    onChange={(equipment) => update({ equipment })}
                />
            </section>

            <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => router.push("/ambulance")}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={!isFormValid()}>
                    Register Ambulance
                </Button>
            </div>
        </div>
    );
}