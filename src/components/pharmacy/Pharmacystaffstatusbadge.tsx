import { PharmacyStaffStatus } from "./Pharmacystaff";
import { COLORS } from "@/constants/colors";

const STATUS_STYLES: Record<PharmacyStaffStatus, { bg: string; text: string }> = {
    Active: { bg: `${COLORS.green}1a`, text: COLORS.green },
    "On Leave": { bg: "#FEF3C7", text: "#B45309" },
    Inactive: { bg: "#F1F5F9", text: COLORS.gray },
};

export default function PharmacyStaffStatusBadge({ status }: { status: PharmacyStaffStatus }) {
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