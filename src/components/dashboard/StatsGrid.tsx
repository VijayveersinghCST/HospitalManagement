import { ClipboardList, Stethoscope, UsersRound, Landmark } from "lucide-react";
import StatCard from "./StatCard";
import {COLORS} from "@/constants/colors";

export default function StatsGrid() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
                icon={<ClipboardList size={20} />}
                iconBg={COLORS.blue}
                title="Total Patients"
                value="1,245"
                valueSuffix="active records"
                badgeText="↗ +5.2%"
                badgeTone="positive"
                footnoteLabel="New Admissions (Today)"
                footnoteValue="+24"
            />

            <StatCard
                icon={<Stethoscope size={20} />}
                iconBg={COLORS.teal}
                title="Doctors Overview"
                value="142"
                valueSuffix="on payroll"
                badgeText="Total"
                badgeTone="neutral"
                legend={[
                    { label: "Male: 85", color: COLORS.blue },
                    { label: "Female: 57", color: COLORS.blueLight },
                ]}
            />

            <StatCard
                icon={<UsersRound size={20} />}
                iconBg={COLORS.blueLight}
                title="Nursing Staff"
                value="350"
                valueSuffix="total staff"
                badgeText="98% present"
                badgeTone="positive"
                legend={[
                    { label: "Male: 40", color: COLORS.blue },
                    { label: "Female: 310", color: COLORS.green },
                ]}
            />

            <StatCard
                icon={<Landmark size={20} />}
                iconBg={COLORS.greenDark}
                title="Total Revenue"
                value="$4.2M"
                valueSuffix="YTD"
                topRightLabel="Earnings Today"
                topRightValue="$45,200"
                progressPercent={72}
            />
        </div>
    );
}