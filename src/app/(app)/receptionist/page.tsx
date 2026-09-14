
import PageHeader from "@/components/receptionist/PageHeader";
import StatsRow from "@/components/receptionist/StatsRow";
import TableToolbar from "@/components/receptionist/TableToolbar";
import ReceptionistTable from "@/components/receptionist/ReceptionistTable";
import Pagination from "@/components/receptionist/Pagination";

export default function ReceptionistManagementPage() {
    return (
        <div className="h-screen bg-[#eef1f3]">
            <div className="h-full overflow-y-auto rounded-none border-0 border-[#d4c5e2] bg-white shadow-none">


                <main className="flex flex-col gap-5 bg-[#f7f8fa] p-6">
                    <PageHeader />
                    <StatsRow />

                    <div className="flex flex-col gap-4">
                        <TableToolbar />
                        <ReceptionistTable />
                        <Pagination />
                    </div>
                </main>
            </div>
        </div>
    );
}