import ReceptionistDirectoryTable from "@/components/receptionist/ReceptionistDirectorytable";
import { MOCK_RECEPTIONISTS } from "@/components/receptionist/Mockreceptionist";

export default function ReceptionistManagementPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <ReceptionistDirectoryTable receptionists={MOCK_RECEPTIONISTS} />
        </main>
    );
}
