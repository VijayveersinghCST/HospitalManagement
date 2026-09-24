"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Layers, Save } from "lucide-react";
import TextField from "@/components/receptionist/Textfield";
import SelectField from "@/components/receptionist/Selectfield";
import Button from "@/components/receptionist/Button";
import { COLORS } from "@/constants/colors";
import { WARD_CATEGORIES } from "./WardRoomsAndBeds";

export default function AddWardForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");

    const handleSave = () => {
        // TODO: replace with a real submission, e.g.
        // await fetch("/api/wards", { method: "POST", body: JSON.stringify({ name, location, category }) })
        console.log("New ward:", { name, location, category });
        router.push("/wardRomsAndBeds/ward-management");
    };

    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                    <span>Dashboard</span>
                    <ChevronRight size={12} />
                    <span>Ward Management</span>
                    <ChevronRight size={12} />
                    <span style={{ color: COLORS.navy }}>Add New Ward</span>
                </nav>
                <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                    Add New Ward
                </h1>
                <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                    Create a new ward. Rooms and beds can be added to it afterwards.
                </p>
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
                    <Layers size={16} style={{ color: COLORS.blue }} />
                    Ward Information
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextField
                        label="Ward Name"
                        required
                        placeholder="e.g. General Ward, ICU"
                        hint="Must be unique across the hospital system."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Location"
                        required
                        placeholder="e.g. Block A, 2nd Floor"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <SelectField
                        label="Ward Category"
                        placeholder="Select a category..."
                        options={WARD_CATEGORIES}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
            </section>

            <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button onClick={handleSave} disabled={!name || !location}>
                    <Save size={16} /> Save Ward
                </Button>
            </div>
        </div>
    );
}
