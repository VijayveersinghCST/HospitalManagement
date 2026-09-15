// Statusbadge.tsx
import { ReceptionistStatus } from "./Receptionist";
import { COLORS } from "@/constants/colors";

const STATUS_STYLES: Record<ReceptionistStatus, { bg: string; text: string }> = {
    Active: { bg: `${COLORS.green}1a`, text: COLORS.green },
    Offline: { bg: "#F1F5F9", text: COLORS.gray },
    "On Leave": { bg: `${COLORS.teal}1a`, text: COLORS.teal },
};

export default function StatusBadge({ status }: { status: ReceptionistStatus }) {
    const style = STATUS_STYLES[status];
    return (
        <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
            style={{ backgroundColor: style.bg, color: style.text }}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {status}
        </span>
    );
}