import ShiftConfigPage from "@/components/shift-config/Shiftconfigpage";
import { MOCK_ALL_STAFF_SHIFTS } from "@/components/shift-config/Mockshiftconfig";

export default function ShiftConfigurationPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <ShiftConfigPage staff={MOCK_ALL_STAFF_SHIFTS} />
        </main>
    );
}