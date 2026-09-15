import { PharmacyShift } from "./Pharmacystaff";
import { COLORS } from "@/constants/colors";

const SHIFT_STYLES: Record<PharmacyShift, { bg: string; text: string }> = {
    Morning: { bg: `${COLORS.blue}1a`, text: COLORS.blue },
    Afternoon: { bg: `${COLORS.teal}1a`, text: COLORS.teal },
    Evening: { bg: "#FEF3C7", text: "#B45309" },
    Night: { bg: "#EDE9FE", text: "#7C3AED" },
};

export default function PharmacyShiftBadge({ shift }: { shift: PharmacyShift }) {
    const style = SHIFT_STYLES[shift];
    return (
        <span
            className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
            style={{ backgroundColor: style.bg, color: style.text }}
        >
            {shift}
        </span>
    );
}