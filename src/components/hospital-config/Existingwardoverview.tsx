import Link from "next/link";
import { Search } from "lucide-react";
import { Ward } from "./Hospitalconfig";
import { COLORS } from "@/constants/colors";

const CATEGORY_ICON_BG: Record<Ward["category"], { bg: string; text: string }> = {
    General: { bg: `${COLORS.green}1a`, text: COLORS.green },
    ICU: { bg: "#EDE9FE", text: "#7C3AED" },
    Emergency: { bg: "#FEE2E2", text: "#DC2626" },
    Private: { bg: "#FEF3C7", text: "#D97706" },
    Pediatric: { bg: `${COLORS.blue}1a`, text: COLORS.blue },
    Maternity: { bg: `${COLORS.teal}1a`, text: COLORS.teal },
};

export default function ExistingWardOverview({ wards }: { wards: Ward[] }) {
    const totalBeds = wards.reduce((sum, w) => sum + w.totalBeds, 0);

    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold" style={{ color: COLORS.navy }}>
                    Existing Overview
                </h3>
                <Link href="/hospital-config/wards/all" className="text-xs font-medium hover:underline" style={{ color: COLORS.blue }}>
                    View All
                </Link>
            </div>
            <div className="relative">
                <Search
                    size={14}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: COLORS.gray }}
                />
                <input
                    placeholder="Find ward or room..."
                    className="w-full rounded-lg border border-slate-200 py-2 pl-8 pr-3 text-xs outline-none focus:border-[#1565D8]"
                    style={{ color: COLORS.navy }}
                />
            </div>
            <div className="flex flex-col gap-3">
                {wards.slice(0, 3).map((w) => {
                    const tint = CATEGORY_ICON_BG[w.category];
                    return (
                        <div key={w.id} className="rounded-xl border border-slate-100 p-3">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <span
                                        className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-semibold"
                                        style={{ backgroundColor: tint.bg, color: tint.text }}
                                    >
                                        {w.category[0]}
                                    </span>
                                    <span className="flex flex-col">
                                        <span className="text-sm font-medium" style={{ color: COLORS.navy }}>
                                            {w.name}
                                        </span>
                                        <span className="text-[11px]" style={{ color: COLORS.gray }}>
                                            {w.location}
                                        </span>
                                    </span>
                                </span>
                            </div>
                            <div className="mb-2 flex items-center gap-6 text-xs">
                                <span style={{ color: COLORS.gray }}>
                                    Rooms <span className="ml-1 font-semibold" style={{ color: COLORS.navy }}>{w.roomsLabel}</span>
                                </span>
                                <span style={{ color: COLORS.gray }}>
                                    Beds <span className="ml-1 font-semibold" style={{ color: COLORS.navy }}>{w.totalBeds}</span>
                                </span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full"
                                    style={{ width: `${w.occupancyPercent}%`, backgroundColor: w.occupancyColor }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
                <span style={{ color: COLORS.gray }}>Total Capacity</span>
                <span className="font-semibold" style={{ color: COLORS.navy }}>{totalBeds} Beds</span>
            </div>
        </div>
    );
}