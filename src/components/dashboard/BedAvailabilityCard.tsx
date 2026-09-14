import {COLORS} from "@/constants/colors";
import type { BedType } from "./Dashboard";

const beds: BedType[] = [
    { id: "general", label: "General", available: 50, status: "normal" },
    { id: "private", label: "Private", available: 24, status: "normal" },
    { id: "icu", label: "ICU", available: 8, status: "critical" },
    { id: "semi-pvt", label: "Semi-Pvt", available: 45, status: "normal" },
];

const statusStyles: Record<BedType["status"], { bg: string; text: string }> = {
    normal: { bg: "#F8FAFC", text: COLORS.navy },
    critical: { bg: `${COLORS.blueDark}14`, text: COLORS.blueDark },
    highlight: { bg: `${COLORS.teal}14`, text: COLORS.teal },
};

export default function BedAvailabilityCard() {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between">
                <p className="text-[0.9rem] font-semibold" style={{ color: COLORS.navy }}>
                    Bed Availability
                </p>
                <span
                    className="rounded-full px-2.5 py-1 text-[0.72rem] font-semibold"
                    style={{ backgroundColor: `${COLORS.green}1a`, color: COLORS.greenDark }}
                >
          145 Free
        </span>
            </div>
            <p className="mt-0.5 text-[0.76rem]" style={{ color: COLORS.gray }}>
                Total Capacity: 850 Beds
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
                {beds.map((bed) => {
                    const style = statusStyles[bed.status];
                    return (
                        <div key={bed.id} className="rounded-xl p-3" style={{ backgroundColor: style.bg }}>
                            <p className="text-[0.8rem] font-medium" style={{ color: style.text }}>
                                {bed.label}
                            </p>
                            <p className="mt-1 text-[1.1rem] font-extrabold" style={{ color: style.text }}>
                                {bed.status === "critical" ? String(bed.available).padStart(2, "0") : bed.available}{" "}
                                <span className="text-[0.72rem] font-semibold uppercase">
                  {bed.status === "critical" ? "Critical" : "Avail"}
                </span>
                            </p>
                        </div>
                    );
                })}
            </div>

            <div
                className="mt-3 flex items-center justify-between rounded-xl p-3"
                style={{ backgroundColor: `${COLORS.teal}14` }}
            >
                <div>
                    <p className="text-[0.8rem] font-medium" style={{ color: COLORS.teal }}>
                        Emergency
                    </p>
                    <p className="text-[0.72rem]" style={{ color: COLORS.teal }}>
                        Trauma Center
                    </p>
                </div>
                <p className="text-[1.1rem] font-extrabold" style={{ color: COLORS.teal }}>
                    12 <span className="text-[0.72rem] font-semibold uppercase">Avail</span>
                </p>
            </div>
        </div>
    );
}