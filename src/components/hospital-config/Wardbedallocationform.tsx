"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Layers, DoorOpen, BedDouble, Plus, CheckCircle2, Save } from "lucide-react";
import TextField from "@/components/receptionist/Textfield";
import SelectField from "@/components/receptionist/Selectfield";
import Button from "@/components/receptionist/Button";
import ExistingWardOverview from "./Existingwardoverview";
import { WARD_CATEGORIES, ROOM_TYPES, BED_STATUSES, RoomDraft, Ward } from "./Hospitalconfig";
import { COLORS } from "@/constants/colors";

export default function WardBedAllocationForm({ wards }: { wards: Ward[] }) {
    const router = useRouter();
    const [wardName, setWardName] = useState("");
    const [wardCategory, setWardCategory] = useState("");
    const [departmentFloor, setDepartmentFloor] = useState("");

    const [roomNo, setRoomNo] = useState("");
    const [roomType, setRoomType] = useState<string>(ROOM_TYPES[2]);
    const [capacity, setCapacity] = useState("1");
    const [rooms, setRooms] = useState<RoomDraft[]>([]);

    const [bedId, setBedId] = useState("");
    const [bedStatus, setBedStatus] = useState<string>(BED_STATUSES[0]);

    const addRoom = () => {
        if (!roomNo.trim()) return;
        setRooms((prev) => [
            ...prev,
            { id: `${Date.now()}`, roomNo, roomType, capacity: Number(capacity) || 1 },
        ]);
        setRoomNo("");
        setCapacity("1");
    };

    const handleSave = () => {
        // TODO: replace with a real submission, e.g.
        // await fetch("/api/wards", { method: "POST", body: JSON.stringify({ wardName, wardCategory, departmentFloor, rooms, bedId, bedStatus }) })
        console.log("New ward structure:", { wardName, wardCategory, departmentFloor, rooms, bedId, bedStatus });
        router.push("/hospital-config/wards/all");
    };

    return (
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="flex flex-col gap-6">
                <div>
                    <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                        <span>Dashboard</span>
                        <ChevronRight size={12} />
                        <span>Infrastructure</span>
                        <ChevronRight size={12} />
                        <span style={{ color: COLORS.navy }}>Ward &amp; Bed Allocation</span>
                    </nav>
                    <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                        Ward &amp; Bed Allocation
                    </h1>
                    <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                        Setup new wards, define rooms, and allocate beds for the hospital.
                    </p>
                </div>

                <section className="rounded-card border-l-4 border border-slate-200 bg-white p-6" style={{ borderLeftColor: COLORS.blue }}>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
                        <span
                            className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                            style={{ backgroundColor: COLORS.blue }}
                        >
                            1
                        </span>
                        Ward Details
                        <Layers size={15} className="ml-auto" style={{ color: COLORS.gray }} />
                    </h3>
                    <div className="flex flex-col gap-4">
                        <TextField
                            label="Ward Name"
                            placeholder="e.g. North Wing General Ward, ICU Block A"
                            value={wardName}
                            onChange={(e) => setWardName(e.target.value)}
                        />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <SelectField
                                label="Ward Category"
                                placeholder="Select Category"
                                options={WARD_CATEGORIES}
                                value={wardCategory}
                                onChange={(e) => setWardCategory(e.target.value)}
                            />
                            <TextField
                                label="Department / Floor"
                                placeholder="e.g. 2nd Floor, Ortho Dept"
                                value={departmentFloor}
                                onChange={(e) => setDepartmentFloor(e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                <section className="rounded-card border border-slate-200 bg-white p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
                        <span
                            className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                            style={{ backgroundColor: COLORS.gray }}
                        >
                            2
                        </span>
                        Room Configuration
                        <DoorOpen size={15} className="ml-auto" style={{ color: COLORS.gray }} />
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <TextField
                            label="Room No. / Name"
                            placeholder="e.g. 201"
                            value={roomNo}
                            onChange={(e) => setRoomNo(e.target.value)}
                        />
                        <SelectField
                            label="Room Type"
                            options={[...ROOM_TYPES]}
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                        />
                        <TextField
                            label="Capacity (Beds)"
                            type="number"
                            min={1}
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={addRoom}
                        className="mt-3 flex items-center gap-1.5 text-sm font-medium hover:underline"
                        style={{ color: COLORS.blue }}
                    >
                        <Plus size={14} /> Add Another Room
                    </button>

                    {rooms.length > 0 && (
                        <div className="mt-4 flex flex-col gap-2">
                            {rooms.map((r) => (
                                <div
                                    key={r.id}
                                    className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2"
                                >
                                    <span className="flex items-center gap-2 text-sm" style={{ color: COLORS.navy }}>
                                        <DoorOpen size={14} style={{ color: COLORS.blue }} />
                                        Room {r.roomNo}
                                        <span style={{ color: COLORS.gray }}>
                                            · {r.roomType} · {r.capacity} Bed Capacity
                                        </span>
                                    </span>
                                    <CheckCircle2 size={16} style={{ color: COLORS.green }} />
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="rounded-card border border-slate-200 bg-white p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
                        <span
                            className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                            style={{ backgroundColor: COLORS.gray }}
                        >
                            3
                        </span>
                        Bed Setup
                        <BedDouble size={15} className="ml-auto" style={{ color: COLORS.gray }} />
                    </h3>
                    {rooms.length > 0 && (
                        <div
                            className="mb-4 rounded-lg border px-4 py-2.5 text-xs"
                            style={{ backgroundColor: `${COLORS.blue}0d`, borderColor: `${COLORS.blue}33`, color: COLORS.blue }}
                        >
                            Configuring beds for Room {rooms[rooms.length - 1].roomNo}
                        </div>
                    )}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <TextField
                            label="Bed ID / Label"
                            placeholder="e.g. BED-201-A"
                            value={bedId}
                            onChange={(e) => setBedId(e.target.value)}
                        />
                        <SelectField
                            label="Initial Status"
                            options={[...BED_STATUSES]}
                            value={bedStatus}
                            onChange={(e) => setBedStatus(e.target.value)}
                        />
                    </div>
                </section>

                <div className="flex justify-end gap-3">
                    <Button variant="secondary" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={!wardName}>
                        <Save size={16} /> Save Ward Structure
                    </Button>
                </div>
            </div>

            <div className="lg:sticky lg:top-6 lg:self-start">
                <ExistingWardOverview wards={wards} />
            </div>
        </div>
    );
}