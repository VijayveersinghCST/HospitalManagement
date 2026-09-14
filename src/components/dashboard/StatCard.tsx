import { ReactNode } from "react";
import {COLORS} from "@/constants/colors";

interface LegendItem {
    label: string;
    color: string;
}

interface StatCardProps {
    icon: ReactNode;
    iconBg: string;
    title: string;
    value: string;
    valueSuffix?: string;
    badgeText?: string;
    badgeTone?: "positive" | "neutral";
    topRightLabel?: string;
    topRightValue?: string;
    footnoteLabel?: string;
    footnoteValue?: string;
    legend?: LegendItem[];
    progressPercent?: number;
}

export default function StatCard({
                                     icon,
                                     iconBg,
                                     title,
                                     value,
                                     valueSuffix,
                                     badgeText,
                                     badgeTone = "neutral",
                                     topRightLabel,
                                     topRightValue,
                                     footnoteLabel,
                                     footnoteValue,
                                     legend,
                                     progressPercent,
                                 }: StatCardProps) {
    const badgeStyle =
        badgeTone === "positive"
            ? { backgroundColor: `${COLORS.green}1a`, color: COLORS.greenDark }
            : { backgroundColor: "#F1F5F9", color: COLORS.gray };

    return (
        <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="flex items-start justify-between">
        <span
            className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: iconBg }}
        >
          {icon}
        </span>

                {badgeText && (
                    <span
                        className="rounded-full px-2.5 py-1 text-[0.72rem] font-semibold"
                        style={badgeStyle}
                    >
            {badgeText}
          </span>
                )}

                {topRightLabel && (
                    <div className="text-right">
                        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.08em]" style={{ color: COLORS.gray }}>
                            {topRightLabel}
                        </p>
                        <p className="text-[0.95rem] font-bold" style={{ color: COLORS.greenDark }}>
                            {topRightValue}
                        </p>
                    </div>
                )}
            </div>

            <p className="mt-4 text-[0.82rem]" style={{ color: COLORS.gray }}>
                {title}
            </p>
            <p className="mt-1 flex items-baseline gap-1.5 text-[1.55rem] font-extrabold" style={{ color: COLORS.navy }}>
                {value}
                {valueSuffix && (
                    <span className="text-[0.78rem] font-medium" style={{ color: COLORS.gray }}>
            {valueSuffix}
          </span>
                )}
            </p>

            {footnoteLabel && (
                <p className="mt-2 text-[0.76rem]" style={{ color: COLORS.gray }}>
                    {footnoteLabel}{" "}
                    {footnoteValue && (
                        <span className="font-semibold" style={{ color: COLORS.greenDark }}>
              {footnoteValue}
            </span>
                    )}
                </p>
            )}

            {legend && (
                <div className="mt-2 flex items-center gap-3">
                    {legend.map((item) => (
                        <span key={item.label} className="flex items-center gap-1.5 text-[0.76rem]" style={{ color: COLORS.gray }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                            {item.label}
            </span>
                    ))}
                </div>
            )}

            {typeof progressPercent === "number" && (
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                        className="h-full rounded-full"
                        style={{ width: `${progressPercent}%`, backgroundColor: COLORS.green }}
                    />
                </div>
            )}
        </div>
    );
}