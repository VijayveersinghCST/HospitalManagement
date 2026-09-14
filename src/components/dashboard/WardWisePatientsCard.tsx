import {COLORS} from "@/constants/colors";
import type { WardProgress } from "./Dashboard";

const wards: WardProgress[] = [
    { id: "general", label: "General Ward", current: 450, total: 500, barColor: COLORS.blue },
    { id: "icu", label: "ICU", current: 42, total: 50, barColor: COLORS.blueDark },
    { id: "ventilator", label: "Ventilator", current: 12, total: 20, barColor: COLORS.teal },
    { id: "emergency", label: "Emergency", current: 18, total: 30, barColor: COLORS.greenDark },
];

export default function WardWisePatientsCard() {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between">
                <p className="text-[0.9rem] font-semibold" style={{ color: COLORS.navy }}>
                    Ward-wise Patients
                </p>
                <button type="button" className="text-[0.78rem] font-semibold" style={{ color: COLORS.blue }}>
                    Details
                </button>
            </div>

            <div className="mt-4 flex flex-col gap-4">
                {wards.map((ward) => {
                    const percent = Math.round((ward.current / ward.total) * 100);
                    return (
                        <div key={ward.id}>
                            <div className="flex items-center justify-between text-[0.82rem]">
                                <span style={{ color: COLORS.navy }}>{ward.label}</span>
                                <span className="font-semibold" style={{ color: COLORS.navy }}>
                  {ward.current} / {ward.total}
                </span>
                            </div>
                            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full"
                                    style={{ width: `${percent}%`, backgroundColor: ward.barColor }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}