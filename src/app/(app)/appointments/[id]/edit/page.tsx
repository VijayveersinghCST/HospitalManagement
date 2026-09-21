import { notFound } from "next/navigation";
import Editappointmentform from "@/components/appointments/Editappointmentform";
import { getAppointmentById, MOCK_APPOINTMENTS } from "@/components/appointments/Mockappointments";

export function generateStaticParams() {
    return MOCK_APPOINTMENTS.map((a) => ({ id: a.id }));
}

export default async function EditAppointmentPage({
                                                      params,
                                                  }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const appointment = getAppointmentById(id);

    if (!appointment) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <Editappointmentform appointment={appointment} />
        </main>
    );
}