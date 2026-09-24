import { AccessLevel } from "./Userroles";
import { COLORS } from "@/constants/colors";

const STYLES: Record<AccessLevel, { bg: string; text: string }> = {
    "No Access": { bg: "#F1F5F9", text: COLORS.gray },
    "View Only": { bg: "#FEF3C7", text: "#B45309" },
    "Full Access": { bg: `${COLORS.green}1a`, text: COLORS.green },
};

export default function AccessLevelBadge({ level }: { level: AccessLevel }) {
    const style = STYLES[level];
    return (
        <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
            style={{ backgroundColor: style.bg, color: style.text }}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {level}
        </span>
    );
}