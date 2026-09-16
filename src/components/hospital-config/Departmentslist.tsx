import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import Button from "@/components/receptionist/Button";
import { Department } from "./Hospitalconfig";
import { COLORS } from "@/constants/colors";

function initials(name: string) {
    return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export default function DepartmentsList({ departments }: { departments: Department[] }) {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between">
                <div>
                    <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                        <span>Dashboard</span>
                        <ChevronRight size={12} />
                        <span style={{ color: COLORS.navy }}>Departments</span>
                    </nav>
                    <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                        Departments
                    </h1>
                    <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                        All configured hospital departments and their leadership.
                    </p>
                </div>
                <Link href="/hospital-config/departments/add">
                    <Button>
                        <Plus size={16} /> Add Department
                    </Button>
                </Link>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                    <thead>
                    <tr className="border-b border-slate-100 text-xs uppercase" style={{ color: COLORS.gray }}>
                        <th className="px-4 py-3 font-medium">Department Name</th>
                        <th className="px-4 py-3 font-medium">Code</th>
                        <th className="px-4 py-3 font-medium">Head of Department</th>
                        <th className="px-4 py-3 font-medium">Specialization</th>
                    </tr>
                    </thead>
                    <tbody>
                    {departments.map((d) => (
                        <tr key={d.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                            <td className="px-4 py-3 font-medium" style={{ color: COLORS.blue }}>
                                {d.name}
                            </td>
                            <td className="px-4 py-3" style={{ color: COLORS.gray }}>
                                {d.code}
                            </td>
                            <td className="px-4 py-3">
                                    <span className="flex items-center gap-2">
                                        <span
                                            className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                                            style={{ backgroundColor: d.hodAvatarColor }}
                                        >
                                            {initials(d.headOfDepartment)}
                                        </span>
                                        <span style={{ color: COLORS.navy }}>{d.headOfDepartment}</span>
                                    </span>
                            </td>
                            <td className="px-4 py-3" style={{ color: COLORS.navy }}>
                                {d.specialization}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}