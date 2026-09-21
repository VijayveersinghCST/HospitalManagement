"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { RoleConfig, SystemUser } from "./Userroles";
import { COLORS } from "@/constants/colors";

function initials(name: string) {
    return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export default function UserRoleAssignment({ users, roles }: { users: SystemUser[]; roles: RoleConfig[] }) {
    const [entries, setEntries] = useState(users);
    const [search, setSearch] = useState("");

    const filtered = entries.filter(
        (u) =>
            search.trim() === "" ||
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
    );

    const updateRole = (userId: string, roleId: string) => {
        setEntries((prev) => prev.map((u) => (u.id === userId ? { ...u, roleId } : u)));
        // TODO: replace with a real submission, e.g.
        // await fetch(`/api/users/${userId}`, { method: "PATCH", body: JSON.stringify({ roleId }) })
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: COLORS.gray }}>
                    User Role Assignment
                </h3>
                <div className="relative w-64">
                    <Search
                        size={14}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: COLORS.gray }}
                    />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search users..."
                        className="w-full rounded-lg border border-slate-200 py-1.5 pl-8 pr-3 text-xs outline-none focus:border-[#1565D8]"
                        style={{ color: COLORS.navy }}
                    />
                </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                    <thead>
                    <tr className="border-b border-slate-100 text-xs uppercase" style={{ color: COLORS.gray }}>
                        <th className="px-4 py-3 font-medium">User</th>
                        <th className="px-4 py-3 font-medium">Role</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Last Login</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((u) => (
                        <tr key={u.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                            <td className="px-4 py-3">
                                    <span className="flex items-center gap-2.5">
                                        <span
                                            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white"
                                            style={{ backgroundColor: u.avatarColor }}
                                        >
                                            {initials(u.name)}
                                        </span>
                                        <span className="flex flex-col">
                                            <span className="font-medium" style={{ color: COLORS.navy }}>
                                                {u.name}
                                            </span>
                                            <span className="text-xs" style={{ color: COLORS.gray }}>
                                                {u.email}
                                            </span>
                                        </span>
                                    </span>
                            </td>
                            <td className="px-4 py-3">
                                <select
                                    value={u.roleId}
                                    onChange={(e) => updateRole(u.id, e.target.value)}
                                    className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-[#1565D8]"
                                    style={{ color: COLORS.navy }}
                                >
                                    {roles.map((r) => (
                                        <option key={r.id} value={r.id}>
                                            {r.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-4 py-3">
                                    <span
                                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                                        style={
                                            u.status === "Active"
                                                ? { backgroundColor: `${COLORS.green}1a`, color: COLORS.green }
                                                : { backgroundColor: "#F1F5F9", color: COLORS.gray }
                                        }
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                        {u.status}
                                    </span>
                            </td>
                            <td className="px-4 py-3" style={{ color: COLORS.gray }}>
                                {u.lastLoginLabel}
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-4 py-10 text-center text-sm" style={{ color: COLORS.gray }}>
                                No users match your search.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}