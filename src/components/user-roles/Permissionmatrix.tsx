"use client";

import { ShieldCheck, Eye, XCircle } from "lucide-react";
import { AccessLevel, SystemModule } from "./Userroles";
import { COLORS } from "@/constants/colors";

const LEVEL_META: Record<AccessLevel, { icon: typeof Eye; color: string }> = {
    "No Access": { icon: XCircle, color: COLORS.gray },
    "View Only": { icon: Eye, color: "#D97706" },
    "Full Access": { icon: ShieldCheck, color: COLORS.green },
};

const LEVELS: AccessLevel[] = ["No Access", "View Only", "Full Access"];

interface PermissionMatrixProps {
    modules: SystemModule[];
    permissions: Record<string, AccessLevel>;
    onChange: (moduleId: string, level: AccessLevel) => void;
    disabled?: boolean;
}

export default function PermissionMatrix({ modules, permissions, onChange, disabled }: PermissionMatrixProps) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
                <thead>
                <tr className="border-b border-slate-100 text-xs uppercase" style={{ color: COLORS.gray }}>
                    <th className="px-4 py-3 font-medium">Module</th>
                    {LEVELS.map((level) => (
                        <th key={level} className="px-4 py-3 text-center font-medium">
                            {level}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {modules.map((module) => {
                    const current = permissions[module.id] ?? "No Access";
                    return (
                        <tr key={module.id} className="border-b border-slate-50 last:border-0">
                            <td className="px-4 py-3 font-medium" style={{ color: COLORS.navy }}>
                                {module.label}
                            </td>
                            {LEVELS.map((level) => {
                                const meta = LEVEL_META[level];
                                const Icon = meta.icon;
                                const selected = current === level;
                                return (
                                    <td key={level} className="px-4 py-3 text-center">
                                        <button
                                            type="button"
                                            disabled={disabled}
                                            onClick={() => onChange(module.id, level)}
                                            className="mx-auto flex h-8 w-8 items-center justify-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-40"
                                            style={
                                                selected
                                                    ? { backgroundColor: `${meta.color}1a`, color: meta.color }
                                                    : { backgroundColor: "#F8FAFC", color: "#CBD5E1" }
                                            }
                                        >
                                            <Icon size={15} />
                                        </button>
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}