"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Layers, Users, Save } from "lucide-react";
import TextField from "@/components/receptionist/Textfield";
import SelectField from "@/components/receptionist/Selectfield";
import Button from "@/components/receptionist/Button";
import { COLORS } from "@/constants/colors";

const DOCTOR_OPTIONS = ["Dr. Anjali Sharma", "Dr. Rajesh Kumar", "Dr. Vikram Singh", "Dr. Sneha Gupta"];

export default function AddDepartmentForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [hod, setHod] = useState("");
    const [proceedToAssign, setProceedToAssign] = useState(true);

    const handleSave = () => {
        // TODO: replace with a real submission, e.g.
        // await fetch("/api/departments", { method: "POST", body: JSON.stringify({ name, code, specialization, hod }) })
        console.log("New department:", { name, code, specialization, hod });
        router.push(proceedToAssign ? "/hospital-config/departments" : "/hospital-config");
    };

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                    <span>Dashboard</span>
                    <ChevronRight size={12} />
                    <span>Department Management</span>
                    <ChevronRight size={12} />
                    <span style={{ color: COLORS.navy }}>Add New Department</span>
                </nav>
                <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                    Add New Department
                </h1>
                <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                    Create a new department and assign initial leadership.
                </p>
            </div>

            <section className="rounded-card border border-slate-200 bg-white p-6">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
                    <Layers size={16} style={{ color: COLORS.blue }} />
                    Department Information
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextField
                        label="Department Name"
                        required
                        placeholder="e.g. Cardiology, Neurology"
                        hint="Must be unique across the hospital system."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Department Code"
                        placeholder="e.g. CARD-01"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <TextField
                        label="Specialization"
                        placeholder="e.g. Heart Surgery, Cardiovascular Health"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                    />
                    <SelectField
                        label="Head of Department (HOD)"
                        placeholder="Select a Doctor..."
                        hint="Select a valid doctor ID to assign leadership."
                        options={DOCTOR_OPTIONS}
                        value={hod}
                        onChange={(e) => setHod(e.target.value)}
                    />
                </div>
            </section>

            <section className="rounded-card border border-slate-200 bg-white p-6">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
                    <Users size={16} style={{ color: "#7C3AED" }} />
                    Staff Assignment
                </h3>
                <div
                    className="mb-4 rounded-lg border px-4 py-3 text-sm"
                    style={{ backgroundColor: "#F5F3FF", borderColor: "#DDD6FE", color: "#6D28D9" }}
                >
                    Staff assignment becomes available after creation. You can assign Doctors, Nurses, and Support
                    Staff to this department once it has been saved to the system.
                </div>
                <label className="flex items-center gap-2 text-sm" style={{ color: COLORS.navy }}>
                    <input
                        type="checkbox"
                        checked={proceedToAssign}
                        onChange={(e) => setProceedToAssign(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300"
                        style={{ accentColor: COLORS.blue }}
                    />
                    Proceed to Assign Staff page immediately after saving
                </label>
            </section>

            <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button onClick={handleSave} disabled={!name}>
                    <Save size={16} /> Save Department
                </Button>
            </div>
        </div>
    );
}