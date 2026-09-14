import { COLORS } from "@/constants/colors";
import type { ReceptionistStatData } from "./Receptionist";

interface StatCardProps extends Omit<ReceptionistStatData, "id" | "icon"> {
    icon: React.ReactNode;
}

export default function StatCard({
                                     label,
                                     value,
                                     icon,
                                     iconColor,
                                     iconBg,
                                     footnote,
                                     footnoteColor = COLORS.gray,
                                     progressPercent,
                                 }: StatCardProps) {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between">
                <p className="text-[0.8rem]" style={{ color: COLORS.gray }}>
                    {label}
                </p>
                <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: iconBg, color: iconColor }}
                >
          {icon}
        </span>
            </div>

            <p className="mt-2 text-[1.6rem] font-extrabold" style={{ color: COLORS.navy }}>
                {value}
            </p>

            {footnote && (
                <p className="mt-1.5 text-[0.78rem] font-medium" style={{ color: footnoteColor }}>
                    {footnote}
                </p>
            )}

            {typeof progressPercent === "number" && (
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                        className="h-full rounded-full"
                        style={{ width: `${progressPercent}%`, backgroundColor: COLORS.green }}
                    />
                </div>
            )}
        </div>
    );
}