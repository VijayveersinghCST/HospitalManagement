import Link from "next/link";
import { Plus, Pencil, CheckCircle2 } from "lucide-react";
import { ConfigChangeLog } from "./Hospitalconfig";
import { COLORS } from "@/constants/colors";

const ICON_MAP = { plus: Plus, edit: Pencil, check: CheckCircle2 };

const TAG_STYLES: Record<ConfigChangeLog["tag"], { bg: string; text: string }> = {
    Active: { bg: `${COLORS.green}1a`, text: COLORS.green },
    Updated: { bg: `${COLORS.blue}1a`, text: COLORS.blue },
    Completed: { bg: `${COLORS.green}1a`, text: COLORS.green },
};

export default function ConfigChangesList({ changes }: { changes: ConfigChangeLog[] }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold" style={{ color: COLORS.navy }}>
                    Recent Configuration Changes
                </h3>
                <Link href="/hospital-config/history" className="text-xs font-medium hover:underline" style={{ color: COLORS.blue }}>
                    View All History
                </Link>
            </div>
            <div className="flex flex-col divide-y divide-slate-100">
                {changes.map((c) => {
                    const Icon = ICON_MAP[c.icon];
                    const tag = TAG_STYLES[c.tag];
                    return (
                        <div key={c.id} className="flex items-center gap-3 py-3">
                            <span
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                                style={{ backgroundColor: c.iconBg }}
                            >
                                <Icon size={15} style={{ color: c.iconColor }} />
                            </span>
                            <div className="flex flex-1 flex-col">
                                <span className="text-sm font-medium" style={{ color: COLORS.navy }}>
                                    {c.title}
                                </span>
                                <span className="text-xs" style={{ color: COLORS.gray }}>
                                    {c.subtitle} · {c.timestamp}
                                </span>
                            </div>
                            <span
                                className="rounded-full px-2.5 py-1 text-xs font-medium"
                                style={{ backgroundColor: tag.bg, color: tag.text }}
                            >
                                {c.tag}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}