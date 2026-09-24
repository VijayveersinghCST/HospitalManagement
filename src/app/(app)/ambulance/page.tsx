import Ambulancedirectorytable from "@/components/ambulances/Ambulancedirectorytable";
import { MOCK_AMBULANCES } from "@/components/ambulances/Mockambulances";

export default function AmbulancesPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <Ambulancedirectorytable ambulances={MOCK_AMBULANCES} />
        </main>
    );
}