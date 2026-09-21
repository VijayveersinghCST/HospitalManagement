import { ShiftLabel, SHIFT_BADGE_COLOR } from "./shiftconfig";

export default function ShiftBadge({ shift }: { shift: ShiftLabel }) {
    const color = SHIFT_BADGE_COLOR[shift];
    return (
        <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
            style={{ backgroundColor: `${color}1a`, color }}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {shift}
        </span>
    );
}