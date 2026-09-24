"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, DoorOpen, Save } from "lucide-react";
import TextField from "@/components/receptionist/Textfield";
import SelectField from "@/components/receptionist/Selectfield";
import Button from "@/components/receptionist/Button";
import { COLORS } from "@/constants/colors";
import { MOCK_WARDS } from "./MockWardRoomsAndBeds";
import { ROOM_TYPES } from "./WardRoomsAndBeds";

const WARD_NAMES = MOCK_WARDS.map((w) => w.name);

export default function AddRoomForm({ defaultWardId }: { defaultWardId?: string }) {
    const router = useRouter();
    const defaultWard = defaultWardId ? MOCK_WARDS.find((w) => w.id === defaultWardId) : undefined;

    const [wardName, setWardName] = useState(defaultWard?.name ?? "");
    const [roomNumber, setRoomNumber] = useState("");
    const [roomType, setRoomType] = useState("");
    const [bedCount, setBedCount] = useState("");

    const handleSave = () => {
        // TODO: replace with a real submission, e.g.
        // await fetch("/api/rooms", { method: "POST", body: JSON.stringify({ wardName, roomNumber, roomType, bedCount }) })
        console.log("New room:", { wardName, roomNumber, roomType, bedCount });
        const ward = MOCK_WARDS.find((w) => w.name === wardName);
        router.push(ward ? `/wardRomsAndBeds/room-management?wardId=${ward.id}` : "/wardRomsAndBeds/room-management");
    };

    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                    <span>Dashboard</span>
                    <ChevronRight size={12} />
                    <span>Rooms Management</span>
                    <ChevronRight size={12} />
                    <span style={{ color: COLORS.navy }}>Add New Room</span>
                </nav>
                <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                    Add New Room
                </h1>
                <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                    Create a new room within a ward.
                </p>
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
                    <DoorOpen size={16} style={{ color: COLORS.blue }} />
                    Room Information
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <SelectField
                        label="Ward"
                        required
                        placeholder="Select a ward..."
                        options={WARD_NAMES}
                        value={wardName}
                        onChange={(e) => setWardName(e.target.value)}
                    />
                    <TextField
                        label="Room Number"
                        required
                        placeholder="e.g. 104"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                    />
                    <SelectField
                        label="Room Type"
                        placeholder="Select a room type..."
                        options={ROOM_TYPES}
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                    />
                    <TextField
                        label="Number of Beds"
                        type="number"
                        min={1}
                        placeholder="e.g. 4"
                        hint="Beds can also be added individually from Beds Management."
                        value={bedCount}
                        onChange={(e) => setBedCount(e.target.value)}
                    />
                </div>
            </section>

            <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button onClick={handleSave} disabled={!wardName || !roomNumber}>
                    <Save size={16} /> Save Room
                </Button>
            </div>
        </div>
    );
}
