import Appointmentdirectorytable from "@/components/appointments/Appointmentdirectorytable";
import { MOCK_APPOINTMENTS } from "@/components/appointments/Mockappointments";

export default function AppointmentsPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <Appointmentdirectorytable appointments={MOCK_APPOINTMENTS} />
        </main>
    );
}