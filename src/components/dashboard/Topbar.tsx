"use client";

import { useState } from "react";
import { ShieldCheck, Bell } from "lucide-react";
import {COLORS} from "@/constants/colors";

type RangeOption = "Today" | "Week" | "Month";
const ranges: RangeOption[] = ["Today", "Week", "Month"];

export default function Topbar() {
    const [range, setRange] = useState<RangeOption>("Today");

    return (
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-white px-6 py-4">
            <div className="flex items-center gap-3">
        <span
            className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: COLORS.teal }}
        >
          <ShieldCheck size={20} />
        </span>
                <div>
                    <h1 className="text-[1.15rem] font-bold leading-tight" style={{ color: COLORS.navy }}>
                        Shri Ram Hospital
                    </h1>
                    <p className="text-[0.8rem]" style={{ color: COLORS.gray }}>
                        Advanced Care. Centralized Control.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
        <span
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.78rem] font-semibold"
            style={{ backgroundColor: `${COLORS.green}1a`, color: COLORS.greenDark }}
        >
          <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: COLORS.green }}
          />
          Live Updates
        </span>

                <div className="flex items-center rounded-lg border border-slate-200 p-1">
                    {ranges.map((option) => {
                        const active = option === range;
                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setRange(option)}
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
                    aria-label="Notifications"
                    className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500"
                >
                    <Bell size={17} />
                    <span
                        className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white"
                        style={{ backgroundColor: COLORS.blue }}
                    />
                </button>

                <div className="flex items-center gap-2.5">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-full text-[0.85rem] font-bold text-white"
                        style={{ backgroundColor: COLORS.blueLight }}
                    >
                        SA
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-[0.88rem] font-semibold leading-tight" style={{ color: COLORS.navy }}>
                            Super Admin
                        </p>
                        <p className="text-[0.75rem]" style={{ color: COLORS.gray }}>
                            System Manager
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}