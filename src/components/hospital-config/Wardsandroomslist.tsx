import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import Button from "@/components/receptionist/Button";
import { Ward } from "./Hospitalconfig";
import { COLORS } from "@/constants/colors";

export default function WardsAndRoomsList({ wards }: { wards: Ward[] }) {
    const totalRooms = wards.reduce((sum, w) => sum + w.totalRooms, 0);
    const totalBeds = wards.reduce((sum, w) => sum + w.totalBeds, 0);

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between">
                <div>
                    <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                        <span>Dashboard</span>
                        <ChevronRight size={12} />
                        <span style={{ color: COLORS.navy }}>Wards &amp; Rooms</span>
                    </nav>
                    <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                        Wards &amp; Rooms
                    </h1>
                    <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                        {wards.length} wards · {totalRooms} rooms · {totalBeds} total beds.
                    </p>
                </div>
                <Link href="/hospital-config/wards">
                    <Button>
                        <Plus size={16} /> Add Ward
                    </Button>
                </Link>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                    <thead>
                    <tr className="border-b border-slate-100 text-xs uppercase" style={{ color: COLORS.gray }}>
                        <th className="px-4 py-3 font-medium">Ward Name</th>
                        <th className="px-4 py-3 font-medium">Location</th>
                        <th className="px-4 py-3 font-medium">Rooms</th>
                        <th className="px-4 py-3 font-medium">Total Beds</th>
                        <th className="px-4 py-3 font-medium">Available Beds</th>
                    </tr>
                    </thead>
                    <tbody>
                    {wards.map((w) => (
                        <tr key={w.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                            <td className="px-4 py-3 font-medium" style={{ color: COLORS.blue }}>
                                {w.name}
                            </td>
                            <td className="px-4 py-3" style={{ color: COLORS.gray }}>
                                {w.location}
                            </td>
                            <td className="px-4 py-3" style={{ color: COLORS.navy }}>
                                {w.roomsLabel}
                            </td>
                            <td className="px-4 py-3" style={{ color: COLORS.navy }}>
                                {w.totalBeds}
                            </td>
                            <td className="px-4 py-3">
                                    <span
                                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                                        style={{ backgroundColor: `${w.occupancyColor}1a`, color: w.occupancyColor }}
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                        {w.availableBeds} Available
                                    </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}