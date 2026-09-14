import { Users, CheckCircle2, CalendarClock, BellOff } from "lucide-react";
import StatCard from "./StatCard";
import { COLORS } from "@/constants/colors";

export default function StatsRow() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
                label="Total Receptionists"
                value="24"
                icon={<Users size={16} />}
                iconBg={`${COLORS.blue}1a`}
                iconColor={COLORS.blue}
                footnote="↗ +2 this month"
                footnoteColor={COLORS.greenDark}
            />

            <StatCard
                label="Active Today"
                value="18"
                icon={<CheckCircle2 size={16} />}
                iconBg={`${COLORS.green}1a`}
                iconColor={COLORS.greenDark}
                progressPercent={75}
            />

            <StatCard
                label="On Leave"
                value="4"
                icon={<CalendarClock size={16} />}
                iconBg={`${COLORS.teal}1a`}
                iconColor={COLORS.teal}
                footnote="2 Sick leave, 2 Casual"
            />

            <StatCard
                label="Unassigned Desks"
                value="2"
                icon={<BellOff size={16} />}
                iconBg={`${COLORS.blueDark}14`}
                iconColor={COLORS.blueDark}
                footnote="Action required"
                footnoteColor={COLORS.blueDark}
            />
        </div>
    );
}