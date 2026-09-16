import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import Button from "@/components/receptionist/Button";
import { InventoryItem } from "./Hospitalconfig";
import { COLORS } from "@/constants/colors";

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
    Active: { bg: `${COLORS.green}1a`, text: COLORS.green },
    Maintenance: { bg: "#FEF3C7", text: "#B45309" },
    Retired: { bg: "#F1F5F9", text: COLORS.gray },
};

export default function EquipmentList({ items }: { items: InventoryItem[] }) {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between">
                <div>
                    <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                        <span>Dashboard</span>
                        <ChevronRight size={12} />
                        <span style={{ color: COLORS.navy }}>Medical Equipment</span>
                    </nav>
                    <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                        Medical Equipment
                    </h1>
                    <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                        {items.length} registered equipment and consumable items.
                    </p>
                </div>
                <Link href="/hospital-config/equipment/add">
                    <Button>
                        <Plus size={16} /> Add Equipment
                    </Button>
                </Link>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                    <thead>
                    <tr className="border-b border-slate-100 text-xs uppercase" style={{ color: COLORS.gray }}>
                        <th className="px-4 py-3 font-medium">Item Name</th>
                        <th className="px-4 py-3 font-medium">Model</th>
                        <th className="px-4 py-3 font-medium">Type</th>
                        <th className="px-4 py-3 font-medium">Quantity / Status</th>
                        <th className="px-4 py-3 font-medium">Maintenance / Expiry</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => {
                        const statusStyle = item.status ? STATUS_STYLES[item.status] : null;
                        return (
                            <tr key={item.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                                <td className="px-4 py-3 font-medium" style={{ color: COLORS.blue }}>
                                    {item.name}
                                </td>
                                <td className="px-4 py-3" style={{ color: COLORS.gray }}>
                                    {item.model}
                                </td>
                                <td className="px-4 py-3" style={{ color: COLORS.navy }}>
                                    {item.type}
                                </td>
                                <td className="px-4 py-3">
                                    {statusStyle ? (
                                        <span
                                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                                            style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                                        >
                                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                            {item.quantityOrStatus}
                                            </span>
                                    ) : (
                                        <span style={{ color: COLORS.navy }}>{item.quantityOrStatus}</span>
                                    )}
                                </td>
                                <td className="px-4 py-3" style={{ color: COLORS.gray }}>
                                    {item.maintenanceOrExpiryLabel}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}