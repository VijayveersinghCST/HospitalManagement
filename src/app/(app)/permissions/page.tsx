"use client";

import { useMemo, useState } from "react";
import {
    Shield,
    Users,
    LayoutGrid,
    KeyRound,
    Search,
    Plus,
    X,
    ChevronRight,
    Pencil,
    Check,
    ChevronDown,
} from "lucide-react";
import { usePermissionsStore, type Role } from "@/store/permissions";
import { PERMISSION_MODULES, PERMISSION_ROWS, ALL_PERMISSION_KEYS, VIEW_ROWS_BY_NAV_KEY } from "@/lib/permissions-catalog";
import { filterNavItems } from "@/lib/navFilter";
import { NAV_ITEMS } from "@/lib/navigation";

export default function RolesPermissionsPage() {
    const roles = usePermissionsStore((s) => s.roles);
    const addRole = usePermissionsStore((s) => s.addRole);
    const renameRole = usePermissionsStore((s) => s.renameRole);
    const togglePermission = usePermissionsStore((s) => s.togglePermission);

    const [query, setQuery] = useState("");
    const [selectedRoleId, setSelectedRoleId] = useState<string>(roles[0]?.id ?? "");
    const [activeModuleKey, setActiveModuleKey] = useState<string | "ALL">("ALL");
    const [newRoleModalOpen, setNewRoleModalOpen] = useState(false);
    const [editRoleModalOpen, setEditRoleModalOpen] = useState(false);

    const selectedRole = roles.find((r) => r.id === selectedRoleId) ?? roles[0];

    const filteredRoles = useMemo(
        () => roles.filter((r) => r.name.toLowerCase().includes(query.toLowerCase())),
        [roles, query]
    );

    const visibleRows = useMemo(
        () => (activeModuleKey === "ALL" ? PERMISSION_ROWS : PERMISSION_ROWS.filter((r) => r.moduleKey === activeModuleKey)),
        [activeModuleKey]
    );

    // Group rows by the sidebar label they govern (a module, or one of its
    // children). Keyed by moduleKey+navLabel, not navLabel alone, since two
    // different modules can have a same-named child (e.g. Pharmacy's "Staff
    // Management" vs. the top-level "Staff Management" module) — grouping
    // by label alone would merge those into one incorrect checkbox group.
    const groupedRows = useMemo(() => {
        const groups = new Map<string, typeof PERMISSION_ROWS>();
        for (const row of visibleRows) {
            const groupKey = `${row.moduleKey}::${row.navLabel}`;
            const list = groups.get(groupKey) ?? [];
            list.push(row);
            groups.set(groupKey, list);
        }
        return Array.from(groups.entries());
    }, [visibleRows]);

    const grantedCount = selectedRole?.permissions.length ?? 0;
    const totalPermissions = ALL_PERMISSION_KEYS.length;

    const isVisibleForSelectedRole = (navLabel: string, parentLabel?: string): boolean => {
        const lookupKey = parentLabel ? `${parentLabel}::${navLabel}` : navLabel;
        const row = VIEW_ROWS_BY_NAV_KEY.get(lookupKey);
        if (!row || !selectedRole) return true;
        return selectedRole.permissions.includes(row.key);
    };

    const previewNav = useMemo(
        () => filterNavItems(NAV_ITEMS, isVisibleForSelectedRole),
        [selectedRole]
    );

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-1 text-sm text-slate-400">
                    <span>Dashboard</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span>User &amp; Role Management</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="text-slate-600">Roles &amp; Permissions</span>
                </div>

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Roles &amp; Permissions</h1>
                    <p className="text-sm text-slate-500">
                        Manage role-based access control. Turning off a module or submodule here removes it from that role&apos;s sidebar.
                    </p>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <StatCard label="Total Roles" value={roles.length} icon={Shield} accent="blue" />
                    <StatCard label="System Roles" value={roles.filter((r) => r.isSystem).length} icon={Users} accent="purple" />
                    <StatCard label="Custom Roles" value={roles.filter((r) => !r.isSystem).length} icon={LayoutGrid} accent="orange" />
                    <StatCard label="Total Permissions" value={totalPermissions} icon={KeyRound} accent="green" />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]">
                    {/* Roles list */}
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900">
                                <Shield className="h-4 w-4 text-blue-600" /> All Roles
                            </h2>
                            <button
                                onClick={() => setNewRoleModalOpen(true)}
                                className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
                            >
                                <Plus className="h-3.5 w-3.5" /> New Role
                            </button>
                        </div>

                        <div className="relative mb-3">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search roles..."
                                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                            />
                        </div>

                        <div className="max-h-[540px] space-y-1 overflow-y-auto">
                            {filteredRoles.map((role) => (
                                <button
                                    key={role.id}
                                    onClick={() => {
                                        setSelectedRoleId(role.id);
                                        setActiveModuleKey("ALL");
                                    }}
                                    className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition ${
                                        selectedRole?.id === role.id
                                            ? "border-blue-200 bg-blue-50"
                                            : "border-transparent hover:bg-slate-50"
                                    }`}
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                                        {role.name.charAt(0)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold text-slate-800">{role.name}</p>
                                        <p className="truncate text-xs text-slate-400">{role.description}</p>
                                    </div>
                                    <span
                                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                            role.isSystem ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"
                                        }`}
                                    >
                                        {role.isSystem ? "System" : "Custom"}
                                    </span>
                                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
                                </button>
                            ))}
                            {filteredRoles.length === 0 && (
                                <p className="px-3 py-6 text-center text-sm text-slate-400">No roles match your search.</p>
                            )}
                        </div>
                    </div>

                    {/* Selected role: modules + permissions */}
                    <div className="space-y-6">
                        {selectedRole && (
                            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                                            {selectedRole.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-base font-semibold text-slate-900">{selectedRole.name}</h3>
                                                <span
                                                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                                        selectedRole.isSystem ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"
                                                    }`}
                                                >
                                                    {selectedRole.isSystem ? "System Role" : "Custom Role"}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-500">{selectedRole.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-slate-500">
                                            {grantedCount} / {totalPermissions} permissions granted
                                        </span>
                                        <button
                                            onClick={() => setEditRoleModalOpen(true)}
                                            className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                                        >
                                            <Pencil className="h-3.5 w-3.5" /> Edit Role
                                        </button>
                                    </div>
                                </div>

                                {/* Module tabs */}
                                <div className="mb-4 flex flex-wrap gap-1.5 border-b border-slate-100 pb-4">
                                    <button
                                        onClick={() => setActiveModuleKey("ALL")}
                                        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                                            activeModuleKey === "ALL" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        }`}
                                    >
                                        All Modules
                                    </button>
                                    {PERMISSION_MODULES.map((mod) => (
                                        <button
                                            key={mod.key}
                                            onClick={() => setActiveModuleKey(mod.key)}
                                            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
                                                activeModuleKey === mod.key
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                            }`}
                                        >
                                            {mod.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Permission rows, grouped by the sidebar label they govern */}
                                <div className="max-h-[520px] space-y-5 overflow-y-auto pr-1">
                                    {groupedRows.map(([groupKey, rows]) => {
                                        const grantedInGroup = rows.filter((r) => selectedRole.permissions.includes(r.key)).length;
                                        return (
                                            <div key={groupKey} className="rounded-lg border border-slate-100">
                                                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                                        <h4 className="text-xs font-bold uppercase tracking-wide text-slate-600">{rows[0].navLabel}</h4>
                                                        {activeModuleKey === "ALL" && (
                                                            <span className="text-[10px] text-slate-400">({rows[0].moduleLabel})</span>
                                                        )}
                                                    </div>
                                                    <span className="text-[10px] text-slate-400">
                                                        {grantedInGroup}/{rows.length} assigned
                                                    </span>
                                                </div>
                                                <div className="divide-y divide-slate-100">
                                                    {rows.map((row) => {
                                                        const checked = selectedRole.permissions.includes(row.key);
                                                        return (
                                                            <label
                                                                key={row.key}
                                                                className="flex cursor-pointer items-start gap-3 px-4 py-3 hover:bg-slate-50"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={checked}
                                                                    onChange={() => togglePermission(selectedRole.id, row.key)}
                                                                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                                />
                                                                <div className="min-w-0">
                                                                    <p className="text-sm font-medium text-slate-800">{row.label}</p>
                                                                    <p className="font-mono text-[11px] text-slate-400">{row.key}</p>
                                                                </div>
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Live sidebar preview */}
                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h3 className="mb-1 text-sm font-semibold text-slate-900">
                                Sidebar Preview — {selectedRole?.name ?? "—"}
                            </h3>
                            <p className="mb-4 text-xs text-slate-400">
                                Updates instantly as you toggle permissions above. Built from this permission catalog, so it may
                                differ slightly from the real sidebar until submodule labels are aligned to your actual navigation.ts.
                            </p>
                            <div className="max-w-xs rounded-lg border border-slate-200 bg-slate-50 p-2">
                                {previewNav.length === 0 && (
                                    <p className="px-2 py-4 text-center text-xs text-slate-400">
                                        No modules visible for this role.
                                    </p>
                                )}
                                {previewNav.map((item) => (
                                    <PreviewNavItem key={item.label} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {newRoleModalOpen && (
                <NewRoleModal
                    onClose={() => setNewRoleModalOpen(false)}
                    onSubmit={(name, description) => {
                        const id = addRole(name, description);
                        setSelectedRoleId(id);
                        setNewRoleModalOpen(false);
                    }}
                />
            )}

            {editRoleModalOpen && selectedRole && (
                <EditRoleModal
                    role={selectedRole}
                    onClose={() => setEditRoleModalOpen(false)}
                    onSubmit={(name, description) => {
                        renameRole(selectedRole.id, name, description);
                        setEditRoleModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}

/* ---------------------------------------------------------------------- */
/* Small presentational pieces                                            */
/* ---------------------------------------------------------------------- */

function StatCard({
                      label,
                      value,
                      icon: Icon,
                      accent,
                  }: {
    label: string;
    value: string | number;
    icon: any;
    accent: "blue" | "purple" | "orange" | "green";
}) {
    const map = {
        blue: { bg: "bg-blue-50", text: "text-blue-600", bar: "bg-blue-500" },
        purple: { bg: "bg-purple-50", text: "text-purple-600", bar: "bg-purple-500" },
        orange: { bg: "bg-orange-50", text: "text-orange-600", bar: "bg-orange-500" },
        green: { bg: "bg-green-50", text: "text-green-600", bar: "bg-green-500" },
    } as const;
    const c = map[accent];
    return (
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.bg}`}>
                    <Icon className={`h-5 w-5 ${c.text}`} />
                </div>
                <div>
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="text-xl font-bold text-slate-900">{value}</p>
                </div>
            </div>
            <span className={`absolute bottom-0 left-0 h-1 w-full ${c.bar}`} />
        </div>
    );
}

