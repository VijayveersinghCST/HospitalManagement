import { Users, ShieldCheck, Crown, ClipboardList } from "lucide-react";
import { PharmacyStatData } from "./Pharmacystaff";
import { COLORS } from "@/constants/colors";

const ICON_MAP = {
    team: Users,
    check: ShieldCheck,
    crown: Crown,
    clipboard: ClipboardList,
};

export default function PharmacyStatCards({ stats }: { stats: PharmacyStatData[] }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
                const Icon = ICON_MAP[stat.icon];
                return (
                    <div
                        key={stat.id}
                        className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-sm" style={{ color: COLORS.gray }}>
                                {stat.label}
                            </span>
                            <span
                                className="flex h-8 w-8 items-center justify-center rounded-lg"
                                style={{ backgroundColor: stat.iconBg }}
                            >
                                <Icon size={16} style={{ color: stat.iconColor }} />
                            </span>
                        </div>
                        <span className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                            {stat.value}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}