import { ReactNode } from "react";
import {COLORS} from "@/constants/colors";

interface SummaryCardProps {
    icon: ReactNode;
    iconBg: string;
    iconColor: string;
    title: string;
    value: string;
    valueHighlight?: string;
    valueHighlightColor?: string;
    subtitle: string;
}

export default function SummaryCard({
                                        icon,
                                        iconBg,
                                        iconColor,
                                        title,
                                        value,
                                        valueHighlight,
                                        valueHighlightColor = COLORS.greenDark,
                                        subtitle,
                                    }: SummaryCardProps) {
    return (
        <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div>
                <p className="text-[0.82rem]" style={{ color: COLORS.gray }}>
                    {title}
                </p>
                <p className="mt-2 flex items-baseline gap-2 text-[1.55rem] font-extrabold" style={{ color: COLORS.navy }}>
                    {value}
                    {valueHighlight && (
                        <span className="text-[0.8rem] font-semibold" style={{ color: valueHighlightColor }}>
              {valueHighlight}
            </span>
                    )}
                </p>
                <p className="mt-1 text-[0.78rem]" style={{ color: COLORS.gray }}>
                    {subtitle}
                </p>
            </div>

            <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: iconBg, color: iconColor }}
            >
        {icon}
      </span>
        </div>
    );
}