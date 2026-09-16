import ReceptionistEditPicker from "@/components/receptionist/Receptionisteditpicker";
import { MOCK_RECEPTIONISTS } from "@/components/receptionist/Mockreceptionist";

export default function ReceptionistEditPickerPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <ReceptionistEditPicker receptionists={MOCK_RECEPTIONISTS} />
        </main>
    );
}