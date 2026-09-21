import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { RoleConfig } from "./Userroles";
import { COLORS } from "@/constants/colors";

export default function RoleCard({ role }: { role: RoleConfig }) {
    const fullAccessCount = Object.values(role.modulePermissions).filter((v) => v !== "No Access").length;

    return (
        <Link
            href={`/user-management/roles/${role.id}`}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
        >
            <div className="flex items-start justify-between">
                <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${role.color}1a` }}
                >
                    <ShieldCheck size={18} style={{ color: role.color }} />
                </span>
                <ChevronRight size={16} style={{ color: COLORS.gray }} />
            </div>
            <div>
                <h3 className="text-sm font-semibold" style={{ color: COLORS.navy }}>
                    {role.name}
                </h3>
                <p className="mt-1 text-xs" style={{ color: COLORS.gray }}>
                    {role.description}
                </p>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs" style={{ color: COLORS.gray }}>
                <span>{role.userCount} users</span>
                <span>{fullAccessCount} modules enabled</span>
            </div>
        </Link>
    );
}