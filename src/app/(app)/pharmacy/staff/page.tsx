import PharmacyStaffTable from "@/components/pharmacy/Pharmacystafftable";
import { MOCK_PHARMACY_STAFF, MOCK_PHARMACY_STATS } from "@/components/pharmacy/Mockpharmacystaff";

export default function PharmacyStaffPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <PharmacyStaffTable staff={MOCK_PHARMACY_STAFF} stats={MOCK_PHARMACY_STATS} />
        </main>
    );
}