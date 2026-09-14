"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { COLORS } from "@/constants/colors";

type DeskFilter = "All Staff" | "OPD" | "IPD";
const deskFilters: DeskFilter[] = ["All Staff", "OPD", "IPD"];

export default function TableToolbar() {
    const [deskFilter, setDeskFilter] = useState<DeskFilter>("All Staff");

    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative w-full max-w-xs">
                <Search
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
                    style={{ color: COLORS.gray }}
                />
                <input
                    type="text"
                    placeholder="Search by name, ID..."
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-[0.86rem] outline-none transition focus:border-[#1565D8]"
                    style={{ color: COLORS.navy }}
                />
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center rounded-lg border border-slate-200 p-1">
                    {deskFilters.map((option) => {
                        const active = option === deskFilter;
                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setDeskFilter(option)}
                                className="rounded-md px-3 py-1.5 text-[0.8rem] font-medium transition"
                                style={
                                    active
                                        ? { backgroundColor: COLORS.navy, color: "#FFFFFF" }
                                        : { color: COLORS.gray }
                                }
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[0.82rem] font-medium"
                    style={{ color: COLORS.navy }}
                >
                    Status: All
                    <ChevronDown size={14} style={{ color: COLORS.gray }} />
                </button>
            </div>
        </div>
    );
}