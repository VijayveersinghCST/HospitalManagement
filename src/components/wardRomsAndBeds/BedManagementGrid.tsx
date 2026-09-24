import Link from "next/link";
import { ArrowLeft, BedDouble, ChevronRight, DoorOpen, Layers, Plus } from "lucide-react";
import Button from "@/components/receptionist/Button";
import { COLORS } from "@/constants/colors";
import { BedItem, BED_STATUS_STYLES, RoomItem, WardItem } from "./WardRoomsAndBeds";

export default function BedManagementGrid({
    beds,
    activeWard,
    activeRoom,
}: {
    beds: BedItem[];
    activeWard?: WardItem;
    activeRoom?: RoomItem;
}) {
    const availableBeds = beds.filter((b) => b.status === "Available").length;

    const heading = activeRoom
        ? `Beds in Room ${activeRoom.roomNumber}`
        : activeWard
            ? `Beds in ${activeWard.name}`
            : "Beds Management";

    const addBedHref = activeRoom
        ? `/wardRomsAndBeds/bed-management/add?roomId=${activeRoom.id}`
        : "/wardRomsAndBeds/bed-management/add";

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                        <span>Dashboard</span>
                        <ChevronRight size={12} />
                        <Link href="/wardRomsAndBeds/room-management" className="hover:underline">Rooms Management</Link>
                        <ChevronRight size={12} />
                        <span style={{ color: COLORS.navy }}>Beds Management</span>
                    </nav>
                    <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                        {heading}
                    </h1>
                    <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                        {beds.length} beds · {availableBeds} available.
                    </p>
                    {(activeRoom || activeWard) && (
                        <Link
                            href={activeRoom ? `/wardRomsAndBeds/room-management?wardId=${activeRoom.wardId}` : "/wardRomsAndBeds/bed-management"}
                            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium hover:underline"
                            style={{ color: COLORS.blue }}
                        >
                            <ArrowLeft size={12} /> {activeRoom ? "Back to rooms" : "Back to all beds"}
                        </Link>
                    )}
                </div>
                <Link href={addBedHref}>
                    <Button>
                        <Plus size={16} /> Add Bed
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {beds.map((bed) => {
                    const tint = BED_STATUS_STYLES[bed.status];
                    return (
                        <div key={bed.id} className="flex flex-col gap-2.5 rounded-xl border border-slate-200 bg-white p-3.5">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <span
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                                        style={{ backgroundColor: tint.bg, color: tint.text }}
                                    >
                                        <BedDouble size={17} />
                                    </span>
                                    <span>
                                        <p className="text-sm font-bold" style={{ color: COLORS.navy }}>
                                            Bed {bed.bedNumber}
                                        </p>
                                    </span>
                                </div>
                                <span
                                    className="rounded-full px-2.5 py-1 text-xs font-bold"
                                    style={{ backgroundColor: tint.bg, color: tint.text }}
                                >
                                    {bed.status}
                                </span>
                            </div>

                            <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-2.5 text-[13px] font-semibold" style={{ color: COLORS.navy }}>
                                <span className="flex items-center gap-1.5">
                                    <Layers size={14} style={{ color: COLORS.blue }} />
                                    <span style={{ color: COLORS.gray }}>Ward:</span> {bed.wardName}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <DoorOpen size={14} style={{ color: COLORS.blue }} />
                                    <span style={{ color: COLORS.gray }}>Room:</span> {bed.roomNumber}
                                </span>
                                {bed.patientName && (
                                    <span>
                                        <span style={{ color: COLORS.gray }}>Patient:</span> {bed.patientName}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
