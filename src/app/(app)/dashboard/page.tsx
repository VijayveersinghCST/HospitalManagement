import Topbar from "@/components/dashboard/Topbar";
import StatsGrid from "@/components/dashboard/StatsGrid";
import SummaryRow from "@/components/dashboard/SummaryRow";
import BottomRow from "@/components/dashboard/BottomRow";

export default function AppDashboardPage() {
    return (
        <div className="h-screen bg-[#eef1f3]">
            <div className="h-full overflow-y-auto rounded-none border-0 border-[#d4c5e2] bg-white shadow-none">
                <div className="flex flex-col">
                    <Topbar />

                    <main className="flex flex-col gap-4 bg-[#f7f8fa] p-5">
                        <StatsGrid />
                        <SummaryRow />
                        <BottomRow />
                    </main>
                </div>
            </div>
        </div>
    );
}