function PreviewNavItem({ item }: { item: { label: string; href?: string; children?: { label: string; href: string }[] } }) {
    const [open, setOpen] = useState(true);

    if (item.children && item.children.length > 0) {
        return (
            <div>
                <button
                    onClick={() => setOpen((o) => !o)}
                    className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-white"
                >
                    <span className="truncate">{item.label}</span>
                    <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && (
                    <div className="ml-3 space-y-0.5 border-l border-slate-200 pl-2">
                        {item.children.map((child) => (
                            <div key={child.label} className="truncate rounded-md px-2 py-1 text-[11px] text-slate-500 hover:bg-white">
                                {child.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return <div className="truncate rounded-md px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-white">{item.label}</div>;
}

function NewRoleModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (name: string, description: string) => void }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const submit = () => {
        if (!name.trim()) return setError("Role name is required.");
        onSubmit(name.trim(), description.trim());
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <h3 className="text-base font-semibold text-slate-900">New Role</h3>
                    <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="space-y-4 px-5 py-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Role Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Lab Technician"
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g. Access to lab orders and results"
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        />
                    </div>
                    <p className="text-xs text-slate-400">
                        New roles start with no permissions granted — turn on the modules this role should see afterward.
                    </p>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <div className="flex justify-end gap-2 pt-2">
                        <button onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                            Cancel
                        </button>
                        <button onClick={submit} className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                            <Check className="h-4 w-4" /> Create Role
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EditRoleModal({
                           role,
                           onClose,
                           onSubmit,
                       }: {
    role: Role;
    onClose: () => void;
    onSubmit: (name: string, description: string) => void;
}) {
    const [name, setName] = useState(role.name);
    const [description, setDescription] = useState(role.description);
    const [error, setError] = useState("");

    const submit = () => {
        if (!name.trim()) return setError("Role name is required.");
        onSubmit(name.trim(), description.trim());
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <h3 className="text-base font-semibold text-slate-900">Edit Role</h3>
                    <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="space-y-4 px-5 py-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Role Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        />
                    </div>
                    {role.isSystem && (
                        <p className="text-xs text-slate-400">
                            This is a System role. Renaming it won&apos;t change its permissions — toggle those from the checklist.
                        </p>
                    )}
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <div className="flex justify-end gap-2 pt-2">
                        <button onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                            Cancel
                        </button>
                        <button onClick={submit} className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                            <Check className="h-4 w-4" /> Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}