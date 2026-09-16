"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus } from "lucide-react";
import Button from "@/components/receptionist/Button";
import ConfigStatCards from "./Configstatscards";
import ConfigChangesList from "./Configchangeslist";
import { ConfigStatData, ConfigChangeLog } from "./Hospitalconfig";
import { COLORS } from "@/constants/colors";

export default function HospitalConfigOverview({
                                                   stats,
                                                   changes,
                                               }: {
    stats: ConfigStatData[];
    changes: ConfigChangeLog[];
}) {
    const [search, setSearch] = useState("");

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
                <div className="relative max-w-md flex-1">
                    <Search
                        size={16}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: COLORS.gray }}
                    />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search config, departments..."
                        className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D81a]"
                        style={{ color: COLORS.navy }}
                    />
                </div>
            </div>

            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                        Hospital Configuration
                    </h1>
                    <p className="mt-1 max-w-xl text-sm" style={{ color: COLORS.gray }}>
                        Manage hospital departments, wards, rooms, beds, and medical equipment inventory.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Link href="/hospital-config/departments/add">
                        <Button>
                            <Plus size={16} /> Add Department
                        </Button>
                    </Link>
                    <Link href="/hospital-config/wards">
                        <Button variant="secondary">
                            <Plus size={16} /> Add Ward
                        </Button>
                    </Link>
                    <Link href="/hospital-config/equipment/add">
                        <Button variant="secondary">
                            <Plus size={16} /> Add Equipment
                        </Button>
                    </Link>
                </div>
            </div>

            <ConfigStatCards stats={stats} />
            <ConfigChangesList changes={changes} />
        </div>
    );
}