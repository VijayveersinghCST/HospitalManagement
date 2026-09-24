import Ambulancepicker from "@/components/ambulances/Ambulancepicker";
import { MOCK_AMBULANCES } from "@/components/ambulances/Mockambulances";

export default function EditAmbulancePickerPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <Ambulancepicker ambulances={MOCK_AMBULANCES} />
        </main>
    );
}