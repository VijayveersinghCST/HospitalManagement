import Appointmentpicker from "@/components/appointments/Appointmentpicker";
import { MOCK_APPOINTMENTS } from "@/components/appointments/Mockappointments";

export default function EditAppointmentPickerPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <Appointmentpicker appointments={MOCK_APPOINTMENTS} />
        </main>
    );
}