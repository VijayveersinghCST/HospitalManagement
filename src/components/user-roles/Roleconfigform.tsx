"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Info, Save, ShieldAlert } from "lucide-react";
import TextField from "@/components/receptionist/Textfield";
import Button from "@/components/receptionist/Button";
import PermissionMatrix from "./Permissionmatrix";
import { RoleConfig, SYSTEM_MODULES, AccessLevel } from "./Userroles";
import { COLORS } from "@/constants/colors";

export default function RoleConfigForm({ role }: { role: RoleConfig }) {
    const router = useRouter();
    const [name, setName] = useState(role.name);
    const [description, setDescription] = useState(role.description);
    const [permissions, setPermissions] = useState(role.modulePermissions);

    const updatePermission = (moduleId: string, level: AccessLevel) => {
        setPermissions((prev) => ({ ...prev, [moduleId]: level }));
    };

    const enabledModules = SYSTEM_MODULES.filter((m) => permissions[m.id] !== "No Access");

    const handleSave = () => {
        // TODO: replace with a real submission, e.g.
        // await fetch(`/api/roles/${role.id}`, { method: "PATCH", body: JSON.stringify({ name, description, permissions }) })
        console.log("Role saved:", { id: role.id, name, description, permissions });
        router.push("/user-management");
    };

    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                    <span>Dashboard</span>
                    <ChevronRight size={12} />
                    <span>User &amp; Role Management</span>
                    <ChevronRight size={12} />
                    <span style={{ color: COLORS.navy }}>{role.name}</span>
                </nav>
                <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                    Configure Role: {role.name}
                </h1>
                <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                    {role.userCount} user{role.userCount === 1 ? "" : "s"} currently assigned to this role.
                </p>
            </div>

            {role.isSystemRole && (
                <div
                    className="flex items-start gap-2 rounded-lg border px-4 py-3 text-sm"
                    style={{ backgroundColor: "#FEF3C7", borderColor: "#FDE68A", color: "#B45309" }}
                >
                    <ShieldAlert size={16} className="mt-0.5 shrink-0" />
                    This is a protected system role. Its permissions cannot be reduced below Full Access on any
                    module.
                </div>
            )}

            <section className="rounded-card border border-slate-200 bg-white p-6">
                <h3 className="mb-4 text-sm font-semibold" style={{ color: COLORS.navy }}>
                    Role Identity
                </h3>
                <div className="flex flex-col gap-4">
                    <TextField
                        label="Role Name"
                        value={name}
                        disabled={role.isSystemRole}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium" style={{ color: COLORS.navy }}>
                            Description
                        </label>
                        <textarea
                            rows={2}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D81a]"
                            style={{ color: COLORS.navy }}
                        />
                    </div>
                </div>
            </section>

            <section className="rounded-card border border-slate-200 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold" style={{ color: COLORS.navy }}>
                        Module Access
                    </h3>
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                        <Info size={12} />
                        Users with this role will only see enabled modules in their sidebar.
                    </span>
                </div>
                <PermissionMatrix
                    modules={SYSTEM_MODULES}
                    permissions={permissions}
                    onChange={updatePermission}
                    disabled={role.isSystemRole}
                />
            </section>

            <section className="rounded-card border border-slate-200 bg-white p-6">
                <h3 className="mb-3 text-sm font-semibold" style={{ color: COLORS.navy }}>
                    Preview: Sidebar for {name || "this role"}
                </h3>
                {enabledModules.length === 0 ? (
                    <p className="text-sm" style={{ color: COLORS.gray }}>
                        No modules enabled — users with this role would see an empty sidebar.
                    </p>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {enabledModules.map((m) => (
                            <span
                                key={m.id}
                                className="rounded-full px-3 py-1.5 text-xs font-medium"
                                style={{ backgroundColor: `${COLORS.blue}1a`, color: COLORS.blue }}
                            >
                                {m.label}
                            </span>
                        ))}
                    </div>
                )}
            </section>

            <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button onClick={handleSave}>
                    <Save size={16} /> Save Role
                </Button>
            </div>
        </div>
    );
}