"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BedDouble, ChevronRight, Save } from "lucide-react";
import TextField from "@/components/receptionist/Textfield";
import SelectField from "@/components/receptionist/Selectfield";
import Button from "@/components/receptionist/Button";
import { COLORS } from "@/constants/colors";
import { MOCK_ROOMS, MOCK_WARDS } from "./MockWardRoomsAndBeds";
import { BED_STATUSES } from "./WardRoomsAndBeds";

const WARD_NAMES = MOCK_WARDS.map((w) => w.name);

export default function AddBedForm({ defaultRoomId }: { defaultRoomId?: string }) {
    const router = useRouter();
    const defaultRoom = defaultRoomId ? MOCK_ROOMS.find((r) => r.id === defaultRoomId) : undefined;

    const [wardName, setWardName] = useState(defaultRoom?.wardName ?? "");
    const [roomNumber, setRoomNumber] = useState(defaultRoom?.roomNumber ?? "");
    const [bedNumber, setBedNumber] = useState("");
    const [status, setStatus] = useState<string>("Available");
    const [patientName, setPatientName] = useState("");

    const roomsInWard = useMemo(() => {
        const ward = MOCK_WARDS.find((w) => w.name === wardName);
        return ward ? MOCK_ROOMS.filter((r) => r.wardId === ward.id) : [];
    }, [wardName]);
    const roomNumbers = roomsInWard.map((r) => r.roomNumber);

    const handleWardChange = (nextWardName: string) => {
        setWardName(nextWardName);
        setRoomNumber("");
    };

    const handleSave = () => {
        // TODO: replace with a real submission, e.g.
        // await fetch("/api/beds", { method: "POST", body: JSON.stringify({ wardName, roomNumber, bedNumber, status, patientName }) })
        console.log("New bed:", { wardName, roomNumber, bedNumber, status, patientName });
        const room = MOCK_ROOMS.find((r) => r.roomNumber === roomNumber && r.wardName === wardName);
        router.push(room ? `/wardRomsAndBeds/bed-management?roomId=${room.id}` : "/wardRomsAndBeds/bed-management");
    };

    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                    <span>Dashboard</span>
                    <ChevronRight size={12} />
                    <span>Beds Management</span>
                    <ChevronRight size={12} />
                    <span style={{ color: COLORS.navy }}>Add New Bed</span>
                </nav>
                <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                    Add New Bed
                </h1>
                <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                    Create a new bed and associate it with a ward and room.
                </p>
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
                    <BedDouble size={16} style={{ color: COLORS.blue }} />
                    Bed Information
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <SelectField
                        label="Ward"
                        required
                        placeholder="Select a ward..."
                        options={WARD_NAMES}
                        value={wardName}
                        onChange={(e) => handleWardChange(e.target.value)}
                    />
                    <SelectField
                        label="Room"
                        required
                        placeholder={wardName ? "Select a room..." : "Select a ward first"}
                        options={roomNumbers}
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        disabled={!wardName}
                    />
                    <TextField
                        label="Bed Number"
                        required
                        placeholder="e.g. 101-4"
                        value={bedNumber}
                        onChange={(e) => setBedNumber(e.target.value)}
                    />
                    <SelectField
                        label="Status"
                        options={BED_STATUSES}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                    {status === "Occupied" && (
                        <TextField
                            label="Patient Name"
                            placeholder="e.g. Sarah Jenkins"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                        />
                    )}
                </div>
            </section>

            <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button onClick={handleSave} disabled={!wardName || !roomNumber || !bedNumber}>
                    <Save size={16} /> Save Bed
                </Button>
            </div>
        </div>
    );
}
