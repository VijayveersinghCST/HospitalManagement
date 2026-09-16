import PharmacyStaffEditPicker from "@/components/pharmacy/Pharmacystaffeditpicker";
import { MOCK_PHARMACY_STAFF } from "@/components/pharmacy/Mockpharmacystaff";

export default function PharmacyStaffEditPickerPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <PharmacyStaffEditPicker staff={MOCK_PHARMACY_STAFF} />
        </main>
    );
}