"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";
import { ShiftLabel, SHIFT_LABELS, SHIFT_TIME_PRESETS, WEEK_DAY_OPTIONS } from "./shiftconfig";
import { COLORS } from "@/constants/colors";

interface ShiftEditPopoverProps {
    currentShift: ShiftLabel;
    currentStart: string;
    currentEnd: string;
    currentDays: string[];
    onSave: (shift: ShiftLabel, start: string, end: string, days: string[]) => void;
    onClose: () => void;
}

export default function ShiftEditPopover({
                                             currentShift,
                                             currentStart,
                                             currentEnd,
                                             currentDays,
                                             onSave,
                                             onClose,
                                         }: ShiftEditPopoverProps) {
    const [shift, setShift] = useState<ShiftLabel>(currentShift);
    const [start, setStart] = useState(currentStart || SHIFT_TIME_PRESETS[currentShift].start);
    const [end, setEnd] = useState(currentEnd || SHIFT_TIME_PRESETS[currentShift].end);
    const [days, setDays] = useState<string[]>(currentDays);

    const applyPreset = (label: ShiftLabel) => {
        setShift(label);
        setStart(SHIFT_TIME_PRESETS[label].start);
        setEnd(SHIFT_TIME_PRESETS[label].end);
    };

    const toggleDay = (day: string) => {
        setDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
    };

    return (
        <div className="absolute right-0 top-full z-20 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold" style={{ color: COLORS.navy }}>
                    Update Shift
                </span>
                <button onClick={onClose} style={{ color: COLORS.gray }}>
                    <X size={16} />
                </button>
            </div>

            <div className="mb-3 flex flex-wrap gap-1.5">
                {SHIFT_LABELS.map((label) => (
                    <button
                        key={label}
                        type="button"
                        onClick={() => applyPreset(label)}
                        className="rounded-full border px-2.5 py-1 text-xs font-medium transition"
                        style={
                            shift === label
                                ? { borderColor: COLORS.blueLight, backgroundColor: `${COLORS.blue}0d`, color: COLORS.blue }
                                : { borderColor: "#E2E8F0", backgroundColor: "#FFFFFF", color: COLORS.gray }
                        }
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="mb-3 grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium" style={{ color: COLORS.navy }}>
                        Start
                    </label>
                    <input
                        type="time"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm outline-none focus:border-[#1565D8]"
                        style={{ color: COLORS.navy }}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium" style={{ color: COLORS.navy }}>
                        End
                    </label>
                    <input
                        type="time"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                        className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm outline-none focus:border-[#1565D8]"
                        style={{ color: COLORS.navy }}
                    />
                </div>
            </div>

            <div className="mb-4 flex flex-col gap-1.5">
                <span className="text-xs font-medium" style={{ color: COLORS.navy }}>
                    Working Days
                </span>
                <div className="flex flex-wrap gap-1.5">
                    {WEEK_DAY_OPTIONS.map((day) => {
                        const selected = days.includes(day);
                        return (
                            <button
                                key={day}
                                type="button"
                                onClick={() => toggleDay(day)}
                                className="rounded-md px-2 py-1 text-[11px] font-medium"
                                style={
                                    selected
                                        ? { backgroundColor: COLORS.blue, color: "#FFFFFF" }
                                        : { backgroundColor: "#F1F5F9", color: COLORS.gray }
                                }
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>
            </div>

            <button
                type="button"
                onClick={() => onSave(shift, start, end, days)}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium text-white"
                style={{ backgroundColor: COLORS.blue }}
            >
                <Check size={14} /> Apply Shift
            </button>
        </div>
    );
}