import Link from "next/link";
import { ChevronRight, DoorOpen, MapPin, Plus } from "lucide-react";
import Button from "@/components/receptionist/Button";
import { COLORS } from "@/constants/colors";
import { WardItem, WARD_CATEGORY_STYLES } from "./WardRoomsAndBeds";

export default function WardManagementGrid({ wards }: { wards: WardItem[] }) {
    const totalRooms = wards.reduce((sum, w) => sum + w.totalRooms, 0);
    const totalBeds = wards.reduce((sum, w) => sum + w.totalBeds, 0);

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                        <span>Dashboard</span>
                        <ChevronRight size={12} />
                        <span style={{ color: COLORS.navy }}>Ward Management</span>
                    </nav>
                    <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                        Ward Management
                    </h1>
                    <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                        {wards.length} wards · {totalRooms} rooms · {totalBeds} total beds. Select a ward to view its rooms and bed details.
                    </p>
                </div>
                <Link href="/wardRomsAndBeds/ward-management/add">
                    <Button>
                        <Plus size={16} /> Add Ward
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {wards.map((ward) => {
                    const tint = WARD_CATEGORY_STYLES[ward.category];
                    return (
                        <div key={ward.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3.5">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-base font-semibold" style={{ color: COLORS.navy }}>
                                        {ward.name}
                                    </h3>
                                    <p className="mt-0.5 flex items-center gap-1 text-xs font-medium" style={{ color: COLORS.gray }}>
                                        <MapPin size={12} /> {ward.location}
                                    </p>
                                </div>
                                <span
                                    className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                                    style={{ backgroundColor: tint.bg, color: tint.text }}
                                >
                                    {ward.category}
                                </span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 rounded-lg bg-slate-50 p-2 text-center">
                                <div>
                                    <p className="text-base font-bold" style={{ color: COLORS.navy }}>{ward.totalRooms}</p>
                                    <p className="text-[10px] font-semibold uppercase" style={{ color: COLORS.gray }}>Rooms</p>
                                </div>
                                <div>
                                    <p className="text-base font-bold" style={{ color: COLORS.navy }}>{ward.totalBeds}</p>
                                    <p className="text-[10px] font-semibold uppercase" style={{ color: COLORS.gray }}>Total Beds</p>
                                </div>
                                <div>
                                    <p className="text-base font-bold" style={{ color: COLORS.green }}>{ward.availableBeds}</p>
                                    <p className="text-[10px] font-semibold uppercase" style={{ color: COLORS.gray }}>Available</p>
                                </div>
                            </div>

                            <div>
                                <div className="mb-1 flex items-center justify-between text-[11px] font-medium" style={{ color: COLORS.gray }}>
                                    <span>Occupancy</span>
                                    <span style={{ color: COLORS.navy }}>{ward.occupancyPercent}%</span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${ward.occupancyPercent}%`,
                                            backgroundColor: ward.occupancyPercent >= 85 ? "#DC2626" : ward.occupancyPercent >= 60 ? "#D97706" : COLORS.green,
                                        }}
                                    />
                                </div>
                            </div>

                            <Link
                                href={`/wardRomsAndBeds/room-management?wardId=${ward.id}`}
                                className="mt-auto flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-1.5 text-xs font-semibold hover:bg-slate-50"
                                style={{ color: COLORS.blue }}
                            >
                                <DoorOpen size={14} /> View Rooms &amp; Beds
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
