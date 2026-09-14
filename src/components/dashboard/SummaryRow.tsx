import { ClipboardCheck, ShieldAlert } from "lucide-react";
import SummaryCard from "./SummaryCard";
import DailyExpensesCard from "./DailyExpensesCard";
import {COLORS} from "@/constants/colors";

export default function SummaryRow() {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <SummaryCard
                icon={<ClipboardCheck size={18} />}
                iconBg={`${COLORS.blue}1a`}
                iconColor={COLORS.blue}
                title="Discharge Summary"
                value="84"
                valueHighlight="+12 Today"
                subtitle="Processed & cleared"
            />

            <SummaryCard
                icon={<ShieldAlert size={18} />}
                iconBg="#F1F5F9"
                iconColor={COLORS.gray}
                title="Mortality Report"
                value="3"
                valueHighlight="0 Today"
                valueHighlightColor={COLORS.gray}
                subtitle="Review required"
            />

            <DailyExpensesCard />
        </div>
    );
}