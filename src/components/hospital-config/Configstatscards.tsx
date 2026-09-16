import Link from "next/link";
import { Building2, Layers, BedDouble, Stethoscope, ArrowRight } from "lucide-react";
import { ConfigStatData } from "./Hospitalconfig";
import { COLORS } from "@/constants/colors";

const ICON_MAP = { building: Building2, layers: Layers, bed: BedDouble, equipment: Stethoscope };

export default function ConfigStatCards({ stats }: { stats: ConfigStatData[] }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
                    const Icon = ICON_MAP[stat.icon];
                    return (
                        <div key={stat.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                    <span
                        className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ backgroundColor: stat.iconBg }}
                >
                    <Icon size={16} style={{ color: stat.iconColor }} />
                    </span>
                    {stat.badge && (
                        <span
                            className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                        style={{ backgroundColor: `${COLORS.green}1a`, color: COLORS.green }}
                    >
                        {stat.badge}
                        </span>
                    )}
                    </div>
                    <span className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                    {stat.value}
                    </span>
                    <span className="text-sm" style={{ color: COLORS.gray }}>
                    {stat.label}
                    </span>
                    <Link
                    href={stat.linkHref}
                    className="flex items-center gap-1 text-xs font-medium hover:underline"
                    style={{ color: stat.linkColor }}
                >
                    {stat.linkLabel} <ArrowRight size={12} />
                    </Link>
                    </div>
                );
                })}
            </div>
    );
}