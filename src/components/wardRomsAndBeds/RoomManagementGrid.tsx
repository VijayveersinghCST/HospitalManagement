import Link from "next/link";
import { ArrowLeft, BedDouble, ChevronRight, Plus } from "lucide-react";
import Button from "@/components/receptionist/Button";
import { COLORS } from "@/constants/colors";
import { RoomItem, WardItem } from "./WardRoomsAndBeds";

export default function RoomManagementGrid({
    rooms,
    activeWard,
}: {
    rooms: RoomItem[];
    activeWard?: WardItem;
}) {
    const totalBeds = rooms.reduce((sum, r) => sum + r.totalBeds, 0);
    const availableBeds = rooms.reduce((sum, r) => sum + r.availableBeds, 0);
    const addRoomHref = activeWard
        ? `/wardRomsAndBeds/room-management/add?wardId=${activeWard.id}`
        : "/wardRomsAndBeds/room-management/add";

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                        <span>Dashboard</span>
                        <ChevronRight size={12} />
                        <Link href="/wardRomsAndBeds/ward-management" className="hover:underline">Ward Management</Link>
                        <ChevronRight size={12} />
                        <span style={{ color: COLORS.navy }}>Rooms Management</span>
                    </nav>
                    <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                        {activeWard ? `Rooms in ${activeWard.name}` : "Rooms Management"}
                    </h1>
                    <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                        {rooms.length} rooms · {totalBeds} total beds · {availableBeds} available. Select a room to view its bed details.
                    </p>
                    {activeWard && (
                        <Link
                            href="/wardRomsAndBeds/ward-management"
                            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium hover:underline"
                            style={{ color: COLORS.blue }}
                        >
                            <ArrowLeft size={12} /> Back to all wards
                        </Link>
                    )}
                </div>
                <Link href={addRoomHref}>
                    <Button>
                        <Plus size={16} /> Add Room
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {rooms.map((room) => (
                    <div key={room.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3.5">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-base font-semibold" style={{ color: COLORS.navy }}>
                                    Room {room.roomNumber}
                                </h3>
                                <p className="mt-0.5 text-xs font-medium" style={{ color: COLORS.gray }}>
                                    {room.wardName} · {room.roomType}
                                </p>
                            </div>
                            <span
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                                style={{ backgroundColor: "#1565D81a", color: COLORS.blue }}
                            >
                                <BedDouble size={16} />
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-50 p-2 text-center">
                            <div>
                                <p className="text-base font-bold" style={{ color: COLORS.navy }}>{room.totalBeds}</p>
                                <p className="text-[10px] font-semibold uppercase" style={{ color: COLORS.gray }}>Bed Numbers</p>
                            </div>
                            <div>
                                <p className="text-base font-bold" style={{ color: COLORS.green }}>{room.availableBeds}</p>
                                <p className="text-[10px] font-semibold uppercase" style={{ color: COLORS.gray }}>Available</p>
                            </div>
                        </div>

                        <Link
                            href={`/wardRomsAndBeds/bed-management?roomId=${room.id}`}
                            className="mt-auto flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-1.5 text-xs font-semibold hover:bg-slate-50"
                            style={{ color: COLORS.blue }}
                        >
                            <BedDouble size={14} /> View Bed Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
