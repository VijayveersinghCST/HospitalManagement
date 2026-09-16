import Link from "next/link";
import { ChevronRight, Plus, Search, SlidersHorizontal } from "lucide-react";
import Button from "@/components/receptionist/Button";
import { Department, Ward, InventoryItem } from "./Hospitalconfig";
import { COLORS } from "@/constants/colors";

function initials(name: string) {
    return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
    Active: { bg: `${COLORS.green}1a`, text: COLORS.green },
    Maintenance: { bg: "#FEF3C7", text: "#B45309" },
    Retired: { bg: "#F1F5F9", text: COLORS.gray },
};

function SearchBox({ placeholder }: { placeholder: string }) {
    return (
        <div className="relative">
            <Search
                size={14}
                className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2"
                style={{ color: COLORS.gray }}
            />
            <input
                placeholder={placeholder}
                className="w-48 rounded-lg border border-slate-200 py-1.5 pl-8 pr-2 text-xs outline-none focus:border-[#1565D8]"
                style={{ color: COLORS.navy }}
            />
        </div>
    );
}

export default function ConfiguredAssetsSummary({
                                                    departments,
                                                    wards,
                                                    inventory,
                                                }: {
    departments: Department[];
    wards: Ward[];
    inventory: InventoryItem[];
}) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between">
                <div>
                    <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                        <span>Dashboard</span>
                        <ChevronRight size={12} />
                        <span>Configuration</span>
                        <ChevronRight size={12} />
                        <span style={{ color: COLORS.navy }}>Configured Hospital Assets</span>
                    </nav>
                    <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                        Configured Hospital Assets
                    </h1>
                    <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                        Overview of configured departments, wards, and equipment inventory for Shri Ram Hospital.
                    </p>
                </div>
                <Link href="/hospital-config/departments/add">
                    <Button>
                        <Plus size={16} /> Configure New Asset
                    </Button>
                </Link>
            </div>

            {/* Departments */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
                        Departments List
                    </h3>
                    <SearchBox placeholder="Search departments..." />
                </div>
                <table className="w-full text-left text-sm">
                    <thead>
                    <tr className="border-b border-slate-100 text-xs uppercase" style={{ color: COLORS.gray }}>
                        <th className="pb-2 font-medium">Department Name</th>
                        <th className="pb-2 font-medium">Code</th>
                        <th className="pb-2 font-medium">Head of Department</th>
                        <th className="pb-2 font-medium">Specialization</th>
                        <th className="pb-2 font-medium">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {departments.map((d) => (
                        <tr key={d.id} className="border-b border-slate-50 last:border-0">
                            <td className="py-2.5 font-medium" style={{ color: COLORS.blue }}>
                                {d.name}
                            </td>
                            <td className="py-2.5" style={{ color: COLORS.gray }}>
                                {d.code}
                            </td>
                            <td className="py-2.5" style={{ color: COLORS.navy }}>
                                {d.headOfDepartment}
                            </td>
                            <td className="py-2.5" style={{ color: COLORS.navy }}>
                                {d.specialization}
                            </td>
                            <td className="py-2.5">
                                <Link href="/hospital-config/departments" className="text-xs font-medium hover:underline" style={{ color: COLORS.blue }}>
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            {/* Wards & Rooms */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
                        Wards &amp; Rooms Overview
                    </h3>
                    <SearchBox placeholder="Search wards..." />
                </div>
                <table className="w-full text-left text-sm">
                    <thead>
                    <tr className="border-b border-slate-100 text-xs uppercase" style={{ color: COLORS.gray }}>
                        <th className="pb-2 font-medium">Ward Name</th>
                        <th className="pb-2 font-medium">Total Rooms</th>
                        <th className="pb-2 font-medium">Total Beds</th>
                        <th className="pb-2 font-medium">Available Beds</th>
                        <th className="pb-2 font-medium">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {wards.slice(0, 3).map((w) => (
                        <tr key={w.id} className="border-b border-slate-50 last:border-0">
                            <td className="py-2.5" style={{ color: COLORS.blue }}>
                                <span className="font-medium">{w.name}</span>
                                <div className="text-xs" style={{ color: COLORS.gray }}>{w.location}</div>
                            </td>
                            <td className="py-2.5" style={{ color: COLORS.navy }}>
                                {w.roomsLabel}
                            </td>
                            <td className="py-2.5" style={{ color: COLORS.navy }}>
                                {w.totalBeds}
                            </td>
                            <td className="py-2.5">
                                    <span
                                        className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium"
                                        style={{ backgroundColor: `${w.occupancyColor}1a`, color: w.occupancyColor }}
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                        {w.availableBeds} Available
                                    </span>
                            </td>
                            <td className="py-2.5">
                                <Link href="/hospital-config/wards" className="text-xs font-medium hover:underline" style={{ color: COLORS.blue }}>
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            {/* Equipment & Consumables */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
                        Equipment &amp; Consumables Summary
                    </h3>
                    <SearchBox placeholder="Search items..." />
                </div>
                <table className="w-full text-left text-sm">
                    <thead>
                    <tr className="border-b border-slate-100 text-xs uppercase" style={{ color: COLORS.gray }}>
                        <th className="pb-2 font-medium">Item Name</th>
                        <th className="pb-2 font-medium">Type</th>
                        <th className="pb-2 font-medium">Quantity / Status</th>
                        <th className="pb-2 font-medium">Maintenance / Expiry</th>
                        <th className="pb-2 font-medium">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {inventory.map((item) => {
                        const statusStyle = item.status ? STATUS_STYLES[item.status] : null;
                        return (
                            <tr key={item.id} className="border-b border-slate-50 last:border-0">
                                <td className="py-2.5 font-medium" style={{ color: COLORS.blue }}>
                                    {item.name}
                                </td>
                                <td className="py-2.5" style={{ color: COLORS.navy }}>
                                    {item.type}
                                </td>
                                <td className="py-2.5">
                                    {statusStyle ? (
                                        <span
                                            className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium"
                                            style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                                        >
                                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                            {item.quantityOrStatus}
                                            </span>
                                    ) : (
                                        <span style={{ color: COLORS.navy }}>{item.quantityOrStatus}</span>
                                    )}
                                </td>
                                <td className="py-2.5" style={{ color: COLORS.gray }}>
                                    {item.maintenanceOrExpiryLabel}
                                </td>
                                <td className="py-2.5">
                                    <Link href="/hospital-config/equipment" className="text-xs font-medium hover:underline" style={{ color: COLORS.blue }}>
                                        View
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </section>
        </div>
    );
}